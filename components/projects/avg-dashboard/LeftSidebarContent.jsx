import React from "react";
import ResultRow from "./ResultRow";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import ContentControls from "./ContentControls";

export default function LeftSidebarContent({ searchText, results, pageRowsLimit }) {
	let filteredResults = null;
	if (results) {
		filteredResults = results.filter((result) => {
			const resultTitle = result.properties.agc_extended_name.toLowerCase();
			return resultTitle.indexOf(searchText.toLowerCase()) !== -1;
		});
	}
	console.log({ pageRowsLimit });
	// console.log({ filteredResults });
	console.log(Math.ceil(filteredResults.length / pageRowsLimit));

	const splitResults = divdeArray(
		filteredResults,
		Math.ceil(filteredResults.length / pageRowsLimit)
	);

	console.log({ splitResults });

	return (
		<div className={styles["content-wrapper"]}>
			<div className={styles["content-body-wrapper"]}>
				{!filteredResults ||
					(filteredResults.length === 0 && <div> please refresh page </div>)}

				{filteredResults &&
					filteredResults.map((result) => (
						<ResultRow key={result.properties.agc_id} result={result}></ResultRow>
					))}
			</div>
			<div className={styles["content-controls-wrapper"]}>
				<ContentControls></ContentControls>
			</div>
		</div>
	);
}

// split the results into arrays
function divdeArray(arr, K) {
	console.log(arr)
	let finalArr = [];
	let tempArr = [];
	for (let idx = 0; idx < arr.length; idx++) {
		let sliceBoundary = idx + 1;
		tempArr.push(arr[idx]);
		if (sliceBoundary % K === 0) {
			finalArr.push(tempArr);
			tempArr = [];
		}
	}
	if (tempArr.length !== 0) {
		finalArr.push(tempArr);
	}
	return finalArr;
}
