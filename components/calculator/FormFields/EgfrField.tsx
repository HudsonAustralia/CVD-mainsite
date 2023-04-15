import { Chip, NumberInput, TextInput } from "@mantine/core";
import { useContext, useEffect, useRef } from "react";
import { FormContext } from "../Form";
import Label from "../Label";

export default function EgfrFieldNew() {
  const { form, disable } = useContext(FormContext);

	const refL = useRef<HTMLInputElement>(null);
	const refR = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (refR.current?.checked) {
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
				labelName="eGFR"
				labelRequired="*"
				cardDropdownContent="Whilst uACR and eGFR have been shown to independently improve prediction of cardiovascular events, they are only included as variables in the diabetes specific equation due to lack of availability of data in the general population PREDICT cohort. For the general population, they have been incorporated into the overall risk calculation as a reclassification factor. If needed, eGFR should be calculated based on the Chronic Kidney Disease Epidemiology Collaboration (CKD-EPI) equation. Serum creatinine used in the calculation should be based on the most recent result."
				cardButtonLink=""
			></Label>
			<div className="horizontal-right or-type">
        <TextInput
					ref={refL}
					disabled={
						refR.current?.checked ||
            disable ||
						!form.getInputProps("specfic_equation").value
					}
					type="number"
					className="or-type-left or-type-flex-2"
					id="eGFR"
					placeholder="Enter value"
					rightSection="mL/min/1.73 m2"
					radius="md"
					withAsterisk
					rightSectionWidth={140}
					{...form.getInputProps("eGFRLeft")}
					//@ts-ignore
					error={
						refR.current?.checked ? null : form.getInputProps("eGFRLeft").error
					}
				/>
				<span>or</span>
				<Chip
					ref={refR}
					size="lg"
					radius="md"
					id="eGFRChip"
					disabled={
						Boolean(refL.current?.value) ||
            disable ||
						!form.getInputProps("specfic_equation").value
					}
					className="chip or-type-right"
					{...form.getInputProps("eGFRRight")}
					checked={
						form.getInputProps("specfic_equation").value
							? form.getInputProps("eGFRRight").value
							: false
					}
					defaultChecked={false}
					//@ts-ignore
					error={
						refL.current?.value ? null : form.getInputProps("eGFRRight").error
					}
				>
					eGFR≥90
				</Chip>
			</div>
		</div>
	);
}
