import LeftSidebarListPages from "./LeftSidebarListPages-v3";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v3";

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