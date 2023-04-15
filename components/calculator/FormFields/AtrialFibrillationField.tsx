import { Radio } from "@mantine/core";
import { useContext, useState } from "react";
import { FormContext } from "../Form";
import Label from "../Label";

export default function EcgField() {
  const { form, disable } = useContext(FormContext);

  return (
    <div
      className="horizontal"
      style={{
        opacity: disable ? "0.5" : "1",
      }}
    >
      <Label
        labelName="History of atrial fibrillation"
        cardDropdownContent={
          form.getInputProps("age").error
            ? ""
            : "Known history of electrocardiogram (ECG) confirmed atrial fibrillation. Includes both paroxysmal and persistent AF as used for basis of PREDICT equation. CHA2DS2-VASc score is recommended for predicting stroke risk in AF."
        }
        cardButtonLink=""
      ></Label>
      <div className="horizontal-right">
        <Radio.Group
          name="History of atrial fibrillation"
          size="md"
          defaultValue="0"
          {...form.getInputProps("af")}
        >
          <Radio value="0" label="No" disabled={disable} />
          <Radio value="1" label="Yes" disabled={disable} />
        </Radio.Group>
      </div>
    </div>
  );
}
