import EventItem from "@components/brad-traversy/dj-events-frontend/EventItem";
import { API_URL } from "@config/index";
import React from "react";
import Layout from "@components/brad-traversy/dj-events-frontend/Layout";

export default function Events({events}) {
	return (
		<Layout title={"All Events"}>

			<div>All Events</div>
			{events.length === 0 && <div>No events to show</div>}

			{events.map((evt) => (
				<EventItem key={evt.id} eventItem={evt}></EventItem>
			))}
		</Layout>
	);
}

export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/api/brad-traversy/dj-events`);
	const djEvents = await res.json();
	return {
		props: { events: djEvents },
	};
}