import { Text, List, createStyles } from "@mantine/core";
import variable from "../../../styles/theme/variables";

export default function AssessmentList() {
  return (
    <div>
      <Text
        sx={{
      fontFamily: variable.fontFamilyMedium,
          fontWeight: variable.fontWeightMedium,
        }}
      >
        This risk assessment is recommended for the following individuals
        without known atherosclerotic cardiovascular disease:
      </Text>
      <List
        withPadding
        sx={{
      color: "#546E7A",
      fontSize: variable.fontSizeSmall,
          fontWeight: variable.fontWeightRegular,
      letterSpacing: "0.25px",
      lineHeight: "20px",
      fontFamily: variable.fontFamily,
        }}
      >
        <List.Item>Men and women aged 45–79 years.</List.Item>
        <List.Item>
          People diagnosed with diabetes from age 35 onwards.
        </List.Item>
        <List.Item>
          First Nations people aged 30 - 79 (assess individual risk factors 18 -
          29 years).
        </List.Item>
      </List>
    </div>
  );
}
