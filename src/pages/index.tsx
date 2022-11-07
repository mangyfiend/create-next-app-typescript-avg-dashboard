import Link from "next/link";
import Layout from "../components/Layout";

function IndexPage() {
	return (
		<Layout title="AVG Dashbord" description="Go Fuck Yourself TS" keywords="AGC, NIRSAL, pussy">
			<h1>Hello Next.js 👋</h1>
			<p>
				<Link href="/about">About</Link>
			</p>
		</Layout>
	);
}

export default IndexPage;
