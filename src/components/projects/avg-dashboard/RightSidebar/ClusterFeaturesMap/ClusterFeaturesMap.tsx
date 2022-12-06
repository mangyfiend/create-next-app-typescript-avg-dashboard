import * as React from "react";
import { useRef } from "react";
import Map from "react-map-gl";
import bbox from "@turf/bbox";
import CUSTOM_MAP_STYLE from "./sf-neighborhoods-map-style";
import type { MapboxStyle, MapRef, MapLayerMouseEvent } from "react-map-gl";
import styles from "@styles/projects/avg-dashboard/ClusterFeaturesMap.module.css";
import { getMapboxApiToken } from "@utils/helpers-v2";
import { MAPBOX_TOKEN } from "@config/index";

export default function ClusterFeaturesMap() {
	
	console.log({ CUSTOM_MAP_STYLE });

	const mapRef = useRef<MapRef>();

	const onMapClick = (event: MapLayerMouseEvent) => {
		const feature = event.features[0];

		if (feature) {
			// calculate the bounding box of the feature
			const [minLng, minLat, maxLng, maxLat] = bbox(feature);

			mapRef.current.fitBounds(
				[
					[minLng, minLat],
					[maxLng, maxLat],
				],
				{ padding: 40, duration: 1000 }
			);
		}
	};

	return (
		<div className={styles["map-container"]}>
			<Map
				ref={mapRef}
				initialViewState={{
					latitude: 37.78,
					longitude: -122.4,
					zoom: 11,
				}}
				mapStyle={CUSTOM_MAP_STYLE as MapboxStyle}
				interactiveLayerIds={["sf-neighborhoods-fill"]}
				onClick={onMapClick}
				// mapboxAccessToken={getMapboxApiToken()}
				mapboxAccessToken={MAPBOX_TOKEN}
			/>
		</div>
	);
}
