import { ChangeEvent } from "react";
import IGeoclusterGeoJSON from "./GeoclusterGeoJSON";
import IParcelizedFeatureGeoJSON from "./IParcelizedFeatureGeoJSON";

// def. context props interface
export default interface IRightSidebarContextProps {
	clusterFeatsPages?: IParcelizedFeatureGeoJSON[][],
	featTitleFilterText?: string;
	onClusterFeatTitleSearch?: (argument: ChangeEvent<HTMLInputElement>) => void;
	pageRowsLength?: string;
	pageListLength?: string;
	onListLengthChange?: (argument: ChangeEvent<HTMLSelectElement>) => void;
}
