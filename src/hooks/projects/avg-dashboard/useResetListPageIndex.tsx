import { useState, useEffect } from "react";
import useRightSidebarContext from "./useRightSidebarContext";
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";
import useDashboardContext from "./useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";

export default function useResetListPageIndex(initialValue: number) {
	const {
		featTitleFilterText,
		pageListLength,
		handleListLengthChange,
		clusterFeatsFilters,
	}: IRightSidebarContextProps = useRightSidebarContext();

	const { clickedClusterData }: IDashboardContextProps | undefined = useDashboardContext();

	const [pageIndex, setPageIndex] = useState<number>(initialValue);

	// reset pageIndex to first page (0) when the following change:
	// 1. cluster feat. title search text
	// 2. cluster feat. filters
	// 3. page list length
	// 4. a new cluster is clicked on left panel
	useEffect(() => {
		setPageIndex(0);
		return () => {
			// TODO
		};
	}, [featTitleFilterText, clusterFeatsFilters, pageListLength, clickedClusterData]);

	return { pageIndex, setPageIndex };
}
