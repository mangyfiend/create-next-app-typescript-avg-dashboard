import { useContext } from "react";
import DashboardContext from "@context/projects/avg-dashboard/DashboardContext";

const useDashboardContext = () => {
	return useContext(DashboardContext);
};

export default useDashboardContext;
