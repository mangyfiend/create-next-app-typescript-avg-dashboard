import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";
import LeftSidebarListPages from "./LeftSidebarListPages-v4";

export default function LeftSidebarList() {
	const { clusterPagesArray }: ILeftSidebarContextProps = useLeftSidebarContext();
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
