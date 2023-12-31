import React, { createContext, useState, useEffect } from "react";
import { ChangeEvent, ChangeEventHandler } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
// import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";
import getParcelizedClusterFeatProps from "@utils/getParcelizedClusterFeatProps";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";
import { splitGeoJSONArray } from "@utils/helpers-v2";

// def. the context props

export interface IRightSidebarContextProps {
	clusterFeatsPages?: IParcelizedFeatureGeoJSON[][];
	featTitleFilterText?: string;
	onClusterFeatTitleSearch?: (argument: ChangeEvent<HTMLInputElement>) => void;
	pageListLength?: string;
	handleListLengthChange?: (argument: ChangeEventHandler<HTMLSelectElement>) => void;
}

// def. the context provider props
interface IProviderProps {
	children?: React.ReactNode;
}

// init. the context
const RightSidebarContext = createContext<IRightSidebarContextProps | {}>({});

// def. provider
export const RightSidebarStore = ({ children }: IProviderProps) => {
	console.log("%c[RIGHT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: orange");

	// the the data for the geocluster from the left sidebar that was clicked
	const { clickedClusterGeoJSON }: IDashboardContextProps | undefined = useDashboardContext();

	// const CLUSTER_FEATS_ARRAY: IParcelizedFeatureGeoJSON[] = clickedClusterGeoJSON
	// 	? clickedClusterGeoJSON.features
	// 	: [];

	// const [clusterNameFilterText, setClusterNameFilterText] = useState("");
	const [featTitleFilterText, setFeatTitleFilterText] = useState("");
	const [pageListLength, setPageListLength] = useState("0");
	const [clusterFeatsPages, setClusterFeatsPages] = useState([]);

	// FIXME > CHANGE TO CLUSTER FEATS. FILTERS
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
			(geoclusterFeat) =>
				getParcelizedClusterFeatProps(geoclusterFeat).clusterFeatSize >= sizeCategory
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

	// 3.
	const getClusterFeatsPages = (
		clusterFeatures: IParcelizedFeatureGeoJSON[],
		numPages: number
	) => {
		// before user interaction,
		// the default value of the rows limit select elment is == 0
		return numPages === 0 ? [clusterFeatures] : splitGeoJSONArray(clusterFeatures, numPages);
	};

	// search filter text input change
	const onClusterFeatTitleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFeatTitleFilterText(evt.target.value);
	};

	// Select num. cluster feats. per per page
	const handleListLengthChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		setPageListLength(evt.target.value);
	};

	// SANDBOX
	// filter the cluster features when the search input text changes
	useEffect(() => {
		const CLUSTER_FEATS_ARRAY: IParcelizedFeatureGeoJSON[] = clickedClusterGeoJSON
			? clickedClusterGeoJSON.features
			: [];

		let filteredFeatsArray = [];

		if (CLUSTER_FEATS_ARRAY && CLUSTER_FEATS_ARRAY.length > 0) {
			// filter by size of feat.
			filteredFeatsArray = filterClusterFeatsBySize(
				CLUSTER_FEATS_ARRAY,
				clusterFilters.clusterSizeSelect
			);

			// filter clusters by geocluster name
			filteredFeatsArray = filterClusterFeatsByTitle(filteredFeatsArray, featTitleFilterText);

			// get pagenated cluster feats.
			setClusterFeatsPages(getClusterFeatsPages(filteredFeatsArray, +pageListLength));

			console.log({ filteredFeatsArray });
		}
	}, [clickedClusterGeoJSON, clusterFilters.clusterSizeSelect, featTitleFilterText, pageListLength]);

	return (
		<RightSidebarContext.Provider
			value={{
				// clusterNameFilterText,
				featTitleFilterText,
				onClusterFeatTitleSearch,
				handleClusterFiltersChange,
				setClusterFilters,
				clusterFilters,
				handleListLengthChange,
				pageListLength,
				clusterFeatsPages,
			}}>
			{children}
		</RightSidebarContext.Provider>
	);
};

export default RightSidebarContext;
