import { splitGeoJSONArray } from "@utils/helpers-v2";
import React, { createContext, useState, useEffect } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";

// def. the context provider props
interface IProviderProps {
	children?: React.ReactNode;
	serverSideClusters: IFeatureCollection[];
}

// init. the context
const LeftSidebarContext = createContext<ILeftSidebarContextProps | {}>({});

// def. provider
export const LeftSidebarProvider = ({ serverSideClusters, children }: IProviderProps) => {
	// IMPORTANT > THIS BRINGS SERVER SIDE DATA INTO THE PROVIDER IMMEDIATELY VIA getServerSideProps in index.js
	// console.log({serverSideClusters});
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	const { liveClustersArray }: IDashboardContextProps | undefined = useDashboardContext();

	// USE LIVE DATA IF DATA FROM SERVER SIDE (...props) IS NOT AVAILABLE
	const CLUSTERS_ARRAY = serverSideClusters ? serverSideClusters : liveClustersArray;

	const [clusterNameFiltertext, setClusterNameFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState("0");
	const [workingClustersArray, setWorkingClustersArray] = useState([]);
	const [clusterPagesArray, setClusterPagesArray] = useState([]);
	// TODO > WIP > ADD MORE FILTERS
	const [clusterFilters, setClusterFilters] = useState<IGeoclusterFilters>({
		clusterSizeSelect: -Infinity,
		adminLevelSelect: 1,
		geoPolRegionSelect: "",
		proximityToMarketChk: false,
		proximityToWaterChk: false,
		proximityToRoadChk: false,
		proximityToFieldOfficeChk: false,
		visitedInLastRange: 0,
		rangeTimeframeSelect: "hours",
		neverVisitedChk: true,
	});
	// TODO > neverVisitedChk == true ? visitedInLastRange = 0 & disabled

	const handleClusterFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// AUTO-GENERATED TYPES >
		// const handleClusterFiltersChange = (e: {
		// 	target: { type: React.HTMLInputTypeAttribute; name: string; checked: boolean; value: any };
		// }) => {
		const type = e.target.type;
		const name = e.target.name;
		const value = type === "checkbox" ? e.target.checked : e.target.value;

		setClusterFilters((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	console.log({ clusterFilters });

	// CLUSTER FILTER FUNCTIONS

	// 1.
	const filterClustersBySize = (clustersArray: IFeatureCollection[], sizeCategory: number) => {
		return clustersArray.filter((geocluster) => geocluster.features.length >= sizeCategory);
	};

	// 2.
	const filterClustersByName = (clustersArray: IGeoclusterGeoJSON[], titleString: string) => {
		let filteredArray = clustersArray.filter((geocluster) => {
			const clusterTitle = getGeoclusterProperties(geocluster).clusterTitle.toLowerCase();
			return clusterTitle.indexOf(titleString.toLowerCase()) !== -1;
		});
		return filteredArray;
	};

	// 3.
	const getClusterArrayPages = (clustersArray: IFeatureCollection[], numPages: number) => {
		// before user interaction,
		// the default value of the rows limit select elment is == 0
		return numPages === 0 ? [clustersArray] : splitGeoJSONArray(clustersArray, numPages);
	};

	// search filter text input change
	// const onClusterNameFilterTextChange = (evt: { target: { value: SetStateAction<string>; }; }) => {
	const onClusterNameFilterTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setClusterNameFilterText(evt.target.value);
	};

	// select number of results per page
	// const onPageRowsSelectChange = (evt: { target: { value: SetStateAction<number>; }; }) => {
	const onPageRowsSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		setPageRowsLength(evt.target.value);
	};

	// TODO > MOVE TO CUSTOM HOOK
	// filter the live data when text in the search input changes
	useEffect(() => {
		
		let filteredClustersArray = [];

		// TODO > COMPARE CACHED AND LIVE CLUSTERS ARRAY LENGTHS
		if (CLUSTERS_ARRAY && CLUSTERS_ARRAY.length > 0) {
			filteredClustersArray = filterClustersBySize(
				CLUSTERS_ARRAY,
				clusterFilters.clusterSizeSelect
			);

			// filter clusters by geocluster name
			filteredClustersArray = filterClustersByName(filteredClustersArray, clusterNameFiltertext);

			//
			setWorkingClustersArray(filteredClustersArray);
			// console.log({workingClustersArray})
			// console.log({ filteredClustersArray });

			//
			setClusterPagesArray(getClusterArrayPages(filteredClustersArray, +pageRowsLength));

		}
		return () => {};
	}, [CLUSTERS_ARRAY, clusterNameFiltertext, pageRowsLength, clusterFilters]);
	// },[])

	return (
		<LeftSidebarContext.Provider
			value={{
				clusterNameFiltertext,
				onClusterNameFilterTextChange,
				handleClusterFiltersChange,
				setClusterFilters,
				clusterFilters,
				onPageRowsSelectChange,
				pageRowsLength,
				workingClustersArray,
				clusterPagesArray,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;