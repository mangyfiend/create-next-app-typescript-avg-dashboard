import { useState, useEffect } from "react";
import ClusterRecordRow from "./ClusterRecordRow";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";

export default function LeftSidebarListPages() {
	const {
		clusterNameFilterText,
		pagenatedGeoclusters,
		clusterFilters,
		pageRowsLength,
	}: ILeftSidebarContextProps = useLeftSidebarContext();

	const [pageIdx, setPageIdx] = useState<number>(0);
	const [showMoreChk, setShowMoreChk] = useState<Boolean>(false);

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
		setPageIdx(pagenatedGeoclusters.length - 1);
	};

	// reset pageIdx to first page (0) when search text changes
	useEffect(() => {
		setPageIdx(0);

		return () => {
			//  second
		};
	}, [clusterNameFilterText, clusterFilters, pageRowsLength]);

	// console.log({ pagenatedGeoclusters });

	let recordsArray: IGeoclusterGeoJSON[] = pagenatedGeoclusters[pageIdx];

	// console.log({ recordsArray });

	return (
		<>
			<div className={"flex-col"}>
				<div className={styles["list-page-body"]}>
					{(!recordsArray || recordsArray.length === 0) && <div>please refresh the page</div>}
					{recordsArray &&
						recordsArray.map((clusterRecord) => (
							<ClusterRecordRow
								key={getGeoclusterProperties(clusterRecord).clusterId}
								clusterData={clusterRecord}></ClusterRecordRow>
						))}
				</div>
				<div className={"flex-row-between"}>
					<span>
						{pagenatedGeoclusters.length > 0 &&
							`Page ${pageIdx + 1} of ${pagenatedGeoclusters.length}`}
						{pagenatedGeoclusters.length < 1 && `Page 0 / 0`}
					</span>
					<div className="flex-row">
						<button disabled={pageIdx === 0 ? true : false} onClick={handleJumpFirstClick}>
							First Page
						</button>
						<button disabled={pageIdx === 0 ? true : false} onClick={handleBackClick}>
							Previous Page
						</button>
						<button
							disabled={pageIdx === pagenatedGeoclusters.length - 1 ? true : false}
							onClick={handleNextClick}>
							Next Page
						</button>
						<button
							disabled={pageIdx === pagenatedGeoclusters.length - 1 ? true : false}
							onClick={handleJumpLastClick}>
							Last Page
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
