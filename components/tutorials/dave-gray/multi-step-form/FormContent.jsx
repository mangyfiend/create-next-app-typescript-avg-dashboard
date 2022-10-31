import BillingInfo from "./BillingInfo";
import OptIn from "./OptInInfo";
import ShippingInfo from "./ShippingInfo";
import useFormContext from "@hooks/tutorials/dave-gray/multi-step-form/useFormContext";
import styles from "@styles/tutorials/dave-gray/MultiPageForm.module.css"

export default function FormContent() {
	const { pageNum } = useFormContext();

	const pages = {
		0: <BillingInfo />,
		1: <ShippingInfo />,
		2: <OptIn />,
	};

	return (
		<div className={[styles["form-inputs"], styles["flex-col"]].join(" ")}>
			{pages[pageNum]}
		</div>
	);
}
