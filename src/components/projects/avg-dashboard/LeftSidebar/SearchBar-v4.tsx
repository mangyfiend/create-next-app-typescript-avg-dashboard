import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function SearchBar() {
	const { clusterNameFiltertext, onClusterNameFilterTextChange }: ILeftSidebarContextProps =
		useLeftSidebarContext();
	return (
		<form>
			<input
				type="text"
				name="clusterNameFilterText"
				value={clusterNameFiltertext}
				placeholder="search [cached]"
				onChange={onClusterNameFilterTextChange}></input>
		</form>
	);
}
