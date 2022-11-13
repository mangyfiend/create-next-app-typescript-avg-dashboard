import IGeoclusterGeoJSON from "./GeoclusterGeoJSON";

// def. context props interface
export default interface IRightSidebarContextProps {
	clickedClusterData?: IGeoclusterGeoJSON | null;
	setClickedClusterData?: (arg: IGeoclusterGeoJSON) => void;
}
