import { useState, useEffect } from "react";
import DataRecordRow from "./DataRecordRow";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v3";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";

export default function LeftSidebarListPages() {
	const { filterText, clusterPagesArray, clusterFiltersData, pageRowsLength } = useLeftSidebarContext();
	const [pageIdx, setPageIdx] = useState(0);
	const [showMoreChk, setShowMoreChk] = useState(false);

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
	}, [filterText, clusterFiltersData, pageRowsLength]);

	// console.log({ clusterPagesArray });

	let recordsArray = clusterPagesArray[pageIdx];

	// console.log({ recordsArray });

	return (
		<>
			<div className={"flex-col"}>
				<div className={styles["list-page-body"]}>
					{(!recordsArray || recordsArray.length === 0) && <div>please refresh the page</div>}
					{recordsArray &&
						recordsArray.map((record) => (
							<DataRecordRow
								key={record[OS.GEOCLUSTER_PROPERTIES][OS.GEOCLUSTER_ID]}
								dataRecord={record}></DataRecordRow>
						))}
				</div>
				<div className={"flex-row-between"}>
					<span>
						{clusterPagesArray.length !== 0 &&
							`Page ${pageIdx + 1} of ${clusterPagesArray.length}`}
						{clusterPagesArray.length === 0 && `Page 0 / 0`}
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
