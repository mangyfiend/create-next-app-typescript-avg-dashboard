import { ChangeEvent } from "react";
import IGeoclustersGeoJSON from "./GeoclustersGeoJSON";

// def. the context props
export default interface ILeftSidebarContextProps {
	filterText?: string;
	onFilterTextChange?: (argument: ChangeEvent<HTMLInputElement>) => void;
	handleClusterFiltersChange?: () => void;
	setClusterFilters?: () => void;
	clusterFilters?: {}
	onPageRowsSelectChange?: (argument: ChangeEvent<HTMLSelectElement>) => void;
	pageRowsLength?: string;
	workingClustersArray?: IGeoclustersGeoJSON[];
	// FIXME > WHICH IS THE CORRECT WAY TO REPRESENT ARRAY OF ARRAY
	clusterPagesArray?: IGeoclustersGeoJSON[][];
	// clusterPagesArray?: [IGeoclustersGeoJSON][]; 
}
