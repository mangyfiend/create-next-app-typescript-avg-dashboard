import { useEffect, useRef, useState } from "react";

const ExampleComponent = () => {
	const [apiData, setApiData] = useState([]);
	const [autoFetchDataTrigger, setAutoFetchDataTrigger] = useState(0);
	const autoFetchIntervalId = useRef();

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

	useEffect(() => {

		const fetchData = async () => {
			try {
				const apiResponse = await fetch(`https://geoclusters.herokuapp.com/api/v1/agcs/`);

				const apiDocs = await apiResponse.json();

				setApiData(apiDocs.agcs);
			} catch (err) {
				console.log(err.message);
			}
		};

		fetchData();

      console.log({apiData})

		// Clean up for unmount to prevent memory leak
		return () => clearInterval(autoFetchIntervalId.current);
	}, [autoFetchDataTrigger]);

	return (
		<div>
			<select
				name=""
				id=""
				defaultValue={0}
				onChange={(evt) => setFetchDataInterval(evt.target.value)}>
				<option value={0}>Auto Refresh: OFF</option>
				<option value={5000}>5 seconds</option>
				<option value={15000}>15 seconds</option>
				<option value={30000}>30 seconds</option>
			</select>
			{/* {apiData.map(({ id, value }) => (
				<div key={id}>{value}</div>
			))} */}
		</div>
	);
};

export default ExampleComponent;
