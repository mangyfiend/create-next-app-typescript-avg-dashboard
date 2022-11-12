import React from "react";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import IGeoclustersGeoJSON from "@interfaces/projects/avg-dashboard/GeoclustersGeoJSON";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";

export default function ClusterRecordRow({ clusterData }: { clusterData: IGeoclustersGeoJSON }) {
	const { setClickedClusterData }: IDashboardContextProps | undefined= useDashboardContext();

	function clusterTitleClickHandler(evt: React.MouseEvent<HTMLAnchorElement>): void {
		setClickedClusterData(clusterData);
	}

	let rowMarkup: React.ReactNode;

	if (clusterData) {
		rowMarkup = (
			<div className="flex-col">
				<a href="#" onClick={clusterTitleClickHandler}>
					{clusterData.properties[OS.GEOCLUSTER_TITLE]}
				</a>
				{/* <Link href="#">
				</Link> */}
				<small>{clusterData.properties[OS.GEOCLUSTER_LOCAITON]}</small>
				<small>{clusterData.properties[OS.GEOCLUSTER_ID]}</small>
				<small>{clusterData.features.length} Farmers</small>
			</div>
		);
	} else {
		rowMarkup = <span>no data here yet</span>;
	}
	return rowMarkup;
}
