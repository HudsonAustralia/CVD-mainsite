import { useListState, randomId } from "@mantine/hooks";
import { Checkbox, createStyles } from "@mantine/core";
import { useEffect } from "react";
import variable from "../../../styles/theme/variables";

const initialValues = [
  { label: "Quit smoking", checked: true, key: randomId() },
  { label: "Nutrition resources", checked: true, key: randomId() },
  // { label: "Lower LDL cholesterol", checked: false, key: randomId() },
  { label: "Healthy weight resources", checked: true, key: randomId() },
  { label: "Alcohol reduction resources", checked: true, key: randomId() },
  { label: "Medicine related resources", checked: true, key: randomId() },
  {
    label: "First Nations specific resources",
    checked: true,
    key: randomId(),
  },
];

interface propsInterface {
  hideSmoking: boolean;
  callback: Function;
}
const useStyles = createStyles((theme) => ({
  checkIcon: { marginRight: "0.5em" },
}));

export function IndeterminateCheckbox(props: propsInterface) {
  const { checkIcon } = useStyles().classes;
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;
  //pass state to parent
  useEffect(() => {
    props.callback(values);
  }, [values]);

  const items = values.map((value, index) => (
    <Checkbox
      classNames={{ inner: checkIcon }}
      size={"md"}
      fw={400}
      mt={12}
      ml={35}
      label={value.label}
      key={value.key}
      checked={value.checked}
      sx={{
        "& .mantine-Checkbox-inner": {
          marginRight: "10px",
        },
        "& .mantine-Checkbox-label": {
          fontFamily: variable.fontFamily,
        },
        "& .mantine-Checkbox-input": {
          width: "29px",
          height: "29px",
        },
        "& .mantine-Checkbox-icon": {
          width: "18px",
          top: "calc(50% - 5px)",
          left: "calc(50% - 7px)",
        },
      }}
      onChange={(event) =>
        handlers.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

  return (
    <>
      <Checkbox
        classNames={{ inner: checkIcon }}
        size={"md"}
        fw={400}
        checked={allChecked}
        indeterminate={indeterminate}
        label="All resources"
        transitionDuration={0}
        sx={{
          "& .mantine-Checkbox-inner": {
            marginRight: variable.spacer3,
          },
          "& .mantine-Checkbox-label": {
            fontFamily: variable.fontFamily,
          },
          "& .mantine-Checkbox-input": {
            width: "29px",
            height: "29px",
          },
          "& .mantine-Checkbox-icon": {
            width: "18px",
            top: "calc(50% - 5px)",
            left: "calc(50% - 7px)",
          },
        }}
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {props.hideSmoking
        ? items.filter((i) => {
            return i.props.label !== "Quit smoking";
          })
        : items}
    </>
  );
}
