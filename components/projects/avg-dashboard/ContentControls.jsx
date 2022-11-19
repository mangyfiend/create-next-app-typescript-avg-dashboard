import React from "react";
import { useState } from "react";

export default function ContentControls({ onSelectChangeHandler }) {
	const [viewOption, setViewOption] = useState("scroll");
	const [pageLength, setPageLength] = useState(0);
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
						// onChange={(evt) => setPageLength(evt.target.value)}>
						onChange={onSelectChangeHandler}>
						<option disabled={true} selected value="">
							results per page
						</option>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={20}>20</option>
					</select>
					<button>Prev</button>
					<button>Next</button>
					<div>{`Page 1 of 1`}</div>
				</div>
			)}
		</div>
	);
}
