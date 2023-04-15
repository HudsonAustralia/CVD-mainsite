import { Container, createStyles, Box, Image } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import variable from "../../../styles/theme/variables";
import MarkerDefaultLarge from "../../../public/assets/images/marker-default-large";

interface propsInterface {
  level: number;
  newLevel: number;
  reClassficationRisk: string;
  isPrint?: boolean;
}

const progressSpanStyle = {
  display: "inline-block",
  color: variable.grey500,
  fontSize: variable.fontSizeSm,
  fontWeight: variable.fontWeightMedium,
  lineHeight: "20px",
};

const useStyles = createStyles((theme) => ({
  arrow: {
    position: "absolute",
    transform: "translateX(-50%)",
    zIndex: 5,
    ["@media (max-width: 992px)"]: {
      transform: "scale(0.8) translateX(-60%)",
    },
    ["@media (max-width: 579px)"]: { transform: "scale(0.7) translateX(-65%)" },
  },
}));

const Progress = (props: propsInterface) => {
  const [riskLevel, setRiskLevel] = useState(props.level);
  const [newRisk, setNewRisk] = useState(props.newLevel);
  const [reClassficationRisk, setReClassficationRisk] = useState(
    props.reClassficationRisk
  );
  //access to first arrow
  const firstArrow = useRef<SVGSVGElement>(null);
  //access to secord arrow
  const secondArrow = useRef<SVGSVGElement>(null);
  const isPrint = props.isPrint ? props.isPrint : false;

  const { arrow } = useStyles().classes;

  //update arrow postion
  useEffect(() => {
    setRiskLevel((state) => {
      return props.level;
    });
    // const firstArrow = document.getElementsByClassName(arrow)[0] as HTMLElement;

    if (firstArrow.current) {
      firstArrow.current.style.left = `${divideAndRoundDown(props.level, 15)}%`;
      if (props.level !== props.newLevel) {
        const firstArrowText = firstArrow.current!.querySelector("text");
        firstArrowText!.style.fill = "black";
      }
    }
  }, [props.level, props.newLevel]);

  //update second arrow positon
  useEffect(() => {
    setNewRisk((state) => {
      return props.newLevel;
    });

    if (secondArrow.current) {
      secondArrow.current.style.left = `${divideAndRoundDown(
        props.newLevel,
        15
      )}%`;
      const secondArrowTest = secondArrow.current!.querySelector("text");

      if (secondArrowTest) {
        if (props.level === props.newLevel) {
          secondArrowTest.style.fill = "white";
        }
      }
    }
  }, [props.newLevel, props.level]);

  return (
    <Container
      p={0}
      pt={4}
      sx={{ position: "relative" }}
      // w={`calc(100% - 8px)`}
    >
      {reClassficationRisk === "show" ? (
        <Box sx={{ width: "100%", position: "relative" }}>
          <MarkerDefaultLarge
            color={riskLevel === newRisk ? "#191B5E" : "#B6C6CF"}
            className={arrow}
            number={riskLevel}
            ref={firstArrow}
          />
        </Box>
      ) : (
        <div></div>
      )}
      {/* second arrow */}
      {reClassficationRisk === "show" ? (
        <Box sx={{ width: "100%", position: "relative" }}>
          <MarkerDefaultLarge
            color={riskLevel === newRisk ? "#191B5E" : variable.red300}
            className={arrow}
            number={newRisk}
            ref={secondArrow}
          />
        </Box>
      ) : (
        <div></div>
      )}
      <Box>
        <span style={{ ...progressSpanStyle, width: "33%" }}>0%</span>
        <span style={{ ...progressSpanStyle, width: "33%" }}>5%</span>
        <span style={{ ...progressSpanStyle, width: "33%" }}>10%</span>
        <span style={{ ...progressSpanStyle, width: "0" }}>15%</span>
      </Box>
      <Box mt={-4}>{svgBase(newRisk, reClassficationRisk, isPrint)}</Box>
      <Box mt={-6}>
        <span
          style={{
            ...progressSpanStyle,
            width: "33%",
            textAlign: "center",
            fontWeight: newRisk < 5 ? "600" : "",
            fontFamily: newRisk < 5 ? variable.fontFamilySemiBold : "",
          }}
        >
          Low Risk
        </span>
        <span
          style={{
            ...progressSpanStyle,
            width: "33%",
            textAlign: "center",
            fontWeight: newRisk < 10 ? (newRisk >= 5 ? 600 : "") : "",
            fontFamily:
              newRisk < 10
                ? newRisk >= 5
                  ? variable.fontFamilySemiBold
                  : ""
                : "",
          }}
        >
          Intermediate Risk
        </span>
        <span
          style={{
            ...progressSpanStyle,
            width: "33%",
            textAlign: "center",
            fontWeight: newRisk >= 10 ? 600 : "",
            fontFamily: newRisk >= 10 ? variable.fontFamilySemiBold : "",
          }}
        >
          High Risk
        </span>
      </Box>
    </Container>
  );
};

function svgBase(
  result: number,
  reClassficationRisk: string,
  isPrint: boolean
) {
  if (result < 5) {
    if (reClassficationRisk == "show") {
      return isPrint ? (
        <img
          width={"100%"}
          src="/assets/images/PrintResourceList/ProgressBar/low.scaled.png"
        />
      ) : (
        <img
          src="/assets/images/discussRiskResult/icons/low.scaled.svg"
          width={"100%"}
        />
      );
    }
    return isPrint ? (
      <img
        width={"100%"}
        src="/assets/images/PrintResourceList/ProgressBar/Low.expanded.png"
      />
    ) : (
      <img
        src="/assets/images/discussRiskResult/icons/Low.expanded.svg"
        width={"100%"}
      />
    );
  }
  if (result < 10 && result >= 5) {
    if (reClassficationRisk == "show") {
      return isPrint ? (
        <img
          width={"100%"}
          src="/assets/images/PrintResourceList/ProgressBar/Intermediate.scaled.png"
        />
      ) : (
        <img
          src="/assets/images/discussRiskResult/icons/Intermediate.scaled.svg"
          width={"100%"}
        />
      );
    }
    return isPrint ? (
      <img
        width={"100%"}
        alt="Intermediate risk"
        src="/assets/images/PrintResourceList/ProgressBar/Intermediate.expanded.png"
      />
    ) : (
      <img
        src="/assets/images/discussRiskResult/icons/Intermediate.expanded.svg"
        width={"100%"}
      />
    );
  }
  if (result >= 10) {
    if (reClassficationRisk == "show") {
      return isPrint ? (
        <img
          width={"100%"}
          src="/assets/images/PrintResourceList/ProgressBar/High.scaled.png"
          alt="high risk"
        />
      ) : (
        <img
          src="/assets/images/discussRiskResult/icons/High.scaled.svg"
          width={"100%"}
        />
      );
    }
    return isPrint ? (
      <img
      width={"100%"}
      alt="high risk"
      src="/assets/images/PrintResourceList/ProgressBar/High.expanded.png"
    />
    ) : (
      <img
        src="/assets/images/discussRiskResult/icons/High.expanded.svg"
        width={"100%"}
      />
    );
  }
}
export default Progress;

function divideAndRoundDown(a: number, b: number) {
  if (Math.round((a * 100) / b) >= 100) {
    return 100;
  }
  return Math.floor((a * 100) / b) + 1;
}
