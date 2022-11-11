import { ReactElement, JSXElementConstructor, ReactFragment } from "react";

export default function Breadcrumb({
	keyValuePair,
}: {
	keyValuePair: [string, string | boolean | number];
}) {
	const crumbKey = keyValuePair[0];

	let crumbDisplayValue:
		| string
		| number
		| boolean
		| ReactElement<any, string | JSXElementConstructor<any>>
		| ReactFragment;

	// "true / false" cannot be passed into a ReactNode
	// in plain Javascript, they would show as blank
	if (typeof keyValuePair[1] == "boolean") {
		crumbDisplayValue = String(keyValuePair[1]);
		crumbDisplayValue = crumbDisplayValue === "true" ? "yes" : "no";
	} else {
		crumbDisplayValue = keyValuePair[1];
	}
	return (
		<div className="" style={{ margin: "2.5px", border: ".5px solid lightgrey" }}>
			<span>{crumbKey}</span>
			<span> - </span>
			<span>{crumbDisplayValue}</span>
		</div>
	);
}
