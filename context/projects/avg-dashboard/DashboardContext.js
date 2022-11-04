import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { createContext, useState, useEffect, useRef } from "react";

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
	console.log("%c[DASHBOARD] CONTEXT PROVIDER RE-RENDERED", "color: green");

	// REMOVE
	// const autoFetchIntervalId = useRef(undefined);
	// const [autoFetchDataTrigger, setAutoFetchDataTrigger] = useState(0);

	const [dataLoadingChk, setDataLoadingChk] = useState(true);
	const [fetchErrChk, setFetchErrChk] = useState(false);
	const [clustersAPIResponse, setClustersAPIResponse] = useState(0);
	const [liveClustersArray, setLiveClustersArray] = useState([]);
	const [liveDataTimestamp, setLiveDataTimestamp] = useState(Date.now());
	const [manualDataRefreshTrigger, setManualDataRefreshTrigger] = useState(0);
	// SANDBOX
	const [autoFetchInterval, setAutoFetchInterval] = useState(0);

	// manual refresh button clicked
	const onDataRefreshButtonClick = (evt) => {
		setManualDataRefreshTrigger(evt.timeStamp);
		setAutoFetchInterval(0);
	};

	// select diff. option for API refresh interval
	const onRetreiveIntervalSelectChange = (evt) => {
		console.log("%c[DASHBOARD] DATA REFRESH INTERVAL CHANGED", "color: green");
		setAutoFetchInterval(evt.target.value);
	};

	// trigger API call & auto trigger thereafter
	useEffect(() => {

		// (1) define fetch fn. within effect callback scope
		const fetchData = async () => {
			console.log("%c[DASHBOARD] useEffect GEOCLUSTERS API FETCH RUNNING", "color: green");
			setDataLoadingChk(true);
			setFetchErrChk(false);
			try {
				let apiResponse = await fetch(
					`https://geoclusters.herokuapp.com/api/v1/parcelized-agcs/`
				);

				// TODO > combine parcelized-agcs + legacy-agcs in single endpoint
				// let apiResponse2 = await fetch(
				// 	`https://geoclusters.herokuapp.com/api/v3/geoclusters/`
				// );

				apiResponse = await apiResponse.json();

				setClustersAPIResponse(apiResponse);
				setLiveClustersArray(apiResponse[OS.API_DATA][OS.API_DOCS]);
				setDataLoadingChk(false);
				setLiveDataTimestamp(Date.now());
			} catch (err) {
				setDataLoadingChk(false);
				setFetchErrChk(true);
				console.warn(err.message);
			}
		};

		let intervalId;

		console.log({autoFetchInterval})

		if (autoFetchInterval > 0) {
			intervalId = setInterval(() => {
				console.log({autoFetchInterval})
				fetchData(); // <-- (3) invoke in interval callback
			}, autoFetchInterval);
		} else {
			console.log("%c[DASHBOARD] data auto refresh - off", "color: orange");
		};
		
		fetchData(); // <-- (2) invoke on mount

		return () => clearInterval(intervalId);
	}, [autoFetchInterval, manualDataRefreshTrigger]);

	return (
		<DashboardContext.Provider
			value={{
				clustersAPIResponse,
				liveClustersArray,
				liveDataTimestamp,
				// setAutoFetchDataTrigger, // REMOVE
				onDataRefreshButtonClick,
				onRetreiveIntervalSelectChange,
				dataLoadingChk,
				fetchErrChk,
				autoFetchInterval,
			}}>
			{children}
		</DashboardContext.Provider>
	);
};

export default DashboardContext;
