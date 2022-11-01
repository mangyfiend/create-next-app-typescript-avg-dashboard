import React from "react";
import styles from "@styles/projects/avg-dashboard/DataSelectActions.module.css";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";

export default function DataSelectActions() {
	const {
		liveClustersData,
		onRetreiveIntervalSelectChange,
		dataLoadingChk,
		fetchErrChk,
	} = useDashboardContext();

	let messageSpan;
	console.log({dataLoadingChk})
	console.log({fetchErrChk})
	switch (true) {
		case !dataLoadingChk && !fetchErrChk && !liveClustersData:
			messageSpan = <span className="info-text">no data</span>;
			console.log(dataLoadingChk, fetchErrChk, liveClustersData)
			break;
		case !dataLoadingChk && !fetchErrChk && liveClustersData:
			messageSpan = <span className="success-text">ready</span>;
			console.log(dataLoadingChk, fetchErrChk, liveClustersData)
			break;
		case !fetchErrChk && liveClustersData:
			messageSpan = <span className="success-text">ready</span>;
			console.log(dataLoadingChk, fetchErrChk, liveClustersData)
			break;
		case dataLoadingChk && !fetchErrChk:
			messageSpan = <span className="plain-text">loading data</span>;
			console.log(dataLoadingChk, fetchErrChk, liveClustersData)
			break;
		case fetchErrChk && !dataLoadingChk:
			messageSpan = <span className="error-text">data fetch error</span>;
			console.log(dataLoadingChk, fetchErrChk, liveClustersData)
			break;

			default:
			console.log(dataLoadingChk, fetchErrChk, liveClustersData)
			messageSpan = <span className="">something went wong</span>;
			break;
	}
	// if (!dataLoadingChk && !fetchErrChk && !liveClustersData) {
	// 	messageSpan = <span className="info-text">no data</span>;
	// } else {
	// 	messageSpan = <span className="success-text">ready</span>;
	// }
	// if (dataLoadingChk && !fetchErrChk)
	// 	messageSpan = <span className="plain-text">data loading</span>;
	// if (fetchErrChk && !dataLoadingChk)
	// 	messageSpan = <span className="error-text">data fetch error</span>;

	return (
		<div className="flex-col">
			<div className={styles["actions-container"]}>
				<div className="flex-row-between">
					<div>Data Select Actions</div>
					<div>{messageSpan}</div>
				</div>
				<div className="flex-row">
					<button>Refresh</button>
					<select
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
				</div>
			</div>
		</div>
	);
}
