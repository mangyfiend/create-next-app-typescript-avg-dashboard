import styles from "@styles/projects/avg-dashboard/RightSidebar.module.css";
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import useRightSidebarContext from "@hooks/projects/avg-dashboard/useRightSidebarContext";
import ClusterFeaturesListPages from "./ClusterFeaturesListPages";
import ClusterFeaturesMap from "./ClusterFeaturesMap/ClusterFeaturesMap";
import RightSidebarHeader from "./RightSidebarHeader";
import SearchBar from "./SearchBar";

export default function RightSidebar() {
	const {
		clusterFeatsPages,
		featTitleFilterText,
		onClusterFeatTitleSearch,
	}: IRightSidebarContextProps = useRightSidebarContext();

	return !clusterFeatsPages || clusterFeatsPages.length < 1 ? (
		<div className={styles["right-sidebar-container"]}>
			<div>no features to show</div>
			<div>please click on a cluster on the left panel</div>
			<ClusterFeaturesMap></ClusterFeaturesMap>
		</div>
	) : (
		<div className={styles["right-sidebar-container"]}>
			<RightSidebarHeader></RightSidebarHeader>
			<ClusterFeaturesMap></ClusterFeaturesMap>
			<div>Geocluster Features Filters</div>
			<SearchBar
				searchText={featTitleFilterText}
				onSearchTextChange={onClusterFeatTitleSearch}></SearchBar>
			<ClusterFeaturesListPages></ClusterFeaturesListPages>
		</div>
	);
}
