export default function SearchBar2({ searchText, onTextChangeHandler }) {
	return (    
		<form>
			<input
				type="text"
				value={searchText}
				placeholder="search [live]"
				onChange={onTextChangeHandler}>
			</input>
		</form>
	);
}
