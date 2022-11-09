import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { splitGeoJSONArray } from "@utils/helpers";
import React, { createContext, useState, useEffect } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import IGeoclustersGeoJSON from "@interfaces/projects/avg-dashboard/GeoclustersGeoJSON";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";

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

	const { liveClustersArray }: IDashboardContextProps = useDashboardContext();

	// USE LIVE DATA IF DATA FROM SERVER SIDE (...props) IS NOT AVAILABLE
	const CLUSTERS_ARRAY = serverSideClusters ? serverSideClusters : liveClustersArray;

	const [filterText, setFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState("0");
	const [workingClustersArray, setWorkingClustersArray] = useState([]);
	const [clusterPagesArray, setClusterPagesArray] = useState([]);

	// TODO > WIP > ADD MORE FILTERS
	const [clusterFilters, setClusterFilters] = useState<IGeoclusterFilters>({
		visitedInLastRange: 0,
		rangeTimeframeSelect: "hours",
		neverVisitedChk: false,
		clusterSizeCategory: 0,
	});
	// TODO > neverVisitedChk == true ? visitedInLastRange = 0 & disabled

	const handleClusterFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// AUTO-GENERATED TYPES >
		// const handleClusterFiltersChange = (e: {
		// 	target: { type: React.HTMLInputTypeAttribute; name: string; checked: Boolean; value: any };
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
	const filterClustersByTitle = (clustersArray: IGeoclustersGeoJSON[], titleString: string) => {
		let filteredArray = clustersArray.filter((record) => {
			const recordTitle = record.properties[OS.GEOCLUSTER_TITLE].toLowerCase();
			return recordTitle.indexOf(titleString.toLowerCase()) !== -1;
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
	// const onFilterTextChange = (evt: { target: { value: SetStateAction<string>; }; }) => {
	const onFilterTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFilterText(evt.target.value);
	};

	// select number of results per page
	// const onPageRowsSelectChange = (evt: { target: { value: SetStateAction<number>; }; }) => {
	const onPageRowsSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		setPageRowsLength(evt.target.value);
	};

	// filter the live data when text in the search input changes
	useEffect(() => {
		let filteredClustersArray = [];

		// TODO > COMPARE CACHED AND LIVE CLUSTERS ARRAY LENGTHS
		if (CLUSTERS_ARRAY && CLUSTERS_ARRAY.length > 0) {
			filteredClustersArray = filterClustersBySize(
				CLUSTERS_ARRAY,
				clusterFilters.clusterSizeCategory
			);

			//
			filteredClustersArray = filterClustersByTitle(filteredClustersArray, filterText);

			// if (filteredClustersArray.length > 0) {
			filteredClustersArray = filteredClustersArray.filter((record) => {
				const recordTitle = record.properties[OS.GEOCLUSTER_TITLE].toLowerCase();
				return recordTitle.indexOf(filterText.toLowerCase()) !== -1;
			});

			//
			setWorkingClustersArray(filteredClustersArray);

			//
			setClusterPagesArray(getClusterArrayPages(filteredClustersArray, +pageRowsLength));

			console.log({ filteredClustersArray });
		}
		return () => {};
	}, [CLUSTERS_ARRAY, filterText, pageRowsLength, clusterFilters]);

	return (
		<LeftSidebarContext.Provider
			value={{
				filterText,
				onFilterTextChange,
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
