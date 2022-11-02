import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v2";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import LeftSidebarHeader from "./LeftSidebarHeader-v2";
import SearchBar from "./SearchBar-v2";
import LeftSidebarList from "./LeftSidebarList-v2";
import LeftSidebarListControls from "./LeftSidebarListControls-v2";

export default function LeftSidebar({ cachedGeoclusters }) {
	const { liveClustersData } = useDashboardContext();
	const { filterText, workingClustersData, pageRowsLength } = useLeftSidebarContext();

	// TODO > COMPARE LIVE AND CACHED GEO CLUSTERS AND PASS MOST RECENT TO LIST
	// console.log({ liveClustersData });
	// console.log({ workingClustersData });

	let filteredData = null;
	let pagenatedData = [];

	// TODO > ABSTRACT TO A FUNCTION
	if (cachedGeoclusters) {
		filteredData = cachedGeoclusters.filter((record) => {
			const recordTitle = record.properties[OS.CLUSTER_TITLE].toLowerCase();
			return recordTitle.indexOf(filterText.toLowerCase()) !== -1;
		});

		if (filteredData) {
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
			<LeftSidebarHeader dataArray={filteredData}></LeftSidebarHeader>
			<SearchBar></SearchBar>
			<div className="flex-col">
				<LeftSidebarList pagenatedData={pagenatedData}></LeftSidebarList>
				<LeftSidebarListControls></LeftSidebarListControls>
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
