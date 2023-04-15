import { TextInput } from "@mantine/core";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormContext } from "../Form";
import Label from "../Label";

export default function HbA1cFieldNew() {
  const { form, disable } = useContext(FormContext);

	const refL = useRef<HTMLInputElement>(null);
	const refR = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (refR.current?.value) {
			refL.current!.disabled = true;
			refR.current.focus();
		} else {
			refL.current!.disabled = false;
		}
		if (refL.current?.value) {
			refR.current!.disabled = true;
			refL.current.focus();
		} else {
			refR.current!.disabled = false;
		}
	}, [refR.current?.value, refL.current?.value]);

	return (
		<div
			className="horizontal"
			style={{
				opacity:
          disable || !form.getInputProps("specfic_equation").value ? 0.5 : 1,
			}}
		>
			<Label
				labelName="Glycated haemoglobin (HbA1c)"
				labelRequired="*"
				cardDropdownContent="Single non-fasting. HbA1c can be entered in mmol/mol or %."
				cardButtonLink=""
			></Label>
			<div className="horizontal-right or-type">
        <TextInput
					ref={refL}
					className="or-type-left"
					type="number"
					//@ts-ignore
					disabled={
						refR.current?.value ||
            disable ||
						!form.getInputProps("specfic_equation").value
					}
					placeholder="Enter value"
					rightSection="mmol/mol"
					radius="md"
					withAsterisk
					rightSectionWidth={96}
					{...form.getInputProps("mol")}
					error={refR.current?.value ? null : form.getInputProps("mol").error}
				/>
				<span>or</span>
        <TextInput
					ref={refR}
					className="or-type-right"
					type="number"
					placeholder="Enter value"
					//@ts-ignore
					disabled={
						refL.current?.value ||
            disable ||
						!form.getInputProps("specfic_equation").value
					}
					rightSection="%"
					radius="md"
					withAsterisk
					rightSectionWidth={35}
					{...form.getInputProps("percentage")}
					//@ts-ignore
					error={
						refL.current?.value ? null : form.getInputProps("percentage").error
					}
				/>
			</div>
		</div>
	);
}
