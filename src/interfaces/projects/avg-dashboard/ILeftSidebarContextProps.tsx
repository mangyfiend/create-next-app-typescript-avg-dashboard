import { ChangeEvent } from "react";
import IGeoclustersGeoJSON from "./GeoclustersGeoJSON";
import IGeoclusterFilters from "./GeoclusterFilters";

// def. the context props
export default interface ILeftSidebarContextProps {
	filterText?: string;
	onFilterTextChange?: (argument: ChangeEvent<HTMLInputElement>) => void;
	handleClusterFiltersChange?: () => void;
	setClusterFilters?: () => void;
	clusterFilters?: IGeoclusterFilters;
	onPageRowsSelectChange?: (argument: ChangeEvent<HTMLSelectElement>) => void;
	pageRowsLength?: string;
	workingClustersArray?: IGeoclustersGeoJSON[];
	// FIXME > WHICH IS THE CORRECT WAY TO REPRESENT ARRAY OF ARRAY
	clusterPagesArray?: IGeoclustersGeoJSON[][];
	// clusterPagesArray?: [IGeoclustersGeoJSON][];
}
