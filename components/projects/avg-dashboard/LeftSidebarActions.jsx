import { useEffect, useRef, useState } from "react";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";
import useTriggerFetchData from "@hooks/projects/avg-dashboard/useTriggerFetchData";

export default function LeftSidebarActions({ loadingChk, onSelectChangeHandler }) {
	// const [data, setData] = useState([]);
	const [autoFetchDataTrigger, setAutoFetchDataTrigger] = useState(0);
	const autoFetchIntervalId = useRef();

	// REMOVE
	const setFetchDataInterval = (interval) => {
		// Clear old interval
		if (autoFetchIntervalId.current) {
			clearInterval(autoFetchIntervalId.current);
			autoFetchIntervalId.current = undefined;
		}

		// Set new interval
		if (interval > 0) {
			autoFetchIntervalId.current = setInterval(() => {
				setAutoFetchDataTrigger(Date.now());
			}, interval);
		}
	};

	// REMOVE
	// useEffect(() => {
	// 	console.log("effect running");
	// 	const fetchData = async () => {
	// 		try {
	// 			const apiResponse = await fetch(`https://geoclusters.herokuapp.com/api/v1/agcs/`);

	// 			const apiDocs = await apiResponse.json();

	// 			setData(apiDocs.agcs);
	// 		} catch (err) {
	// 			console.log(err.message);
	// 		}
	// 	};

	// 	fetchData();

	// 	// Clean up for unmount to prevent memory leak
	// 	return () => clearInterval(autoFetchIntervalId.current);
	// }, [autoFetchDataTrigger]);

	// REMOVE
	// TRIGGER API CALL @ NEW TIME
	// useTriggerFetchData(autoFetchDataTrigger, autoFetchIntervalId.current);

	// console.log({ data });
	// console.log({loadingChk})

	return (
		<div className="flex-col">
			<div className={styles["actions-container"]}>
				<div className="flex-row-between">
					<div>Data Select Actions</div>
					<div className="flex-self-end">
						{!loadingChk ? (
							<span className="success-text">ready</span>
						) : (
							<span className="plain-text">loading data</span>
						)}
					</div>
				</div>
				<div className="flex-row">
					<button>Refresh</button>
					<select name="" id="" defaultValue={0} onChange={onSelectChangeHandler}>
						<option value={0}>Data Auto Refresh - Off</option>
						<option value={5000}>5 seconds</option>
						<option value={15000}>15 seconds</option>
						<option value={30000}>30 seconds</option>
						<option value={300000}>5 minutes</option>
					</select>
				</div>
			</div>
		</div>

		// <div className="flex-col">
		// 	<div className={styles["actions-container"]}>
		// 		<div>Left Sidebar Actions</div>
		// 		<div className="flex-row">
		// 			<button>Print</button>
		// 			<button>Download</button>
		// 			<button>Share</button>
		// 			<button>Refresh</button>
		// 			<select name="" id="" defaultValue={0} onChange={onSelectChangeHandler}>
		// 				<option value={0}>Data Auto Refresh - Off</option>
		// 				<option value={5000}>5 seconds</option>
		// 				<option value={15000}>15 seconds</option>
		// 				<option value={30000}>30 seconds</option>
		// 				<option value={300000}>5 minutes</option>
		// 			</select>
		// 			{/* <select
		// 				name=""
		// 				id=""
		// 				defaultValue={0}
		// 				onChange={(evt) => setFetchDataInterval(evt.target.value)}>
		// 				<option value={0}>Auto Refresh: OFF</option>
		// 				<option value={5000}>5 seconds</option>
		// 				<option value={15000}>15 seconds</option>
		// 				<option value={30000}>30 seconds</option>
		// 			</select> */}
		// 		</div>
		// 		<div className="flex-self-end">
		// 			{!loadingChk ? (
		// 				<span className="success-text">ready</span>
		// 			) : (
		// 				<span>data loading</span>
		// 			)}
		// 		</div>
		// 	</div>
		// </div>
	);
}
