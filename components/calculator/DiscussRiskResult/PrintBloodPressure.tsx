import { Box, Title } from "@mantine/core";
import Progress from "./Progress";
import SolidPersonSvg from "./solid-person";

interface propsInterface {
  result: number;
  newResult: number;
  reClassficationRisk: string;
  isEmailUrl: boolean;
}

const PrintCompare = (props: propsInterface) => {
  const result = Math.round(props.result);
  const newResult = Math.round(props.newResult);
  return (
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
          <Title order={3} mb={12} size={"large"} fw={750}>
            Lower blood pressure by 10mmHg
          </Title>
          <Box
            className="mantine-risk-border-box"
            p={8}
            sx={{
              borderRadius: "8px",
              boxShadow: !true ? "" : "0 2px 6px rgba(0, 0, 0, 0.3)",
              transform: "translate3d(-2px, -2px, 0)",
            }}
          >
            {true && (
              <span>
                Your risk if you&nbsp;
                {"lower blood pressure by 10mmHg"}
              </span>
            )}
            <h2>
              {props.reClassficationRisk === "show" &&
                `${!false && !true && !false ? "" : "="} ${newResult}% `}
              {newResult >= 10
                ? "High risk"
                : newResult >= 5
                ? "Intermediate risk"
                : "Low risk"}
            </h2>
            {!false &&
            !true &&
            !false &&
            props.reClassficationRisk === "show" ? (
              <span className="rsik-description">
                Your current risk of having a heart attack or stroke in the next
                5 years is {newResult} out of 100, which is considered{" "}
                {newResult >= 10
                  ? "High"
                  : newResult >= 5
                  ? "Intermediate"
                  : "Low"}
                . Imagine 100 people like you. {newResult} of those people will
                have a heart attack or stroke in the next 5 years if they don’t
                take action.
              </span>
            ) : false ? (
              <span className="rsik-description">
                Risk has{" "}
                {Math.round(result) !== Math.round(newResult)
                  ? "reduced from"
                  : "remains"}{" "}
                {result} out of 100 risk,{" "}
                {result !== newResult ? `to ${newResult} out of 100` : ""} which
                is considered{" "}
                {newResult >= 10
                  ? "High"
                  : newResult >= 5
                  ? "Intermediate"
                  : "Low"}
                . Find resources below on smoking cessation.
              </span>
            ) : false ? (
              <span className="rsik-description">
                Risk has{" "}
                {Math.round(result) !== Math.round(newResult)
                  ? "reduced from"
                  : "remains"}{" "}
                {result} out of 100 risk,{" "}
                {result !== newResult ? `to ${newResult} out of 100` : ""} which
                is considered{" "}
                {newResult >= 10
                  ? "High"
                  : newResult >= 5
                  ? "Intermediate"
                  : "Low"}
                .
              </span>
            ) : props.reClassficationRisk === "show" ? (
              <span className="rsik-description">
                Risk has{" "}
                {Math.round(result) !== Math.round(newResult)
                  ? "reduced from"
                  : "remains"}{" "}
                {result} out of 100 risk,{" "}
                {result !== newResult ? `to ${newResult} out of 100` : ""} which
                is considered{" "}
                {newResult >= 10
                  ? "High"
                  : newResult >= 5
                  ? "Intermediate"
                  : "Low"}
                .
              </span>
            ) : (
              //reClassficationRisk
              <span>
                Your current risk of having a heart attack or stroke in the next
                5 years is estimated to be{" "}
                {newResult >= 10
                  ? "10 "
                  : newResult >= 5
                  ? "from 5 out of 100, to 10 "
                  : "less than 5 "}
                out of 100 {newResult >= 10 ? "or higher" : ""}, which is
                considered
                {newResult >= 10
                  ? " High"
                  : newResult >= 5
                  ? " Intermediate"
                  : " low"}
                . Imagine 100 people like you.{" "}
                {newResult >= 10
                  ? "10 or more "
                  : newResult >= 5
                  ? "5 to 10 "
                  : "less than 5 "}
                of those people will have a heart attack or stroke in the next 5
                years if they don’t take action.
              </span>
            )}
          </Box>
          <Progress
            isPrint={true}
            level={result}
            newLevel={newResult}
            reClassficationRisk={props.reClassficationRisk}
          />
        </Box>
        <Box sx={{ width: "50%", display: "inline-block" }} pl={32}>
        <SolidPersonSvg
          redCount={result}
          newRedCount={
            props.reClassficationRisk === "high risk" ? 15 : newResult
          }
        />
        </Box>
      </Box>
    </Box>
  );
};

export default PrintCompare;
