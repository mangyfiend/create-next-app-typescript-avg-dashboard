import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./SummaryChart.module.scss";
import { addStyles } from "../../../../../../../src/utils/helpers.js";

const SummaryChart = () => {
	return (
		<div className={styles.summaryChart}>
			<div className={styles.top}>
				<h1 className={styles.title}>Total Revenue</h1>
				<MoreVertIcon fontSize="small" />
			</div>
			<div className={styles.bottom}>
				<div className={styles.featuredChart}>
					<CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
				</div>
				<p className={styles.title}>Total sales made today</p>
				<p className={styles.amount}>$420</p>
				<p className={styles.desc}>Previous transactions processing. Last payments may not be included.</p>
				<div className={styles.summary}>
					<div className={styles.summaryItem}>
						<div className={styles.itemTitle}>Target</div>
						<div className={addStyles(styles, "itemResult negative")}>
							<KeyboardArrowDownIcon fontSize="small" />
							<div className={styles.resultAmount}>$12.4k</div>
						</div>
					</div>
					<div className={styles.summaryItem}>
						<div className={styles.itemTitle}>Last Week</div>
						<div className={addStyles(styles, "itemResult positive")}>
							<KeyboardArrowUpOutlinedIcon fontSize="small" />
							<div className={styles.resultAmount}>$12.4k</div>
						</div>
					</div>
					<div className={styles.summaryItem}>
						<div className={styles.itemTitle}>Last Month</div>
						<div className={addStyles(styles, "itemResult positive")}>
							<KeyboardArrowUpOutlinedIcon fontSize="small" />
							<div className={styles.resultAmount}>$12.4k</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SummaryChart;
