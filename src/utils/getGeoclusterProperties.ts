import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/GeoclusterGeoJSON";
import { Point } from "@interfaces/projects/avg-dashboard/GeoJSON";
import { PROPERTY_SELECTORS as PROPS } from "./constants/geocluster-property-selectors";
import { getProperCase } from "./helpers-v2";

interface IClusterProperties {
	clusterId: string;
	clusterTitle: string;
	clusterFeatsNum: number;
	clusterLocation: string;
	featuresDescription: string;
	clusterCrops: string[];
	clusterArea: number;
	clusterUsedArea: number;
	clusterUnusedArea: number;
	clusterCenterFeat: Point;
}

// single source of truth for cluster properties
export default function getGeoclusterProperties(geocluster: IGeoclusterGeoJSON) {
	console.log({ geocluster });
	const CLUSTER_PROPS: IClusterProperties = {
		clusterId: geocluster[PROPS.GEOCLUSTER_PROPERTIES][PROPS.GEOCLUSTER_ID],
		clusterTitle: geocluster[PROPS.GEOCLUSTER_PROPERTIES][PROPS.GEOCLUSTER_TITLE],
		clusterFeatsNum: geocluster.features.length,
		clusterLocation: geocluster[PROPS.GEOCLUSTER_PROPERTIES][PROPS.GEOCLUSTER_LOCAITON],
		featuresDescription: getProperCase(
			geocluster[PROPS.GEOCLUSTER_PROPERTIES][PROPS.GEOCLUSTER_FEATURES_DESCRIPTION]
		),
	};
	return CLUSTER_PROPS;
}
