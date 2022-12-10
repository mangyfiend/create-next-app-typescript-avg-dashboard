import { SyntheticEvent, ChangeEvent } from "react";
// import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IGeoclusterGeoJSON from "./IGeoclusterGeoJSON";
import IGeoclusterFeatureGeoJSON from "./IGeoclusterFeatureGeoJSON";
import IParcelizedFeatureGeoJSON from "./IParcelizedFeatureGeoJSON";

// def. the context props
export default interface IDashboardContextProps {
	clustersAPIResponse?: Object;
	liveClustersArray?: IGeoclusterGeoJSON[];
	liveDataTimestamp?: number;
	onDataRefreshButtonClick?: (argument: SyntheticEvent) => void;
	onRetreiveIntervalSelectChange?: (argument: ChangeEvent<HTMLSelectElement>) => void;
	dataLoadingChk?: boolean;
	fetchErrChk?: boolean;
	autoFetchInterval?: string | undefined;

	// SANDBOX
	clickedClusterGeoJSON?: IGeoclusterGeoJSON | null;
	setClickedClusterGeoJSON?: (arg: IGeoclusterGeoJSON) => void;
	clickedClusterFeatureData?: IParcelizedFeatureGeoJSON | IGeoclusterFeatureGeoJSON | null;
	setClickedClusterFeatureData?: (
		arg: IParcelizedFeatureGeoJSON | IGeoclusterFeatureGeoJSON
	) => void;
}
