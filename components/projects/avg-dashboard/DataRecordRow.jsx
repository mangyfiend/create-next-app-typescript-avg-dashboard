import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";

export default function DataRecordRow({ dataRecord }) {
	let rowMarkup;
	if (dataRecord) {
		rowMarkup = (
			<div className="flex-col">
				<a href="#">{dataRecord.properties[OS.CLUSTER_TITLE]}</a>
				<small>{dataRecord.properties[OS.CLUSTER_LOCATION]}</small>
				<small>{dataRecord.properties[OS.CLUSTER_ID]}</small>
			</div>
		);
	} else {
		rowMarkup = <span>something went wrong</span>;
	}
	return rowMarkup;
}
