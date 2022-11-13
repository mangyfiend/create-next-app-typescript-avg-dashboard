import DataRefreshControls from "@components/projects/avg-dashboard/DataRefreshControls";
import LeftSidebar from "@components/projects/avg-dashboard/LeftSidebar/LeftSidebar-v4";
import RightSidebar from "@components/projects/avg-dashboard/RightSidebar/RightSidebar";
import styles from "@styles/projects/avg-dashboard/Dashboard.module.css";
import { LeftSidebarProvider } from "@context/projects/avg-dashboard/LeftSidebarContext-v4";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/GeoclusterGeoJSON";

type DashboardProps = {
	cachedClustersArray: IGeoclusterGeoJSON[];
};

export default function Dashboard({ cachedClustersArray }: DashboardProps): JSX.Element {
	return (
		<div className={styles["dashboard-container"]}>
			<div>AVG Dashboard</div>
			<DataRefreshControls></DataRefreshControls>
			<LeftSidebarProvider serverSideClusters={cachedClustersArray}>
				{/* REMOVE STYLES BELOW */}
				<div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr" }}>
				{/* <div style={{ display: "grid", gridTemplateColumns: "1fr 0.5fr" }}> */}
					<LeftSidebar></LeftSidebar>
					<RightSidebar></RightSidebar>
				</div>
			</LeftSidebarProvider>
		</div>
	);
}
