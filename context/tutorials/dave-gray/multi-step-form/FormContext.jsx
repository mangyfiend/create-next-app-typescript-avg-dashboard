// PROVIDES "GLOBAL STATE" FOR THE FORM

import { createContext, useState, useEffect } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {

	const pageTitles = Object.freeze({
		0: "Billing Info",
		1: "Shipping Info",
		2: "Opt-In",
	});

	const [pageNum, setPageNum] = useState(0);

	const [data, setData] = useState({
		billFirstName: "",
		billLastName: "",
		billAddress1: "",
		billAddress2: "",
		billCity: "",
		billState: "",
		billZipCode: "",
		sameAsBillingChk: false,
		shipFirstName: "",
		shipLastName: "",
		shipAddress1: "",
		shipAddress2: "",
		shipCity: "",
		shipState: "",
		shipZipCode: "",
		optInNewsChk: false,
	});

	useEffect(() => {
		if (data.sameAsBillingChk) {
			setData((prevData) => ({
				...prevData,
				shipFirstName: prevData.billFirstName,
				shipLastName: prevData.billLastName,
				shipAddress1: prevData.billAddress1,
				shipAddress2: prevData.billAddress2,
				shipCity: prevData.billCity,
				shipState: prevData.billState,
				shipZipCode: prevData.billZipCode,
			}));
		} else {
			setData((prevData) => ({
				...prevData,
				shipFirstName: "",
				shipLastName: "",
				shipAddress1: "",
				shipAddress2: "",
				shipCity: "",
				shipState: "",
				shipZipCode: "",
			}));
		}
	}, [data.sameAsBillingChk]);

	const handleChange = (e) => {
		const type = e.target.type;

		const name = e.target.name;

		const value = type === "checkbox" ? e.target.checked : e.target.value;

		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// USE DESTRUCTURING TO ISOLATE OUT THE "requiredInputs" FROM "data"
	// NOTE THAT THE OPTIONAL VARAIABLES ARE NEVER USED AFTER BEING DEFINED, AND THAT'S OK
	const { billAddress2, sameAsBillingChk, shipAddress2, optInNewsChk, ...requiredInputs } = data;

	// 1. VALIDATE THAT ALL THE REQUIRED INPUTS HAVE A VALUE
	// 2. ENSURE THAT SUBMISSION CAN ONLY HAPPEN ON THE LAST PAGE
	const canSubmitChk =
		[...Object.values(requiredInputs)].every(Boolean) && pageNum === Object.keys(pageTitles).length - 1;

	const canNextPage1 = Object.keys(data)
		.filter((key) => key.startsWith("bill") && key !== "billAddress2")
		.map((key) => data[key])
		.every(Boolean);

	const canNextPage2 = Object.keys(data)
		.filter((key) => key.startsWith("ship") && key !== "shipAddress2")
		.map((key) => data[key])
		.every(Boolean);

	const disablePrev = pageNum === 0;

	const disableNextChk =
		pageNum === Object.keys(pageTitles).length - 1 ||
		(pageNum === 0 && !canNextPage1) ||
		(pageNum === 1 && !canNextPage2);

	const prevHideClass = pageNum === 0 && "remove-button";

	const nextHideClass = pageNum === Object.keys(pageTitles).length - 1 && "remove-button";

	const submitHideClass = pageNum !== Object.keys(pageTitles).length - 1 && "remove-button";

	return (
		<FormContext.Provider
      // RETURN VALUES WHICH WILL BE AVAILABLE TO THE CHILD COMPONENTS
			value={{
				pageTitles,
				pageNum,
				setPageNum,
				data,
				setData,
				canSubmitChk,
				handleChange,
				disablePrev,
				disableNextChk,
				prevHideClass,
				nextHideClass,
				submitHideClass,
			}}>
			{children}
		</FormContext.Provider>
	);
};

export default FormContext;