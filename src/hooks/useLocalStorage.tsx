import { useState } from "react";
import {getErrorMessage} from "@utils/helpers"

function useLocalStorage(key: string, initialValue: any) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
      getErrorMessage(error)
			console.log({error});
			return initialValue;
		}
	});

	const setValue = (value: any) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (e) {
			console.log(e);
		}
	};
	return [storedValue, setValue];
}

export default useLocalStorage;
