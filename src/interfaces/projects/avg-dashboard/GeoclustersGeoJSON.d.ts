import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON"

export default interface IGeoclustersGeoJSON extends IFeatureCollection {
	properties?: {
		agc_id?: string,
		// OS.GEOCLUSTER_TITLE?: string,
		agc_extended_name?: string,
		// OS.GEOCLUSTER_LOCAITON?: string;
		agc_location?: string;
	};
}