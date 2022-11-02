import { useContext } from "react";
import LeftSidebarContext from "@context/projects/avg-dashboard/LeftSidebarContext-v3";

const useLeftSidebarContext = () => {
	return useContext(LeftSidebarContext);
};

export default useLeftSidebarContext;