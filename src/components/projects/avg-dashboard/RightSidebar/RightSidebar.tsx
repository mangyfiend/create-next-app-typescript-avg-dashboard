import { useEffect, useRef } from "react";
import React, { createContext, useState } from "react";
import styles from "@styles/projects/avg-dashboard/RightSidebar.module.css";
import LeftSidebarListControls from "../LeftSidebar/LeftSidebarListControls-v4";
import SidebarListPages from "@components/projects/avg-dashboard/RightSidebar/SidebarListPages"
import IRightSidebarContextProps from "@interfaces/projects/avg-dashboard/IRightSidebarContextProps";

// def. context
export const RightSidebarContext = createContext<IRightSidebarContextProps | {}>({});

// // create context store
// export const RightSidebarStore = ({ children }: { children: React.ReactNode }): JSX.Element => {

// 	const [clickedClusterData, setClickedClusterData] = useState<IGeoclustersGeoJSON>({});
//   const renderRef = useRef(false);

// 	useEffect(() => {
// 		if (renderRef.current) {
// 			console.log(clickedClusterData.features);
// 		}
// 		return () => {
// 			renderRef.current = true;
// 		};
// 	}, [clickedClusterData]);

// 	return (
// 		<RightSidebarContext.Provider
// 			value={{
// 				clickedClusterData,
// 				setClickedClusterData,
// 			}}>
// 			{children}
// 		</RightSidebarContext.Provider>
// 	);
// };

export function RightSidebarList({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className="right-sidebar-container">
			<div className="features-list-wrapper">
				<div>Right Sidebar Header</div>
				<div>
					{/* <div>Cluster Features List</div> */}
					{children}
					{/* <div>Cluster Features List Controls</div> */}
				</div>
			</div>
			<div>Cluster Features Filters</div>
		</div>
	);
}

export default function RightSidebar() {
	return (
		<div className={styles["right-sidebar-container"]}>
			<div>Search Bar</div>
			<RightSidebarList>
				<SidebarListPages></SidebarListPages>
			</RightSidebarList>
			<LeftSidebarListControls></LeftSidebarListControls>
		</div>
	);
}
