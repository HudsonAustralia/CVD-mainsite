import { NumberInput, TextInput } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function BMIField() {
  const { form, disable } = useContext(FormContext);
	return (
		<div
			className="horizontal"
			style={{
				opacity:
          disable || !form.getInputProps("specfic_equation").value ? 0.5 : 1,
			}}
		>
			<Label labelName="Body mass index (BMI)" labelRequired="*"></Label>
			<div className="horizontal-right and-type">
        <TextInput
					id="bmiWeight"
					placeholder="Weight"
					rightSection="Kg"
					radius="md"
          type="number"
					withAsterisk
					rightSectionWidth={40}
					{...form.getInputProps("weight")}
          disabled={!form.getInputProps("specfic_equation").value || disable}
				/>
        <TextInput
					id="bmiHeight"
					placeholder="Height"
					rightSection="Meters"
          type="number"
					radius="md"
					withAsterisk
					rightSectionWidth={70}
					{...form.getInputProps("height")}
          disabled={disable || !form.getInputProps("specfic_equation").value}
				/>
			</div>
		</div>
	);
}
