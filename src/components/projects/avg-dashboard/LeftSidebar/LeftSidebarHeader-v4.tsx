import useDashboardContext from "@hooks/projects/avg-dashboard/useDashboardContext";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import IDashboardContextProps from "@interfaces/projects/avg-dashboard/IDashboardContextProps";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function LeftSidebarHeader() {
	const { dataLoadingChk, liveDataTimestamp }: IDashboardContextProps = useDashboardContext();
	const { workingClustersArray }: ILeftSidebarContextProps = useLeftSidebarContext();

	let listCountSpan;

	let timestampSpan = <span>Updated {new Date(liveDataTimestamp).toUTCString()}</span>;

	if (dataLoadingChk) timestampSpan = <div className="plain-text">loading data</div>;

	if (workingClustersArray.length === 0) listCountSpan = <span> ... </span>;

	if (workingClustersArray.length > 0) {
		listCountSpan = (
			<span>{`${
				workingClustersArray.length > 1
					? `${workingClustersArray.length} AGCs`
					: `${workingClustersArray.length} AGC`
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
