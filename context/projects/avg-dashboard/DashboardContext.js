import { createContext, useState, useEffect, useRef } from "react";

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
	console.log("%c[DASHBOARD] CONTEXT PROVIDER RE-RENDERED", "color: green");

	const [dataLoadingChk, setDataLoadingChk] = useState(true);
	const [fetchErrChk, setFetchErrChk] = useState(false);
	// const [filterText2, setFilterText2] = useState("");
	// const [pageRowsLength, setPageRowsLength] = useState(0);
	const [liveClustersData, setLiveClustersData] = useState(null);
	const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
	const fetchDataIntervalId = useRef();
	// const [filteredAgcs, setFilteredAgcs] = useState(null);

	// // search2 text input change
	// const onFilter2TextChange = (evt) => {
	// 	setFilterText2(evt.target.value);
	// };

	//
	// const onPageRowsSelectChange = (evt) => {
	// 	setPageRowsLength(evt.target.value);
	// };

	//
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

	// trigger API call
	useEffect(() => {
		console.log(
			"%c[DASHBOARD] useEffect GEOCLUSTERS API FETCH RUNNING",
			"color: green"
		);
		// console.log({fetchDataTrigger})

		setDataLoadingChk(true);

		const fetchData = async () => {
			try {
				const apiResponse = await fetch(
					`https://geoclusters.herokuapp.com/api/v1/agcs/`
				);

            // TODO > combine parcelized-agcs + legacy-agcs in single endpoint
				// const apiResponse2 = await fetch(
				// 	`https://geoclusters.herokuapp.com/api/v3/geoclusters/`
				// );

				const apiDocs = await apiResponse.json();

				setLiveClustersData(apiDocs.agcs);
				setDataLoadingChk(false);
			} catch (err) {
				setDataLoadingChk(false);
				setFetchErrChk(true);
				console.warn(err.message);
				console.warn(`[ FAILED TO FETCH ]`);
			}
		};

		fetchData();

		// Clean up for unmount to prevent memory leak
		return () => clearInterval(fetchDataIntervalId.current);
	}, [fetchDataTrigger]);

	// select diff. option for API refresh interval
	const onRetreiveIntervalSelectChange = (evt) => {
		console.log(
			"%c[DASHBOARD] DATA REFRESH INTERVAL CHANGED",
			"color: green"
		);
		setFetchDataInterval(evt.target.value);
	};

	// // update "liveClustersData" after new API fetch trigger
	// useEffect(() => {
	// 	if (liveClustersData) {
	// 		const filteredResults = liveClustersData.filter((result) => {
	// 			const resultTitle = result.properties.extended_name.toLowerCase();
	// 			return resultTitle.indexOf(filterText2.toLowerCase()) !== -1;
	// 		});

	// 		setFilteredAgcs(filteredResults);
	// 	}
	// 	return () => {
	// 		//  TODO
	// 	};
	// }, [liveClustersData, filterText2]);

	console.log({ liveClustersData });
	// console.log({ filteredAgcs });

	return (
		<DashboardContext.Provider
			value={{
				liveClustersData,
				// onFilter2TextChange,
				onRetreiveIntervalSelectChange,
				// onPageRowsSelectChange,
				// pageRowsLength,
				// filterText2,
				// filteredAgcs,
				dataLoadingChk,
				fetchErrChk,
			}}>
			{children}
		</DashboardContext.Provider>
	);
};

export default DashboardContext;
