import {
  Spoiler,
  Button,
  TextInput,
  Chip,
  Checkbox,
  Tooltip,
  Slider,
  Container,
  RangeSlider,
  Text,
  Stepper,
  NumberInput,
  Radio,
  Group,
  createStyles,
  MantineProvider,
  Stack,
} from "@mantine/core";
import { IconHeart, IconHeartBroken } from "@tabler/icons";
import Label from "./Label";
import { useForm } from "@mantine/form";
import { useState } from "react";
// import Drawer from "./Drawer";
import variable from "../../styles/theme/variables";

export interface IComponentClassNames {
  content: string;
}

const useStyles = createStyles({
  content: {
    width: "100%",
    maxWidth: "960px",
    margin: "0 auto",
    gap: 0,
    [variable.mdDown]: {
      padding: variable.oneColPaddingMobile,
    },
  },
});

export default function StyleGuide() {
  let { content } = useStyles().classes;

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm<{ age: number | undefined }>({
    initialValues: { age: undefined },
    validate: (values) => ({
      age:
        values.age === undefined
          ? "Age is required"
          : values.age < 30 || values.age > 79
          ? "Age must be between 30 - 79 years for a accurate risk to be assessed."
          : null,
    }),
    validateInputOnBlur: true,
  });

  // tooltip
  const [tooltipOpened, setTooltipOpened] = useState(false);

  // drawer
  // const [drawerOpened, setDrawerOpened] = useState(false);

  // Configure slider
  const MARKS = [
    { value: 0, label: "1"},
    { value: 25, label: "2"},
    { value: 50, label: "3"},
    { value: 75, label: "4"},
    { value: 100, label: "5"},
  ];
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 0]);
  const [value, setValue] = useState(50);
  return (
    <MantineProvider>
      <Stack className={content}>
        <h2>Spoiler</h2>
        <Spoiler maxHeight={50} showLabel="Show more" hideLabel="Hide">
          Building on this work, the NVDPA released the Guidelines for the
          assessment of absolute cardiovascular disease risk in May 2012. The
          guidelines were approved by the National Health and Medical Research
          Council (NHMRC) and provide recommendations for the management of CVD
          risk in the primary prevention setting. The guidelines incorporate
          guidance on assessing CVD risk in all adults over 45 years of age (35
          years for Aboriginal and Torres Strait Islander peoples) but unlike
          the 2009 version, the 2012 guidelines extend the age range to include
          those over 74 years.
        </Spoiler>

        <h2>Button</h2>
        <Button.Group>
          <Button size="md" color="gray" radius="xs">
            Button md
          </Button>
        </Button.Group>

        <Button.Group>
          <Button size="md" radius="xs" disabled>
            Button md disabled
          </Button>
        </Button.Group>

        <Button.Group>
          <Button size="xs" color="gray" radius="xs">
            Button xs
          </Button>
        </Button.Group>
        <h2>Text Input</h2>
        <TextInput
          placeholder="Enter value"
          label="uACR"
          radius="md"
          description="Enter uACR (measured in mg/mmol)."
          rightSection="mg"
          withAsterisk
          rightSectionWidth={45}
        />
        <br />
        <div className="horizontal">
          <Label
            labelName="Age"
            labelRequired="*"
            cardDropdownContent="Men and women aged 45-79 years without known CVD"
          ></Label>
          <div className="horizontal-right">
            <NumberInput
              mt="xl"
              withAsterisk
              label=""
              placeholder="Enter Please enter an age between 30 - 79"
              rightSection="Years"
              description=""
              radius="md"
              rightSectionWidth={60}
              {...form.getInputProps("age")}
            />
          </div>
        </div>
        <br />
        <Slider
          value={value} 
          onChange={setValue}
          step={25}
          marks={MARKS}
          styles={(theme) => ({
            track: {
              background:
                theme.colorScheme === "dark" ? theme.colors.dark[3] : "red",
              "&:before": {
                background:
                  "linear-gradient(90deg, #FE7F2D 0%, #FCA346 25.56%, #FCCA46 50.02%, #99CA3C 74.22%, #208B3A 100%)",
              },
            },
            mark: {
              width: 4,
              height: 4,
              borderRadius: 1000,
              transform: "translateX(-3px) translateY(2px)",
            },
            markFilled: {
              borderColor: variable.white,
            },
            markLabel: {
              fontSize: variable.fontSizeBase,
              marginTop: 5,
            },
            bar: {
              backgroundColor: "transparent",
            },
            thumb: {
              height: 20,
              width: 20,
              backgroundColor: theme.white,
              borderWidth: 1,
              boxShadow: theme.shadows.sm,
            },
          })}
        />
        <Text mt="md" size="sm">
        onChange value: <b>{value}</b>
      </Text>
        <h2>Slider</h2>
        <RangeSlider
          value={rangeValue}
          thumbFromLabel="thumbFromLabel"
          onChange={setRangeValue}
          // thumbChildren={[<IconHeart key="1" />, <IconHeartBroken key="2" />]}
          step={25}
          minRange={25}
          // defaultValue={[25, 50]}
          // thumbChildren={<IconHeart />}
          // label={(val) => MARKS.find((marks) => marks.value === val).label}
          // labelAlwaysOn
          marks={MARKS}
          styles={(theme) => ({
            track: {
              background:
                theme.colorScheme === "dark" ? theme.colors.dark[3] : "red",
              "&:before": {
                background:
                  "linear-gradient(90deg, #FE7F2D 0%, #FCA346 25.56%, #FCCA46 50.02%, #99CA3C 74.22%, #208B3A 100%)",
              },
            },
            mark: {
              width: 4,
              height: 4,
              borderRadius: 1000,
              transform: "translateX(-3px) translateY(2px)",
            },
            markFilled: {
              borderColor: variable.white,
            },
            markLabel: {
              fontSize: variable.fontSizeBase,
              marginTop: 5,
            },
            bar: {
              backgroundColor: "transparent",
            },
            thumb: {
              height: 20,
              width: 20,
              backgroundColor: theme.white,
              borderWidth: 1,
              boxShadow: theme.shadows.sm,
            },
          })}
        />
        <Text mt="md" size="sm">
          onChange value: <b>{rangeValue}</b>
        </Text>
        <br />
        <h2>Tooltip</h2>
        <Tooltip
          label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          opened={tooltipOpened}
          multiline
          width={320}
          events={{ hover: true, focus: true, touch: true }}
        >
          <Button variant="outline" onClick={() => setTooltipOpened((o) => !o)}>
            tooltip
          </Button>
        </Tooltip>
        <br />
        <br />
        <h2>Chip</h2>
        <Chip size="lg" radius="md">
          eGFR&gt;=90
        </Chip>
        <br />
        <Chip size="lg" radius="md" disabled>
          eGFR&gt;=90
        </Chip>

        <h2>Selection</h2>
        <h5>Checkbox md</h5>
        <Checkbox.Group
          defaultValue={[""]}
          label="CVD medicines"
          description=""
          withAsterisk
          size="md"
        >
          <Checkbox
            value="Anticoagulant medicines"
            label="Anticoagulant medicines"
          />
          <Checkbox
            value="BP-lowering medicines"
            label="BP-lowering medicines"
          />
          <Checkbox
            value="Antiplatelet medicines"
            label="Antiplatelet medicines"
          />
          <Checkbox
            value="Lipid-modifying medicines"
            label="Lipid-modifying medicines"
          />
        </Checkbox.Group>

        <h5>Radio md</h5>
        <Radio.Group
          name="Sex"
          label="Sex"
          description=""
          withAsterisk
          size="md"
        >
          <Radio value="Male" label="Male" />
          <Radio value="Female" label="Female" />
        </Radio.Group>

        <h2>Stepper</h2>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Enter calculation variables" description="">
            Step 1 content
          </Stepper.Step>
          <Stepper.Step
            label="Consider reclassification factors"
            description=""
          >
            Step 2 content
          </Stepper.Step>
          <Stepper.Step label="Discuss risk assessment" description="">
            Step 3 content
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Calculate estimated risk</Button>
        </Group>
      </Stack>
    </MantineProvider>
  );
}
