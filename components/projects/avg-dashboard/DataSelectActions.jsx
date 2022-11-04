import styles from "@styles/projects/avg-dashboard/DataSelectActions.module.css";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";

import {useState} from "react";
const Stopwatch = () => {
	const [status, setStatus] = useState("idle");
	const [timeElapsed, setTimeElapsed] = useState(0);
	setInterval(
		() => {
			setTimeElapsed((timeElapsed) => timeElapsed + 1);
		},
		status === "running" ? 10 : null
	);
	const toggle = () => {
		setTimeElapsed(0);
		setStatus((status) => (status === "running" ? "idle" : "running"));
	};
	return (
		<>
			Time Elapsed: {timeElapsed / 1000} s
			<button onClick={toggle}>{status === "running" ? "Stop" : "Start"}</button>
		</>
	);
};

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
						onChange={onRetreiveIntervalSelectChange}>
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
