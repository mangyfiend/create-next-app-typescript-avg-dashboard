import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import SearchBar from "@components/projects/avg-dashboard/SearchBar-v4";
import styles from "@styles/projects/avg-dashboard/LeftSidebarFilters.module.css"

export default function LeftSidebarFilters() {
	const { setClustersFilterData, handleClusterFiltersChange } = useLeftSidebarContext();
	return (
		<div className={styles.wrapper}>
			<div>Left Sidebar Filters</div>
				<SearchBar></SearchBar>
			<form onSubmit={setClustersFilterData}>
				<label htmlFor="clusterSizeCategory">Cluster Sizes</label>
				<select name="clusterSizeCategory" id="cluster_size_selector" onChange={handleClusterFiltersChange}>
					<option value={0}>all cluster sizes</option>
					<option value={5}>5 Farmers</option>
					<option value={10}>10 Farmers</option>
					<option value={20}>20 Farmers</option>
					<option value={50}>50 Farmers</option>
				</select>
				<label htmlFor="geoPolRegionSelector">Geo-Political Regions</label>
				<select name="geoPolRegionSelector" id="geo_pol_region_selector" onChange={handleClusterFiltersChange}>
					<option value={0}>all regions</option>
				</select>
			</form>
		</div>
	);
}
