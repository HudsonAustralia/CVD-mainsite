import { createStyles } from "@mantine/core";
import variable from "../../../../styles/theme/variables";
const smmdDown = `@media(max-width: 768px)`;
const mdDown = `@media(max-width: 959px)`;

const useStyles = createStyles({
  ".strap6": {
    marginTop: "16px",
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
});

const FirstNationsSpecificResources = () => {
  const {} = useStyles().classes;
  return (
    <div className="strap6">
      <div className="wrapper">
        <div className="specific-resources-top">
          <h2>First Nations specific resources</h2>
          <div className="specific-resources-top-right">
            <a
              href="https://www.svhhearthealth.com.au/aboriginal-heart-health/heart-risks"
              target="_blank"
            >
              Heart health resources for First Nations people
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
              </svg>
            </a>
            <p>
              National Heart Foundation of Australia and St Vincent's Hospital
              Heart Health
            </p>
          </div>
        </div>
        <div className="specific-resources-content">
          <div className="specific-resources-list">
            <h3>Alcohol & Smoking Related resources</h3>
            <ul>
              <li>
                <a href="https://www.quit.org.au/" target="_blank">
                  Quitline
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                  </svg>
                </a>
                <p>
                  Offers a smoking cessation service and resources specifically
                  for First Nations people
                </p>
              </li>
              <li>
                <a
                  href="https://www.heartfoundation.org.au/getmedia/4edc3153-7cc1-471b-bf56-03193f004f38/Cooking-in-the-Pilbara-Recipe-Book_1.pdf"
                  target="_blank"
                >
                  Cooking in the Pilbara recipe book
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                  </svg>
                </a>
                <p>
                  Australian Indigenous Alcohol and Other Drugs Knowledge Centre
                </p>
              </li>
              <li>
                <a
                  href="https://strongspiritstrongmind.com.au/alcohol"
                  target="_blank"
                >
                  Alcohol
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                  </svg>
                </a>
                <p>Strong Spirit Strong Mind</p>
              </li>
            </ul>
            <h3>Nutrition related resources</h3>
            <ul>
              <li>
                <a
                  href="https://www.eatforhealth.gov.au/sites/default/files/content/The%20Guidelines/final_igthe_a3_poster_-_lr.pdf"
                  target="_blank"
                >
                  Aboriginal and Torres Strait Islander Guide to Healthy Eating
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                  </svg>
                </a>
                <p>Department of Health and Aged Care</p>
              </li>
              <li>
                <a
                  href="https://www.heartfoundation.org.au/getmedia/4edc3153-7cc1-471b-bf56-03193f004f38/Cooking-in-the-Pilbara-Recipe-Book_1.pdf"
                  target="_blank"
                >
                  Cooking in the Pilbara
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                  </svg>
                </a>
                <p>National Heart Foundation of Australia recipe book</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FirstNationsSpecificResources;
