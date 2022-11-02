import React from "react";
import styles from "@styles/projects/avg-dashboard/DataSelectActions.module.css";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import { dividerClasses } from "@mui/material";

export default function DataSelectActions() {
	const {
		liveClustersData,
		onRetreiveIntervalSelectChange,
		dataLoadingChk,
		fetchErrChk,
		onDataRefreshButtonClick,
	} = useDashboardContext();

	let messageSpan;

	if (!dataLoadingChk && !fetchErrChk && !liveClustersData)
		messageSpan = <span className="info-text">no data</span>;

	if (!dataLoadingChk && !fetchErrChk && liveClustersData)
		messageSpan = <span className="success-text">ready</span>;

	if (dataLoadingChk && !fetchErrChk)
		messageSpan = <span className="plain-text">loading data</span>;

	if (!dataLoadingChk && fetchErrChk)
		messageSpan = <span className="error-text">data fetch error</span>;

	return(
		<div className="flex-col">
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
						<option value={5000}>5 seconds</option>
						<option value={15000}>15 seconds</option>
						<option value={30000}>30 seconds</option>
						<option value={300000}>5 minutes</option>
					</select>
					<button
						disabled={fetchErrChk || dataLoadingChk ? true : false}
						onClick={onDataRefreshButtonClick}>
						Refresh Data
					</button>
				</div>
			</div>
		</div>
	);
}
