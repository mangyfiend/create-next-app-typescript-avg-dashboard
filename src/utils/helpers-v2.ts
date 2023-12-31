import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";
import IParcelizedFeatureGeoJSON from "@interfaces/projects/avg-dashboard/IParcelizedFeatureGeoJSON";

// Add multiple classNames to nextjs elements
export const addStyles = (styles: { [x: string]: any }, classes: string) => {
	const classList = classes.split(" ");
	classes = "";
	for (const className of classList) {
		classes += `${styles[className]} `;
	}
	return classes;
};

// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export function getMapboxApiToken(): string {
	try {
		const mapboxApiToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
		if (!mapboxApiToken) throw Error(`MISSING MAPBOX API TOKEN`);
		return mapboxApiToken;
	} catch (getTokenErr) {
		getErrorMessage(getTokenErr);
	}
}

// split the cachedData into arrays
export function splitGeoJSONArray(
	arr: IFeatureCollection[] | IParcelizedFeatureGeoJSON[],
	pageWidth: number
): any[] {
	let finalArr = [];
	let tempArr = [];
	for (let idx = 0; idx < arr.length; idx++) {
		let sliceBoundary = idx + 1;
		tempArr.push(arr[idx]);
		if (sliceBoundary % pageWidth === 0) {
			finalArr.push(tempArr);
			tempArr = [];
		}
	}
	if (tempArr.length !== 0) {
		finalArr.push(tempArr);
	}
	return finalArr;
}

export function capitalize(s: string) {
	return s && s[0].toUpperCase() + s.slice(1);
}

export function getProperCase(s: string) {
	return s && s[0].toUpperCase() + s.slice(1);
}
