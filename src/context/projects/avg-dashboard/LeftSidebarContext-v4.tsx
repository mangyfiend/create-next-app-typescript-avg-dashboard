import React, { createContext, useState, useRef } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";
import useGeoclusterPropFilters from "@hooks/projects/avg-dashboard/useGeoclusterPropFilters";
import usePagenateGeoclusters from "@hooks/projects/avg-dashboard/usePagenateGeoclusters";
import useCheckedGeoclusters from "@hooks/projects/avg-dashboard/useCheckedGeoclusters";

// def. the context provider props
interface IProviderProps {
	children?: React.ReactNode;
	serverSideClusters: IGeoclusterGeoJSON[];
}

// init. the context
const LeftSidebarContext = createContext<ILeftSidebarContextProps | {}>({});

// define the provider
export const LeftSidebarProvider = ({ serverSideClusters, children }: IProviderProps) => {
	// IMPORTANT > THIS BRINGS SERVER SIDE DATA INTO THE PROVIDER IMMEDIATELY VIA getServerSideProps in index.js
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	const { liveClustersArray }: IDashboardContextProps | undefined = useDashboardContext();

	// USE LIVE DATA IF DATA FROM NEXTJS SERVER SIDE (...props) IS NOT AVAILABLE
	const GEOCLUSTERS_ARRAY = serverSideClusters ? serverSideClusters : liveClustersArray;

	const [clusterNameFilterText, setClusterNameFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState("0");
	const listCheckboxesRefs = useRef();
	const [checkedGeoclusterIds, setCheckedGeoclusterIds] = useState<string[] | []>([]);
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

	// SANDBOX > CUSTOM HOOKS FOR
	const currentGeoclusters: IGeoclusterGeoJSON[] | [] = useGeoclusterPropFilters(
		GEOCLUSTERS_ARRAY,
		clusterFilters,
		clusterNameFilterText
	);

	const selectedGeoclusters: IGeoclusterGeoJSON[] | [] = useCheckedGeoclusters(
		currentGeoclusters,
		checkedGeoclusterIds
	);

	const pagenatedGeoclusters: IGeoclusterGeoJSON[][] = usePagenateGeoclusters(
		currentGeoclusters,
		+pageRowsLength
	);

	const geoclustersToMap =
		selectedGeoclusters.length > 0 ? selectedGeoclusters : currentGeoclusters;

	// console.log({ currentGeoclusters });
	// console.log({ selectedGeoclusters });
	// console.log({ geoclustersToMap });
	// console.log({ pagenatedGeoclusters });

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

	// Select num. cluster feats. per per page
	const handleListLengthChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		setPageRowsLength(evt.target.value);
	};

	return (
		<LeftSidebarContext.Provider
			value={{
				clusterNameFilterText,
				checkedGeoclusterIds,
				setCheckedGeoclusterIds,
				onClusterNameFilterTextChange,
				handleListLengthChange,
				handleClusterFiltersChange,
				setClusterFilters,
				clusterFilters,
				onPageRowsSelectChange,
				pageRowsLength,
				currentGeoclusters,
				pagenatedGeoclusters,
				geoclustersToMap,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;
