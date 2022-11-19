import React from "react";
import { useState } from "react";
import LeftSidebarHeader from "./LeftSidebarHeader";
import SearchBar from "./SearchBar";
import SearchBar2 from "./SearchBar2";
import LeftSidebarActions from "./LeftSidebarActions";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext";
import LeftSidebarList from "./LeftSidebarList";
import LeftSidebarListControls from "./LeftSidebarListControls";

export default function LeftSidebar({ cachedGeoclusters }) {
	const [filterText, setFilterText] = useState("");

	//
	const {
		agcs,
		onFilterTextChange,
		onIntervalSelectChange,
		onPageRowsSelectChange,
		pageRowsLength,
		filterText2,
		filteredAgcs,
		dataLoadingChk,
	} = useLeftSidebarContext();

	return (
		<div>
			<LeftSidebarHeader headerData={filteredAgcs}></LeftSidebarHeader>
			<LeftSidebarActions
				loadingChk={dataLoadingChk}
				onSelectChangeHandler={onIntervalSelectChange}></LeftSidebarActions>
			<SearchBar2 searchText={filterText2} onTextChangeHandler={onFilterTextChange}></SearchBar2>
			<SearchBar searchText={filterText} onTextChangeHandler={setFilterText}></SearchBar>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<LeftSidebarList
					searchText={filterText}
					results={cachedGeoclusters}
					pageRowsLimit={pageRowsLength}></LeftSidebarList>
				<LeftSidebarListControls
					onSelectChangeHandler={onPageRowsSelectChange}></LeftSidebarListControls>
			</div>
		</div>
	);
}
