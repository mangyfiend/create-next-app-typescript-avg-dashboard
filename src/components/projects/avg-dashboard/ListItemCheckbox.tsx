import React, { useState, useRef, ReactNode } from "react";

export default function ListItemCheckbox({
	checkboxLabel,
	listItemId,
	prevCheckedIds,
	checkedIdsStateSetter, // keeps track of only the checked checkboxes
}: {
	checkboxLabel: string;
	listItemId: string;
	// from context: use this to keep track of all the checked checkboxes
	checkedIdsStateSetter: React.Dispatch<React.SetStateAction<string[]>>;
	// from context: get all prev. checked boxes
	prevCheckedIds: string[];
}): JSX.Element {

	const listItemCheckboxRef = useRef();
	console.log(listItemCheckboxRef.current)

	// check if THIS checkbox was previously checked before the last re-render
	const isPrevChecked = prevCheckedIds.indexOf(listItemId) !== -1;

	const initialState = isPrevChecked ? isPrevChecked : false;

	// control the input
	const [isChecked, setIsChecked] = useState(initialState);

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
