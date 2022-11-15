import { splitGeoJSONArray } from "@utils/helpers";
import React, { createContext, useState, useEffect } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/GeoclusterGeoJSON";
import IGeoclusterFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterFeatureGeoJSON";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";
// import getGeoclusterProperties from "@utils/getGeoclusterProperties";
import getParcelizedClusterFeatProps from "@utils/getParcelizedClusterFeatProps";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";

// def. the context provider props
interface IProviderProps {
	children?: React.ReactNode;
	// serverSideClusters: IFeatureCollection[];
}

// init. the context
const RightSidebarContext = createContext<IRightSidebarContextProps | {}>({});

// def. provider
export const RightSidebarStore = ({ children }: IProviderProps) => {
	console.log("%c[RIGHT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: orange");

	// the the data for the geocluster from the left sidebar that was clicked
	const { clickedClusterData }: IDashboardContextProps | undefined = useDashboardContext();

	const CLUSTER_FEATS_ARRAY: IParcelizedFeatureGeoJSON[] = clickedClusterData
		? clickedClusterData.features
		: [];

	// const [clusterNameFiltertext, setClusterNameFilterText] = useState("");
	const [featTitleFilterText, setFeatTitleFilterText] = useState("");
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
	const filterClusterFeatsBySize = (
		clusterFeats: IParcelizedFeatureGeoJSON[],
		// FIXME
		sizeCategory: number = -Infinity
	) => {
		return clusterFeats.filter(
			(geoclusterFeat) => getParcelizedClusterFeatProps(geoclusterFeat).clusterFeatSize >= sizeCategory
		);
	};

	// 2.
	const filterClusterFeatsByTitle = (
		clusterFeatsArray: IParcelizedFeatureGeoJSON[],
		filterString: string
	) => {
		let filteredFeatsArray = clusterFeatsArray.filter((geoclusterFeat) => {
			const clusterFeatTitle =
				getParcelizedClusterFeatProps(geoclusterFeat).clusterFeatTitle.toLowerCase();
			return clusterFeatTitle.indexOf(filterString.toLowerCase()) !== -1;
		});
		return filteredFeatsArray;
	};
	// REMOVE
	// const filterClustersByName = (clustersArray: IGeoclusterGeoJSON[], titleString: string) => {
	// 	let filteredArray = clustersArray.filter((geocluster) => {
	// 		const clusterTitle = getGeoclusterProperties(geocluster).clusterTitle.toLowerCase();
	// 		return clusterTitle.indexOf(titleString.toLowerCase()) !== -1;
	// 	});
	// 	return filteredArray;
	// };

	// 3.
	// REMOVE
	const getClusterArrayPages = (clustersArray: IGeoclusterGeoJSON[], numPages: number) => {
		// before user interaction,
		// the default value of the rows limit select elment is == 0
		return numPages === 0 ? [clustersArray] : splitGeoJSONArray(clustersArray, numPages);
	};

	// search filter text input change
	const onClusterFeatTitleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFeatTitleFilterText(evt.target.value);
	};

	// REMOVE
	// select number of results per page
	// const onPageRowsSelectChange = (evt: { target: { value: SetStateAction<number>; }; }) => {
	const onPageRowsSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		setPageRowsLength(evt.target.value);
	};

	// SANDBOX
	// filter the cluster features when the search input text changes
	useEffect(() => {
		
		let filteredFeatsArray = [];

		if (CLUSTER_FEATS_ARRAY && CLUSTER_FEATS_ARRAY.length > 0) {

				filteredFeatsArray = filterClusterFeatsBySize(
					CLUSTER_FEATS_ARRAY,
					clusterFilters.clusterSizeSelect
				);

			// filter clusters by geocluster name
			filteredFeatsArray = filterClusterFeatsByTitle(filteredFeatsArray, featTitleFilterText);

			//
			// setWorkingClustersArray(filteredClustersArray);

			// //
			// setClusterPagesArray(getClusterArrayPages(filteredClustersArray, +pageRowsLength));

			console.log({ filteredFeatsArray });
		}
	}, [CLUSTER_FEATS_ARRAY, featTitleFilterText]);

	// REMOVE
	// TODO > MOVE TO CUSTOM HOOK
	// filter the live data when text in the search input changes
	// useEffect(() => {
	// 	let filteredClustersArray = [];

	// 	// TODO > COMPARE CACHED AND LIVE CLUSTERS ARRAY LENGTHS
	// 	if (CLUSTER_FEATS_ARRAY && CLUSTER_FEATS_ARRAY.length > 0) {
	// 		filteredClustersArray = filterClusterFeatsBySize(
	// 			CLUSTER_FEATS_ARRAY,
	// 			clusterFilters.clusterSizeSelect
	// 		);

	// 		// filter clusters by geocluster name
	// 		filteredClustersArray = filterClustersByName(filteredClustersArray, clusterNameFiltertext);

	// 		//
	// 		setWorkingClustersArray(filteredClustersArray);

	// 		//
	// 		setClusterPagesArray(getClusterArrayPages(filteredClustersArray, +pageRowsLength));

	// 		console.log({ filteredClustersArray });
	// 	}
	// 	return () => {};
	// }, [CLUSTER_FEATS_ARRAY, clusterNameFiltertext, pageRowsLength, clusterFilters]);

	return (
		<RightSidebarContext.Provider
			value={{
				// clusterNameFiltertext,
				featTitleFilterText,
				onClusterFeatTitleSearch,
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
