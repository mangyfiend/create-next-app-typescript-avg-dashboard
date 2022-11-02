import React from "react";
// import Dashboard from "@components/projects/avg-dashboard/Dashboard";
import Dashboard from "@components/projects/avg-dashboard/Dashboard-v2";
import { DashboardProvider } from "@context/projects/avg-dashboard/DashboardContext";

export default function AvgDashboard(props) {
	return (
		<div>
			<DashboardProvider>
				<Dashboard cachedGeoclusters={props.cachedGeoclusters}></Dashboard>
			</DashboardProvider>
		</div>
	);
}

export async function getServerSideProps() {
	try {
		const apiResponse = await fetch(
			`https://geoclusters.herokuapp.com/api/v1/parcelized-agcs/`
		);
		const apiDocs = await apiResponse.json();
		console.log({ apiDocs });
		return {
			props: {
				cachedGeoclusters: apiDocs.data.collection_docs,
				admin1Bounds: null,
				admin2Bounds: null,
			},
		};
	} catch (err) {
		return {
			props: { cachedGeoclusters: null },
		};
	}
}
