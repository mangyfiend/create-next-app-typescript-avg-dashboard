import styles from "./Widget.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { addStyles } from "@utils/helpers";

const Widget = ({ widgetType }) => {
	
	let widgetData;

	// fake fetch data
	const amount = 100;
	const diff = 20;

	switch (widgetType) {
		case "users":
			widgetData = {
				title: "USERS",
				isMoney: false,
				link: "See all users",
				icon: (
					<PersonOutlinedIcon
						className={styles.icon}
						style={{
							color: "crimson",
							backgroundColor: "rgba(255, 0, 0, 0.2)",
						}}
					/>
				),
			};
			break;
		case "orders":
			widgetData = {
				title: "ORDERS",
				isMoney: false,
				link: "View all orders",
				icon: (
					<ShoppingCartOutlinedIcon
						className={styles.icon}
						style={{
							backgroundColor: "rgba(218, 165, 32, 0.2)",
							color: "goldenrod",
						}}
					/>
				),
			};
			break;
		case "earnings":
			widgetData = {
				title: "EARNINGS",
				isMoney: true,
				link: "View net earnings",
				icon: <MonetizationOnOutlinedIcon className={styles.icon} style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }} />,
			};
			break;
		case "balance":
			widgetData = {
				title: "BALANCE",
				isMoney: true,
				link: "See details",
				icon: (
					<AccountBalanceWalletOutlinedIcon
						className={styles.icon}
						style={{
							backgroundColor: "rgba(128, 0, 128, 0.2)",
							color: "purple",
						}}
					/>
				),
			};
			break;
		default:
			break;
	}

	return (
		<div className={styles.widget}>
			<div className={styles.left}>
				<span className={styles.title}>{widgetData.title}</span>
				<span className={styles.counter}>{widgetData.isMoney && "$"}{amount}</span>
				<span className={styles.link}>{widgetData.link}</span>
			</div>
			<div className={styles.right}>
				<div className={addStyles(styles, "percentage positive")}>
					<KeyboardArrowUpIcon /> {diff} %
				</div>
				{widgetData.icon}
			</div>
		</div>
	);
};

export default Widget;