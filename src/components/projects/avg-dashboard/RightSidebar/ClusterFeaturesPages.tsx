import { useState, useEffect } from "react";
import { PROPERTY_SELECTORS as _ } from "@utils/constants/geocluster-property-selectors";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import useRightSidebarContext from "@hooks/projects/avg-dashboard/useRightSidebarContext";
import ClusterFeaturesList from "@components/projects/avg-dashboard/RightSidebar/ClusterFeaturesList"
import ListLengthSelect from "../ListLengthSelect";

export default function ClusterFeaturesPages() {
	const {
		clusterFeatsPages,
		featTitleFilterText,
		pageRowsLength,
		clusterFeatsFilters,
	}: IRightSidebarContextProps = useRightSidebarContext();

	const { onPageRowsSelectChange } : ILeftSidebarContextProps = useLeftSidebarContext();

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
		setPageIdx(clusterFeatsPages.length - 1);
	};

	// reset pageIdx to first page (0) when search text changes
	useEffect(() => {
		setPageIdx(0);
		return () => {
			// TODO
		};
	}, [featTitleFilterText, clusterFeatsFilters, pageRowsLength]);

	let clusterFeatsArray: IParcelizedFeatureGeoJSON[] = clusterFeatsPages[pageIdx];

	return !clusterFeatsArray || clusterFeatsArray.length < 1 ? (
		<div>please click on a cluster on the left panel</div>
	) : (
		<>
			<div className={"flex-col"}>
				<ClusterFeaturesList clusterFeatures={clusterFeatsArray}></ClusterFeaturesList>
				<div className={"flex-row-between"}>
					<span>
						{clusterFeatsPages.length > 0 &&
							`Page ${pageIdx + 1} of ${clusterFeatsPages.length}`}
						{clusterFeatsPages.length < 1 && `Page 0 / 0`}
					</span>
					<div className="flex-row">
						<button disabled={pageIdx === 0 ? true : false} onClick={handleJumpFirstClick}>
							First Page
						</button>
						<button disabled={pageIdx === 0 ? true : false} onClick={handleBackClick}>
							Previous Page
						</button>
						<button
							disabled={pageIdx === clusterFeatsPages.length - 1 ? true : false}
							onClick={handleNextClick}>
							Next Page
						</button>
						<button
							disabled={pageIdx === clusterFeatsPages.length - 1 ? true : false}
							onClick={handleJumpLastClick}>
							Last Page
						</button>
					</div>
				</div>
			</div>
			<ListLengthSelect handleListLengthChange={onPageRowsSelectChange}></ListLengthSelect>
			{/* <button onClick={handleShowMoreClick}>{showMoreChk ? "Hide" : "Show"} details</button>
			{showMoreChk && <p>{currentPicture.description}</p>}
			<Image src={currentPicture.url} alt={currentPicture.alt} width={200} height={200} /> */}
		</>
	);
}