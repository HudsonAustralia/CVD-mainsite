import { Checkbox } from "@mantine/core";
import { useContext } from "react";
import variable from "../../../styles/theme/variables";
import { FormContext } from "../Form";

export default function SpecficEquationField() {
  const { form } = useContext(FormContext);

  return (
    <div>
      <Checkbox
        {...form.getInputProps("specfic_equation")}
        label="Use diabetes specfic equation"
        className="diabetes-equation-title"
        sx={{
          "& .mantine-Checkbox-label": {
            fontFamily: variable.fontFamilyMedium,
          },
        }}
        disabled={
          form.getInputProps("age").error && form.getInputProps("age").value
        }
      />
      <span className="diabetes-equation-text">
        The diabetes specific equation provides a more accurate CVD risk
        estimate for people with type 2 diabetes. It requires the following
        variables: time since diagnosis of diabetes, HbA1c, eGFR, uACR, BMI and
        use of insulin. Please note that this may underestimate risk in type 1
        diabetes.
      </span>
    </div>
  );
}
