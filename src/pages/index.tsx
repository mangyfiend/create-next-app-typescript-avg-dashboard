import Link from "next/link";
import Layout from "../components/Layout";

function IndexPage() {
	return (
		<Layout
			title="AVG Dashbord"
			description="The Next.js + Typescript version of the AVG Dashboard"
			keywords="AGC, NIRSAL, Dashboard, React, Next.js">
			<p>Hello Next.js 👋</p>
			<p>
				<Link href="/about">About</Link>
			</p>
		</Layout>
	);
}

export default IndexPage;
