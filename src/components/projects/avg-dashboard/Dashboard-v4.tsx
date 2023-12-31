import DataRefreshControls from "@components/projects/avg-dashboard/DataRefreshControls";
import LeftSidebar from "@components/projects/avg-dashboard/LeftSidebar/LeftSidebar-v4";
import RightSidebar from "@components/projects/avg-dashboard/RightSidebar/RightSidebar";
import styles from "@styles/projects/avg-dashboard/Dashboard.module.css";
import { LeftSidebarProvider } from "@context/projects/avg-dashboard/LeftSidebarContext-v4";
import { RightSidebarStore } from "@context/projects/avg-dashboard/RightSidebarContext";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";

type DashboardProps = {
	cachedClustersArray: IGeoclusterGeoJSON[];
};

export default function Dashboard({ cachedClustersArray }: DashboardProps): JSX.Element {
	return (
		<div className={styles["dashboard-container"]}>
			<div>AVG Dashboard</div>
			<DataRefreshControls></DataRefreshControls>
			{/* REMOVE STYLES BELOW */}
			<div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr" }}>
				<LeftSidebarProvider serverSideClusters={cachedClustersArray}>
					<LeftSidebar></LeftSidebar>
				</LeftSidebarProvider>
				<RightSidebarStore>
					<RightSidebar></RightSidebar>
				</RightSidebarStore>
			</div>
		</div>
	);
}
