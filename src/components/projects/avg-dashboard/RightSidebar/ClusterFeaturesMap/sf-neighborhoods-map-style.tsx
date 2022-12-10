import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IGeoclusterGeoJSON from "@interfaces/projects/avg-dashboard/IGeoclusterGeoJSON";
import type { GeoJSONSourceRaw, FillLayer, LineLayer, MapboxStyle } from "react-map-gl";
import MAP_STYLE from "./map-style-basic-v8.json";

export default function getMapWithStyledData(geojsonData: IFeatureCollection | IGeoclusterGeoJSON) {
	const sfNeighborhoods: GeoJSONSourceRaw = {
		type: "geojson",
		data: geojsonData,
	};

  // const MAP_STYLE = `mapbox://styles/mapbox/streets-v11`;

	const fillLayer: FillLayer = {
		id: "sf-neighborhoods-fill",
		source: "sf-neighborhoods",
		type: "fill",
		paint: {
			"fill-outline-color": "#0040c8",
			"fill-color": "#fff",
			"fill-opacity": 0.3,
		},
	};

	const lineLayer: LineLayer = {
		id: "sf-neighborhoods-outline",
		source: "sf-neighborhoods",
		type: "line",
		paint: {
			"line-width": 2,
			"line-color": "#0080ef",
		},
	};

	// Make a copy of the map style
	// export default {
	//   ...MAP_STYLE,
	//   sources: {
	//     ...MAP_STYLE.sources,
	//     ['sf-neighborhoods']: sfNeighborhoods
	//   },
	//   layers: [...MAP_STYLE.layers, fillLayer, lineLayer]
	// };
	const CUSTOM_MAP_STYLE = {
		...MAP_STYLE,
		sources: {
			...MAP_STYLE.sources,
			["sf-neighborhoods"]: sfNeighborhoods,
		},
		layers: [...MAP_STYLE.layers, fillLayer, lineLayer],
	};

	return CUSTOM_MAP_STYLE;
}
