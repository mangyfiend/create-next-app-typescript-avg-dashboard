import IGeoclustersGeoJSON from "@interfaces/projects/avg-dashboard/GeoclustersGeoJSON";
import PROPERTY_SELECTORS from "./constants/geocluster-property-selectors";
import { capitalize, getProperCase } from "./helpers";

interface IClusterProperties {
	clusterId: string;
	clusterTitle: string;
	clusterFeatsNum: number;
	clusterLocation: string;
	featuresDescription: string;
}

// single source of truth for cluster properties
export default function getGeoclusterProperties(geocluster: IGeoclustersGeoJSON) {
	const CLUSTER_PROPS: IClusterProperties = {
    
		clusterId:
			geocluster[PROPERTY_SELECTORS.GEOCLUSTER_PROPERTIES[PROPERTY_SELECTORS.GEOCLUSTER_ID]],
		clusterTitle:
			geocluster[PROPERTY_SELECTORS.GEOCLUSTER_PROPERTIES[PROPERTY_SELECTORS.GEOCLUSTER_TITLE]],
		clusterFeatsNum: geocluster.features.length,
		clusterLocation:
			geocluster[
				PROPERTY_SELECTORS.GEOCLUSTER_PROPERTIES[PROPERTY_SELECTORS.GEOCLUSTER_LOCAITON]
			],
		featuresDescription: getProperCase(
			geocluster[
				PROPERTY_SELECTORS.GEOCLUSTER_PROPERTIES[
					PROPERTY_SELECTORS.GEOCLUSTER_FEATURES_DESCRIPTION
				]
			]),
	};
	return CLUSTER_PROPS;
}
