import React from "react";

export default function LeftSidebarHeader({ data }) {
	console.log({ data });
	return (
		<div>
			{!data && <div> ... </div>}
			{data && <div>{`${data.length > 1 ? `${data.length} AGCs` : `${data.length} AGC`}`}</div>}
		</div>
	);
}
