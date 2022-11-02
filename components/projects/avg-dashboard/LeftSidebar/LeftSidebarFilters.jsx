import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v3";
export default function LeftSidebarFilters() {
	const { setClustersFilterData, handleClusterFiltersChange } = useLeftSidebarContext();
	return (
		<div>
			<div>Left Sidebar Filters</div>
			<form action="" onSubmit={setClustersFilterData}>
				<select name="clusterSizeCategory" id="" onChange={handleClusterFiltersChange}>
					<option value={0}>show all</option>
					<option value={5}>5 Farmers</option>
					<option value={10}>10 Farmers</option>
					<option value={20}>20 Farmers</option>
					<option value={50}>50 Farmers</option>
				</select>
			</form>
		</div>
	);
}
