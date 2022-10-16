import { Fragment } from "react";
import styles from "./Users.module.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Datatable from "../components/datatable/Datatable"

const Users = () => {
	return (
		<Fragment>
			<div className={styles.users}>
				<Sidebar></Sidebar>
				<div className={styles.usersContainer}>
					<Navbar></Navbar>
					<Datatable></Datatable>
				</div>
			</div>
		</Fragment>
	);
};

export default Users;