import { useContext } from "react";
import FormContext from "@context/tutorials/dave-gray/multi-step-form/FormContext.jsx";

const useFormContext = () => {
	return useContext(FormContext);
};

export default useFormContext;