import Breadcrumb from "./Breadcrumb";

export default function Breadcumbs({
	keyValueArr,
}: {
	keyValueArr: [string, string | boolean | number][];
}) {
	if (!keyValueArr || keyValueArr.length < 1) return <span> ... </span>;
	return (
		<div className="flex-row" style={{ flexWrap: "wrap" }}>
			{keyValueArr.map((pair, idx) => (
				<Breadcrumb key={idx} keyValuePair={pair}></Breadcrumb>
			))}
		</div>
	);
}
