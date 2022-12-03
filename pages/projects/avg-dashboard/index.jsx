import Dashboard from "@components/projects/avg-dashboard/Dashboard-v4";
import { DashboardProvider } from "@context/projects/avg-dashboard/DashboardContext";
import API_URLS from "@constants/api-urls"

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
		let apiResponse = await fetch(API_URLS.LOCAL.PARCELIZED_GEOCLUSTERS);
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
