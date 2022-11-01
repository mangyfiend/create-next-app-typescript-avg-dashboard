import React from "react";

export default function DataRecordRow({ dataRecord }) {
	let rowMarkup;
	if (dataRecord) {
		rowMarkup = (
			<div className="flex-col">
				<a href="#">{dataRecord.properties.agc_extended_name}</a>
				<small>{dataRecord.properties.agc_location}</small>
				<small>{dataRecord.properties.agc_id}</small>
			</div>
		);
	} else {
		rowMarkup = <span>something went wrong</span>;
	}
	return rowMarkup;
}
