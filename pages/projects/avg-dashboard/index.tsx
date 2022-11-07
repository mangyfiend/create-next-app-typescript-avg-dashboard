import Dashboard from "@src/components/projects/avg-dashboard/Dashboard-v4";
import { DashboardProvider } from "@context/projects/avg-dashboard/DashboardContext";
import API_URLS from "@utils/constants/api-urls";
import IFeatureCollection from "@src/interfaces/GeoJSON";

// TODO > CHANGE TO IMPORT
interface IGeoclustersAPIData {
	collection_docs: IFeatureCollection[];
	collection_docs_num: number;
}

// TODO > CHANGE TO IMPORT
interface IGeoclusterAPIResponse {
	date_requested: Date;
	data: IGeoclustersAPIData;
}

export default function AvgDashboard(props: { cachedGeoclustersArray: IFeatureCollection[] }) {
	return (
		<>
			<DashboardProvider>
				<Dashboard cachedClustersArray={props.cachedGeoclustersArray}></Dashboard>
			</DashboardProvider>
		</>
	);
}

export async function getServerSideProps() {
	try {
		let apiResponse = await fetch(API_URLS.PARCELIZED_GEOCLUSTERS);
		const apiData: IGeoclusterAPIResponse = await apiResponse.json();
		return {
			props: {
				cachedGeoclustersArray: apiData.data.collection_docs,
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
