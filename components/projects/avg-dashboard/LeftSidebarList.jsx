import React from "react";
import ResultRow from "./ResultRow";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";

export default function LeftSidebarList({
	searchText,
	results,
	pageRowsLimit,
}) {
	let filteredResults = null;
	let lastPageNum = 1;

	if (results) {
		filteredResults = results.filter((result) => {
			const resultTitle = result.properties.agc_extended_name.toLowerCase();
			return resultTitle.indexOf(searchText.toLowerCase()) !== -1;
		});

		// SANDBOX
		if (filteredResults) {
			// console.log({ filteredResults });

			lastPageNum = Math.ceil(filteredResults.length / pageRowsLimit);

			const pagenatedResults = divideArray(filteredResults, pageRowsLimit);

			console.log({ pagenatedResults });
		}
	}

	return (
		<div>
			<div className={styles["list-wrapper"]}>
				{!filteredResults ||
					(filteredResults.length === 0 && (
						<div> please refresh page </div>
					))}

				{filteredResults &&
					filteredResults.map((result) => (
						<ResultRow
							key={result.properties.agc_id}
							result={result}></ResultRow>
					))}
			</div>
			<div>{`Page 1 of ${lastPageNum}`}</div>
		</div>
	);
}

// split the results into arrays
function divideArray(arr, pageWidth) {
	// console.log(arr);
	let finalArr = [];
	let tempArr = [];
	for (let idx = 0; idx < arr.length; idx++) {
		let sliceBoundary = idx + 1;
      // console.log({sliceBoundary})
		tempArr.push(arr[idx]);
      // console.log(`sliceBoundary: ${sliceBoundary} / pageWidth: ${pageWidth} = ${sliceBoundary % pageWidth}`)
		if (sliceBoundary % pageWidth === 0) {
         // console.log("-[ SLICE ]-")
			finalArr.push(tempArr);
			tempArr = [];
		}
	}
	if (tempArr.length !== 0) {
		finalArr.push(tempArr);
	}
	return finalArr;
}
