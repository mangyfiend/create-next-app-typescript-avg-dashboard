import LeftSidebarHeader from "./LeftSidebarHeader-v4";
import SearchBar from "./SearchBar-v4";
import LeftSidebarList from "./LeftSidebarList-v4";
import LeftSidebarListControls from "./LeftSidebarListControls-v4";
import LeftSidebarFilters from "./LeftSidebarFilters-v4";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";

export default function LeftSidebar(): JSX.Element {
	return (
		<div className={styles["left-sidebar-container"]}>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr" }}>
				<div className="flex-col" style={{ padding: "5px", border: "3px solid limegreen" }}>
					<LeftSidebarHeader></LeftSidebarHeader>
					<div>
						<SearchBar></SearchBar>
						<LeftSidebarList></LeftSidebarList>
						<LeftSidebarListControls></LeftSidebarListControls>
					</div>
				</div>
				<LeftSidebarFilters></LeftSidebarFilters>
			</div>
		</div>
	);
}
