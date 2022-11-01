import { useState, useEffect } from "react";
import DataRecordRow from "./DataRecordRow";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext";

export default function LeftSidebarListPages({ pagesArray }) {
	const { filterText } = useLeftSidebarContext();
	const [pageIdx, setPageIdx] = useState(0);
	const [showMoreChk, setShowMoreChk] = useState(false);

	const handleNextClick = () => {
		setPageIdx(pageIdx + 1);
	};

	const handleBackClick = () => {
		setPageIdx(pageIdx - 1);
	};

	const handleShowMoreClick = () => {
		setShowMoreChk(!showMoreChk);
	};

	// reset pageIdx to first page (0) when search text changes
	useEffect(() => {
		setPageIdx(0);

		return () => {
			//  second
		};
	}, [filterText]);

	console.log({ pagesArray });

	let recordsArray = pagesArray[pageIdx];

	console.log({ recordsArray });

	return (
		<>
			<div className={"flex-col"}>
				<div className={styles["list-page-body"]}>
					{(!recordsArray || recordsArray.length === 0) && (
						<div>please refresh the page</div>
					)}
					{recordsArray &&
						recordsArray.map((record) => (
							<DataRecordRow
								key={record.properties.agc_id}
								dataRecord={record}></DataRecordRow>
						))}
				</div>
				<div className={"flex-row-between"}>
					<span>
						{pagesArray.length !== 0 &&
							`Page ${pageIdx + 1} of ${pagesArray.length}`}
						{pagesArray.length === 0 && `Page 0 / 0`}
					</span>
					<div className="flex-row">
						<button>First</button>
						<button
							disabled={pageIdx === 0 ? true : false}
							onClick={handleBackClick}>
							Previous Page
						</button>
						<button
							disabled={pageIdx === pagesArray.length - 1 ? true : false}
							onClick={handleNextClick}>
							Next Page
						</button>
						<button>Last</button>
					</div>
				</div>
			</div>
			{/* <button onClick={handleShowMoreClick}>{showMoreChk ? "Hide" : "Show"} details</button>
			{showMoreChk && <p>{currentPicture.description}</p>}
			<Image src={currentPicture.url} alt={currentPicture.alt} width={200} height={200} /> */}
		</>
	);
}
