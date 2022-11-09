import { LeftSidebarProvider } from "@context/projects/avg-dashboard/LeftSidebarContext-v4";
import RefreshDataControls from "@components/projects/avg-dashboard/RefreshDataControls";
import LeftSidebar from "@components/projects/avg-dashboard/LeftSidebar/LeftSidebar-v4";
import styles from "@styles/projects/avg-dashboard/Dashboard.module.css";
import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";

type DashboardProps = {
	cachedClustersArray: IFeatureCollection[];
};

export default function Dashboard({ cachedClustersArray }: DashboardProps): JSX.Element {
	return (
		<div className={styles["dashboard-container"]}>
			<div>AVG Dashboard</div>
			<RefreshDataControls></RefreshDataControls>
			<div className={styles["left-sidebar-container"]}>
				<LeftSidebarProvider serverSideClusters={cachedClustersArray}>
					<LeftSidebar></LeftSidebar>
				</LeftSidebarProvider>
			</div>
		</div>
	);
}
