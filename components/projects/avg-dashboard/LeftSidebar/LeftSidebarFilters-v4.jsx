import FiltersForm from "@components/projects/avg-dashboard/LeftSidebar/FiltersForm";
import BreadCrumbs from "@components/projects/avg-dashboard/Layouts/Breadcrumbs";
import styles from "@styles/projects/avg-dashboard/LeftSidebarFilters.module.css";
import useLeftSidebarContext from "@hooks/projects/avg-dashboard/useLeftSidebarContext-v4";


export default function LeftSidebarFilters() {
	const { clusterFilters } = useLeftSidebarContext();
	return (
		<>
			<div className={styles["filters-form-wrapper"]}>
				<FiltersForm></FiltersForm>
			</div>
			<div className={styles["filter-breadcrumbs-wrapper"]}>
				<span>Flter Breadcrumbs</span>
				<BreadCrumbs keyValueArr={Object.entries(clusterFilters)}></BreadCrumbs>
			</div>
		</>
	);
}
