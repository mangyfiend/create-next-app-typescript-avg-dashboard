import { useEffect, useState } from "react";
import styles from "@styles/projects/avg-dashboard/DataSelectActions.module.css";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";

export default function DataSelectActions() {
	const {
		liveClustersArray,
		onRetreiveIntervalSelectChange,
		dataLoadingChk,
		fetchErrChk,
		onDataRefreshButtonClick,
	} = useDashboardContext();

	let messageSpan;
	let refreshBtnDisabled;

	if (!dataLoadingChk && !fetchErrChk && liveClustersArray.length === 0) {
		refreshBtnDisabled = false;
		messageSpan = <span className="info-text">no data</span>;
	}

	if (!dataLoadingChk && !fetchErrChk && liveClustersArray.length > 0) {
		messageSpan = <span className="success-text">ready</span>;
		refreshBtnDisabled = false;
	}

	if (dataLoadingChk && !fetchErrChk) {
		messageSpan = <span className="plain-text">loading data</span>;
		refreshBtnDisabled = true;
	}

	if (!dataLoadingChk && fetchErrChk) {
		messageSpan = <span className="error-text">error getting data</span>;
		refreshBtnDisabled = false;
	}

	const [autoFetchInterval, setAutoFetchInterval] = useState(0);

	useEffect(() => {
		// (1) define within effect callback scope
		const fetchData = async () => {
			try {
				const res = await fetch(`https://geoclusters.herokuapp.com/api/v1/parcelized-agcs/`);
				const json = await res.json();
				// setDatas(jsonData(json));
				console.log({ json });
			} catch (error) {
				console.log(error);
			}
		};

		let intervalId;

		if (autoFetchInterval > 0) {

			intervalId = setInterval(() => {
				fetchData(); // <-- (3) invoke in interval callback
			}, autoFetchInterval);

			// REMOVE
			// fetchData(); // <-- (2) invoke on mount
		}

		return () => clearInterval(intervalId);

	}, [autoFetchInterval]);

	return (
		<div className="flex-col">
			{/* <Stopwatch></Stopwatch> */}
			<div className={styles["actions-container"]}>
				<div className="flex-row-between">
					<div>Data Select Actions</div>
					<div>{messageSpan}</div>
				</div>
				<div className="flex-row-between">
					<select
						className="flex-1"
						name=""
						id=""
						defaultValue={0}
						/* onChange={onRetreiveIntervalSelectChange}> */
						onChange={(evt) => setAutoFetchInterval(evt.target.value)}>
						<option value={0}>Data Auto Refresh - Off</option>
						<option value={5}>real time (5ms) </option>
						<option value={5000}>5 seconds</option>
						<option value={15000}>15 seconds</option>
						<option value={30000}>30 seconds</option>
						<option value={300000}>5 minutes</option>
					</select>
					<button disabled={refreshBtnDisabled} onClick={onDataRefreshButtonClick}>
						Refresh Data
					</button>
				</div>
			</div>
		</div>
	);
}
