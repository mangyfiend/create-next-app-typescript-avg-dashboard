import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import IGeoclustersGeoJSON from "@interfaces/projects/avg-dashboard/GeoclustersGeoJSON";

export default function GeoclusterRecord({ dataRecord }: { dataRecord: IGeoclustersGeoJSON }) {
	let rowMarkup: React.ReactNode;
	if (dataRecord) {
		rowMarkup = (
			<div className="flex-col">
				<a href="#">{dataRecord.properties[OS.GEOCLUSTER_TITLE]}</a>
				<small>{dataRecord.properties[OS.GEOCLUSTER_LOCAITON]}</small>
				<small>{dataRecord.properties[OS.GEOCLUSTER_ID]}</small>
				{/* <small>{dataRecord.features.length} Farmers</small> */}
			</div>
		);
	} else {
		rowMarkup = <span>something went wrong</span>;
	}
	return rowMarkup;
}
