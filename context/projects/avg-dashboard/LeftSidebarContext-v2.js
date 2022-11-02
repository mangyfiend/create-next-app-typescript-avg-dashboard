import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import { OBJECT_SELECTORS as OS } from "@utils/constants/object-property-selectors";
import { createContext, useState, useEffect } from "react";

const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children }) => {
	console.log("%c[LEFT SIDEBAR] CONTEXT PROVIDER RE-RENDERED", "color: blue");

	const { liveClustersData } = useDashboardContext();
	const [workingClustersData, setWorkingClustersData] = useState([]);
	const [filterText, setFilterText] = useState("");
	const [pageRowsLength, setPageRowsLength] = useState(0);

	// search #1 text input change
	const onFilterTextChange = (evt) => {
		setFilterText(evt.target.value);
	};

	//
	const onPageRowsSelectChange = (evt) => {
		setPageRowsLength(evt.target.value);
	};

	// filter the live data when text in the search input changes
	useEffect(() => {
		let filteredLiveData = null;

		if (liveClustersData) {
			filteredLiveData = liveClustersData.filter((record) => {
				const recordTitle = record.properties[OS.CLUSTER_TITLE].toLowerCase();
				return recordTitle.indexOf(filterText.toLowerCase()) !== -1;
			});

			if (filteredLiveData) {
				setWorkingClustersData(filteredLiveData);
			}
		}
		console.log({ filteredLiveData });
		return () => {};
	}, [liveClustersData, filterText]);

	return (
		<LeftSidebarContext.Provider
			value={{
				filterText,
				onFilterTextChange,
				onPageRowsSelectChange,
				pageRowsLength,
				workingClustersData,
			}}>
			{children}
		</LeftSidebarContext.Provider>
	);
};

export default LeftSidebarContext;
