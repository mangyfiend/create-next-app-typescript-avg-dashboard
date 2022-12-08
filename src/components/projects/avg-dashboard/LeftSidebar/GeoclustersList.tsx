import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";
import ListItemsMasterCheckbox from "../ListItemsMasterCheckbox";
import ClusterRecordRow from "./ClusterRecordRow";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function GeoclustersList({
	geoclustersArray,
}: {
	geoclustersArray: IGeoclusterGeoJSON[];
}): JSX.Element {

	const {
		setGeoclusterCheckboxIds,
		checkedGeoclusterIds,
		setCheckedGeoclusterIds,
	}: ILeftSidebarContextProps = useLeftSidebarContext();

	return (
		<div className={styles["list-page-body"]}>
			<ListItemsMasterCheckbox
				checkboxLabel="select all geoclusters"
				checkboxIdsStateSetter={setGeoclusterCheckboxIds}
				prevCheckedIds={checkedGeoclusterIds}
				checkedIdsStateSetter={setCheckedGeoclusterIds}
				></ListItemsMasterCheckbox>
			{geoclustersArray.map((geocluster) => (
				<ClusterRecordRow
					key={getGeoclusterProperties(geocluster).clusterId}
					clusterData={geocluster}></ClusterRecordRow>
			))}
		</div>
	);
}
