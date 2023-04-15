import { NumberInput } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function BloodPressureField() {
  const { form, disable } = useContext(FormContext);
  return (
    <div
      className="horizontal"
      style={{
        opacity: disable ? "0.5" : "1",
      }}
    >
      <Label
        labelName="Systolic blood pressure"
        labelRequired="*"
        // cardDropdownContent="Use the average of the last two seated, in-clinic BP measurements. If both measurements are from current visit, measurements should be at least 10 minutes apart. Convert home and ambulatory blood pressure readings to in-clinic equivalents before entering into calculator."
        cardDropdownContent={
          form.getInputProps("age").error
            ? ""
            : "Use the average of the last two seated, in-clinic BP measurements. If both measurements are from current visit, measurements should be at least 10 minutes apart. Convert home and ambulatory blood pressure readings to in-clinic equivalents before entering into calculator."
        }
        cardButtonLink=""
      ></Label>
      <div className="horizontal-right">
        <NumberInput
          id="bloodPressure"
          withAsterisk
          label=""
          placeholder="SBP"
          description=""
          rightSection="mmHg"
          radius="md"
          rightSectionWidth={85}
          {...form.getInputProps("sbp")}
          disabled={disable}
        />
      </div>
    </div>
  );
}
