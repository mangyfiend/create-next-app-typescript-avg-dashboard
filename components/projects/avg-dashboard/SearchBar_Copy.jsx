export default function SearchBar_Copy({ searchText, onTextChangeHandler }) {
	return (    
		<form>
			<input
				type="text"
				value={searchText}
				placeholder="search [cached]"
				onChange={onTextChangeHandler}>
			</input>
		</form>
	);
}
