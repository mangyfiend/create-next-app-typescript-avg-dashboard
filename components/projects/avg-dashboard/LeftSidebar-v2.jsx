import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v2";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import LeftSidebarHeader from "./LeftSidebarHeader-v2";
import SearchBar from "./SearchBar-v2";
import LeftSidebarList from "./LeftSidebarList-v2";
import LeftSidebarListControls from "./LeftSidebarListControls-v2";
import LeftSidebarFilters from "./LeftSidebar/LeftSidebarFilters";

export default function LeftSidebar({ clustersArray }) {
	const { filterText, pageRowsLength } = useLeftSidebarContext();

	let filteredData = [];
	let pagenatedData = [];

	// function compare

	// TODO > ABSTRACT TO CONTEXT
	if (clustersArray.length > 0) {
		filteredData = clustersArray.filter((record) => {
			const recordTitle = record.properties[OS.CLUSTER_TITLE].toLowerCase();
			return recordTitle.indexOf(filterText.toLowerCase()) !== -1;
		});

		if (filteredData.length > 0) {
			// before user interaction,
			// the default value of the rows limit select elment is == 0
			if (pageRowsLength === 0) {
				pagenatedData = [filteredData];
			} else {
				pagenatedData = divideArray(filteredData, pageRowsLength);
			}
		}
	}

	return (
		<div>
			<LeftSidebarFilters></LeftSidebarFilters>
			<div>
				<LeftSidebarHeader dataArray={filteredData}></LeftSidebarHeader>
				<SearchBar></SearchBar>
				<div className="flex-col">
					<LeftSidebarList pagenatedData={pagenatedData}></LeftSidebarList>
					<LeftSidebarListControls></LeftSidebarListControls>
				</div>
			</div>
		</div>
	);
}

// split the cachedData into arrays
function divideArray(arr, pageWidth) {
	let finalArr = [];
	let tempArr = [];
	for (let idx = 0; idx < arr.length; idx++) {
		let sliceBoundary = idx + 1;
		tempArr.push(arr[idx]);
		if (sliceBoundary % pageWidth === 0) {
			finalArr.push(tempArr);
			tempArr = [];
		}
	}
	if (tempArr.length !== 0) {
		finalArr.push(tempArr);
	}
	return finalArr;
}
