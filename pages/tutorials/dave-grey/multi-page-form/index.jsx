import DefaultLayout from "@components/DefaultLayout";
import Form from "@components/tutorials/dave-gray/multi-step-form/Form.jsx";
import { FormProvider } from "@context/tutorials/dave-gray/multi-step-form/FormContext";

export default function App() {
	return (
		<DefaultLayout title="Multi-Page Form">
			<FormProvider>
				<Form></Form>
			</FormProvider>
		</DefaultLayout>
	);
}
