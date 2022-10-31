import React from "react";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";

export default function ResultRow({ result }) {
	return (
		<div className="flex-col">
			<a href="#">{result.properties.agc_extended_name}</a>
			<small>{result.properties.agc_location}</small>
			<small>{result.properties.agc_id}</small>
		</div>
	);
}
