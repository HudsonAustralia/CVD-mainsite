import React from "react";
import Layout from "../components/Layout";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import client from "../pages/api/apolloClient";
import { QUERY_HEADER, QUERY_FOOTER, QUERY_HOME } from "../pages/api/gql";
import { HomeProps } from "../types";
import { Button, Container, createStyles } from "@mantine/core";
import variable from "../styles/theme/variables";
import ArrowToBottom from "../public/assets/cmsImages/arrow-alt-to-bottom-white.svg";
import CalculatorSolid from "../public/assets/cmsImages/calculator-solid.svg";

const useStyles = createStyles((theme) => ({
  buttonAlt: {
    fontFamily: variable.fontFamilySemiBold,
    fontWeight: variable.fontWeightSemiBold,
    lineHeight: "19px",
    backgroundColor: variable.red300,
    "&:hover, :not([data-disabled]):hover": {
      backgroundColor: variable.red500,
    },
  },
  heroBanner: {
    marginLeft: "-16px",
    marginRight: "-16px",
    backgroundColor: variable.blue,
    position: "relative",
    height: "500px",
    color: variable.white,
    "&:before": {
      content: `""`,
      background: "#191B5E",
      display: "block",
      position: "absolute",
      bottom: "-50px",
      width: "100%",
      height: "100px",
      borderRadius: "50%",
    },
    [variable.mdDown]: {
      height: "100%",
      paddingTop: "30px",
      paddingBottom: "30px",
    },
  },

  heroBannerWrapper: {
    height: "500px",
    maxWidth: "1200px",
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "auto",
    "&::before": {
      content: `''`,
      display: "table",
    },
    "&::after": {
      content: `''`,
      display: "table",
      clear: "both",
    },
    [variable.mdDown]: {
      height: "100%",
    },
  },
  bannerButton: {
    width: "283px",
    height: "50px",
    fontSize: variable.fontSizeMedium,
    fontFamily: variable.fontFamilySemiBold,
    fontWeight: variable.fontWeightSemiBold,
    backgroundColor: variable.red300,
    borderRadius: "8px !important",
    [variable.mobileDown]: {
      width: "calc(100% - 40px)",
      marginLeft: "20px !important",
      marginRight: "20px",
    },
    "&:hover, &:focus, &:active": {
      backgroundColor: "#de0738 !important",
    },
    "& svg": {
      width: "16px",
      fill: variable.white,
      marginLeft: variable.spacer3,
    },
  },
  heroLeft: {
    width: "50%",
    height: "100%",
    float: "left",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [variable.mdDown]: {
      width: "100%",
      float: "none",
      height: "auto",
      alignItems: "center",
      marginBottom: variable.spacer10,
    },
    "& span": {
      fontSize: variable.fontSizeMedium,
    },
    "& h2": {
      margin: 0,
      fontFamily: variable.fontFamilyMedium,
      fontSize: variable.fontSizeXXLarge,
      fontWeight: variable.fontWeightMedium,
      "@media (max-width: 500px)": {
        fontSize: variable.fontSizeXLarge,
      },
    },
  },
  heroRight: {
    width: "50%",
    height: "100%",
    float: "left",
    background: "url('/assets/cmsImages/banner-asset.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    [variable.mdDown]: {
      width: "100%",
      float: "none",
      height: "auto",
      paddingBottom: "30%",
    },
  },
  infographic: {
    width: "100%",
    marginTop: "120px",
    paddingBottom: "70%",
    background: "url('/assets/cmsImages/CVD-timeline-static.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  guideline: {
    maxWidth: "570px",
    height: "170px",
    margin: "auto",
    marginBottom: variable.spacer14,
    textAlign: "center",
    background: "url('/assets/cmsImages/cta-device.full.svg')",
    backgroundRepeat: "no-repeat",
    "@media(max-width: 500px)": {
      backgroundSize: "contain",
    },
    "& h3": {
      paddingTop: variable.spacer6,
      color: "rgba(25,27,94,0.8)",
      fontSize: variable.fontSizeXLarge,
      fontFamily: variable.fontFamilySemiBold,
      fontWeight: variable.fontWeightSemiBold,
      lineHeight: "32px",
    },
  },
}));

export default function Home({ data }: HomeProps) {
  const { classes, theme } = useStyles();

  return (
    <>
      <Layout data={data}>
        <Container size={variable.breakpointXl} px={variable.spacer4}>
          {/*<div
						dangerouslySetInnerHTML={{
							__html: data.HomeEntry.redactor,
						}}
					/>*/}

          <section className={classes.heroBanner}>
            <div className={classes.heroBannerWrapper}>
              <div className={classes.heroLeft}>
                <span>Assessment & Management of</span>
                <h2>Cardiovascular disease risk</h2>
              </div>
              <div className={classes.heroRight}></div>
            </div>
            <Button.Group
              sx={{
                justifyContent: "center",
                gap: "25px",
                position: "absolute",
                left: "calc(50% - 295.5px)",
                bottom: "-70px",
                [variable.mobileDown]: {
                  position: "static",
                  flexDirection: "column",
                  marginTop: variable.spacer7,
                },
              }}
            >
              <Button
                component="a"
                href="/calculator"
                rightIcon={<CalculatorSolid />}
                className={classes.bannerButton}
              >
                Start Calculator now
              </Button>
              <Button
                component="a"
                href="#"
                rightIcon={<ArrowToBottom />}
                className={classes.bannerButton}
                sx={{
                  "& svg": {
                    width: "14px",
                    marginTop: "-2px",
                  },
                }}
              >
                Download Guideline PDF
              </Button>
            </Button.Group>
          </section>

          <section className={classes.infographic}></section>
          <section className={classes.guideline}>
            <h3>Read the CVD Risk Guideline</h3>
            <Button
              component="a"
              href="/overview"
              className={classes.buttonAlt}
              sx={{
                width: "140px",
                height: "42px",
                "& .mantine-Button-label:after": {
                  content: "url(/assets/cmsImages/arrow-right-white.svg)",
                  width: "12px",
                  height: "12px",
                  marginTop: "-2px",
                  marginLeft: variable.spacer1,
                },
              }}
            >
              Overview
            </Button>
          </section>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
            query GetData {
                ${QUERY_HEADER}
                ${QUERY_FOOTER}
                ${QUERY_HOME}
            }
        `,
  });

  //console.log(data);

  return {
    props: {
      data,
    },
  };
};
