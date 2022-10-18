import React from "react";
import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

function EventItem({ eventItem }) {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						eventItem.image && eventItem.image.data
							? eventItem.image.data.attributes.formats.thumbnail.url
							: "/images/event-default.png"
					}
					width={170}
					height={100}
				/>
			</div>

			<div className={styles.info}>
				<span>
					{new Date(eventItem.date).toLocaleDateString("pt-pt")} at {eventItem.time}
				</span>
				<h3>{eventItem.name}</h3>
			</div>

			<div className={styles.link}>
				<Link href={`/events/${eventItem.eventId}`}>
					<a className="btn">Details</a>
				</Link>
			</div>
		</div>
	);
}

export default EventItem;