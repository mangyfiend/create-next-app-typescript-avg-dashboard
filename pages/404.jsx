import Link from "next/link";
import Layout from "../components/brad-traversy/dj-events-frontend/Layout";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "../styles/404.module.css"

export default function NotFoundPge() {
	return (
		<Layout title="Page Not Found">
			<div className={styles.error}>
				<div>
					<FaExclamationTriangle>404</FaExclamationTriangle>
				</div>
				<p>Sorry, there is nothing here</p>
				<Link href="/">Go Back Home</Link>
			</div>
		</Layout>
	);
}
