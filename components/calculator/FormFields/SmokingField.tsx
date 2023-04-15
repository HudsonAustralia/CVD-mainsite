import { Radio } from "@mantine/core";
import Label from "../Label";
import { useContext } from "react";
import { FormContext } from "../Form";

export default function SmokingField() {
  const { form, disable } = useContext(FormContext);

  return (
    <div
      className="horizontal"
      style={{
        opacity:
          (disable
            ? "0.5"
            : "1"
          )
      }}
    >
      <Label
        labelName="Smoking status"
        labelRequired="*"
        // cardDropdownContent="Smoking increases CVD risk. Encourage, support and advise people who smoke to quit."
        cardDropdownContent={
          form.getInputProps("age").error
            ? ""
            : "Smoking increases CVD risk. Encourage, support and advise people who smoke to quit."
        }
        cardButtonLink=""
      ></Label>
      <div className="horizontal-right">
        <Radio.Group
          id="smokingStatus"
          name="Smoking status"
          description=""
          withAsterisk
          size="md"
          {...form.getInputProps("smoking")}
        >
          <Radio
            value="0"
            label="Never smoked"
            disabled={disable}
          />
          <Radio
            value="1"
            label="Previously smoked (ceased >1 year ago)"
            disabled={disable}
          />
          <Radio
            value="2"
            label="Currently smokes (or ceased <1 year ago)"
            disabled={disable}
          />
        </Radio.Group>
      </div>
    </div>
  );
}
