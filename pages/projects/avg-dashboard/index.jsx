import React from "react";
// import Dashboard from "@components/projects/avg-dashboard/Dashboard-v2";
import Dashboard from "@components/projects/avg-dashboard/Dashboard-v3";
import { DashboardProvider } from "@context/projects/avg-dashboard/DashboardContext";

export default function AvgDashboard(props) {
	return (
		<div>
			<DashboardProvider>
				<Dashboard
					cachedClustersAPIResponse={props.cachedClustersAPIResponse}
					cachedClustersArray={props.cachedGeoclustersArray}></Dashboard>
			</DashboardProvider>
		</div>
	);
}

export async function getServerSideProps() {
	try {
		let apiResponse = await fetch(`https://geoclusters.herokuapp.com/api/v1/parcelized-agcs/`);
		apiResponse = await apiResponse.json();
		return {
			props: {
				cachedClustersAPIResponse: apiResponse,
				cachedGeoclustersArray: apiResponse.data.collection_docs,
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
