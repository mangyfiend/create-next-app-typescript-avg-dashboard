import Link from "next/link";
import Layout from "@components/projects/avg-dashboard/Layouts/Layout";
import API_URLS from "@utils/constants/api-urls";
import Dashboard from "@components/projects/avg-dashboard/Dashboard-v4";
import { DashboardProvider } from "@context/projects/avg-dashboard/DashboardContext";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/GeoclusterGeoJSON";

// TODO > CHANGE TO IMPORT
interface IGeoclustersAPIData {
	collection_docs: IGeoclusterGeoJSON[];
	collection_docs_num: number;
}

// TODO > CHANGE TO IMPORT
interface IGeoclusterAPIResponse {
	date_requested: Date;
	data: IGeoclustersAPIData;
}

export default function AVGDashboard(props: { cachedGeoclustersArray: IGeoclusterGeoJSON[] }) {
	return (
		<Layout
			title="AVG Dashboard"
			description="The Next.js + Typescript version of the AVG Dashboard"
			keywords="AGC, NIRSAL, Dashboard, React, Next.js">
			<p>Hello Next.js & Typescript👋</p>
			<DashboardProvider>
				<Dashboard cachedClustersArray={props.cachedGeoclustersArray}></Dashboard>
			</DashboardProvider>
			<p>
				<Link href="/about">About</Link>
			</p>
		</Layout>
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
