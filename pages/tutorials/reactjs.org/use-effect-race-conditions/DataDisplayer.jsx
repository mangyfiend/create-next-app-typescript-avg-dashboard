import React, { useEffect, useState } from "react";

// Fixing Race Conditions in React with useEffect
// https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect

// 1. useEffect Clean-up Function with AbortController
export default function DataDisplayer(props) {
	const [data, setData] = useState(null);
	const [fetchedId, setFetchedId] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		
		console.log(props.id)

		const fetchData = async () => {
			setTimeout(async () => {
				try {
					const response = await fetch(`https://swapi.dev/api/people/${props.id}/`, {
						signal: abortController.signal,
					});
					const newData = await response.json();

					setFetchedId(props.id);
					setData(newData);

				} catch (error) {
					if (error.name === "AbortError") {
						//Aborting a fetch throws an error
						//So we can't update state afterwards
						console.log(error.message)
					}
					// Handle other request errors here
				}
			}, Math.round(Math.random() * 6000));
		};

		fetchData();

		//  useEffect cleanup function
		return () => {
			abortController.abort();
		};
	}, [props.id]);

	return (
		<div>
			<p>Request may take up to 6 seconds</p>
			<hr />
			{data ? (
				<>
					<p style={{ color: fetchedId === props.id ? "green" : "red" }}>
						Displaying Data for: {fetchedId}
					</p>
					<p>Result: {data.name}</p>
				</>
			) : null}
		</div>
	);
}

// 2. useEffect Clean-up Function with Boolean Flag

// import React, { useCallback, useEffect, useState } from "react";

// export default function DataDisplayer(props) {
// 	const [data, setData] = useState(null);
// 	const [fetchedId, setFetchedId] = useState(null);

// 	// start helpers for visualising race conditions
// 	const [numReqs, setNumReqs] = useState(0);
// 	const increase = useCallback(() => setNumReqs((c) => c + 1), []);
// 	const decrease = useCallback(() => setNumReqs((c) => c - 1), []);
// 	// end helpers for visualising race conditions

// 	useEffect(() => {
// 		let active = true;

// 		const fetchData = async () => {
// 			increase();
// 			setTimeout(async () => {
// 				const response = await fetch(`https://swapi.dev/api/people/${props.id}/`);
// 				const newData = await response.json();
// 				decrease();
// 				if (active) {
// 					setFetchedId(props.id);
// 					setData(newData);
// 				}
// 			}, Math.round(Math.random() * 12000));
// 		};

// 		fetchData();
// 		return () => {
// 			active = false;
// 		};
// 	}, [props.id, increase, decrease]);

// 	return (
// 		<div>
// 			<p>Number of requests in flight: {numReqs} (may take up to 12 seconds)</p>
// 			<hr />
// 			{data ? (
// 				<>
// 					<p style={{ color: fetchedId === props.id ? "green" : "red" }}>
// 						Displaying Data for: {fetchedId}
// 					</p>
// 					<p>Result: {data.name}</p>
// 				</>
// 			) : null}
// 		</div>
// 	);
// }
