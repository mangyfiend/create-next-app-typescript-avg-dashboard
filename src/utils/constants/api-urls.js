const API_URLS = Object.freeze({
	HEROKU: {
		// TODO > combine parcelized-agcs + legacy-agcs in single endpoint
		NORMALIZED_GEOCLUSTERS: "https://geoclusters.herokuapp.com/api/v3/geoclusters",
		PARCELIZED_GEOCLUSTERS: `https://geoclusters.herokuapp.com/api/v1/parcelized-agcs/`,
		LEGACY_GEOCLUSTERS: `https://geoclusters.herokuapp.com/api/v2/legacy-agcs/`,
	},
	LOCAL: {
		NORMALIZED_GEOCLUSTERS: "http://127.0.0.1:9090/api/v3/geoclusters",
		PARCELIZED_GEOCLUSTERS: `http://127.0.0.1:9090/api/v1/parcelized-agcs/`,
		LEGACY_GEOCLUSTERS: `http://127.0.0.1:9090/api/v2/legacy-agcs/`,
	}
});

export default API_URLS;
