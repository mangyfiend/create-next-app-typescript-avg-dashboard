import React from "react";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";
import ListItemCheckbox from "../ListItemCheckbox";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function ClusterRecordRow({
	clusterGeoJSON,
}: {
	clusterGeoJSON: IGeoclusterGeoJSON;
}) {
	const { setClickedClusterGeoJSON }: IDashboardContextProps =
		useDashboardContext();

	// state setter to track all the clicked checkboxes
	const { checkedGeoclusterIds, setCheckedGeoclusterIds, listCheckboxesRefs }: ILeftSidebarContextProps =
		useLeftSidebarContext();

	function clusterTitleClickHandler(evt: React.MouseEvent<HTMLAnchorElement>): void {
		setClickedClusterGeoJSON(clusterGeoJSON);
	}

	let rowMarkup: React.ReactNode;

	if (clusterGeoJSON) {
		rowMarkup = (
			<div className="flex-row">
				<div className="flex-col">
					<a href="#" onClick={clusterTitleClickHandler}>
						{getGeoclusterProperties(clusterGeoJSON).clusterTitle}
					</a>
					{/* <Link href="#">
				</Link> */}
					<small>{getGeoclusterProperties(clusterGeoJSON).clusterLocation}</small>
					<small>{getGeoclusterProperties(clusterGeoJSON).clusterId}</small>
					<small>{clusterGeoJSON.features.length} Farmers</small>
				</div>
				<ListItemCheckbox
					checkboxLabel=""
					listItemId={getGeoclusterProperties(clusterGeoJSON).clusterId}
					listCheckboxesRefs={listCheckboxesRefs}
					checkedIdsStateSetter={setCheckedGeoclusterIds}
					prevCheckedIds={checkedGeoclusterIds}></ListItemCheckbox>
			</div>
		);
	} else {
		rowMarkup = <span>no data here yet</span>;
	}
	return rowMarkup;
}
