import Breadcrumb from "./Breadcrumb";
import styles from "@styles/projects/avg-dashboard/LeftSidebarFilters.module.css";

export default function Breadcumbs({
	keyValueArr,
}: {
	keyValueArr: [string, string | boolean | number][];
}) {

	let markup: JSX.Element;

	if (!keyValueArr || keyValueArr.length < 1) {
		markup = <div> ... </div>;
	} else {
		markup = (
			<div className="flex-row" style={{ flexWrap: "wrap" }}>
				{keyValueArr.map((pair, idx) => (
					<Breadcrumb key={idx} keyValuePair={pair}></Breadcrumb>
				))}
			</div>
		);
	}

	return (
		<div className={styles["filter-breadcrumbs-wrapper"]}>
			<div>Filter Breadcrumbs</div>
			{markup}
		</div>
	);
}
