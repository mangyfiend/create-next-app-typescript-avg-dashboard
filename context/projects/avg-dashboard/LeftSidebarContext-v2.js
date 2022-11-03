import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { createContext, useState, useEffect } from "react";

const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children }) => {
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	const { liveClustersArray } = useDashboardContext();
	const [workingClustersArray, setWorkingClustersArray] = useState([]);
	const [filterText, setFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState(0);

	// SANDBOX
	console.log({ workingClustersArray });

	const [clusterFiltersData, setFiltersData] = useState({
		clusterSizeCategory: 0,
	});

	const handleClusterFiltersChange = (e) => {
		const type = e.target.type;
		const name = e.target.name;
		const value = type === "checkbox" ? e.target.checked : e.target.value;

		setFiltersData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	console.log({ clusterFiltersData });

	// CLUSTER FILTER FUNCTIONS
	// 1.
	const filterClustersBySize = (clustersArray, sizeCategory) => {
		return clustersArray.filter((cluster) => cluster.features.length >= sizeCategory);
	};
	// 2.

	// search #1 text input change
	const onFilterTextChange = (evt) => {
		setFilterText(evt.target.value);
	};

	//
	const onPageRowsSelectChange = (evt) => {
		setPageRowsLength(evt.target.value);
	};

	// filter the live data when text in the search input changes
	useEffect(() => {
		let filteredClustersArray = [];

		// SANDBOX
		if (liveClustersArray.length > 0) {

			filteredClustersArray = filterClustersBySize(
				liveClustersArray,
				clusterFiltersData.clusterSizeCategory
			);
			console.log({ filteredClustersArray });

			if (filteredClustersArray.length > 0) {
				filteredClustersArray = filteredClustersArray.filter((record) => {
					const recordTitle = record.properties[OS.CLUSTER_TITLE].toLowerCase();
					return recordTitle.indexOf(filterText.toLowerCase()) !== -1;
				});

				if (filteredClustersArray.length > 0) {
					setWorkingClustersArray(filteredClustersArray);
				} else {
					setWorkingClustersArray(liveClustersArray);
				}
			}
			console.log({ filteredClustersArray });
		}
		return () => {};
	}, [liveClustersArray, filterText, clusterFiltersData]);

	return (
		<LeftSidebarContext.Provider
			value={{
				filterText,
				onFilterTextChange,
				handleClusterFiltersChange,
				setFiltersData,
				onPageRowsSelectChange,
				pageRowsLength,
				workingClustersArray,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;
