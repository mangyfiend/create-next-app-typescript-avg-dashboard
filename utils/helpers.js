// split the cachedData into arrays
export function divideArray(arr, pageWidth) {
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

export function capitalize(s) {
	return s && s[0].toUpperCase() + s.slice(1);
}

// Add multiple classNames to nextjs elements
export const addStyles = (stylesModule, classes) => {
	const classList = classes.split(" ");
	classes = "";
	for (const className of classList) {
		classes += `${stylesModule[className]} `;
	}
	return classes;
};
