import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { splitGeoJSONArray } from "@utils/helpers";
import React, { createContext, useState, useEffect } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import IGeoclustersGeoJSON from "@interfaces/projects/avg-dashboard/GeoclustersGeoJSON";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";

// def. the context provider props
interface IProviderProps {
	children?: React.ReactNode;
	// serverSideClusters: IFeatureCollection[];
}

// init. the context
const RightSidebarContext = createContext<IRightSidebarContextProps | {}>({});

// def. provider
export const RightSidebarStore = ({ children }: IProviderProps) => {
	// IMPORTANT > THIS BRINGS SERVER SIDE DATA INTO THE PROVIDER IMMEDIATELY VIA getServerSideProps in index.js
	console.log("%c[RIGHT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: purple");

	// the the data for the cluster from the left sidebar that was clicked
	const { clickedClusterData }: IDashboardContextProps | undefined = useDashboardContext();

	const CLUSTER_FEATS_ARRAY = clickedClusterData.features;

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
		return clustersArray.filter((cluster) => cluster.features.length >= sizeCategory);
	};

	// 2.
	const filterClustersByName = (clustersArray: IGeoclustersGeoJSON[], titleString: string) => {
		let filteredArray = clustersArray.filter((cluster) => {
			const clusterTitle = cluster.properties[OS.GEOCLUSTER_TITLE].toLowerCase();
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
		if (CLUSTER_FEATS_ARRAY && CLUSTER_FEATS_ARRAY.length > 0) {
			filteredClustersArray = filterClustersBySize(
				CLUSTER_FEATS_ARRAY,
				clusterFilters.clusterSizeSelect
			);

			// filter clusters by cluster name
			filteredClustersArray = filterClustersByName(filteredClustersArray, clusterNameFiltertext);

			//
			setWorkingClustersArray(filteredClustersArray);

			//
			setClusterPagesArray(getClusterArrayPages(filteredClustersArray, +pageRowsLength));

			console.log({ filteredClustersArray });
		}
		return () => {};
	}, [CLUSTER_FEATS_ARRAY, clusterNameFiltertext, pageRowsLength, clusterFilters]);

	return (
		<RightSidebarContext.Provider
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
		</RightSidebarContext.Provider>
	);
};

export default RightSidebarContext;
