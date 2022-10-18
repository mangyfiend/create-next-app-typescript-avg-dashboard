import React from "react";
import Head from "next/head";
import Layout from "../../../../components/brad-traversy/dj-events-frontend/Layout";
import { API_URL } from "@config/index";

export default function DJEventsHome({ events }) {
	return (
		<Layout>
			<div>Upcoming Events</div>
			{events.length === 0 && <div>No events to show</div>}
			{events.map((evt) => (
				<div key={evt.id}>{evt.name}</div>
			))}
		</Layout>
	);
}

export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = res.json();
	return {
		props: { events },
		revalidate: 1,
	};
}
