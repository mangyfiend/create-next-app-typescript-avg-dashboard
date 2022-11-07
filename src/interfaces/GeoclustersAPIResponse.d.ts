import IGeoclustersAPIData from "./GeoclustersAPIData";
export default interface IGeoclusterAPIResponse {
	date_requested: Date;
	data: IGeoclustersAPIData;
}
