import React from "react";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";

export default function ClusterRecordRow({ clusterData }: { clusterData: IGeoclusterGeoJSON }) {
	const { setClickedClusterData }: IDashboardContextProps | undefined= useDashboardContext();

	function clusterTitleClickHandler(evt: React.MouseEvent<HTMLAnchorElement>): void {
		setClickedClusterData(clusterData);
	}

	let rowMarkup: React.ReactNode;

	if (clusterData) {
		rowMarkup = (
			<div className="flex-col">
				<a href="#" onClick={clusterTitleClickHandler}>
					{getGeoclusterProperties(clusterData).clusterTitle}
				</a>
				{/* <Link href="#">
				</Link> */}
				<small>{getGeoclusterProperties(clusterData).clusterLocation}</small>
				<small>{getGeoclusterProperties(clusterData).clusterId}</small>
				<small>{clusterData.features.length} Farmers</small>
			</div>
		);
	} else {
		rowMarkup = <span>no data here yet</span>;
	}
	return rowMarkup;
}
