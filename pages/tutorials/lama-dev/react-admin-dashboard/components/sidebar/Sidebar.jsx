import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.top}>
				<Link href="/" style={{ textDecoration: "none" }}>
					<span className={styles.branding}>CarbonGames</span>
				</Link>
			</div>
			<div className={styles.center}>
				<ul>
					<Link
						href="/tutorials/lama-dev/react-admin-dashboard/home"
						style={{ textDecoration: "none" }}>
						<li>
							<DashboardIcon className={styles.icon}></DashboardIcon>
							<span>Dashboard</span>
						</li>
					</Link>
					<Link
						href="/tutorials/lama-dev/react-admin-dashboard/users"
						style={{ textDecoration: "none" }}>
						<li>
							<PersonOutlineIcon className={styles.icon}></PersonOutlineIcon>
							<span>Users</span>
						</li>
					</Link>
					<Link
						href="/tutorials/lama-dev/react-admin-dashboard/products"
						style={{ textDecoration: "none" }}>
						<li>
							<StoreIcon className={styles.icon}></StoreIcon>
							<span>Products</span>
						</li>
					</Link>
					<li>
						<CreditCardIcon className={styles.icon}></CreditCardIcon>
						<span>Orders</span>
					</li>
					<li>
						<LocalShippingIcon className={styles.icon}></LocalShippingIcon>
						<span>Deliveries</span>
					</li>
					<li>
						<InsertChartIcon className={styles.icon}></InsertChartIcon>
						<span>Stats</span>
					</li>
					<li>
						<NotificationsNoneIcon className={styles.icon}></NotificationsNoneIcon>
						<span>Notifications</span>
					</li>
					<li>
						<SettingsSystemDaydreamOutlinedIcon
							className={styles.icon}></SettingsSystemDaydreamOutlinedIcon>
						<span>System Health</span>
					</li>
					<li>
						<PsychologyOutlinedIcon className={styles.icon}></PsychologyOutlinedIcon>
						<span>Logs</span>
					</li>
					<li>
						<SettingsApplicationsIcon className={styles.icon}></SettingsApplicationsIcon>
						<span>Settings</span>
					</li>
					<li>
						<AccountCircleOutlinedIcon className={styles.icon}></AccountCircleOutlinedIcon>
						<span>Profile</span>
					</li>
					<li>
						<ExitToAppIcon className={styles.icon}></ExitToAppIcon>
						<span>Logout</span>
					</li>
				</ul>
			</div>
			<div className={styles.bottom}>
				<div
					className={styles.appThemeOption}
					onClick={() => dispatch({ type: "APP_LIGHT_THEME" })}></div>
				<div
					className={styles.appThemeOption}
					onClick={() => dispatch({ type: "APP_DARK_THEME" })}></div>
			</div>
		</div>
	);
};

export default Sidebar;
