import { Box, Title, Text, createStyles } from "@mantine/core";
import SolidPersonSvg from "../DiscussRiskResult/solid-person";
import Progress from "../DiscussRiskResult/Progress";
import Strap3Print from "./Strap3Print";
import variable from "../../../styles/theme/variables";
import PrintSmokeCompare from "./PrintSmokeCompare";
import PrintBloodCompare from "./PrintBloodPressure";
import PrintLDLcompare from "./PrintLDLcompare";
import ResourceList from "./PrintResourceList";
import print from "./Print.module.css";

interface PropsInterface {
  result: number;
  newResult: number;
  reClassficationRisk: string;
  showSmoke: boolean;
  nextStep: string;
  userSelected: any;
  isEmailUrl: boolean;
}
const smmdDown = `@media(max-width: 768px)`;
const mdDown = `@media(max-width: 959px)`;

const useStyles = createStyles((theme) => ({
  DiscussRiskResult: {
    "& .strap1": {
      position: "relative",
      "&::before": {
        content: `''`,
        display: "table",
      },
      "&::after": {
        content: `''`,
        display: "table",
        clear: "both",
      },
      "& .print-button": {
        position: "absolute",
        right: "-170px",
        top: "0",
      },
    },
    "& .strap1Left": {
      float: "left",
      width: "55%",
      [mdDown]: {
        width: "50%",
      },
      [smmdDown]: {
        width: "100%",
      },
      "& h2": {
        margin: 0,
        marginBottom: variable.spacer5,
        color: "#191B5E",
        fontSize: "28px",
        fontWeight: "bold",
        letterSpacing: "0.15px",
        lineHeight: "36px",
      },
      "& span": {
        color: variable.grey600,
        fontSize: variable.fontSizeMedium,
        letterSpacing: "0.17px",
        lineHeight: "32px",
      },
    },
    "& .strap1Right": {
      float: "left",
      width: "calc(100% - 45px)",
      marginLeft: "45px",
      [mdDown]: {
        width: "calc(50% - 15px)",
        marginLeft: "15px",
      },
      [smmdDown]: {
        width: "100%",
        marginLeft: 0,
        marginTop: variable.spacer5,
      },
      "&>div": {
        marginBottom: variable.spacer1,
      },
      "& svg": {
        width: "9%",
        height: "24px",
        verticalAlign: "middle",
        fill: "#B0BEC5",
        display: "inline-block",
        [mdDown]: {
          width: "18px",
          marginRight: "12px",
        },
        "&.mark": {
          fill: variable.red300,
        },
      },
      "& span": {
        display: "inline-block",
        color: variable.grey600,
        width: "36px",
        textAlign: "center",
        fontSize: variable.fontSizeLarge,
        letterSpacing: "1.25px",
        lineHeight: "20px",
        verticalAlign: "middle",
      },
    },
  },
}));

