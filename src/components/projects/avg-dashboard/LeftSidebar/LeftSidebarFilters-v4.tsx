import FiltersForm from "@components/projects/avg-dashboard/LeftSidebar/FiltersForm";
import BreadCrumbs from "@components/projects/avg-dashboard/Layouts/Breadcrumbs";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";
import ILeftSidebarContextProps from "@interfaces/projects/avg-dashboard/ILeftSidebarContextProps";

export default function LeftSidebarFilters() {
	const { clusterFilters }: ILeftSidebarContextProps = useLeftSidebarContext();
	return (
		<div>
			<FiltersForm></FiltersForm>
			<BreadCrumbs keyValueArr={Object.entries(clusterFilters)}></BreadCrumbs>
		</div>
	);
}
