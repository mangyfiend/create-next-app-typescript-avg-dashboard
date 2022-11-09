import { SyntheticEvent, ChangeEvent } from "react";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";

// def. the context props
export default interface IDashboardContextProps {
	clustersAPIResponse?: Object;
	liveClustersArray?: IFeatureCollection[];
	liveDataTimestamp?: number;
	onDataRefreshButtonClick?: (argument: SyntheticEvent) => void;
	onRetreiveIntervalSelectChange?: (argument: ChangeEvent<HTMLInputElement>) => void;
	dataLoadingChk?: boolean;
	fetchErrChk?: boolean;
	autoFetchInterval?: string | undefined;
}
