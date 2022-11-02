import LeftSidebarListPages from "./LeftSidebarListPages";

export default function LeftSidebarList({
	searchText,
	data,
	pageRowsLimit,
}) {
	let filteredData = null;
	let dataArray = [];
	let pagenatedData = [];

	if (data) {
		filteredData = data.filter((record) => {
			const recordTitle = record.properties.agc_extended_name.toLowerCase();
			return recordTitle.indexOf(searchText.toLowerCase()) !== -1;
		});

		// SANDBOX
		if (filteredData) {
			// before user interaction,
			// the default value of the rows limit select elment is == 0
			if (pageRowsLimit === 0) {
				dataArray = [filteredData];
			} else {
				dataArray = divideArray(filteredData, pageRowsLimit);
			}
		}
	}
	console.log({ dataArray });

	return (
		<div>
			<div>
				{pagenatedData && (
					<LeftSidebarListPages
						pagesArray={dataArray}></LeftSidebarListPages>
				)}
			</div>
		</div>
	);
}

// split an array into pages
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
