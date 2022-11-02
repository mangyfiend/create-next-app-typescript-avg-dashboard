import React from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";

export default function LeftSidebarHeader({ dataArray }) {
	const { dataLoadingChk, liveDataTimestamp } = useDashboardContext();

	let listCountSpan;

	let timestampSpan = <span>Updated {new Date(liveDataTimestamp).toUTCString()}</span>;

	if (dataLoadingChk) timestampSpan = <div className="plain-text">loading data</div>;

	// if (!dataLoadingChk && !dataArray) listCountSpan = <span> ... </span>;
	if (dataArray) listCountSpan = <span> ... </span>;

	// if (!dataLoadingChk && dataArray)
	if (dataArray)
		listCountSpan = (
			<span>{`${
				dataArray.length > 1 ? `${dataArray.length} AGCs` : `${dataArray.length} AGC`
			}`}</span>
		);

	let headerMarkup = (
		<div className="flex-row-between">
			{listCountSpan}
			{timestampSpan}
		</div>
	);

	return <div>{headerMarkup}</div>;
}
