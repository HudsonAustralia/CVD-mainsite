import { NumberInput } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function DiabetesDiagnosisField() {
  const { form, disable } = useContext(FormContext);

  return (
    <div
      className="horizontal"
      style={{
        // opacity: form.getInputProps("specfic_equation").value ? 1 : 0.5,
        opacity:
          (disable) ||
          !form.getInputProps("specfic_equation").value
            ? 0.5
            : 1,
      }}
    >
      <Label
        labelName="Years since diabetes diagnosis"
        labelRequired="*"
      ></Label>
      <div className="horizontal-right">
        <NumberInput
          label=""
          placeholder="Enter value"
          rightSection="Years"
          radius="md"
          withAsterisk
          rightSectionWidth={60}
          {...form.getInputProps("year")}
          disabled={
            (disable) ||
            !form.getInputProps("specfic_equation").value
          }
        />
      </div>
    </div>
  );
}
