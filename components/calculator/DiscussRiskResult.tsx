import {
  Affix,
  createStyles,
  Group,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import variable from "../../styles/theme/variables";
import { Chip, Button, Modal, Box, Stack } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import ResultCta from "../../public/assets/images/result-cta.webp";
import SolidPersonSvg from "./DiscussRiskResult/solid-person";
import Strap3 from "./DiscussRiskResult/Strap3";
import EmailPrintInfo from "./DiscussRiskResult/EmailPrintInfo";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Progress from "./DiscussRiskResult/Progress";
import { FormContext } from "./Form";
import Tooltip from "./Tooltip";
import React from "react";
import PrintEmail from "./DiscussRiskResult/PrintEmail";
import UpRightIcon from "../../public/assets/images/discussRiskResult/icons/up-right-from-square-solid.svg";
import StickyBox from "react-sticky-box";
import print from "./DiscussRiskResult/Print.module.css";

export interface IComponentClassNames {
  DiscussRiskResult: string;
}

interface resultProps {
  result: number;
  reClassficationRisk: string;
  smoke?: boolean;
}

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
      height: "336px",
      position: "relative",
      [variable.mdDown]: {
        width: "50%",
      },
      [variable.mobileDown]: {
        width: "100%",
        height: "auto",
      },
      "& .mantine-Container-root": {
        margin: 0,
        paddingTop: variable.spacer3,
        position: "absolute",
        bottom: "0",
        [variable.mobileDown]: {
          position: "static",
        },
      },
      "& .lower-text": {
        height: "32px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      "& .mantine-risk-border-box": {
        "& .rsik-description": {
          height: "160px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          lineClamp: 5,
          WebkitBoxOrient: "vertical",
          [variable.mobileDown]: {
            display: "block",
            height: "auto",
          },
        },
        "&.checked": {
          "& .rsik-description": {
            height: "auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            lineClamp: 3,
            WebkitBoxOrient: "vertical",
            [variable.mobileDown]: {
              display: "block",
              height: "auto",
            },
          },
        },
      },
      [variable.mobileDown]: {
        width: "100%",
        float: "none",
        height: "auto",
      },
      "& h2": {
        margin: 0,
        marginBottom: variable.spacer6,
        color: "#191B5E",
        fontFamily: variable.fontFamilyBold,
        fontSize: "28px",
        fontWeight: "bold",
        letterSpacing: "0.15px",
        lineHeight: "36px",
      },
      "& span": {
        display: "block",
        maxWidth: "495px",
        color: variable.grey600,
        fontSize: variable.fontSizeMedium,
        letterSpacing: "0.17px",
        lineHeight: "32px",
        [variable.mobileDown]: {
          maxWidth: "100%",
        },
      },
    },
    "& .strap1Right": {
      float: "left",
      width: "calc(45% - 60px)",
      height: "336px",
      marginLeft: "60px",
      [variable.mdDown]: {
        width: "calc(50% - 45px)",
        marginLeft: "45px",
      },
      [variable.mobileDown]: {
        width: "100%",
        marginLeft: 0,
        float: "none",
        marginTop: variable.spacer4,
      },
      "&>div": {
        marginBottom: "7px",
        "&:last-child": {
          marginBottom: 0,
        },
      },
      "& svg": {
        width: "15px",
        height: "24px",
        marginRight: "14px",
        verticalAlign: "middle",
        fill: "#B0BEC5",
        display: "inline-block",
        [variable.mdDown]: {
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
    "& .strap2": {
      marginTop: variable.spacer13,
      padding: "30px 30px 35px 30px",
      borderRadius: "8px",
      backgroundColor: "rgba(182,198,207,0.12)",
      [variable.mobileDown]: {
        paddingBottom: "14px",
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
      "&>span": {
        display: "inline-block",
        color: "rgba(25,27,94,0.8)",
        fontFamily: variable.fontFamilySemiBold,
        marginBottom: variable.spacer4,
        fontSize: variable.fontSizeLg,
        fontWeight: variable.fontWeightSemiBold,
        letterSpacing: "0.17px",
        lineHeight: "20px",
      },
      "& .mantine-Chip-root": {
        float: "left",
        marginRight: variable.spacer3,
        marginBottom: variable.spacer3,
        "@media(max-width: 890px)": {
          float: "left",
        },
        [variable.mobileDown]: {
          marginBottom: variable.spacer4,
        },
        [variable.smDown]: {
          float: "none",
          marginRight: 0,
          "& .mantine-Chip-label": {
            whiteSpace: "inherit",
            height: "auto",
            lineHeight: "20px",
            paddingTop: "6px",
            paddingBottom: "6px",
          },
        },
        "& .mantine-Chip-label": {
          minWidth: "158px",
          textAlign: "center",
          color: "#191B5E",
          fontFamily: variable.fontFamily,
          fontSize: variable.fontSizeMd,
          border: "2px solid rgba(25,27,94,0.2)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          "&:hover, &:focus, &:active": {
            backgroundColor: "#f8f9fa",
          },
          [variable.smDown]: {
            width: "100%",
            minWidth: "auto",
          },
          "&[data-checked]": {
            color: variable.white,
            backgroundColor: variable.customRed,
            borderColor: variable.customRed,
            "& .mantine-Chip-iconWrapper": {
              color: variable.white,
            },
          },
        },
      },
    },
    "& .strap4": {
      marginTop: variable.spacer10,
      display: "flex",
      alignItems: "center",
      [variable.mobileDown]: {
        display: "block",
      },
      "& .left": {
        width: "50%",
        [variable.mobileDown]: {
          width: "100%",
          marginBottom: variable.spacer10,
        },
        "& h2": {
          fontFamily: variable.fontFamilyBold,
          color: "#191B5E",
          fontSize: variable.fontSizeXLarge,
          fontWeight: "bold",
          lineHeight: "32px",
        },
        "& p": {
          color: "#546E7A",
          fontSize: variable.fontSizeMedium,
          letterSpacing: "0.17px",
          lineHeight: "32px",
        },
        "& a": {
          display: "block",
          fontSize: variable.fontSizeBase,
          width: "243px",
          height: "42px",
          lineHeight: "42px",
          opacity: "0.98",
          borderRadius: "4px",
          backgroundColor: variable.red300,
          boxShadow:
            "0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.02)",
          "& .mantine-Button-label": {
            fontFamily: variable.fontFamilySemiBold,
            fontWeight: variable.fontWeightSemiBold,
          },
          "&:hover, &:focus, &:active": {
            backgroundColor: variable.red500,
            transform: "translateY(0)",
          },
        },
      },
      "& .right": {
        width: "50%",
        paddingBottom: "48%",
        backgroundImage: "url('/assets/images/result-cta.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        [variable.mobileDown]: {
          width: "100%",
        },
      },
    },
    "& .strap5": {
      "& h2": {
        paddingRight: "20px",
        fontFamily: variable.fontFamilyBold,
        color: "#191B5E",
        fontSize: "28px",
        fontWeight: "bold",
        letterSpacing: "0.15px",
        lineHeight: "36px",
      },
      "& h2>div": {
        svg: {
          top: "4px",
        },
        ">svg": {
          top: "1px",
        },
      },
      "& .mantine-Container-root": {
        [variable.mobileDown]: {
          position: "relative",
        },
      },
      "& .mantine-HoverCard-dropdown": {
        [variable.mobileDown]: {
          maxWidth: "calc(100vw - 48px)",
          left: "24px !important",
        },
      },
    },

    "& .card-list": {
      "& h3": {
        marginBottom: variable.spacer6,
        color: "#424242",
        fontFamily: variable.fontFamilyBold,
        fontWeight: "bold",
        fontSize: variable.fontSizeLarge,
        letterSpacing: 0,
        lineHeight: "28px",
        paddingLeft: "56px",
        position: "relative",
        "& img": {
          width: "40px",
          height: "45px",
          position: "absolute",
          left: 0,
          top: "calc(50% - 20px)",
        },
      },
      "& ul": {
        display: "flex",
        flexFlow: "wrap row",
        paddingLeft: 0,
        marginLeft: -variable.spacer2,
        marginRight: -variable.spacer2,
        [variable.mobileDown]: {
          flexDirection: "column",
          marginLeft: variable.spacer0,
          marginRight: variable.spacer0,
        },
        "& li": {
          width: "calc(33.333% - 16px)",
          marginLeft: variable.spacer2,
          marginRight: variable.spacer2,
          marginBottom: variable.spacer4,
          float: "left",
          padding: "16px 14px 16px 14px",
          border: "1px solid rgba(182,198,207,0.4)",
          opacity: 0.98,
          borderRadius: "4px",
          backgroundColor: "rgba(182,198,207,0.04)",
          listStyle: "none",
          [variable.mobileDown]: {
            width: "100%",
            margin: "0 0 16px 0",
          },
          "& a": {
            display: "flex",
            alignItems: "center",
            position: "relative",
            paddingRight: "20px",
            height: "40px",
            color: "#191B5E",
            fontFamily: variable.fontFamilyMedium,
            fontSize: variable.fontSizeBase,
            fontWeight: variable.fontWeightMedium,
            letterSpacing: "0.15px",
            lineHeight: "20px",
            textDecoration: "none",
            maxHeight: "40px",
            // overflow: "hidden",
            "@media (max-width: 768px)": {
              height: "auto",
              maxHeight: "none",
            },
            "&>span>i": {
              display: "inline-block",
              marginRight: "-20px",
              width: "20px",
              textAlign: "right",
              "& svg": {
                width: "14px",
              },
            },
          },
          "& .mantine-Text-root": {
            display: "flex",
            alignItems: "center",
            height: "40px",
            marginTop: variable.spacer2,
            "@media (max-width: 768px)": {
              height: "auto",
            },
          },
          "& p": {
            marginTop: 0,
            marginBottom: 0,
            color: variable.grey600,
            fontSize: variable.fontSizeMd,
            letterSpacing: "0.15px",
            lineHeight: "20px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            [variable.mobileDown]: {
              display: "block",
              height: "auto",
            },
          },
        },
        "&.show": {
          "& li": {
            "&+li+li+li": {
              display: "block",
            },
          },
          "& + .read-more": {
            display: "none",
          },
        },
      },
    },
    "& .strap6": {
      position: "relative",
      borderRadius: "4px 0 0 4px",
      [variable.mobileDown]: {
        marginLeft: "8px",
      },
      "&:before": {
        content: `""`,
        position: "absolute",
        left: "-32px",
        borderRadius: "2px 0 0 2px",
        width: "32px",
        height: "100%",
        background: `url("/assets/images/discussRiskResult/icons/first-nation-device.no-bg.svg")`,
        backgroundColor: "#7DCBB8",
        backgroundSize: "100%",
        backgroundPosition: "center",
        [variable.mobileDown]: {
          width: "8px",
          left: "-8px",
        },
      },
      "& a": {
        display: "inline-block",
        fontSize: variable.fontSizeMd,
        textDecoration: "none",
        color: "#191B5E",
        letterSpacing: "0.15px",
        lineHeight: "20px",
        "&:after": {
          content: `""`,
          display: "inline-block",
          position: "relative",
          top: "2px",
          width: "16px",
          height: "16px",
          background: `url(${UpRightIcon})`,
          marginLeft: variable.spacer1,
        },
      },
      "& .wrapper": {
        padding: "30px 15px",
        backgroundColor: "rgba(125,203,184,0.2)",
        [variable.mobileDown]: {
          padding: "15px 15px",
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
        "& a": {
          fontFamily: variable.fontFamilyMedium,
          fontWeight: variable.fontWeightMedium,
        },
        "& h2": {
          maxWidth: "260px",
          paddingLeft: "15px",
          color: "rgba(25,27,94,0.8)",
          fontFamily: variable.fontFamilyBold,
          fontSize: "28px",
          fontWeight: "bold",
          letterSpacing: "0.15px",
          lineHeight: " 32px",
          [variable.mobileDown]: {
            paddingLeft: 0,
            maxWidth: "none",
          },
        },
        "& .specific-resources-left": {
          width: "30%",
          float: "left",
          [variable.mobileDown]: {
            width: "100%",
            float: "none",
          },
          "& .specific-resources-left-content": {
            padding: "12px 15px",
            backgroundColor: variable.white,
            borderRadius: "4px",
            opacity: "0.98",
            border: "1px solid rgba(182,198,207,0.4)",
            "& p": {
              height: "40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              lineClamp: 2,
              WebkitBoxOrient: "vertical",
              color: variable.grey600,
              fontSize: variable.fontSizeBase,
              letterSpacing: "0.15px",
              lineHeight: "20px",
              [variable.mobileDown]: {
                display: "block",
                height: "auto",
              },
            },
          },
        },
        "& .specific-resources-right": {
          width: "calc(70% - 30px)",
          float: "left",
          marginLeft: "30px",
          [variable.mobileDown]: {
            width: "100%",
            float: "none",
            marginLeft: "0",
          },
        },
        "& svg": {
          width: "16px",
          height: "16px",
          marginLeft: variable.spacer2,
          fill: "#191B5E",
          position: "absolute",
        },
        "& .specific-resources-list": {
          [variable.mdDown]: {
            marginTop: variable.spacer6,
          },
          "& h3": {
            fontSize: variable.fontSizeXSmall,
            fontWeight: variable.fontWeightSemiBold,
            letterSpacing: "0.11px",
            lineHeight: "14px",
            textTransform: "uppercase",
          },
          "& ul": {
            listStyle: "none",
            padding: 0,
            marginLeft: "-20px",
            marginRight: "-20px",
            "& + h3": {
              marginTop: variable.spacer9,
              [variable.mobileDown]: {
                marginTop: variable.spacer4,
              },
            },
            [variable.mobileDown]: {
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
              width: "calc(50% - 40px)",
              float: "left",
              marginLeft: "20px",
              marginRight: "20px",
              [variable.mobileDown]: {
                width: "100%",
                marginLeft: 0,
                marginRight: 0,
                marginBottom: variable.spacer4,
              },
              "& p": {
                margin: 0,
                marginTop: variable.spacer2,
                color: variable.grey600,
                lineHeight: "20px",
                height: "40px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                lineClamp: 2,
                WebkitBoxOrient: "vertical",
                [variable.mobileDown]: {
                  display: "block",
                  height: "auto",
                },
              },
            },
          },
        },
      },
    },
    "& .overflow-fix-follow_1": {
      "&>span": {
        "&>span": {
          "&>span:last-of-type": {
            "@media (max-width: 800px)": {
              display: "none",
            },
            "@media (max-width: 768px)": {
              display: "inline-block",
            },
          },
          "& i:before": {
            "@media (max-width: 800px)": {
              content: `"…"`,
            },
            "@media (max-width: 768px)": {
              display: "none",
            },
          },
        },
      },
    },
    "& .overflow-fix-incorporate_2": {
      "&>span": {
        "&>span": {
          "& span:last-of-type": {
            "@media (max-width: 925px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(1), & span:nth-of-type(2)": {
            "@media (max-width: 825px)": {
              display: "none",
            },
            "@media (max-width: 768px)": {
              display: "inline-block",
            },
          },
          "& i:before": {
            "@media (max-width: 925px)": {
              content: `"…"`,
            },
            "@media (max-width: 768px)": {
              display: "none",
            },
          },
        },
      },
    },
    "& .overflow-fix-achieve_4": {
      "&>span": {
        "&>span": {
          "& i:before": {
            content: `"…"`,
            "@media (max-width: 768px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(2)": {
            "@media (max-width: 890px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(1), & span:nth-of-type(2), & span:nth-of-type(3)":
            {
              "@media (max-width: 850px)": {
                display: "none",
              },
              "@media (max-width: 768px)": {
                display: "inline-block",
              },
            },
          "& span:nth-of-type(3)": {
            "@media (max-width: 768px)": {
              display: "inline",
            },
          },
        },
      },
    },
    "& .overflow-fix-limit_2": {
      "&>span": {
        "&>span": {
          "& i:before": {
            content: `"…"`,
            "@media (max-width: 768px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(3)": {
            display: "none",
          },
          "& span:nth-of-type(2)": {
            "@media (max-width: 910px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(1), & span:nth-of-type(2), & span:nth-of-type(3)":
            {
              "@media (max-width: 805px)": {
                display: "none",
              },
              "@media (max-width: 768px)": {
                display: "inline-block",
              },
            },
        },
      },
    },
    "& .overflow-fix-blood_2": {
      "&>span": {
        "&>span": {
          "& i:before": {
            content: `"…"`,
            "@media (max-width: 768px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(4)": {
            display: "none",
            "@media (max-width: 768px)": {
              display: "inline",
            },
          },
          "& span:nth-of-type(3)": {
            "@media (max-width: 950px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(2)": {
            "@media (max-width: 920px)": {
              display: "none",
            },
          },
          "& span:nth-of-type(1), & span:nth-of-type(2), & span:nth-of-type(3)":
            {
              "@media (max-width: 820px)": {
                display: "none",
              },
              "@media (max-width: 768px)": {
                display: "inline-block",
              },
            },
        },
      },
    },
    "& .overflow-fix-first_1": {
      "@media (max-width: 817px)": {
        "&>span": {
          display: "inline-block",
          "& i:before": {
            content: `"…"`,
          },
          "& span:nth-of-type(1)": {
            display: "none",
          },
        },
      },
      "@media (max-width: 768px)": {
        "&>span": {
          "& span:nth-of-type(1)": {
            display: "inline",
          },
          "& i": {
            display: "none",
          },
        },
      },
    },
    "& .overflow-fix-first_4": {
      "@media (max-width: 925px)": {
        "&>span": {
          display: "inline-block",
          "& i:before": {
            content: `"…"`,
          },
          "& span:nth-of-type(3)": {
            display: "none",
          },
        },
      },
      "@media (max-width: 802px)": {
        "&>span": {
          "& span:nth-of-type(2), & span:nth-of-type(3), & span:nth-of-type(4)":
            {
              display: "none",
            },
        },
      },
      "@media (max-width: 768px)": {
        "&>span": {
          "& span:nth-of-type(1), & span:nth-of-type(2)": {
            display: "inline",
          },
          "& i": {
            display: "none",
          },
        },
      },
    },
  },
  "& .mantine-Modal-modal": {
    paddingTop: variable.spacer4,
    paddingBottom: variable.spacer4,
    "& .mantine-SimpleGrid-root": {
      [variable.smDown]: {
        display: "block",
        "& .mantine-Container-root": {
          marginBottom: variable.spacer4,
        },
      },
    },
    "& .mantine-Modal-close": {
      right: "4px",
    },
  },
  "& .mantine-Modal-header": {
    marginBottom: variable.spacer3,
  },
}));

export default function DiscussRiskResult(props: resultProps) {
  const [result, setResult] = useState(props.result);
  const [newResult, setNewResult] = useState(props.result);
  const [reClassficationRisk, setReClassficationRisk] = useState<string>(
    props.reClassficationRisk
  );
  // console.log("reClassficationRisk is ", reClassficationRisk);
  const { form } = useContext(FormContext);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  //control modal open and close
  const [opened, { open, close }] = useDisclosure(false);

  const [isActive, setActive] = useState(false);

  const [calculator, setcalculator] = useState(0.010676864);
  //resources spoiler
  const [show, toggleShow] = useState<boolean>(false);
  //show smoking resource?
  let showSmoke: boolean = form.values.smoking ? form.values.smoking > 1 : true;

  //email&&print selected checkbox
  const [selectCheckedBoxs, setSelectCheckedBoxs] = useState([
    { nextStep: "" },
    { risks: [{ checked: false }, { checked: false }, { checked: false }] },
    {
      resources: [
        { checked: false },
        { checked: false },
        { checked: false },
        { checked: false },
        { checked: false },
        { checked: false },
      ],
    },
  ]);
  //send Email
  function sendEmail() {
    const recipient = "";
    const subject = "CVD risk calculator - your result and resources";
    const url = `
    result=${result}&recalc=${reClassficationRisk}&sCompare=${
      selectCheckedBoxs[1].risks && selectCheckedBoxs[1].risks.length > 1
        ? selectCheckedBoxs[1].risks[0].checked
        : false
    }&showSmoke=${showSmoke}&
    bpCompare=${
      selectCheckedBoxs[1].risks && selectCheckedBoxs[1].risks.length > 1
        ? selectCheckedBoxs[1].risks[1].checked
        : false
    }&
    ldlCompare=${
      selectCheckedBoxs[1].risks && selectCheckedBoxs[1].risks.length > 1
        ? selectCheckedBoxs[1].risks[2].checked
        : false
    }&
    qsResource=${
      selectCheckedBoxs[2].resources &&
      selectCheckedBoxs[2].resources.length > 1
        ? selectCheckedBoxs[2].resources[0].checked
        : false
    }&
    nrResource=${
      selectCheckedBoxs[2].resources &&
      selectCheckedBoxs[2].resources.length > 1
        ? selectCheckedBoxs[2].resources[1].checked
        : false
    }&
    hwrResource=${
      selectCheckedBoxs[2].resources &&
      selectCheckedBoxs[2].resources.length > 1
        ? selectCheckedBoxs[2].resources[2].checked
        : false
    }&
    arrResource=${
      selectCheckedBoxs[2].resources &&
      selectCheckedBoxs[2].resources.length > 1
        ? selectCheckedBoxs[2].resources[3].checked
        : false
    }&
    mrrResource=${
      selectCheckedBoxs[2].resources &&
      selectCheckedBoxs[2].resources.length > 1
        ? selectCheckedBoxs[2].resources[4].checked
        : false
    }&
    fnsResource=${
      selectCheckedBoxs[2].resources &&
      selectCheckedBoxs[2].resources.length > 1
        ? selectCheckedBoxs[2].resources[5].checked
        : false
    }`;

    //encode url
    const encodedUrl =
      `${window.location.href}?` + btoa(url.replace(/\s/g, "")) + `\n\n`;
    const nextStep =
      selectCheckedBoxs[0].nextStep !== ""
        ? `next step:%0d%0a ${selectCheckedBoxs[0].nextStep}%0d%0a`
        : "";

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=Here are your CVD risk results. %0d%0a${encodeURIComponent(
      encodedUrl
    )} ${nextStep}`;
    window.location.href = mailtoUrl;
  }

  const getNextStepText = (arg: string) => {
    setSelectCheckedBoxs((state) => {
      const newState = state.slice();
      newState[0].nextStep = arg;
      return newState;
    });
  };
  const getRiskCheckBoxes = (arg: []) => {
    setSelectCheckedBoxs((state) => {
      const newState = state.slice();
      newState[1].risks = arg;
      return newState;
    });
  };
  const getResourceCheckBoxes = (arg: []) => {
    setSelectCheckedBoxs((state) => {
      const newState = state.slice();
      newState[2].resources = arg;
      return newState;
    });
  };

  const toggleClass = () => {
    setActive(!isActive);
  };
  //reset newResult to resultchecked2
  useEffect(() => {
    if (checked1 === false && checked2 === false && checked3 === false) {
      setNewResult(Math.round(result));
    }
  }, [checked1, checked2, checked3]);
  // re-calcultor
  const reCalculateClick = (multi: number) => {
    setNewResult((state) => {
      return Math.round(result * multi);
    });
  };

  let { DiscussRiskResult } = useStyles().classes;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={DiscussRiskResult}>
      <StickyBox offsetTop={variable.spacer1} offsetBottom={0}>
        <Stack
          sx={{
            position: "absolute",
            right: "-215px",
            "@media (max-width: 1355px)": {
              display: "none",
            },
          }}
        >
          <Button
            onClick={open}
            sx={{
              width: "193px",
              height: "50px",
              fontFamily: variable.fontFamilySemiBold,
              fontSize: variable.fontSizeMedium,
              fontWeight: variable.fontWeightSemiBold,
              lineHeight: "20px",
              borderRadius: "8px",
              backgroundColor: "rgba(231,19,68,0.98)",
              boxShadow:
                "0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.02)",
              "&:hover,&:focus,&:active,&:not([data-disabled]):hover": {
                backgroundColor: variable.red500,
              },
              "& .mantine-Button-label": {
                fontFamily: variable.fontFamilySemiBold,
              },
            }}
            className="print-button"
            component="a"
            target="_blank"
          >
            Print or email info
          </Button>
        </Stack>
      </StickyBox>
      <Affix position={{ top: 20, right: 20 }}></Affix>
      <Box className={print.printHide}>
        <Modal
          className={print.printHide}
          opened={opened}
          onClose={close}
          title={
            <span
              style={{
                fontFamily: variable.fontFamilyMedium,
                fontWeight: variable.fontWeightMedium,
                fontSize: variable.fontSizeMd,
              }}
            >
              Print & email these results
            </span>
          }
          centered
          size="auto"
          fullScreen={useMediaQuery("(max-width: 48em)")}
        >
          <EmailPrintInfo
            cancel={close}
            hideSmoking={form.values.smoking <= 1}
            callback={getNextStepText}
            getRiskCheckBoxes={getRiskCheckBoxes}
            getResourceCheckBoxes={getResourceCheckBoxes}
            sendEmail={sendEmail}
            recalc={reClassficationRisk}
          />
        </Modal>
        <div className="strap1">
          <div className="strap1Left">
            <Box
              className={`mantine-risk-border-box ${
                !checked1 && !checked2 && !checked3 ? "" : "checked"
              }`}
              sx={{
                borderRadius: "8px",
                boxShadow:
                  !checked1 && !checked2 && !checked3
                    ? ""
                    : "0 2px 6px rgba(0, 0, 0, 0.3)",
                transform: "translate3d(-2px, -2px, 0)",
                padding: !checked1 && !checked2 && !checked3 ? "" : "20px 15px",
              }}
            >
              {(checked1 || checked2 || checked3) && (
                <span className="lower-text">
                  Your risk if you&nbsp;
                  {checked1
                    ? "quit smoking"
                    : checked2
                    ? "lower blood pressure by 10mmHg"
                    : "lower LDL cholesterol by 1mmol/L"}
                </span>
              )}
              <Title
                order={2}
                sx={{
                  marginBottom:
                    !checked1 && !checked2 && !checked3
                      ? ""
                      : "20px !important",
                }}
              >
                {reClassficationRisk === "show" &&
                  `${
                    !checked1 && !checked2 && !checked3 ? "" : "="
                  } ${newResult}% `}
                {newResult >= 10
                  ? "High risk"
                  : newResult >= 5
                  ? "Intermediate risk"
                  : "Low risk"}
              </Title>
              {!checked1 &&
              !checked2 &&
              !checked3 &&
              reClassficationRisk === "show" ? (
                <span className="rsik-description">
                  Your current risk of having a heart attack or stroke in the
                  next 5 years is {newResult} out of 100, which is considered{" "}
                  {newResult >= 10
                    ? "High"
                    : newResult >= 5
                    ? "Intermediate"
                    : "Low"}
                  . Imagine 100 people like you. {newResult} of those people
                  will have a heart attack or stroke in the next 5 years if they
                  don’t take action.
                </span>
              ) : checked1 ? (
                <span className="rsik-description">
                  Risk has {result !== newResult ? "reduced from" : "remains"}{" "}
                  {result} out of 100 risk,{" "}
                  {result !== newResult ? `to ${newResult} out of 100` : ""}{" "}
                  which is considered{" "}
                  {newResult >= 10
                    ? "High"
                    : newResult >= 5
                    ? "Intermediate"
                    : "Low"}
                  . Find resources below on smoking cessation.
                </span>
              ) : checked3 ? (
                <span className="rsik-description">
                  Risk has {result !== newResult ? "reduced from" : "remains"}{" "}
                  {result} out of 100 risk,{" "}
                  {result !== newResult ? `to ${newResult} out of 100` : ""}{" "}
                  which is considered{" "}
                  {newResult >= 10
                    ? "High"
                    : newResult >= 5
                    ? "Intermediate"
                    : "Low"}
                  .
                </span>
              ) : reClassficationRisk === "show" ? (
                <span className="rsik-description">
                  Risk has {result !== newResult ? "reduced from" : "remains"}{" "}
                  {result} out of 100 risk,{" "}
                  {result !== newResult ? `to ${newResult} out of 100` : ""}{" "}
                  which is considered{" "}
                  {newResult >= 10
                    ? "High"
                    : newResult >= 5
                    ? "Intermediate"
                    : "Low"}
                  .
                </span>
              ) : (
                //reClassficationRisk
                <span className="rsik-description">
                  Your current risk of having a heart attack or stroke in the
                  next 5 years is estimated to be{" "}
                  {newResult >= 10
                    ? "10 "
                    : newResult >= 5
                    ? "from 5 out of 100, to 10 "
                    : "less than 5 "}
                  out of 100{newResult >= 10 ? " or higher" : ""}, which is
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
                  of those people will have a heart attack or stroke in the next
                  5 years if they don’t take action.
                </span>
              )}
            </Box>
            <Progress
              level={result}
              newLevel={newResult}
              reClassficationRisk={reClassficationRisk}
            />
          </div>
          <SolidPersonSvg
            redCount={result}
            newRedCount={reClassficationRisk === "high risk" ? 15 : newResult}
          />
        </div>
        {reClassficationRisk === "show" && (
          <div className="strap2">
            <span>Lower your risk by</span>
            <div className="chip-button">
              {showSmoke && (
                <Chip
                  value={"1"}
                  color="red"
                  variant="filled"
                  size="lg"
                  checked={checked1}
                  sx={{
                    "@media (max-width: 450px)": {
                      fontSize: variable.fontSizeSmall,
                    },
                  }}
                  onChange={() => {
                    setChecked2(false);
                    setChecked3(false);
                    setChecked1((v) => !v);
                    reCalculateClick(0.6);
                  }}
                >
                  Quit smoking
                </Chip>
              )}
              <Chip
                value={"2"}
                size="lg"
                checked={checked2}
                sx={{
                  "@media (max-width: 450px)": {
                    fontSize: variable.fontSizeSmall,
                  },
                }}
                onChange={() => {
                  setChecked2((v) => !v);
                  setChecked1(false);
                  setChecked3(false);
                  reCalculateClick(0.8);
                }}
              >
                Lower blood pressure by 10mmHg
              </Chip>
              <Chip
                value={"3"}
                size="lg"
                checked={checked3}
                sx={{
                  "@media (max-width: 450px)": {
                    fontSize: variable.fontSizeSmall,
                  },
                }}
                onChange={() => {
                  setChecked3((v) => !v);
                  setChecked1(false);
                  setChecked2(false);
                  reCalculateClick(0.75);
                }}
              >
                Lower LDL cholesterol by 1 mmol/L
              </Chip>
            </div>
          </div>
        )}
        <Strap3 result={result} showSmoke={showSmoke} />
        <div className="strap4">
          <div className="left">
            <h2>Want to take this information home to read?</h2>
            <p>
              Take this information and additional resources home via print
              and/or email. Webpage resources can be accessed on printouts by
              scanning the QR codes.
            </p>
            <Button component="a" target="_blank" onClick={open}>
              Print or email these results
            </Button>
          </div>
          <div className="right"></div>
        </div>
        <div className="strap5">
          <h2>
            Resources to support healthy behaviours and habits
            <Tooltip
              cardDropdownContent={`Find resources for health professionals by clicking the "See insight guideline" button.`}
              cardButtonLink=""
            />
          </h2>
          {showSmoke && (
            <div className="card-list">
              <h3>
                <img
                  src="/assets/images/discussRiskResult/icons/icon-badge.smoking.xl.svg"
                  alt="Quit smoking"
                />
                Quit smoking
              </h3>
              <ul>
                <li>
                  <a
                    href="https://www.racgp.org.au/clinical-resources/clinical-guidelines/handi/handi-interventions/apps/smartphone-apps-for-smoking-cessation"
                    target="_blank"
                  >
                    <span>
                      Smoking cessation apps
                      <i>
                        <UpRightIcon />
                      </i>
                    </span>
                  </a>
                  <Text>
                    <p>Royal Australian College of General Practitioners</p>
                  </Text>
                </li>
                <li>
                  <a href="https://www.quit.org.au/" target="_blank">
                    <span>
                      Quitline
                      <i>
                        <UpRightIcon />
                      </i>
                    </span>
                  </a>
                  <Text>
                    <p>Confidential telephone counselling service</p>
                  </Text>
                </li>
                <li>
                  <a
                    href="https://www.heartfoundation.org.au/heart-health-education/smoking-and-your-heart"
                    target="_blank"
                  >
                    <span>
                      Smoking and your heart
                      <i>
                        <UpRightIcon />
                      </i>
                    </span>
                  </a>
                  <Text>
                    <p>National Heart Foundation of Australia</p>
                  </Text>
                </li>
              </ul>
            </div>
          )}
          <div className="card-list">
            <h3>
              <img
                src="/assets/images/discussRiskResult/icons/icon-badge.nutrition.xl.svg"
                alt="Follow a healthy eating pattern"
              />
              Follow a healthy eating pattern
            </h3>
            <ul className={isActive ? "show" : ""}>
              <li>
                <a
                  href="https://www.eatforhealth.gov.au/sites/default/files/2022-11/n55i_australian_guide_to_healthy_eating_0.pdf"
                  target="_blank"
                  className="overflow-fix-follow_1"
                >
                  <span>
                    Australian Guide to Healthy Eating
                    <span>
                      <span>&nbsp;- Summary</span>
                      <i></i>
                    </span>
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>Australian Government</p>
                </Text>
              </li>
              <li>
                <a href="https://healthyeatingquiz.com.au/" target="_blank">
                  <span>
                    Healthy Eating Quiz
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>How healthy is your diet? Find out in under 10 minutes</p>
                </Text>
              </li>
              <li>
                <a
                  href="https://www.georgeinstitute.org/projects/foodswitch"
                  target="_blank"
                >
                  <span>
                    Food Switch
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>Helping you to make better food choices</p>
                </Text>
              </li>
            </ul>
          </div>
          <div className="card-list">
            <h3>
              <img
                src="/assets/images/discussRiskResult/icons/icon-badge.physical-activity.xl.svg"
                alt="Incorporate regular physical activity into your routine"
              />
              Incorporate regular physical activity into your routine
            </h3>
            <ul>
              <li>
                <a
                  href="https://walkingplans.heartfoundation.org.au/?utm_source=web&utm_medium=FeatureTile&utm_campaign=personal_walking_plans"
                  target="_blank"
                >
                  <span>
                    Personalised walking plans (free online)
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>National Heart Foundation of Australia</p>
                </Text>
              </li>
              <li>
                <a
                  href="https://www.health.gov.au/health-topics/physical-activity-and-exercise/physical-activity-and-exercise-guidelines-for-all-australians"
                  target="_blank"
                  className="overflow-fix-incorporate_2"
                >
                  <span>
                    Australia’s physical activity and sedentary
                    <span>
                      <span>&nbsp;behaviour</span>
                      <span>&nbsp;guidelines</span>
                      <i></i>
                    </span>
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>Australian Department of Health and Aged Care</p>
                </Text>
              </li>
            </ul>
          </div>
          <div className="card-list">
            <h3>
              <img
                src="/assets/images/discussRiskResult/icons/icon-badge.weight.xl.svg"
                alt="Achieve and maintain a healthy weight"
              />
              Achieve and maintain a healthy weight
            </h3>
            <ul>
              <li>
                <a
                  href="https://www.racgp.org.au/clinical-resources/clinical-guidelines/handi/handi-interventions/nutrition/ten-top-tips-for-weight-control"
                  target="_blank"
                >
                  <span>
                    Ten top tips for weight control
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>Royal Australian College of General Practitioners</p>
                </Text>
              </li>
              <li>
                <a
                  href="https://www.betterhealth.vic.gov.au/health/healthyliving/weight-loss-a-healthy-approach"
                  target="_blank"
                >
                  <span>
                    Weight loss - a healthy approach
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>Better Health Channel (Victorian Department of Health)</p>
                </Text>
              </li>
              <li>
                <a
                  href="https://www.healthdirect.gov.au/weight-loss-and-dieting"
                  target="_blank"
                >
                  <span>
                    Weight loss and dieting
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>
                    Healthdirect - quality, approved health information and
                    advice
                  </p>
                </Text>
              </li>
              {!show && (
                <Text
                  color="#79909C"
                  size={variable.fontSizeBase}
                  lh={"20px"}
                  pl={26}
                  mb={16}
                  mt={-6}
                >
                  and 1 other link...
                  <Text
                    onClick={() => {
                      toggleShow((v) => !v);
                    }}
                    pl={16}
                    sx={{
                      display: "inline-block",
                      "&:hover": { cursor: "pointer" },
                    }}
                    color="#191B5E"
                  >
                    Show all
                  </Text>
                </Text>
              )}
              {show && (
                <li>
                  <a
                    href="https://www.heartfoundation.org.au/bundles/your-heart/healthy-body-weight"
                    target="_blank"
                    className="overflow-fix-achieve_4"
                  >
                    <span>
                      Information for patients on achieving and
                      <span>
                        <span>&nbsp;maintaining</span>
                        <span>&nbsp;a</span>
                        <span>&nbsp;healthy body weight</span>
                        <i></i>
                      </span>
                      <i>
                        <UpRightIcon />
                      </i>
                    </span>
                  </a>
                  <Text>
                    <p>National Heart Foundation of Australia</p>
                  </Text>
                </li>
              )}
            </ul>
          </div>
          <div className="card-list">
            <h3>
              <img
                src="/assets/images/discussRiskResult/icons/icon-badge.alcohol.xl.svg"
                alt="Limit your intake of alcohol"
              />
              Limit your intake of alcohol
            </h3>
            <ul>
              <li>
                <a
                  href="https://fare.org.au/resources/support/"
                  target="_blank"
                >
                  <span>
                    FARE support services
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>Foundation for Alcohol Research and Education</p>
                </Text>
              </li>
              <li>
                <a
                  href="https://www.nhmrc.gov.au/health-advice/alcohol"
                  target="_blank"
                  className="overflow-fix-limit_2"
                >
                  <span>
                    Australian guidelines to reduce health risks
                    <span>
                      <span>&nbsp;from</span>
                      <span>&nbsp;drinking</span>
                      <span>&nbsp;alcohol</span>
                      <i></i>
                    </span>
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>National Health and Medical Research Council (NHMRC)</p>
                </Text>
              </li>
            </ul>
          </div>
          <div className="card-list">
            <h3>
              <img
                src="/assets/images/discussRiskResult/icons/icon-badge.medicine.xl.svg"
                alt="Blood pressure-lowering and lipid-modifying medicines"
              />
              Blood pressure-lowering and lipid-modifying medicines
            </h3>
            <ul>
              <li>
                <a
                  href="https://strokefoundation.org.au/media/ixgpi3ga/sf891_high-bp-fact-sheet_0422_v5-final.pdf"
                  target="_blank"
                >
                  <span>
                    High blood pressure fact sheet
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>Stroke Foundation</p>
                </Text>
              </li>
              <li>
                <a
                  href="https://www.nice.org.uk/guidance/cg181/resources/patient-decision-aid-pdf-243780159"
                  target="_blank"
                  className="overflow-fix-blood_2"
                >
                  <span>
                    Taking a statin to reduce the risk of coronary
                    <span>
                      <span>&nbsp;heart</span>
                      <span>&nbsp;disease</span>
                      <span>&nbsp;and</span>
                      <span>&nbsp;stroke. Patient decision aid</span>
                      <i></i>
                    </span>
                    <i>
                      <UpRightIcon />
                    </i>
                  </span>
                </a>
                <Text>
                  <p>
                    National Institute for Health and Care Excellence (NICE)
                  </p>
                </Text>
              </li>
            </ul>
          </div>
        </div>

        <div className="strap6">
          <div className="wrapper">
            <div className="specific-resources-left">
              <h2>First Nations specific resources</h2>
              <div className="specific-resources-left-content">
                <a
                  href="https://www.svhhearthealth.com.au/aboriginal-heart-health/heart-risks"
                  target="_blank"
                  className="overflow-fix-first_1"
                >
                  Heart health resources for First Nations
                  <span>
                    <span>&nbsp;people</span>
                    <i></i>
                  </span>
                </a>
                <p>
                  National Heart Foundation of Australia and St Vincent's
                  Hospital Heart Health
                </p>
              </div>
            </div>
            <div className="specific-resources-right">
              <div className="specific-resources-list">
                <h3>Alcohol & Smoking Related resources</h3>
                <ul>
                  <li>
                    <a href="https://www.quit.org.au/" target="_blank">
                      Quitline
                    </a>
                    <p>
                      Offers a smoking cessation service and resources
                      specifically for First Nations people
                    </p>
                  </li>
                  <li>
                    <a
                      href="https://strongspiritstrongmind.com.au/alcohol"
                      target="_blank"
                    >
                      Alcohol
                    </a>
                    <p>Strong Spirit Strong Mind</p>
                  </li>
                </ul>
                <h3>Nutrition related resources</h3>
                <ul>
                  <li>
                    <a
                      href="https://www.heartfoundation.org.au/getmedia/4edc3153-7cc1-471b-bf56-03193f004f38/Cooking-in-the-Pilbara-Recipe-Book_1.pdf"
                      target="_blank"
                    >
                      Cooking in the Pilbara
                    </a>
                    <p>National Heart Foundation of Australia recipe book</p>
                  </li>
                  <li>
                    <a
                      href="https://www.eatforhealth.gov.au/sites/default/files/content/The%20Guidelines/final_igthe_a3_poster_-_lr.pdf"
                      target="_blank"
                      className="overflow-fix-first_4"
                    >
                      Aboriginal and Torres Strait Islander Guide
                      <span>
                        <span>&nbsp;to</span>
                        <span>&nbsp;Healthy</span>
                        <span>&nbsp;Eating</span>
                        <i></i>
                      </span>
                    </a>
                    <p>Department of Health and Aged Care</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <PrintEmail
        result={result}
        newResult={newResult}
        reClassficationRisk={reClassficationRisk}
        showSmoke={showSmoke}
        nextStep={
          selectCheckedBoxs[0].nextStep ? selectCheckedBoxs[0].nextStep : ""
        }
        userSelected={selectCheckedBoxs}
        isEmailUrl={false}
      />
    </div>
  );
}
