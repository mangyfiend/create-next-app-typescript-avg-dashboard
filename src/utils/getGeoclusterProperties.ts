import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/GeoclusterGeoJSON";
import { PROPERTY_SELECTORS as _ } from "./constants/geocluster-property-selectors";
import { getProperCase } from "./helpers";

interface IClusterProperties {
	clusterId: string;
	clusterTitle: string;
	clusterFeatsNum: number;
	clusterLocation: string;
	featuresDescription: string;
}

// single source of truth for cluster properties
export default function getGeoclusterProperties(geocluster: IGeoclusterGeoJSON) {
	const CLUSTER_PROPS: IClusterProperties = {
		clusterId: geocluster[_.GEOCLUSTER_PROPERTIES][_.GEOCLUSTER_ID],
		clusterTitle: geocluster[_.GEOCLUSTER_PROPERTIES][_.GEOCLUSTER_TITLE],
		clusterFeatsNum: geocluster.features.length,
		clusterLocation: geocluster[_.GEOCLUSTER_PROPERTIES][_.GEOCLUSTER_LOCAITON],
		featuresDescription: getProperCase(
			geocluster[_.GEOCLUSTER_PROPERTIES][_.GEOCLUSTER_FEATURES_DESCRIPTION]
		),
	};
	return CLUSTER_PROPS;
}
