import Billing from "./Billing";
import { useState } from "react";
import styles from "@styles/tutorials/dave-gray/BillingForm.module.css";

const Form = () => {
	const [data, setData] = useState({
		billFirstName: "",
		billLastName: "",
		billAddress1: "",
		billAddress2: "",
		billCity: "",
		billState: "",
		billZipCode: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(JSON.stringify(data));
	};

	const handleChange = (e) => {
		const type = e.target.type;

		const attributeName = e.target.name;

		const attributeValue = type === "checkbox" ? e.target.checked : e.target.value;

		setData((prevData) => ({
			...prevData,
			[attributeName]: attributeValue,
		}));
	};

   // ????? I NEED HELP WITH WHAT IS HAPPENING HERE
	const { billAddress2, ...otherProps } = data;

   console.log({billAddress2})
   console.log({otherProps})
   
   // ????? I NEED HELP WITH WHAT IS HAPPENING HERE
	const canSave = [...Object.values(otherProps)].every(Boolean);

	return (
		<form className={[styles["form"], styles["flex-col"]].join(" ")} onSubmit={handleSubmit}>
			<h2>Billing Info</h2>

			<Billing data={data} handleChange={handleChange} />

			<button className={styles["submit-button"]} disabled={!canSave}>
				Submit
			</button>
		</form>
	);
};
export default Form;
