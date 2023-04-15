import { createStyles, Text } from "@mantine/core";
import { Checkbox } from "@mantine/core";
import variable from "../../styles/theme/variables";
import { useMemo, useEffect } from "react";
import Tooltip from "./Tooltip";
import CustomCheckbox from "./CustomCheckbox";

export interface IComponentClassNames {
  resultReclassifying: string;
  proceedButton: string;
  intermediateRiskButton: string;
  lowRiskButton: string;
  highRiskButton: string;
  commonButton: string;
  reclassifyingWrapper: string;
  reclassifyingText: string;
  reclassifyingDown: string;
  reclassifyingUp: string;
}

const smmdDown = `@media(max-width: 768px)`;

const useStyles = createStyles({
  resultReclassifying: {},
  reclassifyingText: {
    fontSize: variable.fontSizeMd,
    color: variable.grey600,
    letterSpacing: "0.15px",
    lineHeight: "24px",
    "& .mantine-Text-root": {
      display: "inline-block",
      height: "24px",
      lineHeight: "24px",
      padding: "0px 12px",
      fontSize: variable.fontSizeSm,
      backgroundColor: "rgba(25,27,94,0.12)",
      borderRadius: "12px",
      color: "#191B5E",
      textDecoration: "none",
      fontWeight: variable.fontWeightSemiBold,
      letterSpacing: "0.13px",
    "& svg": {
      width: "12px",
      marginRight: variable.spacer1,
        position: "relative",
        top: "2px",
        fill: "#191B5E",
      },
    },
  },
  reclassifyingDown: {
    marginRight: variable.spacer2,
    "& .mantine-Checkbox-root.mantine-Checkbox-root": {
      top: "5px",
    },
    [smmdDown]: {
      marginRight: variable.spacer0,
    },
    float: "left",
    width: "calc(50% - 16px)",
    [smmdDown]: {
      width: "100%",
    },
    "& ul": {
      marginTop: variable.spacer4,
      paddingLeft: 0,
      "& li": {
        marginBottom: variable.spacer1,
        padding: "15px",
        paddingRight: "30px",
        backgroundColor: "rgba(182,198,207,0.04)",
        borderRadius: "4px",
        border: "1px solid #F6F7F8",
        listStyle: "none",
        "& .mantine-InputWrapper-label": {
          position: "relative",
          display: "inline-block",
          width: "calc(100% - 30px)",
        },
        "& .mantine-Checkbox-body": {
          display: "block",
          "& .mantine-Checkbox-inner": {
            float: "right",
            marginLeft: variable.spacer1,
            marginRight: 0,
          },
          "& .mantine-Checkbox-label": {
            color: "#546E7A",
            letterSpacing: "0.15px",
            lineHeight: "20px",
          },
        },
      },
    },
  },
  reclassifyingUp: {
    marginLeft: variable.spacer2,
    "& .mantine-Checkbox-root.mantine-Checkbox-root": {
      top: "5px",
    },
    [smmdDown]: {
      marginLeft: variable.spacer0,
    },
    float: "left",
    width: "calc(50% - 16px)",
    [smmdDown]: {
      width: "100%",
    },
    "&>ul": {
      marginTop: variable.spacer4,
      paddingLeft: 0,
      "&>li": {
        marginBottom: variable.spacer1,
        padding: "15px",
        paddingRight: "30px",
        backgroundColor: "rgba(182,198,207,0.04)",
        borderRadius: "4px",
        border: "1px solid #F6F7F8",
        listStyle: "none",
        "& .mantine-InputWrapper-label": {
          position: "relative",
          display: "inline-block",
          width: "calc(100% - 30px)",
        },
        "& .mantine-Checkbox-body": {
          display: "block",
          "& .mantine-Checkbox-inner": {
            float: "right",
            marginLeft: variable.spacer1,
            marginRight: 0,
          },
          "& .mantine-Checkbox-label": {
            color: "#546E7A",
            letterSpacing: "0.15px",
            lineHeight: "20px",
          },
        },
      },
    },
  },
  reclassifyingWrapper: {
    "&::before": {
      content: `''`,
      display: "table",
    },
    "&::after": {
      content: `''`,
      display: "table",
      clear: "both",
    },
    h2: {
      fontSize: variable.fontSizeMd,
      fontFamily: variable.fontFamilySemiBold,
      fontWeight: variable.fontWeightSemiBold,
      letterSpacing: "0.15px",
      lineHeight: "20px",
    },
    "& .mantine-HoverCard-dropdown.mantine-HoverCard-dropdown": {
      [variable.mobileDown]: {
        maxWidth: "calc(100vw - 48px)",
        left: "-15px !important",
        right: "24px !important",
      },
    },
  },
  proceedButton: {
    textAlign: "center",
    "& h2": {
      fontFamily: variable.fontFamilySemiBold,
      fontSize: "22px",
      fontWeight: variable.fontWeightSemiBold,
      lineHeight: "28px",
    },
  },
  intermediateRiskButton: {},
  lowRiskButton: {},
  highRiskButton: {},
  commonButton: {
    "& button": {
      fontFamily: variable.fontFamilyMedium,
      minWidth: "265px",
      height: "42px",
      lineHeight: "42px",
      marginBottom: variable.spacer6,
      marginRight: variable.spacer6,
      paddingLeft: variable.spacer4,
      paddingRight: variable.spacer4,
      fontWeight: variable.fontWeightMedium,
      border: 0,
      borderRadius: "4px",
      cursor: "pointer",
      "&:first-of-type": {
        backgroundColor: variable.green100,
        color: "#005A55",
      },
      "&:nth-of-type(2)": {
        backgroundColor: variable.yellow100,
        color: "#A84B0D",
      },
      "&:nth-of-type(3)": {
        backgroundColor: variable.red100,
        marginRight: variable.spacer0,
        color: "#C80200",
      },
      [variable.mobileDown]: {
        width: "100%",
        marginRight: 0,
      },
    },
  },
});

