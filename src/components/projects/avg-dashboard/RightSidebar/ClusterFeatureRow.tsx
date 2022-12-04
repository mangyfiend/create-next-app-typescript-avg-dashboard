import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import IGeoclusterFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterFeatureGeoJSON";
import getParcelizedClusterFeatProps from "@utils/getParcelizedClusterFeatProps";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";

export default function ClusterFeatureRow({
	clusterFeatureData,
}: {
	// FIXME > WHICH TYPE TO SELECT?
	// clusterFeatureData: IGeoclusterFeatureGeoJSON | IParcelizedFeatureGeoJSON;
	clusterFeatureData: IParcelizedFeatureGeoJSON;
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
					{getParcelizedClusterFeatProps(clusterFeatureData).clusterFeatId}
				</a>
				{/* <Link href="#">
                </Link> */}
				<small>{getParcelizedClusterFeatProps(clusterFeatureData).clusterFeatTitle}</small>
				<small>{getParcelizedClusterFeatProps(clusterFeatureData).clusterFeatSize}</small>
				{/* <small>{clusterFeatureData.properties[OS.GEOCLUSTER_ID]}</small>
				<small>{clusterFeatureData.features.length} Farmers</small> */}
				{/* TODO */}
				{/* <button onClick={handleShowMoreClick}>{showMoreChk ? "Hide" : "Show"} details</button>
				{showMoreChk && <p>{currentPicture.description}</p>}
				<Image src={currentPicture.url} alt={currentPicture.alt} width={200} height={200} /> */}
			</div>
		);
	} else {
		rowMarkup = <span>something went wrong</span>;
	}
	return rowMarkup;
}
