import React from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import DataSelectActions from "@components/projects/avg-dashboard/DataSelectActions.jsx";
import LeftSidebar from "@components/projects/avg-dashboard/LeftSidebar-v2";
import styles from "@styles/projects/avg-dashboard/Dashboard.module.css";

import { LeftSidebarProvider } from "@context/projects/avg-dashboard/LeftSidebarContext-v2";

export default function Dashboard({ cachedGeoclusters }) {
	const { liveClustersData, dataLoadingChk, fetchErrChk } =
		useDashboardContext();
	return (
		<div className={styles["dashboard-container"]}>
			<div>AVG Dashboard</div>
			<DataSelectActions></DataSelectActions>
			<div className={styles["left-sidebar-container"]}>
				<LeftSidebarProvider>
					<LeftSidebar cachedGeoclusters={cachedGeoclusters}></LeftSidebar>
				</LeftSidebarProvider>
			</div>
		</div>
	);
}
