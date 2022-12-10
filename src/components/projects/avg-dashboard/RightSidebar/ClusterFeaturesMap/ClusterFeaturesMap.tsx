import React, { useRef, useEffect } from "react";
import Map, { Marker, GeolocateControl } from "react-map-gl";
import bbox from "@turf/bbox";
import { MAPBOX_TOKEN } from "@config/index";
// import CUSTOM_MAP_STYLE from "./sf-neighborhoods-map-style copy";
import type { MapboxStyle, MapRef, MapLayerMouseEvent } from "react-map-gl";
import styles from "@styles/projects/avg-dashboard/ClusterFeaturesMap.module.css";
import { getMapboxApiToken } from "@utils/helpers-v2";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import getMapWithStyledData from "./sf-neighborhoods-map-style";
import useUserLocationViewport from "@hooks/projects/avg-dashboard/useUserLocationViewport";

export default function ClusterFeaturesMap() {
	const { clickedClusterGeoJSON }: IDashboardContextProps = useDashboardContext();

	const CUSTOM_MAP_STYLE = getMapWithStyledData(clickedClusterGeoJSON);

	console.log({ CUSTOM_MAP_STYLE });

	const userLocationViewport = useUserLocationViewport({ zoom: 14, pitch: 50, bearing: 10 });

	const mapRef = useRef<MapRef>();

	useEffect(() => {
		console.log("COMPONENT MOUNTED");
		if (mapRef.current) {
			if (clickedClusterGeoJSON) {
				const geojsonBounds = bbox(clickedClusterGeoJSON);
				console.log({ geojsonBounds });
				mapRef.current.fitBounds(geojsonBounds);
			}
		}
		return () => {
			console.log("COMPONENT UN-MOUNTED");
			// mapRef.current = true;
		};
	}, [clickedClusterGeoJSON]);

	const onMapClick = (event: MapLayerMouseEvent) => {
		const feature = event.features[0];

		if (feature) {
			// calculate the bounding box of the feature
			console.log({ feature });
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
				initialViewState={userLocationViewport}
				mapStyle={CUSTOM_MAP_STYLE as MapboxStyle}
				interactiveLayerIds={["sf-neighborhoods-fill"]}
				onClick={onMapClick}
				// mapboxAccessToken={getMapboxApiToken()}
				mapboxAccessToken={MAPBOX_TOKEN}>
			</Map>
		</div>
	);
}
