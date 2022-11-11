import IGeoclustersGeoJSON from "./GeoclustersGeoJSON";

// def. context props interface
export default interface IRightSidebarContextProps {
	clickedClusterData?: IGeoclustersGeoJSON | null;
	setClickedClusterData?: (arg: IGeoclustersGeoJSON) => void;
}
