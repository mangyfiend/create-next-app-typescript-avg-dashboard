import { useEffect, useRef, useState } from "react";
import styles from "@styles/projects/avg-dashboard/LeftSidebar.module.css";

export default function LeftSidebarActions({ onSelectChangeHandler }) {
	// const [data, setData] = useState([]);
	// const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
	// const fetchDataIntervalId = useRef();

	// const setFetchDataInterval = (interval) => {
	// 	// Clear old interval
	// 	if (fetchDataIntervalId.current) {
	// 		clearInterval(fetchDataIntervalId.current);
	// 		fetchDataIntervalId.current = undefined;
	// 	}

	// 	// Set new interval
	// 	if (interval > 0) {
	// 		fetchDataIntervalId.current = setInterval(() => {
	// 			setFetchDataTrigger(Date.now());
	// 		}, interval);
	// 	}
	// };

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
	// 	return () => clearInterval(fetchDataIntervalId.current);
	// }, [fetchDataTrigger]);

	// console.log({ data });

	return (
		<div className="flex-col">
			<div className={styles["actions-container"]}>
				<div>Left Sidebar Actions</div>
				<div className="flex-row">
					<button>Print</button>
					<button>Download</button>
					<button>Share</button>
					<button>Refresh</button>
					<select name="" id="" defaultValue={0} onChange={onSelectChangeHandler}>
						<option value={0}>Auto Refresh: OFF</option>
						<option value={5000}>5 seconds</option>
						<option value={15000}>15 seconds</option>
						<option value={30000}>30 seconds</option>
					</select>
					{/* <select
						name=""
						id=""
						defaultValue={0}
						onChange={(evt) => setFetchDataInterval(evt.target.value)}>
						<option value={0}>Auto Refresh: OFF</option>
						<option value={5000}>5 seconds</option>
						<option value={15000}>15 seconds</option>
						<option value={30000}>30 seconds</option>
					</select> */}
				</div>
			</div>
		</div>
	);
}
