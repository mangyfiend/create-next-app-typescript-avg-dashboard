import { useState, useEffect } from "react";

export default function useUserLocationViewport({
	zoom,
	pitch,
	bearing,
}: {
	zoom: number;
	pitch: number;
	bearing: number;
}): { latitude: number; longitude: number; zoom: number; pitch: number; bearing: number } {
	const [viewport, setViewport] = useState({
		latitude: 7.036919026449687,
		longitude: 4.654776030857737,
		zoom: 5.5,
		pitch: 50,
		bearing: 10,
	});
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setViewport((prevViewport) => {
				return {
					...prevViewport,
					latitude: pos.coords.latitude,
					longitude: pos.coords.longitude,
					zoom: zoom,
					pitch: pitch,
					bearing: bearing,
				};
			});
		});
	}, [bearing, pitch, zoom]);
	return viewport;
}
