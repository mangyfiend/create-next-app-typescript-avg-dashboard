import IGeoclusterFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterFeatureGeoJSON";
import { useState, useEffect } from "react";
import ClusterFeatureRow from "@components/projects/avg-dashboard/RightSidebar/ClusterFeatureRow";
import {PROPERTY_SELECTORS as _} from "@utils/constants/geocluster-property-selectors";
import styles from "@styles/projects/avg-dashboard/RightSidebar.module.css";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";

export default function ClusterFeaturesListPages() {
	// export default function ClusterFeaturesListPages({
	// 	clusterFeatsPagesArray,
	// 	recordTitleFilterText,
	// 	recordsFilters,
	// 	pageRowsLength,
	// }: {
	// 	clusterFeatsPagesArray: IGeoclusterFeatureGeoJSON[];
	// 	recordTitleFilterText: string;
	// 	recordsFilters: { any };
	// 	pageRowsLength: number;
	// }) {

	const { clickedClusterData }: IDashboardContextProps | undefined = useDashboardContext();

	const clusterFeatsPagesArray = clickedClusterData?.features;
		// TODOD > KEEP
	// const {
	// 	clusterFeatsPagesArray,
	// 	recordTitleFilterText,
	// 	recordsFilters,
	// 	pageRowsLength,
	// }: IRightSidebarContextProps = useRightSidebarContext();

	const [pageIdx, setPageIdx] = useState<number>(0);

	const handleNextClick = () => {
		setPageIdx(pageIdx + 1);
	};

	const handleBackClick = () => {
		setPageIdx(pageIdx - 1);
	};

	const handleJumpFirstClick = () => {
		setPageIdx(0);
	};

	const handleJumpLastClick = () => {
		setPageIdx(clusterFeatsPagesArray.length - 1);
	};

	// TODOD > KEEP
	// // reset pageIdx to first page (0) when search text changes
	// useEffect(() => {
	// 	setPageIdx(0);

	// 	return () => {
	// 		// TODO
	// 	};
	// }, [recordTitleFilterText, recordsFilters, pageRowsLength]);

	// let clusterFeatsArray: IGeoclusterFeatureGeoJSON[] = clusterFeatsPagesArray[pageIdx];
	let clusterFeatsArray: IGeoclusterFeatureGeoJSON[] = clusterFeatsPagesArray;

	return (
		<>
			<div className={"flex-col"}>
				<div className={styles["list-page-body"]}>
					{(!clusterFeatsArray || clusterFeatsArray.length === 0) && (
						<div>no geocluster features</div>
					)}
					{clusterFeatsArray &&
						clusterFeatsArray.map((clusterFeat) => (
							<ClusterFeatureRow
								// key={clusterFeat[OS.GEOCLUSTER_PROPERTIES][OS.GEOCLUSTER_ID]}
								key={
									clusterFeat[_.GEOCLUSTER_FEATURE_PROPERTIES][
										_.GEOCLUSTER_FEATURE_ID
									]
								}
								clusterFeatureData={clusterFeat}></ClusterFeatureRow>
						))}
				</div>
				{/* <div className={"flex-row-between"}>
					<span>
						{clusterFeatsPagesArray.length !== 0 &&
							`Page ${pageIdx + 1} of ${clusterFeatsPagesArray.length}`}
						{clusterFeatsPagesArray.length === 0 && `Page 0 / 0`}
					</span>
					<div className="flex-row">
						<button disabled={pageIdx === 0 ? true : false} onClick={handleJumpFirstClick}>
							First Page
						</button>
						<button disabled={pageIdx === 0 ? true : false} onClick={handleBackClick}>
							Previous Page
						</button>
						<button
							disabled={pageIdx === clusterFeatsPagesArray.length - 1 ? true : false}
							onClick={handleNextClick}>
							Next Page
						</button>
						<button
							disabled={pageIdx === clusterFeatsPagesArray.length - 1 ? true : false}
							onClick={handleJumpLastClick}>
							Last Page
						</button>
					</div>
				</div> */}
			</div>
			{/* <button onClick={handleShowMoreClick}>{showMoreChk ? "Hide" : "Show"} details</button>
			{showMoreChk && <p>{currentPicture.description}</p>}
			<Image src={currentPicture.url} alt={currentPicture.alt} width={200} height={200} /> */}
		</>
	);
}
