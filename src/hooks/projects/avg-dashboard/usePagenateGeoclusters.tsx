import { useEffect, useState } from "react";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import { splitGeoJSONArray } from "@utils/helpers-v2";

// 3.
const getClusterArrayPages = (clustersArray: IGeoclusterGeoJSON[], numPages: number) => {
	// before user interaction,
	// the default value of the rows limit select elment is == 0
	return numPages === 0 ? [clustersArray] : splitGeoJSONArray(clustersArray, numPages);
};

export default function usePagenateGeoclusters(
	clustersArray: IGeoclusterGeoJSON[],
	pageLength: number,
): IGeoclusterGeoJSON[][] {

	const [clusterPagesArray, setClusterPagesArray] = useState<IGeoclusterGeoJSON[][]>([[]]);
	const [pagenatedClusters, setPagenatedClusters] = useState<IGeoclusterGeoJSON[][]>([[]]);

	useEffect(() => {

		// get an array of arrays of geoclusters each with length = pageLength
		setClusterPagesArray(getClusterArrayPages(clustersArray, pageLength));

		return () => {};
	}, [clustersArray, pageLength]);

	return clusterPagesArray;
}
