import React, { useState } from "react";


export default function ListItemsMasterCheckbox({
  checkboxLabel,
	prevCheckedIds,
	checkedIdsStateSetter,
}: {
  checkboxLabel: string
	prevCheckedIds: string[];
	checkboxIdsStateSetter: React.Dispatch<React.SetStateAction<string[]>>;
	checkedIdsStateSetter: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {

  	// control the input
	const [isChecked, setIsChecked] = useState(false);

  	// handle check event
	const onCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked((prevState) => !prevState);
		const name: string = e.target.name;
		const value: boolean = e.target.checked;

    // SANDBOX
    // if (isChecked) 
	};
  
	return (
		<div className="checkbox-wrapper">
			<label htmlFor="">
				<input
					type="checkbox"
					name=""
					// id={listItemId}
					checked={isChecked}
					onChange={onCheckHandler}
				/>
				<span>{checkboxLabel}</span>
			</label>
		</div>
	);
}
