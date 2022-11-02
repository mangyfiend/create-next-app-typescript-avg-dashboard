import React from "react";
import { useState } from "react";
import LeftSidebarHeader from "./LeftSidebarHeader";
import SearchBar from "./SearchBar";
import SearchBar2 from "./SearchBar2";
import LeftSidebarActions from "./LeftSidebarActions";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext";
import LeftSidebarList from "./LeftSidebarList";
import LeftSidebarList2 from "./LeftSidebarList-v2";
import LeftSidebarListControls from "./LeftSidebarListControls";

import ExampleComponent from "./ExampleComponent";

export default function LeftSidebar({ cachedGeoclusters }) {
	const [filterText, setFilterText] = useState("");

	//
	const {
		agcs, // TODO > REPLACE CACHED DATA WITH "agcs" WHEN AVAILABLE
		// filterText,
		// onFilterTextChange,
		filterText2,
		onFilter2TextChange,
		onRetreiveIntervalSelectChange,
		onPageRowsSelectChange,
		pageRowsLength,
		filteredAgcs, // REMOVE
		dataLoadingChk,
		workingClustersData,
	} = useLeftSidebarContext();

	return (
		<div>
			<LeftSidebarHeader headerData={filteredAgcs}></LeftSidebarHeader>
			{/* <LeftSidebarHeader headerData={workingClustersData}></LeftSidebarHeader> */}
			<LeftSidebarActions
				loadingChk={dataLoadingChk}
				onSelectChangeHandler={
					onRetreiveIntervalSelectChange
				}></LeftSidebarActions>
			{/* <ExampleComponent></ExampleComponent> */}
			<SearchBar2
				searchText={filterText2}
				onTextChangeHandler={onFilter2TextChange}></SearchBar2>
			<SearchBar searchText={filterText} onTextChangeHandler={setFilterText}></SearchBar>
			<div style={{ display: "flex", flexDirection: "column" }}>
				{/* <LeftSidebarList2></LeftSidebarList2> */}
				<LeftSidebarList
					searchText={filterText}
					cachedData={cachedGeoclusters}
					data={cachedGeoclusters}
					pageRowsLimit={pageRowsLength}></LeftSidebarList>
				<LeftSidebarListControls
					onSelectChangeHandler={
						onPageRowsSelectChange
					}></LeftSidebarListControls>
			</div>
		</div>
	);
}
