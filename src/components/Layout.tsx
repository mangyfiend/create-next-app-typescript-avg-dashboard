import React from "react";
import Head from "next/head";

type LayoutProps = {
	title: string;
	description?: string;
	keywords?: string;
	children: React.ReactNode;
};

// TYPING "defaultProps" USING OBJECT DEFAULT VALUES & type coercion
export default function Layout({
	title = "Home | Next.js + TypeScript",
	keywords = "Next.js, Typescript, React",
	description = "Next.js, Typescript, React",
	children,
}: LayoutProps) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			{children}
		</div>
	);
}

// REMOVE > WILL BE DEPRECATED FROM REACT SOON
// Layout.defaultProps = {
// 	title: "Home | Next.js + TypeScript Example"",
// 	description: "Find the hottest DJ and other musical events",
// 	keywords: "music, dj, edm, dj events",
// };
