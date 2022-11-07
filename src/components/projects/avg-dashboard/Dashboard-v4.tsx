import { LeftSidebarProvider } from "@context/projects/avg-dashboard/LeftSidebarContext-v4";
import DataSelectActions from "@src/components/projects/avg-dashboard/LeftSidebar/DataSelectActions.jsx";
import LeftSidebar from "@src/components/projects/avg-dashboard/LeftSidebar/LeftSidebar-v4";
import styles from "@styles/projects/avg-dashboard/Dashboard.module.css";
import IFeatureCollection from "@srcinterfaces/GeoJSON";

type Props = {
	cachedClustersArray: IFeatureCollection[];
};

export default function Dashboard({ cachedClustersArray }: Props): JSX.Element {
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
