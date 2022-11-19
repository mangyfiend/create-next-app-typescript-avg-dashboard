import { useState, useEffect } from "react";

function useInterval() {
	const [tick, setTick] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTick((c) => c + 1);
		}, 60000);
		return () => clearInterval(intervalId);
	}, []);
	return tick;
}

export default useInterval;
