export default function SearchBar({ searchText, onTextChangeHandler }) {
	return (    
		<form>
			<input
				type="text"
				value={searchText}
				placeholder="search [cached]"
				onChange={(evt) => onTextChangeHandler(evt.target.value)}>
			</input>
		</form>
	);
}
