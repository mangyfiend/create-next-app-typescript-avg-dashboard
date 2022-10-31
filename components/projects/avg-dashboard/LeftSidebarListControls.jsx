import React from "react";
import { useState } from "react";

export default function LeftSidebarListControls({ onSelectChangeHandler }) {
	const [viewOption, setViewOption] = useState("scroll");

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				// justifyContent: "space-evenly",
			}}>
			<select
				className="flex-1"
				name=""
				id=""
				onChange={(evt) => setViewOption(evt.target.value)}>
				<option value="scroll">Scroll</option>
				<option value="pagenation">Pagenation</option>
			</select>
			{viewOption === "pagenation" && (
				<div
					className="flex-row"
				>
					<select
						className="fit-content"
						name=""
						id=""
						onChange={onSelectChangeHandler}>
						<option disabled value="">
							results per page
						</option>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
					</select>
					<button>Prev</button>
					<button>Next</button>
				</div>
			)}
		</div>
	);
}
