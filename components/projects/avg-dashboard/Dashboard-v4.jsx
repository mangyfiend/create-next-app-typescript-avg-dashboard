import { LeftSidebarProvider } from "@context/projects/avg-dashboard/LeftSidebarContext-v4";
import DataSelectActions from "@components/projects/avg-dashboard/DataSelectActions.jsx";
import LeftSidebar from "@components/projects/avg-dashboard/LeftSidebar-v4";
import styles from "@styles/projects/avg-dashboard/Dashboard.module.css";

export default function Dashboard({ cachedClustersArray }) {
	return (
		<div className={styles["dashboard-container"]}>
			<div>AVG Dashboard</div>
			<DataSelectActions></DataSelectActions>
			<div className={styles["left-sidebar-container"]}>
				<LeftSidebarProvider serverSideClusters={cachedClustersArray}>
					<LeftSidebar></LeftSidebar>
				</LeftSidebarProvider>
			</div>
		</div>
	);
}
