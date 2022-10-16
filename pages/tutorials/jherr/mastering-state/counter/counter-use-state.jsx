import { useState } from "react";

//
const AdAOneButton = ({ setCounter }) => (
	<div>
		<button onClick={() => setCounter((v) => v + 1)}>Add One</button>
	</div>
);

//
const Counter = ({ counter }) => <div>Counter: {counter}</div>;

// main component
const CounterUseState = () => {
	const [counter, setCounter] = useState(0);
	return (
		<div>
			<AdAOneButton> buttonClickCounter={setCounter}</AdAOneButton>
		</div>
	);
};

export default CounterUseState;