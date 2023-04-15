import { createStyles, NumberInput, Stack, TextInput } from "@mantine/core";
import { useContext, useRef, useState } from "react";
import variable from "../../../styles/theme/variables";
import { FormContext } from "../Form";
import Label from "../Label";

export interface IComponentClassNames {
  content: string;
}

const useStyles = createStyles((theme) => ({
  content: {
    "& .short-input-wrapper": {
      maxHeight: 0,
      overflow: "hidden",
      transition: "max-height .2s ease",
    },
    "& .short-input-total": {
      display: "inline-block",
      verticalAlign: "top",
      width: "50%",
      paddingRight: variable.spacer4,
      "&.mantine-InputWrapper-root.mantine-TextInput-root": {
        marginBottom: variable.spacer0,
      },
    },
    "& .short-input-high-density": {
      display: "inline-block",
      marginBottom: variable.spacer0,
      width: "50%",
      paddingLeft: variable.spacer4,
      "&.mantine-InputWrapper-root.mantine-TextInput-root": {
        marginBottom: variable.spacer0,
      },
    },
    "& .accordion": {
      color: "#0074FF",
      fontSize: variable.fontSizeBase,
      letterSpacing: "0.15px",
      lineHeight: "20px",
      cursor: "pointer",
      "& .accordion-close": {
        display: "none",
      },
    },
    "& .accordion-chevron-down": {
      position: "relative",
      top: 4,
      left: 4,
    },
  },
}));

export default function CholesterolField() {
  const { form, disable } = useContext(FormContext);
  let { content } = useStyles().classes;

  const [cholesterol, setCholesterol] = useState("");
  const [total, setTotal] = useState("");
  const [density, setDensity] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMultiDisabled, setMultiDisabled] = useState(false);
  const cRef = useRef<HTMLInputElement>(null);
  const cRef1 = useRef<HTMLInputElement>(null);
  const cRef2 = useRef<HTMLInputElement>(null);

  const changeCholesterolDisabled = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCholesterol(event.target.value);
    const eventValue = event.target.value;

    if (eventValue.trim().length !== 0) {
      setMultiDisabled(true);
      if (cRef1.current != null) {
        cRef1.current.value = "";
      }
      if (cRef2.current?.value != null) {
        cRef2.current.value = "";
      }
    } else {
      setMultiDisabled(false);
    }
  };

  const changeTotalDisabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(event.target.value);
    const eventValue = event.target.value;

    if (eventValue.trim().length !== 0) {
      setIsDisabled(true);
      if (cRef.current != null) {
        cRef.current.value = "";
      }
    } else {
      if (cRef2.current?.value === "") {
        setIsDisabled(false);
      }
    }
  };

  const changeDensityDisabled = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDensity(event.target.value);
    const eventValue = event.target.value;

    if (eventValue.trim().length !== 0) {
      setIsDisabled(true);
      if (cRef.current != null) {
        cRef.current.value = "";
      }
    } else {
      if (cRef1.current?.value === "") {
        setIsDisabled(false);
      }
    }
  };

  // Accordion
  const [isActive, setIsActive] = useState(false);
  const hanleAccordionClick = () => {
    setIsActive(!isActive);
  };
  return (
    <Stack className={content}>
      <div
        className="horizontal"
        style={{
          opacity: disable ? "0.5" : "1",
        }}
      >
        <Label
          labelName="Ratio of total cholesterol to HDL cholesterol"
          labelRequired="*"
          // cardDropdownContent="Use most recent measurements (fasting or non-fasting)."
          cardDropdownContent={
            form.getInputProps("age").error
              ? ""
              : "Use most recent measurements (fasting or non-fasting)."
          }
          cardButtonLink=""
        ></Label>
        <div className={`horizontal-right ${isActive ? "active" : ""}`}>
          <TextInput
            ref={cRef}
            disabled={
              Boolean(cRef1.current?.value) ||
              Boolean(cRef2.current?.value) ||
              disable
            }
            id="cholesterol"
            type="number"
            withAsterisk
            placeholder="Ratio of total cholesterol to HDL cholesterol"
            description=""
            radius="md"
            {...form.getInputProps("hdlRatio")}
            error={
              cRef.current?.value
                ? Number.parseFloat(cRef.current?.value) >= 1.08 &&
                  Number.parseFloat(cRef.current?.value) <= 30.1
                  ? null
                  : "Please enter an between 1.08-30.1 to continue"
                : cRef1.current?.value || cRef2.current?.value
                ? null
                : form.getInputProps("hdlRatio").error
            }
          />
          <div className="short-input-wrapper">
            <TextInput
              ref={cRef1}
              id="cholesterolTotal"
              disabled={Boolean(cRef.current?.value) || disable}
              className="short-input-total"
              type="number"
              label=""
              placeholder="Total"
              description=""
              rightSection="mmol/L"
              radius="md"
              rightSectionWidth={92}
              {...form.getInputProps("hdlTotal")}
              error={
                cRef.current?.value
                  ? null
                  : cRef1.current?.value
                    ? Number.parseFloat(cRef1.current?.value) >= 1 &&
                      Number.parseInt(cRef1.current?.value) <= 30
                    ? null
                      : "Please enter an between 1-30 years to continue"
                  : form.getInputProps("hdlTotal").error
              }
            />
            <TextInput
              ref={cRef2}
              className="short-input-high-density"
              type="number"
              label=""
              placeholder="HDL"
              disabled={Boolean(cRef.current?.value) || disable}
              description=""
              rightSection="mmol/L"
              radius="md"
              rightSectionWidth={92}
              {...form.getInputProps("hdlHighDensity")}
              error={
                cRef.current?.value
                  ? null
                  : cRef2.current?.value
                    ? Number.parseFloat(cRef2.current?.value) >= 1 &&
                      Number.parseInt(cRef2.current?.value) <= 10
                    ? null
                      : "Please enter an between 1-10 years to continue"
                  : form.getInputProps("hdlHighDensity").error
              }
            />
          </div>

          <div className="accordion" onClick={hanleAccordionClick}>
            <div className="accordion-open">
              or enter total cholesterol and HDL cholesterol separately
              <svg
                className="accordion-chevron-down"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="accordion-close">
              or enter total cholesterol and HDL cholesterol separately
              <svg
                className="accordion-chevron-down"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
}
