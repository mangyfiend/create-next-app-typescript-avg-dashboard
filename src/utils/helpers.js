// Add multiple classNames to nextjs elements
export const addStyles = (styles, classes) => {
	const classList = classes.split(" ");
	classes = "";
	for (const className of classList) {
		classes += `${styles[className]} `
	}
	return classes;
}