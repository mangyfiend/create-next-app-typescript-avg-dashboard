import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";

export default function RightSidebarHeader() {
	const { clickedClusterGeoJSON }: IDashboardContextProps | undefined = useDashboardContext();

	if (clickedClusterGeoJSON) {
		const clusterProperties = getGeoclusterProperties(clickedClusterGeoJSON);

		return (
			<>
				<div>{clusterProperties.clusterTitle}</div>
				<div>{clusterProperties.featuresDescription}</div>
				<div>{clusterProperties.clusterLocation} </div>
			</>
		);
	} else {
		return <div> Right Sidebar Header </div>;
	}
}
