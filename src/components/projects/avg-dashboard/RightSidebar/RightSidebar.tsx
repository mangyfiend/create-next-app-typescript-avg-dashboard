import { useEffect, useRef } from "react";
import React, { createContext, useState } from "react";
import styles from "@styles/projects/avg-dashboard/RightSidebar.module.css";
import LeftSidebarListControls from "../LeftSidebar/LeftSidebarListControls-v4";
import SidebarListPages from "@components/projects/avg-dashboard/RightSidebar/SidebarListPages";
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

export function RightSidebarMap({ children }: { children: React.ReactNode }): JSX.Element {
	return <div className="right-sidebar-map-container">Cluster Features Map</div>;
}

export function RightSidebarList({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		// <div className="right-sidebar-container">
		<div className="right-sidebar-list-wrapper">
			<div>
				{/* <div>Cluster Features List</div> */}
				{children}
				{/* <div>Cluster Features List Controls</div> */}
			</div>
			<div>Cluster Features Filters</div>
		</div>
		// </div>
	);
}

import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import getGeoclusterProperties from "@utils/getGeoclusterProperties";
export function RightSidebarHeader() {
	const { clickedClusterData }: IDashboardContextProps | undefined = useDashboardContext();

	if (clickedClusterData) {
		const clusterProperties = getGeoclusterProperties(clickedClusterData);

		return (
			<>
				<div>{clusterProperties.clusterTitle}</div>
				<div>
					{clusterProperties.clusterFeatsNum} {clusterProperties.featuresDescription}
				</div>
				<div>{clusterProperties.clusterLocation} </div>
			</>
		);
	} else {
		return <div> Right Sidebar Header </div>;
	}
}

export default function RightSidebar() {
	return (
		<div className={styles["right-sidebar-container"]}>
			<RightSidebarMap>
				<div>Mapbox GL JS Map</div>
			</RightSidebarMap>
			<RightSidebarHeader></RightSidebarHeader>
			<div>Search Bar</div>
			<RightSidebarList>
				<SidebarListPages></SidebarListPages>
			</RightSidebarList>
			<LeftSidebarListControls></LeftSidebarListControls>
			{/* <>
			</> */}
		</div>
	);
}
