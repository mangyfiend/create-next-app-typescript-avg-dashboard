export default function Breadcrumb({ keyValuePair }) {
	return (
		<div className="" style={{ margin: "2.5px", border: ".5px solid lightgrey" }}>
			<span>{[keyValuePair][0]}</span>
			<span>{[keyValuePair][1]}</span>
		</div>
	);
}
