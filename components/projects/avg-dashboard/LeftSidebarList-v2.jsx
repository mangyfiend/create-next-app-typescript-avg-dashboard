import LeftSidebarListPages from "./LeftSidebarListPages";

export default function LeftSidebarList({ pagenatedData }) {
	return (
		<div>
			<div>
				{pagenatedData && (
					<LeftSidebarListPages
						pagesArray={pagenatedData}></LeftSidebarListPages>
				)}
			</div>
		</div>
	);
}
