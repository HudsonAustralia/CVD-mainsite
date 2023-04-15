import { Radio } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function SexField() {
  const { form, disable } = useContext(FormContext);

	return (
		<div
			className="horizontal"
			style={{
				opacity:
          disable
						? "0.5"
						: "1",
			}}
		>
			<Label
				labelName="Sex at birth"
				labelRequired="*"
				// cardDropdownContent="Enter sex at birth. There is currently insufficient data to support intersex or non-binary sex."
				cardDropdownContent={
					form.getInputProps("age").error
						? ""
						: "Enter sex at birth. There is currently insufficient data to support intersex or non-binary sex."
				}
				cardButtonLink=""
			></Label>
			<div className="horizontal-right">
				<Radio.Group
					id="sex"
					name="Sex at birth"
					description=""
					withAsterisk
					size="md"
					{...form.getInputProps("sex")}
				>
					<Radio
						value="0"
						label="Female"
            disabled={disable}
					/>
					<Radio
						value="1"
						label="Male"
            disabled={disable}
					/>
				</Radio.Group>
			</div>
		</div>
	);
}
