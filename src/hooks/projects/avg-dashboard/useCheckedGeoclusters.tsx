import { useState, useEffect } from "react";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";

// 2b.
const filterClustersById = (
	clustersArray: IGeoclusterGeoJSON[],
	clusterId: string
): IGeoclusterGeoJSON[] => {
	let filteredClusters: IGeoclusterGeoJSON[] = clustersArray.filter((geocluster) => {
		return getGeoclusterProperties(geocluster).clusterId.indexOf(clusterId) !== -1;
	});
	return filteredClusters;
};

export default function useCheckedGeoclusters(
	clustersArray: IGeoclusterGeoJSON[],
	checkedGeoclusterIds: string[]
) {
	const [checkedClusters, setCheckedClusters] = useState<IGeoclusterGeoJSON[]>([]);

	useEffect(() => {

		const CHECKED_CLUSTERS = [];

		checkedGeoclusterIds.forEach((id) =>
			CHECKED_CLUSTERS.push(...filterClustersById(clustersArray, id))
		);

		setCheckedClusters(CHECKED_CLUSTERS);

	}, [checkedGeoclusterIds, clustersArray]);

	return checkedClusters;
}
