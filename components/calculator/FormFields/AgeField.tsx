import { NumberInput, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useContext, useEffect } from "react";
import { FormContext } from "../Form";
import Label from "../Label";

export default function AgeField() {
  const { form, setDisable, disable } = useContext(FormContext);

  useEffect(() => {

    const value =
      form.getInputProps('high_risk')?.value?.find((v: string) => v === "Moderate-severe chronic kidney disease")
      ||
      form.getInputProps('high_risk')?.value?.find((v: string) => v === "Familial hypercholesterolaemia");

    if (!value) {
      if (form.getInputProps('age').error && form.getInputProps('age').value) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }


  }, [form.getInputProps('age'), form.getInputProps('high_risk')])

    return (
        <div>
      <div className="horizontal"
        style={{
          opacity: form.getInputProps('age').value
            ? 1
            : disable ? 0.5 : 1
        }}
      >
          <Label
            labelName="Age"
            labelRequired="*"
            cardDropdownContent="The Aus CVD risk calculator is validated for adults aged 30-79 years."
            cardButtonLink=""
          ></Label>
          <div className="horizontal-right">
            <NumberInput
              id="age"
              withAsterisk
              label=""
              placeholder="30 - 79"
              rightSection="Years"
              description=""
              radius="md"
              rightSectionWidth={60}
            disabled={form.getInputProps('age').value ? false : disable}
              {...form.getInputProps("age")}
            />
          </div>
        </div>
      {Boolean(form.getInputProps("age").error && form.getInputProps("age").value) && (
          <Alert
            className="ageAlert"
            icon={<IconAlertCircle size={16} />}
            title={form.getInputProps("age").error}
            color="red"
            aria-label={form.getInputProps("age").error}
          >
            Age must be adjusted to 30 - 79 to continue
          </Alert>
        )}
      </div>
    );
}
