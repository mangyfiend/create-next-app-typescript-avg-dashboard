import LeftSidebarHeader from "./LeftSidebarHeader-v4";
// import SearchBar from "./SearchBar-v4";
import SearchBar from "../SearchBar";
import LeftSidebarList from "./LeftSidebarList-v4";
import LeftSidebarListPages from "./LeftSidebarListPages-v4";
import LeftSidebarListControls from "./LeftSidebarListControls-v4";
import LeftSidebarFilters from "./LeftSidebarFilters-v4";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";

export default function LeftSidebar(): JSX.Element {
	const {
		pagenatedGeoclusters,
		onClusterNameFilterTextChange,
		clusterNameFilterText,
	}: ILeftSidebarContextProps = useLeftSidebarContext();

	return !pagenatedGeoclusters || pagenatedGeoclusters[0].length === 0 ? (
		<div className={styles["left-sidebar-container"]}>
			<div>please refresh the page or click Refresh Data</div>
		</div>
	) : (
		<div className={styles["left-sidebar-container"]}>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr" }}>
				<div className="flex-col" style={{ padding: "5px", border: "3px solid limegreen" }}>
					<LeftSidebarHeader></LeftSidebarHeader>
					<div>
						<SearchBar
							searchText={clusterNameFilterText}
							onSearchTextChange={onClusterNameFilterTextChange}></SearchBar>
						{/* <LeftSidebarList></LeftSidebarList> */}
						<LeftSidebarListPages></LeftSidebarListPages>
						{/* <LeftSidebarListControls></LeftSidebarListControls> */}
					</div>
				</div>
				<LeftSidebarFilters></LeftSidebarFilters>
			</div>
		</div>
	);
}
