import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "@components/projects/avg-dashboard/Layouts/Layout";
import API_URLS from "@utils/constants/api-urls";
import Dashboard from "@components/projects/avg-dashboard/Dashboard-v4";
import { DashboardProvider } from "@context/projects/avg-dashboard/DashboardContext";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";


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


export default function AVGDashboard(props: { cachedGeoclusters: IGeoclusterGeoJSON[] }) {
	return (
		<Layout
			title="AVG Dashboard"
			description="The Next.js + Typescript version of the AVG Dashboard"
			keywords="AGC, NIRSAL, Dashboard, React, Next.js">
			<p>Hello Next.js & Typescript👋</p>
			<DashboardProvider>
				<Dashboard cachedClustersArray={props.cachedGeoclusters}></Dashboard>
			</DashboardProvider>
			<p>
				<Link href="/about">About</Link>
			</p>
		</Layout>
	);
}


// MTD. 1 > using fully typed named function with GetServerSideProps type
export const getServerSideProps: GetServerSideProps = async (): Promise<
	| { props: { cachedGeoclusters: IGeoclusterGeoJSON[]; admin1Bounds: any; admin2Bounds: any } }
	| { props: { cachedGeoclusters: any; admin1Bounds?: undefined; admin2Bounds?: undefined } }
> => {
	try {
		let apiResponse = await fetch(API_URLS.AWSEC2.PARCELIZED_GEOCLUSTERS);
		const apiData: IGeoclusterAPIResponse = await apiResponse.json();
		return {
			props: {
				cachedGeoclusters: apiData.data.collection_docs,
				admin1Bounds: null,
				admin2Bounds: null,
			},
		};
	} catch (err) {
		return {
			props: { cachedGeoclusters: null },
		};
	}
};


// MTD. 2 > GetServerSideProps type omitted
// export async function getServerSideProps(): Promise<
// 	| { props: { cachedGeoclusters: IGeoclusterGeoJSON[]; admin1Bounds: any; admin2Bounds: any } }
// 	| { props: { cachedGeoclusters: any; admin1Bounds?: undefined; admin2Bounds?: undefined } }
// > {
// 	try {
// 		let apiResponse = await fetch(API_URLS.AWSEC2.PARCELIZED_GEOCLUSTERS);
// 		const apiData: IGeoclusterAPIResponse = await apiResponse.json();
// 		return {
// 			props: {
// 				cachedGeoclusters: apiData.data.collection_docs,
// 				admin1Bounds: null,
// 				admin2Bounds: null,
// 			},
// 		};
// 	} catch (err) {
// 		return {
// 			props: { cachedGeoclusters: null },
// 		};
// 	}
// }
