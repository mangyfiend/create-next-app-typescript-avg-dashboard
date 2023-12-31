import LeftSidebarHeader from "./LeftSidebarHeader-v4";
import SearchBar from "./SearchBar-v4";
import LeftSidebarList from "./LeftSidebarList-v4";
import LeftSidebarListControls from "./LeftSidebarListControls-v4";
import LeftSidebarFilters from "./LeftSidebar/LeftSidebarFilters-v4";

export default function LeftSidebar() {
	return (
		<div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr" }}>
			<div className="flex-col" style={{ padding: "5px", border: "3px solid limegreen" }}>
				<LeftSidebarHeader></LeftSidebarHeader>
				<div>
					<SearchBar></SearchBar>
					<LeftSidebarList></LeftSidebarList>
					<LeftSidebarListControls></LeftSidebarListControls>
				</div>
			</div>
			<div>
				<LeftSidebarFilters></LeftSidebarFilters>
			</div>
		</div>
	);
}
