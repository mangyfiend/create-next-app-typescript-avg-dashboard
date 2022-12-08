import { PROPERTY_SELECTORS as _ } from "@utils/constants/geocluster-property-selectors";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import useRightSidebarContext from "@hooks/projects/avg-dashboard/useRightSidebarContext";
import ClusterFeaturesList from "@components/projects/avg-dashboard/RightSidebar/ClusterFeaturesList";
import ListLengthSelect from "../ListLengthSelect";
import useResetListPageIndex from "@hooks/projects/avg-dashboard/useResetListPageIndex";

export default function ClusterFeaturesListPages() {

	const { clusterFeatsPages, handleListLengthChange }: IRightSidebarContextProps =
		useRightSidebarContext();

	const { pageIndex, setPageIndex } = useResetListPageIndex(0);

	const handleNextClick = () => {
		setPageIndex(pageIndex + 1);
	};

	const handleBackClick = () => {
		setPageIndex(pageIndex - 1);
	};

	const handleJumpFirstClick = () => {
		setPageIndex(0);
	};

	const handleJumpLastClick = () => {
		setPageIndex(clusterFeatsPages.length - 1);
	};

	let clusterFeatsArray: IParcelizedFeatureGeoJSON[] = clusterFeatsPages[pageIndex];

	return (
		<>
			<div className={"flex-col"}>
				<ClusterFeaturesList clusterFeatures={clusterFeatsArray}></ClusterFeaturesList>
				<div className={"flex-row-between"}>
					<span>
						{clusterFeatsPages.length > 0 &&
							`Page ${pageIndex + 1} of ${clusterFeatsPages.length}`}
						{clusterFeatsPages.length < 1 && `Page 0 / 0`}
					</span>
					<div className="flex-row">
						<button disabled={pageIndex === 0 ? true : false} onClick={handleJumpFirstClick}>
							First Page
						</button>
						<button disabled={pageIndex === 0 ? true : false} onClick={handleBackClick}>
							Previous Page
						</button>
						<button
							disabled={pageIndex === clusterFeatsPages.length - 1 ? true : false}
							onClick={handleNextClick}>
							Next Page
						</button>
						<button
							disabled={pageIndex === clusterFeatsPages.length - 1 ? true : false}
							onClick={handleJumpLastClick}>
							Last Page
						</button>
					</div>
				</div>
			</div>
			<ListLengthSelect onListLengthChange={handleListLengthChange}></ListLengthSelect>
		</>
	);
}
