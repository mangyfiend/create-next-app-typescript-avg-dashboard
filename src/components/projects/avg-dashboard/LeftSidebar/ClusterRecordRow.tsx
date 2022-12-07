import React from "react";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";
import ListItemCheckbox from "../ListItemCheckbox";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function ClusterRecordRow({ clusterData }: { clusterData: IGeoclusterGeoJSON }) {

	const { setClickedClusterData }: IDashboardContextProps = useDashboardContext();

   // state setter to track all the clicked checkboxes
	const { checkedClusterIds, setCheckedClusterIds }: ILeftSidebarContextProps = useLeftSidebarContext();

	function clusterTitleClickHandler(evt: React.MouseEvent<HTMLAnchorElement>): void {
		setClickedClusterData(clusterData);
	}

	let rowMarkup: React.ReactNode;

	if (clusterData) {
		rowMarkup = (
			<div className="flex-row">
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
				<ListItemCheckbox
					checkboxLabel=""
					listItemId={getGeoclusterProperties(clusterData).clusterId}
               checkedIdsStateSetter={setCheckedClusterIds}
               prevCheckedIds={checkedClusterIds}
               ></ListItemCheckbox>
			</div>
		);
	} else {
		rowMarkup = <span>no data here yet</span>;
	}
	return rowMarkup;
}
