import Breadcrumb from "./Breadcrumb";

export default function Breadcumbs({ keyValueArr }) {
	if (!keyValueArr || keyValueArr.length == 0) return <span> ... </span>;
	return (
		<div className="flex-row" style={{flexWrap: "wrap"}}>
			{keyValueArr.map((pair, idx) => (
				<Breadcrumb key={idx} keyValuePair={pair}></Breadcrumb>
			))}
		</div>
	);
}
