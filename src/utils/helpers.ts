import IFeatureCollection from "@interfaces/projects/avg-dashboard/GeoJSON";

// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

// split the cachedData into arrays
export function splitGeoJSONArray(arr: IFeatureCollection[], pageWidth: number): any[] {
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

// Add multiple classNames to nextjs elements
export const addStyles = (stylesModule, classes: string) => {
	const classList = classes.split(" ");
	classes = "";
	for (const className of classList) {
		classes += `${stylesModule[className]} `;
	}
	return classes;
};
