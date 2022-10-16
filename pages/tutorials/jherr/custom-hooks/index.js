// REACT CUSTOM HOOK
// @JHERR > YOUTUBE

import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
	const [data, setData] = useState([]);
	const [fetchError, setFetchError] = useState(null);
	const [dataIsLoading, setDataIsLoading] = useState(false);

	useEffect(() => {
		let componentIsMounted = true;
		const CancelToken = axios.CancelToken;
		let source = CancelToken.source();

      // ?????
      // save the new request for cancellation
      source = axios.CancelToken.source();

		const fetchData = async (url) => {
			setDataIsLoading(true);

			try {
				const response = await axios.get(url, {
					cancelToken: source.token,
				});

				if (componentIsMounted) {
					setData(response.data);
					setFetchError(null);
				}
			} catch (error) {
				if (componentIsMounted) {
					setFetchError(error.message);
					setData([]);
				}
			} finally {
				componentIsMounted && setTimeout(() => setDataIsLoading(false), 2000);
			}
		};

		// exec. function
		fetchData(dataUrl);

		// cleanup
		return () => {
			console.log("clean up function");
			componentIsMounted = false;
			source.cancel();
		};
	}, [dataUrl]);

	return { data, fetchError, dataIsLoading };
};

export default useAxiosFetch;