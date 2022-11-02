import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import { createContext, useState, useEffect, useRef } from "react";

const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children }) => {
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	// SANDBOX
	const { liveClustersData } = useDashboardContext();
	console.log({ liveClustersData });
	const [workingClustersData, setWorkingClustersData] = useState([]);

	const [agcs, setAgcs] = useState(null);
	const [dataLoadingChk, setDataLoadingChk] = useState(true);
	const [filterText, setFilterText] = useState("");
	const [filterText2, setFilterText2] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState(0);
	const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
	const fetchDataIntervalId = useRef();
	const [filteredAgcs, setFilteredAgcs] = useState(null);

	// search #1 text input change
	const onFilterTextChange = (evt) => {
		setFilterText(evt.target.value);
	};

	// search #2 text input change
	const onFilter2TextChange = (evt) => {
		setFilterText2(evt.target.value);
	};

	//
	const onPageRowsSelectChange = (evt) => {
		setPageRowsLength(evt.target.value);
	};

	// REMOVE > DEPRECATED
	// ????? DON'T UNDERSTAND HOW THIS WORKS
	const setFetchDataInterval = (interval) => {
		// Clear old interval
		if (fetchDataIntervalId.current) {
			console.log("HERE 1");
			clearInterval(fetchDataIntervalId.current);
			fetchDataIntervalId.current = undefined;
		}

		// Set new interval
		if (interval > 0) {
			console.log("HERE 2");
			fetchDataIntervalId.current = setInterval(() => {
				setFetchDataTrigger(Date.now());
			}, interval);
		}
	};

	// REMOVE > DEPRECATED
	// trigger API call
	useEffect(() => {
		console.log("[LEFT SIDEBAR] useEffect GEOCLUSTERS API FETCH RUNNING");
		// console.log({fetchDataTrigger})

		setDataLoadingChk(true);

		const fetchData = async () => {
			try {
				const apiResponse = await fetch(
					`https://geoclusters.herokuapp.com/api/v1/agcs/`
				);

				const apiDocs = await apiResponse.json();

				setAgcs(apiDocs.agcs);
				setDataLoadingChk(false);
			} catch (err) {
				console.warn(err.message);
				console.warn(`[ FAILED TO FETCH ]`);
				setDataLoadingChk(false);
			}
		};

		fetchData();

		// Clean up for unmount to prevent memory leak
		return () => clearInterval(fetchDataIntervalId.current);
	}, [fetchDataTrigger]);

	// select diff. option for API refresh interval
	const onRetreiveIntervalSelectChange = (evt) => {
		console.log("DATA REFRESH INTERVAL CHANGED");
		setFetchDataInterval(evt.target.value);
	};

	// REMOVE > DEPRECATED
	// update "filteredAgcs" when filterText2 changes or new agcs is received
	useEffect(() => {
		if (agcs) {
			const filteredResults = agcs.filter((result) => {
				const resultTitle = result.properties.extended_name.toLowerCase();
				return resultTitle.indexOf(filterText2.toLowerCase()) !== -1;
			});

			setFilteredAgcs(filteredResults);
		}
		return () => {
			//  TODO
		};
	}, [agcs, filterText2]);

	// SANDBOX
	// filter the live data when text in "SearchBox2 [live]" changes
	useEffect(() => {
		let filteredData = null;
		// let dataArray = [];
		// let pagenatedData = [];

		if (liveClustersData) {
			filteredData = liveClustersData.filter((record) => {
				const recordTitle =
					record.properties.agc_extended_name.toLowerCase();
				return recordTitle.indexOf(filterText2.toLowerCase()) !== -1;
			});

			// SANDBOX
			if (filteredData) {
				setWorkingClustersData(filteredData);
				// // before user interaction,
				// // the default value of the rows limit select elment is == 0
				// if (pageRowsLimit === 0) {
				// 	dataArray = [filteredData];
				// } else {
				// 	dataArray = divideArray(filteredData, pageRowsLimit);
				// }
			}
		}
		// console.log({ dataArray });
		return () => {};
	}, [liveClustersData, filterText2]);

	// console.log({ agcs });
	console.log({ filteredAgcs });

	return (
		<LeftSidebarContext.Provider
			value={{
				filterText,
				onFilterTextChange,
				filterText2,
				onFilter2TextChange,
				onRetreiveIntervalSelectChange,
				onPageRowsSelectChange,
				pageRowsLength,
				agcs,
				filteredAgcs,
				dataLoadingChk,
				workingClustersData,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;
