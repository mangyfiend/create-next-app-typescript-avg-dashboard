// with useState(), when you update state, that triggers the re-render of the component

// useRef() Hook
// useRef() accepts one arg. as the initail value and returns a reference (aka ref)
// The ref is an object with a spetial prop. called "current"
// reference.current accesses the reference value, and reference.current = newValue; updates the ref. value

// The useRef value persists between component re-renderings
// when the useRef() ref changes, the component does NOT re-render

// COUNT HOW MANY TIMES A COMPONENT RENDERS
import { useState, useRef } from "react";

const App = () => {
	const [count, setCount] = useState(0);
	const [randomInput, setRandomInput] = useState("");
	const [secondsSinceRender, setSeconds] = useState(0);
	const numPageRenders = useRef(0);
	const textInputRef = useRef();
	const timeIdRef = useRef();

	// capture text input
	const handleInputChange = (evt) => {
		setRandomInput(evt.target.value);

		// update the page render count
		// numPageRenders.current++;
		numPageRenders.current = numPageRenders.current + 1;
	};

	//
	const startTimer = () => {
		timeIdRef.current = setInterval(() => {
			numPageRenders.current++;
			setSeconds((prev) => prev + 1);
		}, 1000);
		textInputRef.current.focus();
	};

	const stopTimer = () => {
		clearInterval(timeIdRef.current);
		timeIdRef.current = 0;
		textInputRef.current.focus();
	};

	const resetTimer = () => {
		stopTimer();
		if (secondsSinceRender) {
			numPageRenders.current++;
			setSeconds(0);
		}
		textInputRef.current.focus();
	};

	return (
		<main className="App">
			<div className="container">
				<input ref={textInputRef} type="text" value={randomInput} placeholder="Random Input" onChange={handleInputChange} />
				<p>Renders: {numPageRenders.current}</p>
				<br />
				<br />
				<section>
					<button onClick={startTimer}>Start</button>
					<button onClick={stopTimer}>Stop</button>
					<button onClick={resetTimer}>Reset</button>
				</section>
				<br />
				<br />
				<p>Seconds: {secondsSinceRender}</p>
				<br />
				<br />
				<p>{randomInput}</p>
			</div>
			<div className="container">
				<div> Count: {count}</div>
				<section>
					<button onClick={() => setCount(0)}>Reset</button>
					<button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
					<button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
				</section>
			</div>
		</main>
	);
};

export default App;
