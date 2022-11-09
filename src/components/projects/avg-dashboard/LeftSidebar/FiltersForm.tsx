import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import SearchBar from "./SearchBar-v4";
import styles from "@styles/projects/avg-dashboard/LeftSidebarFilters.module.css";
import { TITLES } from "@utils/constants/titles";
import { capitalize } from "@utils/helpers";
import { GEO_POL_REGIONS } from "@utils/constants/geo-pol-regions";
import { COUNTRY_ADMIN_LEVELS } from "@utils/constants/country-admin-levels";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function LeftSidebarFilters() {
	const {
		setClusterFilters,
		handleClusterFiltersChange,
		clusterFilters,
	}: ILeftSidebarContextProps = useLeftSidebarContext();

	const featureTitle: string = capitalize(TITLES.CLUSTER_FEATURE_TITLE);

	return (
		<>
			<div>Left Sidebar Filters</div>
			<SearchBar></SearchBar>
			<form onSubmit={setClusterFilters}>
				<label htmlFor="clusterSizeCategory">Cluster Sizes</label>
				<select
					name="clusterSizeCategory"
					id="cluster_size_selector"
					onChange={handleClusterFiltersChange}>
					<option value={0}>all cluster sizes</option>
					<option value={5}>5 {featureTitle}</option>
					<option value={10}>10 {featureTitle}</option>
					<option value={20}>20 {featureTitle}</option>
					<option value={50}>50 {featureTitle}</option>
				</select>
				<label htmlFor="adminLevelSelector">Administrative Level</label>
				<select
					name="adminLevelSelector"
					id="admin_level_selector"
					onChange={handleClusterFiltersChange}>
					<option value={""}>none</option>
					{Object.entries(COUNTRY_ADMIN_LEVELS).map((level, idx) => (
						<option key={idx} value={level[0]}>
							{level[1]}
						</option>
					))}
				</select>

				<label htmlFor="geoPolRegionSelector">Geo-Political Regions</label>
				<select
					name="geoPolRegionSelector"
					id="geo_pol_region_selector"
					onChange={handleClusterFiltersChange}>
					<option value={""}>all regions</option>
					{GEO_POL_REGIONS.map((region, idx) => (
						<option key={idx} value={region[0]}>
							{region[1]}
						</option>
					))}
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
								Visited in last {clusterFilters.visitedInLastRange}{" "}
								{clusterFilters.rangeTimeframeSelect}
							</label>
							<input
								className="range-slider"
								disabled={clusterFilters.neverVisitedChk ? true : false}
								type="range"
								name="visitedInLastRange"
								id="visited_in_last_range"
								onChange={handleClusterFiltersChange}
								min={1}
								max={clusterFilters.rangeTimeframeSelect === "hours" ? 24 : 30}
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
