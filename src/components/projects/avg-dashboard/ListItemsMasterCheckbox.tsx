import React, { useState } from "react";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function ListItemsMasterCheckbox({
	checkboxLabel,
	prevCheckedIds,
	checkedIdsStateSetter,
}: {
	checkboxLabel: string;
	prevCheckedIds: string[];
	checkboxIdsStateSetter: React.Dispatch<React.SetStateAction<string[]>>;
	checkedIdsStateSetter: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {
	// control the input
	// REMOVE > DEPRECATED
	// const [isChecked, setIsChecked] = useState<boolean>(false);
	const {
		masterCheckboxIsChecked,
		setMasterCheckboxIsChecked,
	}: ILeftSidebarContextProps = useLeftSidebarContext();

	// handle check event
	const onCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		// setIsChecked((prevState) => !prevState);
		setMasterCheckboxIsChecked((prevState) => !prevState);
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
					// REMOVE > DEPRECATED
					// checked={isChecked}
					checked={masterCheckboxIsChecked}
					onChange={onCheckHandler}
				/>
				<span>{checkboxLabel}</span>
			</label>
		</div>
	);
}
