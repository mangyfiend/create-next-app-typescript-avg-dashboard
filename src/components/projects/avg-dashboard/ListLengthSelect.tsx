export default function ListLengthSelect({ handleListLengthChange }): JSX.Element {
	return (
		<div className="flex-row">
			<select name="" id="" onChange={handleListLengthChange}>
				<option value={0}>show all</option>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={50}>50</option>
			</select>
		</div>
	);
}
