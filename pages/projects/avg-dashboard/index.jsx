import Dashboard from "@components/projects/avg-dashboard/Dashboard-v4";
import { DashboardProvider } from "@context/projects/avg-dashboard/DashboardContext";

export default function AvgDashboard(props) {
	return (
		<div>
			<DashboardProvider>
				<Dashboard cachedClustersArray={props.cachedGeoclustersArray}></Dashboard>
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
