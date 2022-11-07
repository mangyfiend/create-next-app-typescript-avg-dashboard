import React from "react";
import { createContext, useState, useEffect } from "react";
import { SyntheticEvent, ChangeEvent } from "react";
import IGeoclusterAPIResponse from "@srcinterfaces/GeoclustersAPIResponse";
import IFeatureCollection from "@srcinterfaces/GeoJSON";
import { getErrorMessage } from "@srcutils/helpers";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import API_URLS from "@utils/constants/api-urls";

// def. the context props
interface IDashboardContextProps {
	clustersAPIResponse: Object;
	liveClustersArray: IFeatureCollection[];
	liveDataTimestamp: number;
	onDataRefreshButtonClick: (argument: SyntheticEvent) => void;
	onRetreiveIntervalSelectChange: (argument: ChangeEvent<HTMLInputElement>) => void;
	dataLoadingChk: Boolean;
	fetchErrChk: Boolean;
	autoFetchInterval: string | undefined;
}

// def. the context provider props
interface IProviderProps {
	children?: React.ReactNode;
}

// init. the context
const DashboardContext = createContext<IDashboardContextProps | {}>({});

// REMOVE
// TS. PROVIDER FN. DEF. MTD #1
export function DashboardPrvdr({ children }: { children: React.FC; }) { }

// TS. PROVIDER FN. DEF. MTD #2
export const DashboardProvider: React.FC<IProviderProps> = ({ children }) => {
	console.log("%c[DASHBOARD] CONTEXT PROVIDER RE-RENDERED", "color: green");

	const [dataLoadingChk, setDataLoadingChk] = useState(true);
	const [fetchErrChk, setFetchErrChk] = useState(false);
	const [clustersAPIResponse, setClustersAPIResponse] = useState({});
	const [liveClustersArray, setLiveClustersArray] = useState<IFeatureCollection[]>([]);
	const [liveDataTimestamp, setLiveDataTimestamp] = useState(Date.now());
	const [manualDataRefreshTrigger, setManualDataRefreshTrigger] = useState(0);
	const [autoFetchInterval, setAutoFetchInterval] = useState<string | undefined>("0");

	// manual refresh button clicked
	const onDataRefreshButtonClick = (evt: React.SyntheticEvent) => {
		setManualDataRefreshTrigger(evt.timeStamp);
		setAutoFetchInterval("0");
	};

	// select diff. option for API refresh interval
	const onRetreiveIntervalSelectChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
				let apiResponse = await fetch(API_URLS.PARCELIZED_GEOCLUSTERS);

				const apiData: IGeoclusterAPIResponse = await apiResponse.json();

				setClustersAPIResponse(apiData);
				setLiveClustersArray(apiData[OS.API_DATA][OS.API_DOCS]);
				setDataLoadingChk(false);
				setLiveDataTimestamp(Date.now());
			} catch (err) {
				setDataLoadingChk(false);
				setFetchErrChk(true);
				console.warn(getErrorMessage(err));
			}
		};

		let intervalId: number;

		console.log({ autoFetchInterval });

		/*
		https://www.designcise.com/web/tutorial/what-is-the-correct-typescript-return-type-for-javascripts-setinterval-function
		In Node.js, you might encounter the "Type 'Timer' is not assignable to type 'number'" error. 
		This is because in Node.js setInterval() returns a Timer object instead of a numeric id. 
		To work around this, you can either specify Timer as the return type, infer the return type, or use window.setInterval() instead of setInterval() 
		(which will return a numeric id as expected).

		// MTD. 1
		window.setInterval(()=>{},interval)
		
		// MTD. 2
		let typedIntervalId: ReturnType<typeof setInterval> = setInterval(callback, interval)
		*/

		if (autoFetchInterval && +autoFetchInterval > 0) {
			intervalId = window.setInterval(() => {
				//
				console.log({ autoFetchInterval });
				fetchData(); // <-- (3) invoke in interval callback
			}, +autoFetchInterval);
		} else {
			console.log("%c[DASHBOARD] data auto refresh - off", "color: orange");
		}

		fetchData(); // <-- (2) invoke on mount

		return () => clearInterval(intervalId);
	}, [autoFetchInterval, manualDataRefreshTrigger]);

	// const dashboardCon

	return (
		<DashboardContext.Provider
			value={{
				clustersAPIResponse,
				liveClustersArray,
				liveDataTimestamp,
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
