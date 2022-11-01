import { useEffect, useState, useMemo } from "react";

export default function useTriggerFetchData(trigger, currentIntervalId) {
	console.log({trigger})
	console.log({currentIntervalId})
	
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log("effect running");
		const fetchData = async () => {
			try {
				const apiResponse = await fetch(`https://geoclusters.herokuapp.com/api/v1/agcs/`);
				const apiDocs = await apiResponse.json();
				setData(apiDocs.agcs);
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchData();
		// Clean up for unmount to prevent memory leak
		return () => clearInterval(currentIntervalId);
	}, [trigger, currentIntervalId]);

	console.log({ data });
	return data;
}
