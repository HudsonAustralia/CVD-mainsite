import { Radio } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function InsulinField() {
  const { form, disable } = useContext(FormContext);
	return (
		<div
			className="horizontal"
			style={{
				opacity:
          (disable) ||
					!form.getInputProps("specfic_equation").value
						? 0.5
						: 1,
			}}
		>
			<Label
				labelName="Use of Insulin within last 6 months"
				labelRequired="*"
				cardDropdownContent="Newer classes of glucose-lowering medicines, including SGLT2 inhibitors, GLP-1 receptor agonists and DPP4-inhibitors, have not been included in the Aus CVD risk calculator because data were not available."
				cardButtonLink=""
			></Label>
			<div className="horizontal-right">
				<Radio.Group
					name="Use of Insulin within last 6 months"
					description=""
					withAsterisk
					size="md"
					{...form.getInputProps("insulin")}
				>
					<Radio
						value="0"
						label="No"
						disabled={
              (disable) ||
							!form.getInputProps("specfic_equation").value
						}
					/>
					<Radio
						value="1"
						label="Yes"
						disabled={
              (disable) ||
							!form.getInputProps("specfic_equation").value
						}
					/>
				</Radio.Group>
			</div>
		</div>
	);
}
