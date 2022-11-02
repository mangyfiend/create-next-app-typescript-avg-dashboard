import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { divideArray } from "@utils/helpers";
import { createContext, useState, useEffect } from "react";

const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children }) => {
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	// SANDBOX
	const { cachedClustersArray, liveClustersArray } = useDashboardContext(); // TODO > WHICH TO USE???
	const [clusterPagesArray, setClusterPagesArray] = useState([]);

	const [workingClustersArray, setWorkingClustersArray] = useState([]);
	const [filterText, setFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState(0);

	// SANDBOX
	const [filtersData, setFiltersData] = useState({
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

	console.log({ filtersData });

	// CLUSTER FILTER FUNCTIONS
	// 1.
	const filterClustersBySize = (clustersArray, sizeCategory) => {
		return clustersArray.filter((cluster) => cluster.features.length >= sizeCategory);
	};
	// 2.
	const filterClustersByTitle = (clustersArray, titleString) => {
		let filteredArray = clustersArray.filter((record) => {
			const recordTitle = record.properties[OS.CLUSTER_TITLE].toLowerCase();
			return recordTitle.indexOf(titleString.toLowerCase()) !== -1;
		});
		return filteredArray;
	};

	// 3.
	const getClusterArrayPages = (clustersArray, numPages) => {
		// before user interaction,
		// the default value of the rows limit select elment is == 0
		return numPages === 0 ? [clustersArray] : divideArray(clustersArray, numPages);
	};

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

		// TODO > COMPARE CACHED AND LIVE CLUSTERS ARRAY LENGTHS
		if (liveClustersArray.length > 0) {
			filteredClustersArray = filterClustersBySize(
				liveClustersArray,
				filtersData.clusterSizeCategory
			);

			//
			filteredClustersArray = filterClustersByTitle(filteredClustersArray, filterText);

			// if (filteredClustersArray.length > 0) {
			filteredClustersArray = filteredClustersArray.filter((record) => {
				const recordTitle = record.properties[OS.CLUSTER_TITLE].toLowerCase();
				return recordTitle.indexOf(filterText.toLowerCase()) !== -1;
			});

			//
			setWorkingClustersArray(filteredClustersArray);

			//
			setClusterPagesArray(getClusterArrayPages(filteredClustersArray, pageRowsLength));

			console.log({ filteredClustersArray });
		}
		return () => {};
	}, [liveClustersArray, filterText, pageRowsLength, filtersData]);

	return (
		<LeftSidebarContext.Provider
			value={{
				filterText,
				onFilterTextChange,
				handleClusterFiltersChange,
				setFiltersData,
				filtersData,
				onPageRowsSelectChange,
				pageRowsLength,
				workingClustersArray,
				clusterPagesArray,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;
