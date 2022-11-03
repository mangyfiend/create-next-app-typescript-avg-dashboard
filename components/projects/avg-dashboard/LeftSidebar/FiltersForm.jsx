import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import SearchBar from "@components/projects/avg-dashboard/SearchBar-v4";
import styles from "@styles/projects/avg-dashboard/LeftSidebarFilters.module.css";

export default function LeftSidebarFilters() {
	const { setClustersFilterData, handleClusterFiltersChange, clusterFiltersData } =
		useLeftSidebarContext();

	return (
		<>
			<div>Left Sidebar Filters</div>
			<SearchBar></SearchBar>
			<form onSubmit={setClustersFilterData}>
				<label htmlFor="clusterSizeCategory">Cluster Sizes</label>
				<select
					name="clusterSizeCategory"
					id="cluster_size_selector"
					onChange={handleClusterFiltersChange}>
					<option value={0}>all cluster sizes</option>
					<option value={5}>5 Farmers</option>
					<option value={10}>10 Farmers</option>
					<option value={20}>20 Farmers</option>
					<option value={50}>50 Farmers</option>
				</select>
				<label htmlFor="geoPolRegionSelector">Geo-Political Regions</label>
				<select
					name="geoPolRegionSelector"
					id="geo_pol_region_selector"
					onChange={handleClusterFiltersChange}>
					<option value={0}>all regions</option>
					<option value={"NW"}>North West</option>
				</select>
				<div>
					<span>Close Points of Interest</span>
					<div className={styles["filters-section-wrapper"]}>
						{/* <span>Close Points of Interest</span> */}
						<div className={styles["section-inputs-wrapper"]}>
							<div className="flex-row-between">
								<label htmlFor="proximityToMarketChk">Markets</label>
								<input
									type="checkbox"
									name="proximityToMarketChk"
									id="proximity_to_market_chk"
									onChange={handleClusterFiltersChange}
								/>
								<label htmlFor="proximityToWaterChk">Water</label>
								<input
									type="checkbox"
									name="proximityToWaterChk"
									id="proximity_to_water_chk"
									onChange={handleClusterFiltersChange}
								/>
								<label htmlFor="proximityToRoadChk">Roads</label>
								<input
									type="checkbox"
									name="proximityToRoadChk"
									id="proximity_to_road_chk"
									onChange={handleClusterFiltersChange}
								/>
								<label htmlFor="proximityToFieldOfficeChk">Field Office</label>
								<input
									type="checkbox"
									name="proximityToFieldOfficeChk"
									id="proximity_to_field_office_chk"
									onChange={handleClusterFiltersChange}
								/>
							</div>
						</div>
					</div>
					<div>Cluster Visitation</div>
					<div className={styles["filters-section-wrapper"]}>
						<div className="flex-row-between">
							<label htmlFor="neverVisitedChk">Never Visited</label>
							<input
								type="checkbox"
								name="neverVisitedChk"
								id="never_visited_chk"
								onChange={handleClusterFiltersChange}
							/>
							<label htmlFor="scheduledForVisit">Scheduled for Visit</label>
							<input
								type="checkbox"
								name="scheduledForVisit"
								id="scheduled_visit_chk"
								onChange={handleClusterFiltersChange}
							/>
						</div>
						<div className="flex-col">
							<label htmlFor="visitedInLastRange">
								Visited in last {clusterFiltersData.visitedInLastRange}{" "}
								{clusterFiltersData.rangeTimeframeSelect}
							</label>
							<input className="range-slider"
								disabled={clusterFiltersData.neverVisitedChk ? true : false}
								type="range"
								name="visitedInLastRange"
								id="visited_in_last_range"
								onChange={handleClusterFiltersChange}
								min={1}
								max={clusterFiltersData.rangeTimeframeSelect === "hours" ? 24 : 30}
							/>
							<select
								name="rangeTimeframeSelect"
								id="range_time_frame_select"
								onChange={handleClusterFiltersChange}>
								<option value={"hours"}>Hours</option>
								<option value={"days"}>Days</option>
								<option value={"weeks"}>Weeks</option>
								<option value={"months"}>Months</option>
								<option value={"years"}>Years</option>
							</select>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
