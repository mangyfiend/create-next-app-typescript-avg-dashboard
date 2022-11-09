import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function SearchBar() {
	const { filterText, onFilterTextChange }: ILeftSidebarContextProps = useLeftSidebarContext();
	return (
		<form>
			<input
				type="text"
				name="clusterNameFilter"
				value={filterText}
				placeholder="search [cached]"
				onChange={onFilterTextChange}></input>
		</form>
	);
}
