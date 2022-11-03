import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { divideArray } from "@utils/helpers";
import { createContext, useState, useEffect } from "react";

const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children, ...props }) => {
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	console.log({props})
	// IMPORTANT > THIS BRINGS SERVER SIDE PROPS INTO THE PROVIDER IMMEDIATELY
	const CLUSTERS_ARRAY = props.serverSideClusters;

	const [filterText, setFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState(0);
	const [workingClustersArray, setWorkingClustersArray] = useState([]);
	const [clusterPagesArray, setClusterPagesArray] = useState([]);

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
		if (CLUSTERS_ARRAY.length > 0) {
			filteredClustersArray = filterClustersBySize(
				CLUSTERS_ARRAY,
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
	}, [CLUSTERS_ARRAY, filterText, pageRowsLength, filtersData]);

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
