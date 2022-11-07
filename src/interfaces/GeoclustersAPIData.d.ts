import IFeatureCollection from "./GeoJSON";

export default interface IGeoclustersAPIData {
	collection_docs: IFeatureCollection[];
	collection_docs_num: number;
}
