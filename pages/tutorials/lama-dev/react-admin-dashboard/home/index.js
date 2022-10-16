import { Fragment } from "react";
import styles from "./Home.module.scss"
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar"
import Widget from "../components/widget/Widget.jsx";
import SummaryChart from "../components/charts/summary-chart/SummaryChart";
import TrendChart from "../components/charts/trend-chart/TrendChart";
import TransactionsTable from "../components/transactions-table/TransactionsTable";

const Home = () => {
	return (
		<Fragment>
			<div className={styles.home}>
				<Sidebar></Sidebar>
				<div className={styles.homeContainer}>
					<Navbar></Navbar>
					<div>Home Container</div>
					<div className={styles.widgetsContainer}>
						<Widget widgetType="users"></Widget>
						<Widget widgetType="orders"></Widget>
						<Widget widgetType="earnings"></Widget>
						<Widget widgetType="balance"></Widget>
					</div>
					<div className={styles.chartsContainer}>
						<SummaryChart></SummaryChart>
						<TrendChart title={"6 month trend"}></TrendChart>
					</div>
					<div className={styles.tableContainer}>
						<div className={styles.tableTitle}>Latest Transactions</div>
						<TransactionsTable></TransactionsTable>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
