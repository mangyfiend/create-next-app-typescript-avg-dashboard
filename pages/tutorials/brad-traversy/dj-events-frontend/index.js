import React from "react";
import Layout from "../../../../components/brad-traversy/dj-events-frontend/Layout";
import { API_URL } from "@config/index";
import Link from "next/link";
import EventItem from "@components/brad-traversy/dj-events-frontend/EventItem";

export default function DJEventsHome({ events }) {
	console.log({ events });
	return (
		<Layout>
			<div>Upcoming Events</div>

			{!events || (events.length === 0 && <div>No events to show</div>)}

			{events.map((evt) => (
				<EventItem key={evt.id} eventItem={evt}></EventItem>
			))}

			{events.length > 0 && (
				<Link href="/events">
					<a href="" className="btn-secondary">
						View All Events
					</a>
				</Link>
			)}
		</Layout>
	);
}


// // GET DATA ON EACH TIME PAGE IS VISITED
// export async function getServerSideProps() {
// 	const res = await fetch(`${API_URL}/api/brad-traversy/dj-events`);
// 	const djEvents = await res.json();
// 	console.log({ djEvents });
// 	return {
// 		props: { events: djEvents.slice(0, 3) },
// 	};
// }


// USING STRPI BACKEND

// GET DATA ON EACH TIME PAGE IS VISITED
export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/dj-events/_sort=date:ASC&_limit=3`);
	const djEvents = await res.json();
	console.log({ djEvents });
	return {
		props: { events: djEvents },
	};
}
