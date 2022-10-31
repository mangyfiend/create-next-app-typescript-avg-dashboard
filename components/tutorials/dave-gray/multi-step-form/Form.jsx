import FormContent from "./FormContent";
import useFormContext from "@hooks/tutorials/dave-gray/multi-step-form/useFormContext";
import styles from "@styles/tutorials/dave-gray/MultiPageForm.module.css";

export default function Form() {
	const {
		pageNum,
		setPageNum,
		data,
		pageTitles,
		canSubmitChk,
		disablePrev,
		disableNextChk,
		prevHideClass,
		nextHideClass,
		submitHideClass,
	} = useFormContext();

	// EVENT DELEGATION

		// DECREMENT THE pageNum STATE IN FormContext
		const handlePrev = () => setPageNum((prev) => prev - 1);
		
		// INCREMENT THE pageNum STATE IN FormContext
		const handleNext = () => setPageNum((prev) => prev + 1);

		const handleSubmit = (e) => {
			e.preventDefault();
			console.log(JSON.stringify(data));
		};

	return (
		<form className={[styles["form"], styles["flex-col"]].join(" ")} onSubmit={handleSubmit}>
			<header className={styles["form-header"]}>
				<h2>{pageTitles[pageNum]}</h2>

				<div className={styles["button-container"]}>
					<button
						type="button"
						className={[styles["button"], styles[`${prevHideClass}`]].join(" ")}
						onClick={handlePrev}
						disabled={disablePrev}>
						Prev
					</button>

					<button
						type="button"
						className={[styles["button"], styles[`${nextHideClass}`]].join(" ")}
						onClick={handleNext}
						disabled={disableNextChk}>
						Next
					</button>

					<button
						type="submit"
						className={[styles["button"], styles[`${submitHideClass}`]].join(" ")}
						disabled={!canSubmitChk}>
						Submit
					</button>
				</div>
			</header>

			<FormContent />
		</form>
	);
}
