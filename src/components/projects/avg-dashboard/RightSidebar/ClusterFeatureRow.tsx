import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import { PROPERTY_SELECTORS as _ } from "@utils/constants/geocluster-property-selectors";
import IGeoclusterFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterFeatureGeoJSON";

export default function ClusterFeatureRow({
	clusterFeatureData,
}: {
	clusterFeatureData: IGeoclusterFeatureGeoJSON;
}) {
	const { setClickedClusterFeatureData }: IDashboardContextProps = useDashboardContext();

	const featureTitleClickHandler = (evt: React.MouseEvent<HTMLAnchorElement>): void => {
		setClickedClusterFeatureData(clusterFeatureData);
	};

	let rowMarkup: React.ReactNode;

	if (clusterFeatureData) {
		rowMarkup = (
			<div className="flex-col">
				<a href="#" onClick={featureTitleClickHandler}>
					{clusterFeatureData[_.GEOCLUSTER_FEATURE_PROPERTIES][_.GEOCLUSTER_FEATURE_ID]}
				</a>
				{/* <Link href="#">
                </Link> */}
				<small>
					{clusterFeatureData[_.GEOCLUSTER_FEATURE_PROPERTIES][_.GEOCLUSTER_FEATURE_OWNER]}
				</small>
				<small>
					{clusterFeatureData[_.GEOCLUSTER_FEATURE_PROPERTIES][_.GEOCLUSTER_FEATURE_SIZE]} ha.
				</small>
				{/* <small>{clusterFeatureData.properties[OS.GEOCLUSTER_ID]}</small>
                <small>{clusterFeatureData.features.length} Farmers</small> */}
			</div>
		);
	} else {
		rowMarkup = <span>something went wrong</span>;
	}
	return rowMarkup;
}
