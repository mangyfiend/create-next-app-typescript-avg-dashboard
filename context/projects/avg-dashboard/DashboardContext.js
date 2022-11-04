import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { createContext, useState, useEffect, useRef } from "react";

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
	console.log("%c[DASHBOARD] CONTEXT PROVIDER RE-RENDERED", "color: green");

	const autoFetchIntervalId = useRef(undefined);
	const [dataLoadingChk, setDataLoadingChk] = useState(true);
	const [fetchErrChk, setFetchErrChk] = useState(false);
	const [clustersAPIResponse, setClustersAPIResponse] = useState(null);
	const [liveClustersArray, setLiveClustersArray] = useState([]);
	const [liveDataTimestamp, setLiveDataTimestamp] = useState(Date.now());
	const [autoFetchDataTrigger, setAutoFetchDataTrigger] = useState(0);
	const [manualDataRefreshTrigger, setManualDataRefreshTrigger] = useState(0);
	// SANDBOX
	const [cachedClustersArray, setCachedClustersArray] = useState([]);

	// manual refresh button clicked
	const onDataRefreshButtonClick = (evt) => setManualDataRefreshTrigger(evt.timeStamp);

	// REMOVE > NOT WORKING
	// persist the setInterval ID between re-renders with useRef()
	// ????? DON'T UNDERSTAND HOW THIS WORKS
	const setFetchDataInterval = (interval) => {
		// Clear old interval
		if (autoFetchIntervalId.current) {
			console.log("HERE 1");
			clearInterval(autoFetchIntervalId.current);
			autoFetchIntervalId.current = undefined;
		}

		// Set new interval
		if (interval > 0) {
			console.log("HERE 2");
			autoFetchIntervalId.current = setInterval(() => {
				setAutoFetchDataTrigger(Date.now());
			}, interval);
		}
	};

	// FIXME
	// select diff. option for API refresh interval
	const onRetreiveIntervalSelectChange = (evt) => {
		console.log("%c[DASHBOARD] DATA REFRESH INTERVAL CHANGED", "color: green");
		setFetchDataInterval(evt.target.value);
	};

	// trigger API call
	useEffect(() => {
		console.log("%c[DASHBOARD] useEffect GEOCLUSTERS API FETCH RUNNING", "color: green");
		console.log({ autoFetchDataTrigger });
		console.log({ manualDataRefreshTrigger });

		setDataLoadingChk(true);
		setFetchErrChk(false);

		const fetchData = async () => {
			try {
				let apiResponse = await fetch(
					`https://geoclusters.herokuapp.com/api/v1/parcelized-agcs/`
				);

				// TODO > combine parcelized-agcs + legacy-agcs in single endpoint
				// let apiResponse2 = await fetch(
				// 	`https://geoclusters.herokuapp.com/api/v3/geoclusters/`
				// );

				apiResponse = await apiResponse.json();

				console.log({ apiResponse });

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

		// fetchData();

		// Clean up for unmount to prevent memory leak
		return () => clearInterval(autoFetchIntervalId.current);
	}, [autoFetchDataTrigger, manualDataRefreshTrigger]);

	return (
		<DashboardContext.Provider
			value={{
				cachedClustersArray,
				setCachedClustersArray,
				clustersAPIResponse,
				liveClustersArray,
				liveDataTimestamp,
				setAutoFetchDataTrigger,
				onDataRefreshButtonClick,
				onRetreiveIntervalSelectChange,
				dataLoadingChk,
				fetchErrChk,
			}}>
			{children}
		</DashboardContext.Provider>
	);
};

export default DashboardContext;
