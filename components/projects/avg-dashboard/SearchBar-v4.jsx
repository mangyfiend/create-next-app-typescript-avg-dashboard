import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";

export default function SearchBar() {
	const {clusterNameFilterText, onClusterNameFilterTextChange} = useLeftSidebarContext();
	return (    
		<form>
			<input
				type="text"
				value={clusterNameFilterText}
				placeholder="search [cached]"
				onChange={onClusterNameFilterTextChange}>
			</input>
		</form>
	);
}
