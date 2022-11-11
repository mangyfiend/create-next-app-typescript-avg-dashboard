import { SyntheticEvent, ChangeEvent } from "react";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IGeoclustersGeoJSON from "./GeoclustersGeoJSON";
import IGeoclusterFeatureGeoJSON from "./IGeoclusterFeatureGeoJSON";

// def. the context props
export default interface IDashboardContextProps {
	clustersAPIResponse?: Object;
	liveClustersArray?: IFeatureCollection[];
	liveDataTimestamp?: number;
	onDataRefreshButtonClick?: (argument: SyntheticEvent) => void;
	onRetreiveIntervalSelectChange?: (argument: ChangeEvent<HTMLSelectElement>) => void;
	dataLoadingChk?: boolean;
	fetchErrChk?: boolean;
	autoFetchInterval?: string | undefined;

	// SANDBOX
	clickedClusterData?: IGeoclustersGeoJSON | null;
	setClickedClusterData?: (arg: IGeoclustersGeoJSON) => void;
	clickedClusterFeatureData?: IGeoclusterFeatureGeoJSON | null;
	setClickedClusterFeatureData?: (arg: IGeoclusterFeatureGeoJSON) => void;

}
