import React, { useState, useRef, useEffect } from "react";

export default function ListItemCheckbox({
	checkboxLabel,
	listItemId,
	prevCheckedIds,
	checkedIdsStateSetter, // keeps track of only the checked checkboxes
	masterCheckboxState,
}: {
	checkboxLabel: string;
	listItemId: string;
	// from context: use this to keep track of all the checked checkboxes
	checkedIdsStateSetter: React.Dispatch<React.SetStateAction<string[]>>;
	// from context: get all prev. checked boxes
	prevCheckedIds: string[];
	masterCheckboxState: boolean;
}): JSX.Element {

	// SANDBOX
	const listItemCheckboxRef = useRef(undefined);
	// console.log(listItemCheckboxRef.current?.checked);

	// check if THIS checkbox was previously checked before the last re-render
	const isPrevChecked: boolean = prevCheckedIds.indexOf(listItemId) !== -1;

	const initialState: boolean = isPrevChecked ? isPrevChecked : false;

	// control the input
	const [isChecked, setIsChecked] = useState<boolean>(initialState);

	// SANDBOX > TRIGGER STATE CHANGE USING THE MASTER CHECKBOX STATE
	useEffect(() => {
		if (masterCheckboxState === true) {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [masterCheckboxState]);
	
	// SANDBOX
	// useEffect(() => {
	// 	console.log("here boi")
	// 	console.log({prevCheckedIds})
	// 	if (listItemCheckboxRef) {
	// 		if (listItemCheckboxRef?.current.checked === true) {
	// 			// append this list item's id to the array of checked ids
	// 			checkedIdsStateSetter((prevIds: [] | string[]) => [...prevIds, listItemCheckboxRef.current.id]);
	// 		} else {
	// 			// filter out this list item's id from the array of checked ids
	// 			checkedIdsStateSetter((prevIds) => prevIds.filter((prevId) => prevId !== listItemCheckboxRef.current.id));
	// 		}
	// 	}
	// }, [listItemCheckboxRef.current.checked]);

	// handle check event
	const onCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

		setIsChecked((prevState) => !prevState);

		const name: string = e.target.name;
		const listItemId: string = e.target.id;
		const value: boolean = e.target.checked;

		if (value === true) {
			// append this list item's id to the array of checked ids
			checkedIdsStateSetter((prevIds: [] | string[]) => [...prevIds, listItemId]);
		} else {
			// filter out this list item's id from the array of checked ids
			checkedIdsStateSetter((prevIds) => prevIds.filter((prevId) => prevId !== listItemId));
		}
	};

	return (
		<div className="checkbox-wrapper">
			<label htmlFor="">
				<input
					ref={listItemCheckboxRef}
					type="checkbox"
					name=""
					id={listItemId}
					checked={isChecked}
					onChange={onCheckHandler}
				/>
				<span>{checkboxLabel}</span>
			</label>
		</div>
	);
}
