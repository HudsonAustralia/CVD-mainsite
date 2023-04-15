import {
  Divider,
  createStyles,
  Container,
  SimpleGrid,
  Checkbox,
  Textarea,
  Text,
  Button,
  Flex,
  Group,
} from "@mantine/core";
import { IndeterminateCheckbox as CheckBox1 } from "./CheckBox1";
import { IndeterminateCheckbox as CheckBox2 } from "./CheckBox2";
import variable from "../../../styles/theme/variables";
import { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  textFont: { fontWeight: variable.fontWeightBold },
  root: {
    width: "100%",
  },
  textareaLabelAfter: {
    "&:after": {
      content: '"Please enter in the recipient\'s email"',
      display: "block",
      fontSize: variable.fontSizeSm,
      color: variable.grey500,
      marginTop: "0.5em",
      marginBottom: "1em",
    },
  },
  groupCheckbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: "1.5em",
    gap: 0,
  },
  button: {
    backgroundColor: variable.red300,
    "&:hover, &:not([data-disabled]):hover": {
      backgroundColor: variable.red500,
    },
    // float: "right",
    // "&:after": { content: '""', display: "block", clear: "both", height: 0 },
  },
  cancelButton: {
    backgroundColor: "rgb(182,192,207)",
    "&:hover, &:not([data-disabled]):hover": {
      backgroundColor: "rgba(182,192,207, 0.7)",
    },
  },
}));

const EmailPrintInfo = (props: any) => {
  const { root, button, cancelButton } = useStyles().classes;
  const [textInput, setTextInput] = useState("");
  //get child textInput

  //update text to parent
  useEffect(() => {
    props.callback(textInput);
  }, [textInput]);

  return (
    <Container
      ff={variable.fontFamily}
      className={root}
      p={0}
      maw={780}
      mah={665}
    >
      <Divider mb={16} />
      <SimpleGrid cols={2} spacing={"md"}>
        {/* left section */}
        <Container
          fw={variable.fontWeightMedium}
          fz={variable.fontSizeMd}
          pl={0}
          pr={0}
        >
          <Text
            sx={{
              maxWidth: "358px",
              fontFamily: variable.fontFamilyMedium,
              fontWeight: variable.fontWeightMedium,
              lineHeight: "19px",
            }}
          >
            Select what additional info you would like to include
          </Text>
          <Text
            ff={variable.fontFamily}
            fw={variable.fontWeightRegular}
            fz={variable.fontSizeSmall}
            mt={variable.spacer2}
            mb={"1em"}
            color={variable.grey600}
          >
            Risk result & recommendations will always be included{" "}
          </Text>
          {props.recalc === "show" && (
            <CheckBox1
              hideSmoking={props.hideSmoking}
              callback={props.getRiskCheckBoxes}
            />
          )}
          <CheckBox2
            hideSmoking={props.hideSmoking}
            callback={props.getResourceCheckBoxes}
          />
        </Container>
        {/* right section */}
        <Container w={"100%"} pl={0}>
          <Textarea
            label="Next steps"
            placeholder="Enter in additional info"
            autosize
            minRows={2}
            maxRows={16}
            fz={variable.fontSizeMd}
            ff={variable.fontFamilyMedium}
            fw={variable.fontWeightMedium}
            value={textInput}
            onChange={(event: any) => {
              setTextInput(event.currentTarget.value);
            }}
            sx={{
              "& ::-webkit-input-placeholder": {
                fontSize: "16px",
              },
              "& .mantine-Textarea-label": {
                marginBottom: variable.spacer4,
              },
            }}
          />
        </Container>
      </SimpleGrid>
      <Divider mb={16} mt={16} />
      <Flex gap="sm" justify="flex-end">
        <Button
          onClick={() => {
            // props.callback("");
            props.cancel();
          }}
          classNames={{ root: cancelButton }}
          sx={{
            width: "97px",
            height: "42px",
            fontSize: variable.fontSizeMd,
            fontFamily: variable.fontFamilyMedium,
            fontWeight: variable.fontWeightMedium,
            backgroundColor: "rgba(182,198,207,0.4)",
            color: "#191B5E",
          }}
        >
          Cancel
        </Button>
        <Button
          className={button}
          onClick={() => {
            window.print();
          }}
          sx={{
            width: "91px",
            height: "42px",
            fontSize: variable.fontSizeMd,
            fontFamily: variable.fontFamilySemiBold,
            fontWeight: variable.fontWeightSemiBold,
            backgroundColor: variable.red300,
            boxShadow: "0 4px 12px 0 rgba(0,0,0,0.08)",
          }}
        >
          Print
        </Button>
        <Button
          className={button}
          onClick={props.sendEmail}
          sx={{
            width: "89px",
            height: "42px",
            fontSize: variable.fontSizeMd,
            fontFamily: variable.fontFamilySemiBold,
            fontWeight: variable.fontWeightSemiBold,
            backgroundColor: variable.red300,
            boxShadow: "0 4px 12px 0 rgba(0,0,0,0.08)",
          }}
        >
          Email
        </Button>
      </Flex>
    </Container>
  );
};

export default EmailPrintInfo;
