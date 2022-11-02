import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v3";

export default function SearchBar() {
	const {filterText, onFilterTextChange} = useLeftSidebarContext();
	return (    
		<form>
			<input
				type="text"
				value={filterText}
				placeholder="search [cached]"
				onChange={onFilterTextChange}>
			</input>
		</form>
	);
}
