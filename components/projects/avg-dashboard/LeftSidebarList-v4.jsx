import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import LeftSidebarListPages from "./LeftSidebarListPages-v4";

export default function LeftSidebarList() {
	const { clusterPagesArray } = useLeftSidebarContext();
	return (
		<>
			<>
				{clusterPagesArray.length > 0 ? (
					<LeftSidebarListPages></LeftSidebarListPages>
				) : (
					<div>nothing here</div>
				)}
			</>
		</>
	);
}