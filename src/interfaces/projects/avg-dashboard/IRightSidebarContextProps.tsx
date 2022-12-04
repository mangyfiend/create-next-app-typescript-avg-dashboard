import { ChangeEvent, ChangeEventHandler } from "react";
import IParcelizedFeatureGeoJSON from "./IParcelizedFeatureGeoJSON";

export default interface IRightSidebarContextProps {
	clusterFeatsPages?: IParcelizedFeatureGeoJSON[][];
	featTitleFilterText?: string;
	onClusterFeatTitleSearch?: (argument: ChangeEvent<HTMLInputElement>) => void;
	pageListLength?: string;
	handleListLengthChange?: (argument: ChangeEventHandler<HTMLSelectElement>) => void;
}
