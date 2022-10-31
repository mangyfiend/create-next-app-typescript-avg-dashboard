import React from "react";
import Head from "next/head";
import styles from "@styles/DefaultLayout.module.css"

export default function DefaultLayout({ title, keywords, description, children }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<div className={styles.container}>
				{children}
			</div>
		</div>
	);
}
