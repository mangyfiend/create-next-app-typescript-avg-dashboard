import useRightSidebarContext from "@hooks/projects/avg-dashboard/useRightSidebarContext";
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import { useState, ChangeEvent, SetStateAction } from "react";

export default function SearchBar() {
	const { featTitleFilterText, onClusterFeatTitleSearch }: IRightSidebarContextProps = useRightSidebarContext();
	// const [searchText, setSearchText] = useState("");
	// // const onSearchTextChange = (evt: { target: { value: SetStateAction<string> } }) =>
	// // setSearchText(evt.target.value);
	// const onSearchTextChange = (evt: ChangeEvent<HTMLInputElement>) =>
	// 	setSearchText(evt.target.value);

	return (
		<form>
			<input
				type="text"
				name="searchFilterText"
				value={featTitleFilterText}
				placeholder="generic search"
				onChange={onClusterFeatTitleSearch}
			/>
		</form>
	);
}