const PrintEmail = (props: PropsInterface) => {
  const { DiscussRiskResult } = useStyles().classes;
  //risks
  let selectedSmoking: boolean = false;
  let selectedSReduceBlood: boolean = false;
  let selectedLDL: boolean = false;
  //resource
  let smokingReource: boolean = false;
  let nutritionResources: boolean = false;
  let healthyWeightResources: boolean = false;
  let alcoholReductionResources: boolean = false;
  let medicineRelatedResources: boolean = false;
  let firstNationsSpecificResources: boolean = false;

  if (props.userSelected) {
    const selected = props.userSelected;
    //get risks compare
    if (selected[1].risks.length !== 0) {
      const risks = selected[1].risks;
      selectedSmoking = risks[0].checked;
      selectedSReduceBlood = risks[1].checked;
      selectedLDL = risks[2].checked;
    }
    //get user selected resources
    if (selected[2].resources.length !== 0) {
      const resourceArray = selected[2].resources;
      smokingReource = resourceArray[0].checked;
      nutritionResources = resourceArray[1].checked;
      healthyWeightResources = resourceArray[2].checked;
      alcoholReductionResources = resourceArray[3].checked;
      medicineRelatedResources = resourceArray[4].checked;
      firstNationsSpecificResources = resourceArray[5].checked;
    }
  }

  return (
    <Box
      sx={{ display: props.isEmailUrl ? "block" : "none" }}
      className={`${DiscussRiskResult} ${print.printShow}`}
    >
      <Title
        order={1}
        size={"28px"}
        color="rgb(25, 27, 94)"
        fw={750}
        lh={"32px"}
        mb={40}
        align="left"
      >
        Australian CVD Risk Calculator results
      </Title>
      {/* <Title order={2} size="24px" color="rgb(25, 27, 94)" fw={750} lh={"32px"}>
        Results
      </Title> */}

      <Box>
        <Box
          sx={{
            display: "flex",
            "@media (min-width: 0px) and (max-width: 768px) ": {
              flexDirection: props.isEmailUrl ? "column" : "row",
              gap: "0.5em",
            },
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "inline-block",
              "@media (min-width: 0px) and (max-width: 768px) ": {
                width: "100%",
              },
            }}
          >
            <Box
              className="mantine-risk-border-box"
              p={8}
              sx={{
                borderRadius: "8px",
                boxShadow:
                  !false && !false && !false
                    ? ""
                    : "0 2px 6px rgba(0, 0, 0, 0.3)",
                transform: "translate3d(-2px, -2px, 0)",
              }}
            >
              <Title order={3} size={"large"} fw={750}>
                Result
              </Title>
              {(false || false || false) && (
                <span>
                  Your risk if you&nbsp;
                  {false
                    ? "Quit smoking"
                    : false
                    ? "lower blood pressure by 10mmHg"
                    : "lower LDL cholesterol by 1mmol/L"}
                </span>
              )}
              <h2>
                {props.reClassficationRisk === "show" &&
                  `${!false && !false && !false ? "" : "="} ${
                    props.newResult
                  }% `}
                {props.newResult >= 10
                  ? "High risk"
                  : props.newResult >= 5
                  ? "Intermediate risk"
                  : "Low risk"}
              </h2>
              {!false &&
              !false &&
              !false &&
              props.reClassficationRisk === "show" ? (
                <span className="rsik-description">
                  Your current risk of having a heart attack or stroke in the
                  next 5 years is {props.newResult} out of 100, which is
                  considered{" "}
                  {props.newResult >= 10
                    ? "High risk"
                    : props.newResult >= 5
                    ? "Intermediate risk"
                    : "Low risk"}
                  . Imagine 100 people like you. {props.newResult} of those
                  people will have a heart attack or stroke in the next 5 years
                  if they don’t take action.
                </span>
              ) : false ? (
                <span className="rsik-description">
                  Risk has{" "}
                  {props.result !== props.newResult ? "reduced" : "remained"}
                  from {props.result} out of 100 risk, to {props.newResult} out
                  of 100 which is considered{" "}
                  {props.newResult >= 10
                    ? "High"
                    : props.newResult >= 5
                    ? "Intermediate"
                    : "Low"}
                  . Find resources below on smoking cessation.
                </span>
              ) : false ? (
                <span className="rsik-description">
                  Risk has{" "}
                  {props.result !== props.newResult ? "reduced" : "remained"}{" "}
                  from {props.result} out of 100 risk, to {props.newResult} out
                  of 100 which is considered{" "}
                  {props.newResult >= 10
                    ? "High"
                    : props.newResult >= 5
                    ? "Intermediate"
                    : "Low"}
                  .
                </span>
              ) : props.reClassficationRisk === "show" ? (
                <span className="rsik-description">
                  Risk has{" "}
                  {props.result !== props.newResult ? "reduced" : "remained"}{" "}
                  from {props.result} out of 100 risk, to {props.newResult}
                  out of 100 which is considered{" "}
                  {props.newResult >= 10
                    ? "High"
                    : props.newResult >= 5
                    ? "Intermediate"
                    : "Low"}
                  .
                </span>
              ) : (
                //reClassficationRisk
                <span className="rsik-description">
                  Your current risk of having a heart attack or stroke in the
                  next 5 years is estimated to be{" "}
                  {props.newResult >= 10
                    ? "10 "
                    : props.newResult >= 5
                    ? "from 5 out of 100, to 10 "
                    : "less than 5 "}
                  out of 100 {props.newResult >= 10 ? "or higher" : ""}, which
                  is considered
                  {props.newResult >= 10
                    ? " High"
                    : props.newResult >= 5
                    ? " Intermediate"
                    : " low"}
                  . Imagine 100 people like you.{" "}
                  {props.newResult >= 10
                    ? "10 or more "
                    : props.newResult >= 5
                    ? "5 to 10 "
                    : "less than 5 "}
                  of those people will have a heart attack or stroke in the next
                  5 years if they don’t take action.
                </span>
              )}
            </Box>
            <Progress
              isPrint={true}
              level={props.result}
              newLevel={props.result}
              reClassficationRisk={props.reClassficationRisk}
            />
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "inline-block",
            }}
            pl={32}
          >
            <SolidPersonSvg
              redCount={props.result}
              newRedCount={
                props.reClassficationRisk === "high risk" ? 15 : props.result
              }
            />
          </Box>
        </Box>
      </Box>

      <Strap3Print
        result={props.result}
        showSmoke={props.showSmoke && selectedSmoking}
      />

      {/* next step */}
      {props.nextStep.length > 1 && (
        <Title
          className="low-risk-title"
          order={2}
          style={{
            color: "#191B5E",
            fontSize: variable.fontSizeXLarge,
            fontWeight: "750",
            lineHeight: "32px",
            marginBottom: variable.spacer5,
            marginTop: "1em",
          }}
        >
          Next steps
        </Title>
      )}
      <Text
        mb={16}
        truncate
        sx={{
          whiteSpace: "pre-line",
          overflowWrap: "break-word",
          breakAfter: "page",
        }}
      >
        {props.nextStep}
      </Text>
      {/* re-calcultor result */}
      {props.reClassficationRisk === "show" && (
        <Box>
          <Title
            className="low-risk-title"
            order={2}
            style={{
              color: "#191B5E",
              fontSize: variable.fontSizeXLarge,
              fontWeight: "750",
              lineHeight: "32px",
              marginBottom: variable.spacer5,
            }}
          >
            Australian CVD Risk Calculator - lower your risk
          </Title>

          {props.reClassficationRisk === "show" &&
            props.showSmoke &&
            selectedSmoking && (
              <PrintSmokeCompare
                isEmailUrl={props.isEmailUrl}
                result={props.result}
                newResult={props.result * 0.6}
                reClassficationRisk={props.reClassficationRisk}
              />
            )}

          {props.reClassficationRisk === "show" && selectedSReduceBlood && (
            <PrintBloodCompare
              isEmailUrl={props.isEmailUrl}
              result={props.result}
              newResult={props.result * 0.8}
              reClassficationRisk={props.reClassficationRisk}
            />
          )}

          {props.reClassficationRisk === "show" && selectedLDL && (
            <PrintLDLcompare
              isEmailUrl={props.isEmailUrl}
              result={props.result}
              newResult={props.result * 0.75}
              reClassficationRisk={props.reClassficationRisk}
            />
          )}
        </Box>
      )}
      <ResourceList
        smokingReource={smokingReource}
        nutritionResources={nutritionResources}
        healthyWeightResources={healthyWeightResources}
        alcoholReductionResources={alcoholReductionResources}
        medicineRelatedResources={medicineRelatedResources}
        firstNationsSpecificResources={firstNationsSpecificResources}
        patientSmoke={props.showSmoke}
      />
    </Box>
  );
};

export default PrintEmail;
