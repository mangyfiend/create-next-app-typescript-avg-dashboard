import useFormContext from "@hooks/tutorials/dave-gray/multi-step-form/useFormContext";

const OptIn = () => {
	const { data, handleChange } = useFormContext();

	const content = (
		<>
			<label htmlFor="optInNewsChk">
				<input
					type="checkbox"
					id="optInNewsChk"
					name="optInNewsChk"
					checked={data.optInNewsChk}
					onChange={handleChange}
				/>
				Receive our newsletter
			</label>
			<ul className="flex-col">
				<li>Save 10% Now</li>
				<li>Receive Discount Coupons</li>
				<li>Find Out About New Products</li>
			</ul>
		</>
	);

	return content;
};
export default OptIn;
