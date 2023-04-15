import { Checkbox, Radio } from "@mantine/core";
import Label from "../Label";
import { useCallback, useContext, useMemo } from "react";
import { FormContext } from "../Form";

const values = [
	"Blood pressure-lowering medicines",
	"Lipid-modifying medicines",
	"Antithrombotic medicines",
	"None",
];

export default function MedicinesField() {
  const { form, disable } = useContext(FormContext);

	const disabled = useCallback(
		(fieldValue: string) => {
			const value = form.getInputProps("cvd_medicine").value;

			if (value && value.length) {
				if (value[0] === "None" && fieldValue !== "None") return true;
				else if (value[0] !== "None" && fieldValue === "None") return true;
				else return false;
			}

			return false;
		},
		[form.getInputProps("cvd_medicine")]
	);

	return (
		<div
			className="horizontal"
			style={{
        opacity: disable ? "0.5" : "1",
			}}
		>
			<Label
				labelName="Use of CVD medicines within last 6 months"
				labelRequired="*"
				// cardDropdownContent="Note: The relationship between CVD risk and use of CVD medicines is associative, not causative."
				cardDropdownContent={
					form.getInputProps("age").error
						? ""
						: "Note: The relationship between CVD risk and use of CVD medicines is associative, not causative."
				}
				cardButtonLink=""
			></Label>
			<div className="horizontal-right">
				<Checkbox.Group
					description=""
					withAsterisk
					{...form.getInputProps("cvd_medicine")}
				>
					{values.map((v) => (
						<Checkbox
              mb={2}
							key={v}
							value={v}
							label={v}
              disabled={disabled(v) || disable}
						/>
					))}
				</Checkbox.Group>
			</div>
			{/* <div className="horizontal-right">
        <Radio.Group
          name="Use of CVD medicines within last 6 months"
          label=""
          description=""
          withAsterisk
          size="md"
          {...form.getInputProps("cvd_medicine")}
        >
          <Radio value="no" label="No" /> 
          <Radio value="yes" label="Yes" />
        </Radio.Group>
      </div> */}
		</div>
	);
}
