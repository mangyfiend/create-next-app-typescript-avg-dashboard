import { useState, useEffect } from "react";
import GeoclusterRecord from "./GeoclusterRecordItem";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import IGeoclustersGeoJSON from "@interfaces/projects/avg-dashboard/GeoclustersGeoJSON";

export default function LeftSidebarListPages() {
	const {
		filterText,
		clusterPagesArray,
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
		setPageIdx(clusterPagesArray.length - 1);
	};

	// reset pageIdx to first page (0) when search text changes
	useEffect(() => {
		setPageIdx(0);

		return () => {
			//  second
		};
	}, [filterText, clusterFilters, pageRowsLength]);

	// console.log({ clusterPagesArray });

	let recordsArray: IGeoclustersGeoJSON[] = clusterPagesArray[pageIdx];

	// console.log({ recordsArray });

	return (
		<>
			<div className={"flex-col"}>
				<div className={styles["list-page-body"]}>
					{(!recordsArray || recordsArray.length === 0) && <div>please refresh the page</div>}
					{recordsArray &&
						recordsArray.map((record) => (
							<GeoclusterRecord
								key={record[OS.GEOCLUSTER_PROPERTIES][OS.GEOCLUSTER_ID]}
								dataRecord={record}></GeoclusterRecord>
						))}
				</div>
				<div className={"flex-row-between"}>
					<span>
						{clusterPagesArray.length > 0 &&
							`Page ${pageIdx + 1} of ${clusterPagesArray.length}`}
						{clusterPagesArray.length < 1 && `Page 0 / 0`}
					</span>
					<div className="flex-row">
						<button disabled={pageIdx === 0 ? true : false} onClick={handleJumpFirstClick}>
							First Page
						</button>
						<button disabled={pageIdx === 0 ? true : false} onClick={handleBackClick}>
							Previous Page
						</button>
						<button
							disabled={pageIdx === clusterPagesArray.length - 1 ? true : false}
							onClick={handleNextClick}>
							Next Page
						</button>
						<button
							disabled={pageIdx === clusterPagesArray.length - 1 ? true : false}
							onClick={handleJumpLastClick}>
							Last Page
						</button>
					</div>
				</div>
			</div>
			{/* <button onClick={handleShowMoreClick}>{showMoreChk ? "Hide" : "Show"} details</button>
			{showMoreChk && <p>{currentPicture.description}</p>}
			<Image src={currentPicture.url} alt={currentPicture.alt} width={200} height={200} /> */}
		</>
	);
}
