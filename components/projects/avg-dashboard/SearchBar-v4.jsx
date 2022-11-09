import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";

export default function SearchBar() {
	const {clusterNameFiltertext, onClusterNameFilterTextChange} = useLeftSidebarContext();
	return (    
		<form>
			<input
				type="text"
				value={clusterNameFiltertext}
				placeholder="search [cached]"
				onChange={onClusterNameFilterTextChange}>
			</input>
		</form>
	);
}
