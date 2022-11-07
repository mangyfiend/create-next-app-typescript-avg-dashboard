const API_URLS = Object.freeze({
	// TODO > combine parcelized-agcs + legacy-agcs in single endpoint
	NORMALIZED_GEOCLUSTERS: "https://geoclusters.herokuapp.com/api/v3/geoclusters",
	
	PARCELIZED_GEOCLUSTERS: `https://geoclusters.herokuapp.com/api/v1/parcelized-agcs/`,
	LEGACY_GEOCLUSTERS: `https://geoclusters.herokuapp.com/api/v2/legacy-agcs/`,
});

export default API_URLS;
