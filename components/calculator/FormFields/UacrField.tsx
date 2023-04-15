import { TextInput } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function UacrField() {
  const { form, disable } = useContext(FormContext);

	return (
		<div
			className="horizontal"
			style={{
				opacity:
          disable || !form.getInputProps("specfic_equation").value ? 0.5 : 1,
			}}
		>
			<Label
				labelName="uACR"
				labelRequired="*"
				cardDropdownContent="Whilst uACR and eGFR have been shown to independently improve prediction of cardiovascular events, they are only included as variables in the diabetes specific equation due to lack of availability of data in the general population PREDICT cohort. For the general population, they have been incorporated into the overall risk calculation as a reclassification factor."
				cardButtonLink=""
			></Label>
			<div className="horizontal-right">
        <TextInput
					id="uACR"
					placeholder="Enter value"
					rightSection="mg/mmol"
					radius="md"
					withAsterisk
          type="number"
					rightSectionWidth={92}
					{...form.getInputProps("uACR")}
          disabled={disable || !form.getInputProps("specfic_equation").value}
				/>
			</div>
		</div>
	);
}
