import IGeoclusterFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterFeatureGeoJSON";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";
import { PROPERTY_SELECTORS as _ } from "./constants/geocluster-property-selectors";
import { getProperCase } from "./helpers";

interface IClusterFeatProperties {
	clusterFeatId: string;
	clusterFeatTitle: string;
	clusterFeatIndex: number;
	clusterFeatSize: number;
	clusterFeatCenterLat: number;
	clusterFeatCenterLng: number;
	clusterFeatOwnerId: string;
	clusterFeatPhoto: string;
}

// single source of truth for cluster properties
export default function getParcelizedClusterFeatProps(
	// TODO > PICK ONE
	geoclusterFeat: IParcelizedFeatureGeoJSON
) {
	typeof geoclusterFeat;
	const CLUSTER_FEAT_PROPS: IClusterFeatProperties = {
		clusterFeatId: geoclusterFeat.properties.chunk_id,
		clusterFeatTitle: geoclusterFeat.properties.owner_name,
		clusterFeatIndex: geoclusterFeat.properties.chunk_index,
		clusterFeatSize: geoclusterFeat.properties.chunk_size,
		clusterFeatOwnerId: geoclusterFeat.properties.owner_id,
		clusterFeatPhoto: geoclusterFeat.properties.owner_photo_url,
		clusterFeatCenterLat: geoclusterFeat.properties.center_lat,
		clusterFeatCenterLng: geoclusterFeat.properties.center_lng,
	};
	return CLUSTER_FEAT_PROPS;
}
