import React, { createContext, useState, useEffect } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";
import { splitGeoJSONArray } from "@utils/helpers-v2";
import useGeoclusterPropFilters from "@hooks/projects/avg-dashboard/useGeoclusterPropFilters";
import usePagenateGeoclusters from "@hooks/projects/avg-dashboard/usePagenateGeoclusters";

// def. the context provider props
interface IProviderProps {
	children?: React.ReactNode;
	serverSideClusters: IGeoclusterGeoJSON[];
}

// init. the context
const LeftSidebarContext = createContext<ILeftSidebarContextProps | {}>({});

// CLUSTER FILTER FUNCTIONS

// 1.
const filterClustersBySize = (clustersArray: IGeoclusterGeoJSON[], sizeCategory: number) => {
	return clustersArray.filter((geocluster) => geocluster.features.length >= sizeCategory);
};

// 2a.
const filterClustersByName = (clustersArray: IGeoclusterGeoJSON[], titleString: string) => {
	let filteredArray = clustersArray.filter((geocluster) => {
		const clusterTitle = getGeoclusterProperties(geocluster).clusterTitle.toLowerCase();
		return clusterTitle.indexOf(titleString.toLowerCase()) !== -1;
	});
	return filteredArray;
};

// 2b.
const filterClustersById = (clustersArray: IGeoclusterGeoJSON[], clusterId: string) => {
	let filteredArray = clustersArray.filter((geocluster) => {
		return getGeoclusterProperties(geocluster).clusterId.indexOf(clusterId) !== -1;
	});
	return filteredArray;
};

// 3.
const getClusterArrayPages = (clustersArray: IGeoclusterGeoJSON[], numPages: number) => {
	// before user interaction,
	// the default value of the rows limit select elment is == 0
	return numPages === 0 ? [clustersArray] : splitGeoJSONArray(clustersArray, numPages);
};

// define the provider
export const LeftSidebarProvider = ({ serverSideClusters, children }: IProviderProps) => {
	// IMPORTANT > THIS BRINGS SERVER SIDE DATA INTO THE PROVIDER IMMEDIATELY VIA getServerSideProps in index.js
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	const { liveClustersArray }: IDashboardContextProps | undefined = useDashboardContext();

	// USE LIVE DATA IF DATA FROM SERVER SIDE (...props) IS NOT AVAILABLE
	const CLUSTERS_ARRAY = serverSideClusters ? serverSideClusters : liveClustersArray;

	const [clusterNameFilterText, setClusterNameFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState("0");
	// REMOVE
	const [workingClustersArray, setWorkingClustersArray] = useState([]);
	// SANDBOX
	const [checkedClusterIds, setCheckedClusterIds] = useState<string[] | []>([]);
	console.log({ checkedClusterIds });
	// REMOVE
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

	// console.log({ clusterFilters });

	// SANDBOX > CUSTOM HOOKS FOR
	const currentGeoclusters: IGeoclusterGeoJSON[] | [] = ([] = useGeoclusterPropFilters(
		CLUSTERS_ARRAY,
		clusterFilters,
		clusterNameFilterText
	));

	// TODO
	function useCheckedGeoclusters() {
		// if (checkedClusterIds)
		// 	filteredClustersArray = checkedClusterIds.map((clusterId: string) =>
		// 		filterClustersById(CLUSTERS_ARRAY, clusterId)
		// 	);
	}
	const mappedGeoclusters: IGeoclusterGeoJSON[] | [] = useCheckedGeoclusters();

	const pagenatedGeoclusters: IGeoclusterGeoJSON[][] = usePagenateGeoclusters(
		currentGeoclusters,
		+pageRowsLength
	);

	console.log({ currentGeoclusters });
	console.log({ pagenatedGeoclusters });

	// TODO > MOVE TO CUSTOM HOOK
	useEffect(() => {
		let filteredClustersArray = [];

		// TODO > COMPARE CACHED AND LIVE CLUSTERS ARRAY LENGTHS
		if (CLUSTERS_ARRAY && CLUSTERS_ARRAY.length > 0) {
			// //
			// if (checkedClusterIds)
			// 	filteredClustersArray = checkedClusterIds.map((clusterId: string) =>
			// 		filterClustersById(CLUSTERS_ARRAY, clusterId)
			// 	);

			//
			filteredClustersArray = filterClustersBySize(
				CLUSTERS_ARRAY,
				clusterFilters.clusterSizeSelect
			);

			// filter clusters by geocluster name
			filteredClustersArray = filterClustersByName(filteredClustersArray, clusterNameFilterText);

			//
			setWorkingClustersArray(filteredClustersArray);
			// console.log({workingClustersArray})

			//
			setClusterPagesArray(getClusterArrayPages(filteredClustersArray, +pageRowsLength));
		}
		return () => {};
	}, [CLUSTERS_ARRAY, clusterNameFilterText, pageRowsLength, clusterFilters, checkedClusterIds]);

	// DEF. CHANGE HANDLER FUNCTIONS

	// 1.
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

	// 2.
	// search filter text input change
	// const onClusterNameFilterTextChange = (evt: { target: { value: SetStateAction<string>; }; }) => {
	const onClusterNameFilterTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setClusterNameFilterText(evt.target.value);
	};

	// 3.
	// select number of results per page
	// const onPageRowsSelectChange = (evt: { target: { value: SetStateAction<number>; }; }) => {
	const onPageRowsSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		setPageRowsLength(evt.target.value);
	};

	return (
		<LeftSidebarContext.Provider
			value={{
				clusterNameFilterText,
				setCheckedClusterIds,
				onClusterNameFilterTextChange,
				handleClusterFiltersChange,
				setClusterFilters,
				clusterFilters,
				onPageRowsSelectChange,
				pageRowsLength,
				workingClustersArray,
				currentGeoclusters,
				clusterPagesArray,
				pagenatedGeoclusters,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;
