import {useState} from "react";

const Stopwatch = () => {
	const [status, setStatus] = useState("idle");
	const [timeElapsed, setTimeElapsed] = useState(0);
	setInterval(
		() => {
			setTimeElapsed((timeElapsed) => timeElapsed + 1000);
		},
		status === "running" ? 0 : null
	);
	const timerStartToggle = () => {
		setTimeElapsed(0);
		setStatus((status) => (status === "running" ? "idle" : "running"));
	};
	return (
		<>
			Time Elapsed: {timeElapsed / 1000 / 1000} s
			<button onClick={timerStartToggle}>{status === "running" ? "Stop" : "Start"}</button>
		</>
	);
};

export default Stopwatch;
