import LeftSidebarHeader from "./LeftSidebarHeader-v4";
import SearchBar from "./SearchBar-v4";
import LeftSidebarList from "./LeftSidebarList-v4";
import LeftSidebarListControls from "./LeftSidebarListControls-v4";
import LeftSidebarFilters from "./LeftSidebar/LeftSidebarFilters-v4";

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
