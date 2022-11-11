import { useContext } from "react";
import RightSidebarContext from "@context/projects/avg-dashboard/RightSidebarContext";

const useRightSidebarContext = () => {
	return useContext(RightSidebarContext);
};

export default useRightSidebarContext;
