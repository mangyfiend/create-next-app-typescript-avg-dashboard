import styles from "@styles/projects/avg-dashboard/RightSidebar.module.css";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";
import ClusterFeatureRow from "@components/projects/avg-dashboard/RightSidebar/ClusterFeatureRow";
import getParcelizedClusterFeatProps from "@utils/getParcelizedClusterFeatProps";
import ListItemsMasterCheckbox from "../ListItemsMasterCheckbox";

export default function ClusterFeaturesList({
	clusterFeatures,
}: {
	clusterFeatures: IParcelizedFeatureGeoJSON[];
}): JSX.Element {
	return (
		<div className={styles["list-page-body"]}>
			<ListItemsMasterCheckbox checkboxLabel="select all geocluster features"></ListItemsMasterCheckbox>
			{clusterFeatures.map((clusterFeat) => (
				<ClusterFeatureRow
					key={getParcelizedClusterFeatProps(clusterFeat).clusterFeatId}
					clusterFeatureData={clusterFeat}></ClusterFeatureRow>
			))}
		</div>
	);
}
