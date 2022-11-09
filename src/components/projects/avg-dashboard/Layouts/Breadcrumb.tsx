export default function Breadcrumb({
	keyValuePair,
}: {
	keyValuePair: [string, string | boolean | number];
}) {
	const crumbKey = keyValuePair[0];
	// "true / false" cannot be passed into a ReactNode
	const crumbValue =
		typeof keyValuePair[1] === "boolean" ? String(keyValuePair[1]) : keyValuePair[1];
	return (
		<div className="" style={{ margin: "2.5px", border: ".5px solid lightgrey" }}>
			<span>{crumbKey}</span>
			<span>{crumbValue}</span>
		</div>
	);
}
