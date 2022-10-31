import Layout from "@components/brad-traversy/dj-events-frontend/Layout";
import { API_URL } from "@config/index";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function EventPage({ djEvent }) {
	const router = useRouter();
	console.log(router);

	return (
		<Layout>
			<div className={styles.event}>
				<span>
					{new Date(djEvent.date).toLocaleDateString("en-US")} at {djEvent.time}
				</span>
				<h1>{djEvent.name}</h1>
				{/* <ToastContainer /> */}
				{djEvent.image && (
					<div className={styles.image}>
						<Image src={djEvent.image.formats.medium.url} width={960} height={600} />
					</div>
				)}

				<h3>Performers:</h3>
				<p>{djEvent.performers}</p>
				<h3>Description:</h3>
				<p>{djEvent.description}</p>
				<h3>Venue: {djEvent.venue}</h3>
				<p>{djEvent.address}</p>

				{/* <EventMap djEvent={djEvent} /> */}

				<Link href="/events">
					<a className={styles.back}>{"<"} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
}

// UNIQE PAGE GENERATION MTD-1
// REQUEST MADE AT BUILD TIME..
// STATIC SITE GENERATION WITH getStaticPaths() + getStaticProps()
export async function getStaticPaths() {
	// return {
	//   paths: [
	//     {params: {eventId: 1}},
	//     {params: {eventId: 2}},
	//     {params: {eventId: 3}},
	//   ]
	// }
	const res = await fetch(`${API_URL}/api/brad-traversy/dj-events/`);
	const eventDocs = await res.json();
	const paths = eventDocs.map((evtDoc) => ({
		params: { eventId: evtDoc.eventId },
	}));
	return {
		paths,

		// show a 404 page if the resouce isn't found at build
		// set to "true" if you want to make a request for that resouce at build...???
		fallback: false,
	};
}

// STATIC SITE GENERATION WITH getStaticPaths() + getStaticProps()
export async function getStaticProps({ params: { eventId } }) {
	const res = await fetch(`${API_URL}/api/brad-traversy/dj-events/${eventId}`);
	console.log({ res });
	const eventDoc = await res.json();
	console.log({ eventDoc });
	return {
		props: { djEvent: eventDoc[0] },
		revalidate: 1,
	};
}

// UNIQE PAGE GENERATION MTD-2

// export async function getServerSideProps({ query: { eventId } }) {
//   const res = await fetch(`${API_URL}/api/brad-traversy/dj-events/${eventId}`);
// 	console.log({ res });
// 	const eventDoc = await res.json();
// 	console.log({ eventDoc });
// 	return {
// 		props: { djEvent: eventDoc[0] },
// 	};
// }
