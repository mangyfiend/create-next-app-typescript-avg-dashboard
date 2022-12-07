import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { divideArray } from "@utils/helpers";
import { createContext, useState, useEffect } from "react";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";

const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children, ...props }) => {
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	// IMPORTANT > THIS BRINGS SERVER SIDE PROPS INTO THE PROVIDER IMMEDIATELY VIA getServerSideProps in index.js
	// console.log({props});

	// SANDBOX
	const { liveClustersArray } = useDashboardContext();
	// console.log({ liveClustersArray });

	// USE LIVE DATA IF DATA FROM SERVER SIDE (...props) IS NOT AVAILABLE
	const CLUSTERS_ARRAY = props.serverSideClusters ? props.serverSideClusters : liveClustersArray;

	const [clusterNameFilterText, setClusterNameFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState(0);
	const [workingClustersArray, setWorkingClustersArray] = useState([]);
	const [clusterPagesArray, setClusterPagesArray] = useState([]);

	// WIP
	const [clusterFilters, setClusterFilters] = useState({
		clusterSizeSelect: 0,
		neverVisitedChk: false,
		rangeTimeframeSelect: "hours",
		visitedInLastRange: 0,
	});
	// TOOO > neverVisitedChk == true ? visitedInLastRange = 0 & disabled

	const handleClusterFiltersChange = (e) => {
		const type = e.target.type;
		const name = e.target.name;
		const value = type === "checkbox" ? e.target.checked : e.target.value;

		setClusterFilters((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	console.log({ clusterFilters });

	// CLUSTER FILTER FUNCTIONS
	// 1.
	const filterClustersBySize = (clustersArray, sizeCategory) => {
		return clustersArray.filter((cluster) => cluster.features.length >= sizeCategory);
	};
	// 2.
	const filterClustersByName = (clustersArray, titleString) => {
		let filteredArray = clustersArray.filter((cluster) => {
			const clusterTitle = cluster.properties[OS.GEOCLUSTER_TITLE].toLowerCase();
			return clusterTitle.indexOf(titleString.toLowerCase()) !== -1;
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
	const onClusterNameFilterTextChange = (evt) => {
		setClusterNameFilterText(evt.target.value);
	};

	//
	const onPageRowsSelectChange = (evt) => {
		setPageRowsLength(evt.target.value);
	};

	// filter the live data when text in the search input changes
	useEffect(() => {
		let filteredClustersArray = [];

		// TODO > COMPARE CACHED AND LIVE CLUSTERS ARRAY LENGTHS
		if (CLUSTERS_ARRAY && CLUSTERS_ARRAY.length > 0) {
			filteredClustersArray = filterClustersBySize(
				CLUSTERS_ARRAY,
				clusterFilters.clusterSizeSelect
			);

			//
			filteredClustersArray = filterClustersByName(filteredClustersArray, clusterNameFilterText);

			// if (filteredClustersArray.length > 0) {
			filteredClustersArray = filteredClustersArray.filter((cluster) => {
				const clusterTitle = cluster.properties[OS.GEOCLUSTER_TITLE].toLowerCase();
				return clusterTitle.indexOf(clusterNameFilterText.toLowerCase()) !== -1;
			});

			//
			setWorkingClustersArray(filteredClustersArray);

			//
			setClusterPagesArray(getClusterArrayPages(filteredClustersArray, pageRowsLength));

			console.log({ filteredClustersArray });
		}
		return () => {};
	}, [CLUSTERS_ARRAY, clusterNameFilterText, pageRowsLength, clusterFilters]);

	return (
		<LeftSidebarContext.Provider
			value={{
				clusterNameFilterText,
				onClusterNameFilterTextChange,
				handleClusterFiltersChange,
				setClusterFilters,
				clusterFilters,
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
