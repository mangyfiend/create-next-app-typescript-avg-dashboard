import { createContext, useState, useEffect, useRef } from "react";

const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children }) => {
	console.log("LEFT SIDEBAR CONTEXT PROVIDER RE-RENDERED");

	const [filterText2, setFilterText2] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState(0);

	const [agcs, setAgcs] = useState(null);
	const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
	const fetchDataIntervalId = useRef();
	const [filteredAgcs, setFilteredAgcs] = useState(null);

	// search2 text input change
	const onFilterTextChange = (evt) => {
		setFilterText2(parseInt(evt.target.value));

		// console.log({ filterText2 });
	};

	//
	const onPageRowsSelectChange = (evt) => {
		setPageRowsLength(evt.target.value);
	};

	//
	// ????? DON'T UNDERSTAND HOW THIS WORKS
	const setFetchDataInterval = (interval) => {
		// Clear old interval
		if (fetchDataIntervalId.current) {
			clearInterval(fetchDataIntervalId.current);
			fetchDataIntervalId.current = undefined;
		}

		// Set new interval
		if (interval > 0) {
			fetchDataIntervalId.current = setInterval(() => {
				setFetchDataTrigger(Date.now());
			}, interval);
		}
	};

	// trigger API call
	useEffect(() => {
		console.log("useEffect GEOCLUSTERS API FETCH RUNNING");
		const fetchData = async () => {
			try {
				const apiResponse = await fetch(`https://geoclusters.herokuapp.com/api/v1/agcs/`);

				const apiDocs = await apiResponse.json();

				setAgcs(apiDocs.agcs);
			} catch (err) {
				console.warn(err.message);
				console.warn(`[ FAILED TO FETCH ]`)
			}
		};

		fetchData();

		// Clean up for unmount to prevent memory leak
		return () => clearInterval(fetchDataIntervalId.current);
	}, [fetchDataTrigger]);

	// select diff. option for API refresh interval
	const onIntervalSelectChange = (evt) => {
		console.log("YOU ARE SELECTED");
		setFetchDataInterval(evt.target.value);
	};

	// update "agcs" after new API fetch trigger
	useEffect(() => {
		if (agcs) {
			const filteredResults = agcs.filter((result) => {
				const resultTitle = result.properties.extended_name.toLowerCase();
				return resultTitle.indexOf(filterText2.toLowerCase()) !== -1;
			});

			setFilteredAgcs(filteredResults);
		}
		return () => {
			//  TODO
		};
	}, [agcs, filterText2]);

	console.log({ agcs });
	console.log({ filteredAgcs });

	return (
		<LeftSidebarContext.Provider
			value={{
				agcs,
				onFilterTextChange,
				onIntervalSelectChange,
				onPageRowsSelectChange,
				pageRowsLength,
				filterText2,
				filteredAgcs,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;
