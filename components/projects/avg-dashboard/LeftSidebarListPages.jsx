import { useState } from "react";
import ResultRow from "./ResultRow";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";

export default function LeftSidebarListPages({ pages }) {
	console.log(pages);
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

	console.log({ pages });

	let resultsArray = pages[pageIdx];
  
	console.log({ resultsArray });

	return (
		<>
			<div className={"flex-col"}>
				<div className={styles["list-page-body"]}>
					{(!resultsArray || resultsArray.length === 0) && <div>please refresh the page</div>}
					{resultsArray &&
						resultsArray.map((result) => (
							<ResultRow key={result.properties.agc_id} result={result}></ResultRow>
						))}
				</div>
				<div className={"flex-row-between"}>
					<span>
						{pages.length !== 0 && (`Page ${pageIdx + 1} of ${pages.length}`)}
						{pages.length === 0 && (`Page 0 / 0`)}
					</span>
					<div className="flex-row">
						<button>First</button>
						<button disabled={pageIdx === 0 ? true : false} onClick={handleBackClick}>
							Previous Page
						</button>
						<button
							disabled={pageIdx === pages.length - 1 ? true : false}
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
