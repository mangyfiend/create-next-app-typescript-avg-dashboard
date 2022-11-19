import React from "react";

export default function LeftSidebarHeader({ headerData }) {
	console.log({ headerData });
	return (
		<div>
			{!headerData && <div> ... </div>}
			{headerData && <div>{`${headerData.length > 1 ? `${headerData.length} AGCs` : `${headerData.length} AGC`}`}</div>}
		</div>
	);
}
