import { SyntheticEvent, ChangeEvent } from "react";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IGeoclusterGeoJSON from "./GeoclusterGeoJSON";
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
	clickedClusterData?: IGeoclusterGeoJSON | null;
	setClickedClusterData?: (arg: IGeoclusterGeoJSON) => void;
	clickedClusterFeatureData?: IGeoclusterFeatureGeoJSON | null;
	setClickedClusterFeatureData?: (arg: IGeoclusterFeatureGeoJSON) => void;

}
