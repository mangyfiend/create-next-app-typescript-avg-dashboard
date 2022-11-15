
// FIXME > CHANGE TO NORMALIZED/FLATTENED PROP. NAMES
export default interface IGeoclusterFeatureGeoJSON extends Ifeature {
	properties: {
		chunk_id: string,
		owner_id: string,
		owner_photo_url: string,
		owner_name: string,
		chunk_index: string,
		center_lat: number,
		center_lng: number,
	};
}
