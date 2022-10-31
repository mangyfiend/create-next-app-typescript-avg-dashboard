import React from "react";
import { useState } from "react";
import LeftSidebarHeader from "./LeftSidebarHeader";
import SearchBar from "./SearchBar";
import SearchBar2 from "./SearchBar2";
import LeftSidebarActions from "./LeftSidebarActions";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext";
import LeftSidebarList from "./LeftSidebarList";
import LeftSidebarListControls from "./LeftSidebarListControls";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";

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
	} = useLeftSidebarContext();

	return (
		<div>
			<LeftSidebarHeader data={filteredAgcs}></LeftSidebarHeader>
			<LeftSidebarActions
				onSelectChangeHandler={onIntervalSelectChange}></LeftSidebarActions>
			<SearchBar
				searchText={filterText}
				onTextChangeHandler={setFilterText}></SearchBar>
			<SearchBar2
				searchText={filterText2}
				onTextChangeHandler={onFilterTextChange}></SearchBar2>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<LeftSidebarList
					searchText={filterText}
					results={cachedGeoclusters}
					pageRowsLimit={pageRowsLength}></LeftSidebarList>
				<LeftSidebarListControls
					onSelectChangeHandler={
						onPageRowsSelectChange
					}></LeftSidebarListControls>
			</div>
		</div>
	);
}
