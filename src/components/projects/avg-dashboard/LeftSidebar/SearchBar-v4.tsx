import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function SearchBar() {
	const { clusterNameFilterText, onClusterNameFilterTextChange }: ILeftSidebarContextProps =
		useLeftSidebarContext();
	return (
		<form>
			<input
				type="text"
				name="clusterNameFilterText"
				value={clusterNameFilterText}
				placeholder="search geoclusters"
				onChange={onClusterNameFilterTextChange}></input>
		</form>
	);
}
