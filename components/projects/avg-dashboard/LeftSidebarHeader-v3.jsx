import React from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v3";

export default function LeftSidebarHeader() {
	const { dataLoadingChk, liveDataTimestamp } = useDashboardContext();
	const { workingClustersArray } = useLeftSidebarContext();

	let listCountSpan;

	let timestampSpan = <span>Updated {new Date(liveDataTimestamp).toUTCString()}</span>;

	if (dataLoadingChk) timestampSpan = <div className="plain-text">loading data</div>;

	if (workingClustersArray) listCountSpan = <span> ... </span>;

	if (workingClustersArray.length > 1) {
		listCountSpan = (
			<span>{`${
				workingClustersArray.length > 1 ? `${workingClustersArray.length} AGCs` : `${workingClustersArray.length} AGC`
			}`}</span>
		);
	} else {
		listCountSpan = <span> ... </span>;
		timestampSpan = <span> ... </span>;
	}

	let headerMarkup = (
		<div className="flex-row-between">
			{listCountSpan}
			{timestampSpan}
		</div>
	);

	return <div>{headerMarkup}</div>;
}
