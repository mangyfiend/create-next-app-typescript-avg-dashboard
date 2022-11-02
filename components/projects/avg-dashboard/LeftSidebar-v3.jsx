import LeftSidebarHeader from "./LeftSidebarHeader-v3";
import SearchBar from "./SearchBar-v3";
import LeftSidebarList from "./LeftSidebarList-v3";
import LeftSidebarListControls from "./LeftSidebarListControls-v3";
import LeftSidebarFilters from "./LeftSidebar/LeftSidebarFilters";

export default function LeftSidebar() {

	return (
		<>
			<LeftSidebarFilters></LeftSidebarFilters>
			<>
				<LeftSidebarHeader></LeftSidebarHeader>
				<SearchBar></SearchBar>
				<div className="flex-col">
					<LeftSidebarList></LeftSidebarList>
					<LeftSidebarListControls></LeftSidebarListControls>
				</div>
			</>
		</>
	);
}
