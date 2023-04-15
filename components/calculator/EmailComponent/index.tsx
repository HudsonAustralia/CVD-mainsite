import { Container, createStyles } from "@mantine/core";
import PrintEmail from "../DiscussRiskResult/PrintEmail";
import { useLocation } from "react-router-dom";
//import { useRouter } from 'next/router';
import variable from "../../../styles/theme/variables";
import { useRouter } from "next/router";

//[{},{risks:[{label,checked..},{},{}]},{resources:[{},{},{}..]}]
const smmdDown = `@media(max-width: 768px)`;
const mdDown = `@media(max-width: 959px)`;

const useStyles = createStyles({
  rootContainer: {
    "& .strap6": {
      borderLeft: "44px solid #7DCBB8",
      borderRadius: "4px 0 0 4px",
      "& a": {
        fontSize: variable.fontSizeMd,
        fontWeight: variable.fontWeightMedium,
        textDecoration: "none",
        color: "#191B5E",
        letterSpacing: "0.15px",
        lineHeight: "20px",
      },
      "& .wrapper": {
        padding: "30px",
        backgroundColor: "rgba(125,203,184,0.2)",
        [smmdDown]: {
          paddingBottom: 0,
        },
        "& svg": {
          width: "16px",
          height: "16px",
          marginLeft: variable.spacer2,
        },
        "& .specific-resources-top": {
          "&::before": {
            content: `''`,
            display: "table",
          },
          "&::after": {
            content: `''`,
            display: "table",
            clear: "both",
          },
          "& h2": {
            float: "left",
            width: "260px",
            margin: 0,
            color: "rgba(25,27,94,0.8)",
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: "0.15px",
            lineHeight: "32px",
            [mdDown]: {
              width: "100%",
              float: "none",
            },
          },
          "& .specific-resources-top-right": {
            float: "right",
            width: "66%",
            padding: "18px",
            backgroundColor: variable.white,
            [mdDown]: {
              width: "100%",
              float: "none",
              marginTop: variable.spacer3,
            },
            "& p": {
              margin: 0,
              height: "25px",
              lineHeight: "20px",
              color: variable.grey600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
        },
        "& .specific-resources-list": {
          [mdDown]: {
            marginTop: variable.spacer6,
          },
          "& h3": {
            fontSize: variable.fontSizeXSmall,
            fontWeight: variable.fontWeightSemiBold,
            letterSpacing: "0.11px",
            lineHeight: "14px",
          },
          "& ul": {
            listStyle: "none",
            padding: 0,
            marginLeft: "-20px",
            marginRight: "-20px",
            [smmdDown]: {
              marginLeft: 0,
              marginRight: 0,
            },
            "&::before": {
              content: `''`,
              display: "table",
            },
            "&::after": {
              content: `''`,
              display: "table",
              clear: "both",
            },
            "& li": {
              width: "calc(33.333% - 40px)",
              float: "left",
              marginLeft: "20px",
              marginRight: "20px",
              [smmdDown]: {
                width: "100%",
                marginLeft: 0,
                marginRight: 0,
                marginBottom: variable.spacer4,
              },
              "& p": {
                margin: 0,
                marginTop: variable.spacer2,
                height: "40px",
                color: variable.grey600,
                lineHeight: "20px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                lineClamp: 2,
                WebkitBoxOrient: "vertical",
              },
            },
          },
        },
      },
    },
  },
});

const EmailComponnet = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { query } = router;

  // Decode base64
  const searchParam = typeof query.search === 'string' ? query.search.substring(1) : '';
  const encodedSearch = atob(decodeURIComponent(searchParam));
  console.log(typeof query.search);
  const search = new URLSearchParams(encodedSearch);

  const result: number = Number(search.get("result")) || 0;
  const smokingCompare: boolean =
    search.get("sCompare") === "true" ? true : false;
  const showSmoke: boolean = search.get("showSmoke") === "true" ? true : false;
  const reClassficationRisk: string = search.get("recalc") || "";
  const bloodPressureCompare: boolean =
    search.get("bpCompare") === "true" ? true : false;
  const LDLCompare: boolean =
    search.get("ldlCompare") === "true" ? true : false;
  const qsResource: boolean =
    search.get("qsResource") === "true" ? true : false;
  const nrResource: boolean =
    search.get("nrResource") === "true" ? true : false;
  const hwrResource: boolean =
    search.get("hwrResource") === "true" ? true : false;
  const arrResource: boolean =
    search.get("arrResource") === "true" ? true : false;
  const mrrResource: boolean =
    search.get("mrrResource") === "true" ? true : false;
  const fnsResource: boolean =
    search.get("fnsResource") === "true" ? true : false;
    
  return (
    <Container p={32} sx={{ width: "100%" }} className={classes.rootContainer}>
      <PrintEmail
        result={result}
        newResult={result}
        reClassficationRisk={reClassficationRisk}
        showSmoke={showSmoke}
        nextStep={""}
        userSelected={[
          { nextStep: "" },
          {
            risks: [
              { checked: smokingCompare },
              { checked: bloodPressureCompare },
              { checked: LDLCompare },
            ],
          },
          {
            resources: [
              { checked: qsResource },
              { checked: nrResource },
              { checked: hwrResource },
              { checked: arrResource },
              { checked: mrrResource },
              { checked: fnsResource },
            ],
          },
        ]}
        isEmailUrl={true}
      />
    </Container>
  );
};
export default EmailComponnet;
