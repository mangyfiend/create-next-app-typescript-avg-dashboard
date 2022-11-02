import { useEffect } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import DataSelectActions from "@components/projects/avg-dashboard/DataSelectActions.jsx";
import LeftSidebar from "@components/projects/avg-dashboard/LeftSidebar-v3";
import styles from "@styles/projects/avg-dashboard/Dashboard.module.css";

import { LeftSidebarProvider } from "@context/projects/avg-dashboard/LeftSidebarContext-v3";

export default function Dashboard({ cachedClustersAPIResponse, cachedClustersArray }) {
	const { clustersAPIResponse, setCachedClustersArray } = useDashboardContext();

	// TODO > COMPARE LIVE AND CACHED GEO CLUSTERS AND PASS MOST RECENT TO LIST
	console.log({ cachedClustersAPIResponse });
	console.log({ clustersAPIResponse });
	const getMostRecentData = (apiResponse1, apiResponse2) => {
		if (!apiResponse1) return apiResponse2;
		if (!apiResponse2) return apiResponse1;
		if (!apiResponse1 && !apiResponse2) return null;
		const timestamp1 = new Date(apiResponse1.data.requested_at).getTime();
		const timestamp2 = new Date(apiResponse2.data.requested_at).getTime();
		return timestamp1 > timestamp2 ? apiResponse1 : apiResponse2;
	};

	const recentData = getMostRecentData(cachedClustersAPIResponse, clustersAPIResponse);
	console.log({ recentData });

	// SANDBOX
	// FIXME > CALLING THE PROVIDER IN SAME CONTEXT AS DASHBOARD COMPONENT SEEMS DUBIOUS
	useEffect(() => {
		setCachedClustersArray(cachedClustersArray);
		return () => {};
	}, [cachedClustersArray]);

	return (
		<div className={styles["dashboard-container"]}>
			<div>AVG Dashboard</div>
			<DataSelectActions></DataSelectActions>
			<div className={styles["left-sidebar-container"]}>
				<LeftSidebarProvider>
					<LeftSidebar></LeftSidebar>
				</LeftSidebarProvider>
			</div>
		</div>
	);
}
