import styles from "@styles/projects/avg-dashboard/DataRefreshControls.module.css";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "interfaces/projects/avg-dashboard/IDashboardContextProps"

export default function DataSelectActions() {
	const {
		liveClustersArray,
		onRetreiveIntervalSelectChange,
		dataLoadingChk,
		fetchErrChk,
		onDataRefreshButtonClick,
		autoFetchInterval,
	} : IDashboardContextProps = useDashboardContext();

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

	if (+autoFetchInterval == 0 && !dataLoadingChk) {
		refreshBtnDisabled = false;
	} 

	return (
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
						<option value={15000}>15 seconds</option>
						<option value={30000}>30 seconds</option>
						<option value={300000}>5 minutes</option>
					</select>
					<button disabled={refreshBtnDisabled} onClick={onDataRefreshButtonClick}>
						{dataLoadingChk ? "please wait" : "Refresh Data"}
					</button>
				</div>
			</div>
		</div>
	);
}
