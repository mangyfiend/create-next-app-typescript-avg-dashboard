import { useEffect, useState } from "react";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import IGeoclusterFilters from "@interfaces/projects/avg-dashboard/GeoclusterFilters";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";

// 2a.
const filterClustersByName = (clustersArray: IGeoclusterGeoJSON[], titleString: string) => {
	let filteredArray = clustersArray.filter((geocluster) => {
		const clusterTitle = getGeoclusterProperties(geocluster).clusterTitle.toLowerCase();
		return clusterTitle.indexOf(titleString.toLowerCase()) !== -1;
	});
	return filteredArray;
};

const filterClustersBySize = (clustersArray: IGeoclusterGeoJSON[], sizeCategory: number) => {
	return clustersArray.filter((geocluster) => geocluster.features.length >= sizeCategory);
};

export default function useGeoclusterPropFilters(
	clustersArray: IGeoclusterGeoJSON[],
	filters: IGeoclusterFilters,
  nameFilterText: string,
): IGeoclusterGeoJSON[] {

	const [filteredClusters, setFilteredClusters] = useState<IGeoclusterGeoJSON[]>([]);

	useEffect(() => {

    let filteredClusters = [];

    // filter cluster by num. features
		filteredClusters = (filterClustersBySize(clustersArray, filters.clusterSizeSelect));

		// filter clusters by name
		setFilteredClusters(filterClustersByName(filteredClusters, nameFilterText));

		return () => {};
	}, [clustersArray, filters, nameFilterText]);

	return filteredClusters;
}