export default function ResultReclassifying(props: any) {
  // console.log(props.reClassficationRisk);
  // console.log(props.nextStep);
  // console.log(props.setResult);
  const result = useMemo(() => props.result, [props.result]);
  let {
    resultReclassifying,
    proceedButton,
    intermediateRiskButton,
    lowRiskButton,
    highRiskButton,
    commonButton,
    reclassifyingText,
    reclassifyingDown,
    reclassifyingUp,
    reclassifyingWrapper,
  } = useStyles().classes;
  // console.log(result);

  return (
    <div className={resultReclassifying}>
      <div className={reclassifyingText}>
        Certain additional factors may influence a person's CVD risk. Consider
        the following reclassification factors which may move an individual's
        risk category{" "}
        <Text>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
          </svg>
          DOWN
        </Text>{" "}
        or{" "}
        <Text>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
          </svg>
          UP
        </Text>{" "}
        . Reclassification factors are of most value when the person's risk is
        close to a risk threshold.
      </div>
      <div className={reclassifyingWrapper}>
        <div className={reclassifyingDown}>
          <h2>Consider reclassifying down a category if</h2>
          <ul>
            <li>
              <CustomCheckbox
                labelName="Coronary artery calcium score of 0"
                cardDropdownContent="The added diagnostic value of a CAC score of 0 is highly dependent on age. A CAC score of 0 indicates a very low risk of cardiovascular events and mortality within 5 years but does not rule out non-calcified atherosclerosis, particularly in younger people. In patients with a normal CAC score (zero), it is reasonable to repeat the test within 2-5 years to detect an increase in score and reclassify risk, based on available evidence."
              />
            </li>
            <li>
              <CustomCheckbox
                labelName="East Asian ethnicity (Chinese, Japanese, Korean, Taiwanese, or Mongolian ethnicities)"
                cardDropdownContent="East Asian ethnicity includes: Chinese, Japanese, Korean, Taiwanese, and Mongolian ethnicities.  In Australian health care there is no standard or accepted practice for collecting data on ethnicity among non-Indigenous people or for classifying non-Indigenous populations into broad ethnic groups. Ethnicity can be self-reported. Evidence for associations between ethnicity and CVD risk level is therefore of moderate certainty, due to the limited application of available data to Australian populations."
              />
            </li>
          </ul>
        </div>
        <div className={reclassifyingUp}>
          <h2>Consider reclassifying up a category if</h2>
          <ul>
            <li>
              <CustomCheckbox
                labelName="Coronary artery calcium score > 99 units, or ≥ 75th percentile for age and sex"
                cardDropdownContent={
                  <Text>
                    <Text>
                      CAC measurement could be considered in the setting of
                      atypical CVD risk factors that suggest the risk score may
                      be an underestimate. It may also be useful in addressing
                      reluctance to initiate or adhere to medicines, as it
                      assists the person in understanding their coronary
                      atherosclerosis burden
                    </Text>
                    <Text>
                      When assessing CVD risk, reclassifying risk level due to
                      CAC score can be considered, when treatment decisions are
                      uncertain, e.g.
                    </Text>
                    <ul>
                      <li>
                        when risk of cardiovascular events is assessed as low or
                      intermediate using the Risk Calculator, and other
                        significant risk considerations that suggests this may
                        be an underestimate
                      </li>
                      <li>
                        when further information is required to inform
                        discussions between practitioner and the person on
                        whether to modify therapy
                      </li>
                    </ul>
                  </Text>
                }
              />
            </li>
            <li>
              <CustomCheckbox
                labelName="First Nations people"
                cardDropdownContent="First Nations people have an elevated risk of developing and dying from CVD. Consider reclassifying to a higher risk category after assessing the person’s clinical, psychological and socioeconomic circumstances, and community CVD prevalence. Given the underestimation of CVD risk using existing algorithms, it is difficult to state with confidence the likely impact of modified algorithms and additional CVD risk factors incorporated into the Aus CVD risk calculator until data on the new algorithm are available."
              />
            </li>
            <li>
              <CustomCheckbox
                labelName="Maori, Pacific Islander or South Asian ethnicity (Indian, Pakistani, Bangladeshi, Sri Lankan, Nepali, Bhutanese or Maldivian ethnicities)"
                cardDropdownContent="South Asian ethnicity includes: Indian, Pakistani, Bangladeshi, Sri Lankan, Nepali, Bhutanese, and Maldivian ethnicities. In Australian health care there is no standard or accepted practice for collecting data on ethnicity among non-Indigenous people or for classifying non-Indigenous populations into broad ethnic groups. Ethnicity can be self-reported. Evidence for associations between ethnicity and CVD risk level is therefore of moderate certainty, due to the limited application of available data to Australian populations."
              />
            </li>
            <li>
              <CustomCheckbox
                labelName="Family history of premature CVD"
                cardDropdownContent="Family history of premature CVD is defined as coronary heart disease (CHD) or stroke in a first-degree female relative aged <65 years or a first-degree male relative aged <55 years. People with a family history of premature CVD are at increased risk of developing CVD."
              />
            </li>
            <li>
              <CustomCheckbox
                labelName="Chronic kidney disease"
                cardDropdownContent={
                  <Text>
                    <Text>
                      People with CKD are at increased risk of CVD compared with
                      the general population. Traditional risk equations may
                      underestimate risk in people with CKD. For people with the
                      following (who do not have diabetes):
                    </Text>
                    <ul>
                      <li>sustained eGFR 45-59 mL/min/1.73 m2 and/or</li>
                      <li>persistent uACR 2.5-25 mg/mmol (men) or</li>
                      <li>3.5-35 mg/mmol (women)</li>
                    </ul>
                    <Text>
                      strongly consider adjusting the estimated CVD risk upwards
                      to a higher risk category, particularly if calculated risk
                      is close to a threshold.
                    </Text>
                  </Text>
                }
              />
            </li>
            <li>
              <CustomCheckbox
                labelName="People living with severe mental illness"
                cardDropdownContent="Severe mental illness in this guideline is defined as a current or recent mental health condition illness requiring specialist treatment, whether received or not, in the 5 years prior to the CVD risk assessment. Terminology of ‘severe’ and ‘serious’ mental illness varies between conditions and across research, clinical practice and public health policy contexts, and these classifications can overlap. Grouping these under a single term is problematic. The definition used in this guideline is derived from the supporting evidence from the PREDICT cohort. CVD risk equations may particularly underestimate risk in people living with a mental health condition."
              />
            </li>
          </ul>
        </div>
      </div>
      <div className={proceedButton}>
        <h2>Select to proceed to the results page</h2>
        {result >= 5 && result < 10 && (
          <div className={`${intermediateRiskButton} ${commonButton}`}>
            <button
              onClick={() => {
                props.reClassficationRisk("low risk");
                props.setResult(4);
                props.nextStep();
              }}
            >
              Reclassify down to low risk
            </button>
            <button
              onClick={() => {
                props.reClassficationRisk("show");
                props.nextStep();
              }}
            >
              Continue without reclassifying
            </button>
            <button
              onClick={() => {
                props.reClassficationRisk("high risk");
                props.setResult(100);
                props.nextStep();
              }}
            >
              Reclassify up to high risk
            </button>
          </div>
        )}
        {result < 5 && (
          <div className={`${lowRiskButton} ${commonButton}`}>
            <button
              onClick={() => {
                props.reClassficationRisk("show");
                props.nextStep();
              }}
            >
              Continue without reclassifying
            </button>
            <button
              onClick={() => {
                props.reClassficationRisk("intermediate risk");
                props.setResult(9);
                props.nextStep();
              }}
            >
              Reclassify up to intermediate risk
            </button>
            <button
              onClick={() => {
                props.reClassficationRisk("high risk");
                props.setResult(100);
                props.nextStep();
              }}
            >
              Reclassify up to high risk
            </button>
          </div>
        )}
        {result >= 10 && (
          <div className={`${highRiskButton} ${commonButton}`}>
            <button
              onClick={() => {
                props.reClassficationRisk("low risk");
                props.setResult(4);
                props.nextStep();
              }}
            >
              Reclassify down to low risk
            </button>
            <button
              onClick={() => {
                props.reClassficationRisk("intermediate risk");
                props.setResult(9);
                props.nextStep();
              }}
            >
              Reclassify down to intermediate risk
            </button>
            <button
              onClick={() => {
                props.reClassficationRisk("show");
                props.nextStep();
              }}
            >
              Continue without reclassifying
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
