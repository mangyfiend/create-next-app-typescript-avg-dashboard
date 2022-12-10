import { ChangeEvent, ReactNode } from "react";
import IGeoclusterGeoJSON from "./IGeoclusterGeoJSON";
import IGeoclusterFilters from "./GeoclusterFilters";

// def. the context props
export default interface ILeftSidebarContextProps {
	clusterNameFilterText?: string;
	checkedGeoclusterIds?: string[];
	setCheckedGeoclusterIds?: (argument) => [] | string[];
	onClusterNameFilterTextChange?: (argument: ChangeEvent<HTMLInputElement>) => void;
	handleClusterFiltersChange?: () => void;
	handleListLengthChange?: () => void;
	setClusterFilters?: () => void;
	clusterFilters?: IGeoclusterFilters;
	onPageRowsSelectChange?: (argument: ChangeEvent<HTMLSelectElement>) => void;
	pageRowsLength?: string;
	workingClustersArray?: IGeoclusterGeoJSON[];
	currentGeoclusters?: IGeoclusterGeoJSON[];
	// FIXME > WHICH IS THE CORRECT WAY TO REPRESENT ARRAY OF ARRAY
	clusterPagesArray?: IGeoclusterGeoJSON[][];
	// clusterPagesArray?: [IGeoclusterGeoJSON][];
	pagenatedGeoclusters?: IGeoclusterGeoJSON[][];
	geoclustersToMap?: IGeoclusterGeoJSON[];
}
