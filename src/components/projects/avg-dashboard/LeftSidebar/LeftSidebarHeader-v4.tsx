import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import { ReactFragment } from "react";

export default function LeftSidebarHeader() {
	const { dataLoadingChk, liveDataTimestamp }: IDashboardContextProps = useDashboardContext();
	const { currentGeoclusters }: ILeftSidebarContextProps =
		useLeftSidebarContext();

	let listCountSpan: ReactFragment | JSX.Element;

	let timestampSpan = <span>Updated {new Date(liveDataTimestamp).toUTCString()}</span>;

	if (dataLoadingChk) timestampSpan = <div className="plain-text">loading data</div>;

	if (currentGeoclusters.length === 0) listCountSpan = <span> ... </span>;

	if (currentGeoclusters.length > 0) {
		listCountSpan = (
			<span>{`${
				currentGeoclusters.length > 1
					? `${currentGeoclusters.length} AGCs`
					: `${currentGeoclusters.length} AGC`
			}`}</span>
		);
	} else {
		listCountSpan = <span> ... </span>;
		timestampSpan = <span> ... </span>;
	}

	let headerMarkup = (
		<div className="flex-row-between">
			{listCountSpan}
			{timestampSpan}
		</div>
	);

	return <div>{headerMarkup}</div>;
}
