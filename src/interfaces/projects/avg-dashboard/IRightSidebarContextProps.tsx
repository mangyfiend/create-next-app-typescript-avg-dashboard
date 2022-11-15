import { ChangeEvent } from "react";
import IGeoclusterGeoJSON from "./GeoclusterGeoJSON";

// def. context props interface
export default interface IRightSidebarContextProps {
	clickedClusterData?: IGeoclusterGeoJSON | null;
	setClickedClusterData?: (arg: IGeoclusterGeoJSON) => void;
	featTitleFilterText?: string;
	onClusterFeatTitleSearch?: (argument: ChangeEvent<HTMLInputElement>) => void;
}
