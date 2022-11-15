import { IFeature } from "./GeoJSON";

export default interface IParcelizedFeatureGeoJSON extends IFeature {
	properties: {
		chunk_id: string,
		chunk_index: number,
		chunk_size: number,
		owner_id: string,
		owner_photo_url: string,
		owner_name: string,
		center_lat: number,
		center_lng: number,
	};
}
