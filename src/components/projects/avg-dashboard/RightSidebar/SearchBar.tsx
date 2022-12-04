import { ChangeEvent } from "react";

type SearchBarTypes = {
	searchText: string;
	onSearchTextChange: (argument: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
	searchText,
	onSearchTextChange,
}: SearchBarTypes): JSX.Element {
	return (
		<form>
			<input
				type="text"
				name="searchFilterText"
				value={searchText}
				placeholder="generic search"
				onChange={onSearchTextChange}
			/>
		</form>
	);
}