import { createStyles, Text } from "@mantine/core";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import variable from "../../styles/theme/variables";
import { convertPostcodeToSeifaForEquation } from "../../utility/seifa";
import { FormContext } from "./Form";
import Progress from "./DiscussRiskResult/Progress";
import getRecalibrationFactor from "../../utility/getRecalibrationFactor";

export interface IComponentClassNames {
  resultProgressWrapper: string;
}
const useStyles = createStyles({
  resultProgressWrapper: {
    marginBottom: variable.spacer5,
    paddingBottom: variable.spacer2,
    borderBottom: "1px solid rgba(69,89,100,0.16)",
    "& h3": {
      marginBottom: variable.spacer1,
      fontFamily: variable.fontFamilyMedium,
      fontSize: variable.fontSizeSm,
      color: variable.grey500,
      fontWeight: variable.fontWeightMedium,
      lineHeight: "20px",
      textTransform: "uppercase",
    },
    "& .progress-text": {
      display: "inline-block",
      width: "200px",
      verticalAlign: "middle",
      [variable.mobileDown]: {
        width: "100%",
        textAlign: "center",
        marginBottom: variable.spacer2,
      },
      "& strong": {
        display: "block",
        fontFamily: variable.fontFamilySemiBold,
        fontSize: "57px",
        fontWeight: variable.fontWeightSemiBold,
        lineHeight: "64px",
      },
      "& span": {
        fontSize: variable.fontSizeXLarge,
        lineHeight: "32px",
      },
    },
    "& .progress": {
      display: "inline-block",
      width: "calc(100% - 200px)",
      verticalAlign: "middle",
      [variable.mobileDown]: {
        width: "100%",
      },
    },
    "& >p": {
      color: variable.grey600,
      fontFamily: variable.fontFamilySemiBold,
      fontSize: variable.fontSizeMedium,
      fontWeight: variable.fontWeightSemiBold,
      letterSpacing: "0.15px",
      lineHeight: "24px",
    },
  },
});

export default function ResultProgress(props: any) {
  let { resultProgressWrapper } = useStyles().classes;

  const { form } = useContext(FormContext);

  const [result, setResult] = useState<number>(0);

  const CalculatedResult: { value: string; label: string } = useMemo(() => {
    let risk = {} as { value: string; label: string };

    if (result >= 0 && result <= 4) {
      risk = {
        value: "Low risk",
        label: `Risk of having a heart attack or stroke in the next 5 years is ${result} out of 100, which is considered low.`,
      };
    } else if (result >= 5 && result <= 9) {
      risk = {
        value: "Intermediate risk",
        label: `Risk of having a heart attack or stroke in the next 5 years is ${result} out of 100, which is considered Intermediate.`,
      };
    } else {
      risk = {
        value: "High risk",
        label: `Risk of having a heart attack or stroke in the next 5 years is ${result} out of 100, which is considered high.`,
      };
    }
    return risk;
  }, [result]);

  const MenGeneralEquation = (data: any) => {
    console.log("MenGeneralEquation");

    const BSF = 0.9728782;
    const e = 2.718282;

    const AgeMean = 53.77579;
    const AgeCoefficient = 0.0691512;
    const AgeProduct = (data.age - AgeMean) * AgeCoefficient;

    const SeifaMean = 2.625575;
    const SeifaCoefficient = 0.0900502;
    const SeifaProduct =
      ((typeof data.seifa === "undefined" ? 3 : data.seifa) - SeifaMean) *
      SeifaCoefficient;

    const ExSmokerCoefficient = 0.0635803;
    const ExSmokerProduct = data.exSmoker * ExSmokerCoefficient;

    const SmokerCoefficient = 0.5782258;
    const SmokerProduct = data.smoker * SmokerCoefficient;

    const AF_Coefficient = 0.474629;
    const AF_Product =
      (typeof data.af === "undefined" ? 0 : data.af) * AF_Coefficient;

    const DiabetesCoefficient = 0.5829839;
    const DiabetesProduct = data.diabetes * DiabetesCoefficient;

    const BMI_Value = 27.8406;
    const BMI_Mean = 27.8;
    const BMI_Coefficient = 0.0124319;
    const BMI_Product = (BMI_Value - BMI_Mean) * BMI_Coefficient;

    const SBP_Mean = 129.2052;
    const SBP_Coefficient = 0.0139242;
    const SBP_Product = (data.sbp - SBP_Mean) * SBP_Coefficient;

    const TC_HDL_Mean = 4.325589;
    const TC_HDL_Coefficient = 0.1350063;
    const TC_HDL_Product = (data.HdlRatio - TC_HDL_Mean) * TC_HDL_Coefficient;

    const BPLM =
      (data.cvd_medicine as string[]).findIndex(
        (v) => v === "Blood pressure-lowering medicines"
      ) === -1
        ? 0
        : 1;
    const OBPLM_Coefficient = 0.2676661;
    const OBPLM_Product = BPLM * OBPLM_Coefficient;

    const LLM =
      (data.cvd_medicine as string[]).findIndex(
        (v) => v === "Lipid-modifying medicines"
      ) === -1
        ? 0
        : 1;
    const OLLM_Coefficient = -0.0383788;
    const OLLM_Product = LLM * OLLM_Coefficient;

    const OATM =
      (data.cvd_medicine as string[]).findIndex(
        (v) => v === "Antithrombotic medicines"
      ) === -1
        ? 0
        : 1;
    const OATM_Coefficient = 0.0981934;
    const OATM_Product = OATM * OATM_Coefficient;

    const AgeDiabetesCoefficient = -0.018881;
    const AgeDiabetesProduct =
      (data.age - AgeMean) * data.diabetes * AgeDiabetesCoefficient;

    const Age_SBP_Coefficient = -0.0001952;
    const Age_SBP_Product =
      Age_SBP_Coefficient * (data.age - AgeMean) * (data.sbp - SBP_Mean);

    const OBPLM_SBP_Coefficient = -0.0054419;
    const OBPLM_SBP_Product =
      OBPLM_SBP_Coefficient * BPLM * (data.sbp - SBP_Mean);

    const SumProduct =
      AgeProduct +
      SeifaProduct +
      ExSmokerProduct +
      SmokerProduct +
      AF_Product +
      DiabetesProduct +
      BMI_Product +
      SBP_Product +
      TC_HDL_Product +
      OBPLM_Product +
      OLLM_Product +
      OATM_Product +
      AgeDiabetesProduct +
      Age_SBP_Product +
      OBPLM_SBP_Product;

    // const uncalibratedRisk = Math.round(
    //   Number((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100)
    // );

    const uncalibratedRisk =
      (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100 < 1
        ? 1
        : (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100;

    // const uncalibratedRisk =
    //   Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) / 100 < 1
    //     ? 1
    //     : Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) /
    //       100;
    const recalibrationFactor = getRecalibrationFactor(
      data.sex === "0" ? "female" : "male",
      data.age
    );

    alert(
      `uncalibrated CVD risk: ${uncalibratedRisk}` +
        "\n" +
        `calibrated CVD risk: ${uncalibratedRisk * recalibrationFactor!}`
    );
    return Math.round(uncalibratedRisk * recalibrationFactor!);
  };

  const WomenGeneralEquation = (data: any) => {
    console.log("WomenGeneralEquation");
    const BSF = 0.9828361;
    const e = 2.718282;

    const AgeMean = 58.47472;
    const AgeCoefficient = 0.0905192;
    const AgeProduct = (data.age - AgeMean) * AgeCoefficient;

    const SeifaMean = 2.625575;
    const SeifaCoefficient = 0.0978413;
    const SeifaProduct =
      ((typeof data.seifa === "undefined" ? 3 : data.seifa) - SeifaMean) *
      SeifaCoefficient;

    const ExSmokerCoefficient = 0.1162342;
    const ExSmokerProduct = data.exSmoker * ExSmokerCoefficient;

    const SmokerCoefficient = 0.8235061;
    const SmokerProduct = data.smoker * SmokerCoefficient;

    const AF_Coefficient = 0.709571;
    const AF_Product =
      (typeof data.af === "undefined" ? 0 : data.af) * AF_Coefficient;

    const DiabetesCoefficient = 0.6207569;
    const DiabetesProduct = data.diabetes * DiabetesCoefficient;

    const BMI_Value = 27.47728;
    const BMI_Mean = 27.5;
    const BMI_Coefficient = 0.0057835;
    const BMI_Product = (BMI_Value - BMI_Mean) * BMI_Coefficient;

    const SBP_Mean = 129.2052;
    const SBP_Coefficient = 0.0114172;
    const SBP_Product = (data.sbp - SBP_Mean) * SBP_Coefficient;

    const TC_HDL_Mean = 3.641988;
    const TC_HDL_Coefficient = 0.1067098;
    const TC_HDL_Product = (data.HdlRatio - TC_HDL_Mean) * TC_HDL_Coefficient;

    const BPLM =
      (data.cvd_medicine as string[]).findIndex(
        (v) => v === "Blood pressure-lowering medicines"
      ) === -1
        ? 0
        : 1;
    const OBPLM_Coefficient = 0.3092255;
    const OBPLM_Product = BPLM * OBPLM_Coefficient;

    const LLM =
      (data.cvd_medicine as string[]).findIndex(
        (v) => v === "Lipid-modifying medicines"
      ) === -1
        ? 0
        : 1;
    const OLLM_Coefficient = -0.0863215;
    const OLLM_Product = LLM * OLLM_Coefficient;

    const OATM =
      (data.cvd_medicine as string[]).findIndex(
        (v) => v === "Antithrombotic medicines"
      ) === -1
        ? 0
        : 1;
    const OATM_Coefficient = 0.1622663;
    const OATM_Product = OATM * OATM_Coefficient;

    const AgeDiabetesCoefficient = -0.0230893;
    const AgeDiabetesProduct =
      (data.age - AgeMean) * data.diabetes * AgeDiabetesCoefficient;

    const Age_SBP_Coefficient = -0.0002353;
    const Age_SBP_Product =
      Age_SBP_Coefficient * (data.age - AgeMean) * (data.sbp - SBP_Mean);

    const OBPLM_SBP_Coefficient = -0.0066143;
    const OBPLM_SBP_Product =
      OBPLM_SBP_Coefficient * BPLM * (data.sbp - SBP_Mean);

    const SumProduct =
      AgeProduct +
      SeifaProduct +
      ExSmokerProduct +
      SmokerProduct +
      AF_Product +
      DiabetesProduct +
      BMI_Product +
      SBP_Product +
      TC_HDL_Product +
      OBPLM_Product +
      OLLM_Product +
      OATM_Product +
      AgeDiabetesProduct +
      Age_SBP_Product +
      OBPLM_SBP_Product;

    console.log("AgeProduct " + AgeProduct);
    console.log("SeifaProduct " + SeifaProduct);
    console.log("exSmoker " + data.exSmoker);
    console.log("ExSmokerProduct " + ExSmokerProduct);
    console.log("smoker " + data.smoker);
    console.log("SmokerProduct " + SmokerProduct);
    console.log("AF_Product " + AF_Product);
    console.log("DiabetesProduct " + DiabetesProduct);
    console.log("BMI_Product " + BMI_Product);
    console.log("SBP_Product " + SBP_Product);
    console.log("TC_HDL_Product " + TC_HDL_Product);
    console.log("OBPLM_Product " + OBPLM_Product);
    console.log("OLLM_Product " + OLLM_Product);
    console.log("OATM_Product " + OATM_Product);
    console.log("AgeDiabetesProduct " + AgeDiabetesProduct);
    console.log("Age_SBP_Product " + Age_SBP_Product);
    console.log("OBPLM_SBP_Product " + OBPLM_SBP_Product);

    const uncalibratedRisk =
      (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100 < 1
        ? 1
        : (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100;

    // const uncalibratedRisk =
    //   Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) / 100 < 1
    //     ? 1
    //     : Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) /
    //       100;
    const recalibrationFactor = getRecalibrationFactor(
      data.sex === "0" ? "female" : "male",
      data.age
    );

    alert(
      `uncalibrated CVD risk: ${uncalibratedRisk}` +
        "\n" +
        `calibrated CVD risk: ${uncalibratedRisk * recalibrationFactor!}`
    );
    // alert(`recalibrationFactor is: ${recalibrationFactor}`);
    return Math.round(uncalibratedRisk * recalibrationFactor!);
  };

  const MenDiabetesEquation = (data: any) => {
    console.log("MenDiabetesEquation");
    const BSF = 0.9483001;
    const e = 2.718282;

    const AgeMean = 56.57672;
    const AgeCoefficient = 0.0510591;
    const AgeProduct = (data.age - AgeMean) * AgeCoefficient;

    const SeifaMean = 2.906154;
    const SeifaCoefficient = 0.0931026;
    const SeifaProduct =
      ((typeof data.seifa === "undefined" ? 3 : data.seifa) - SeifaMean) *
      SeifaCoefficient;

    const SmokerCoefficient = 0.318424;
    const SmokerProduct = data.smoker * SmokerCoefficient;

    const ExSmokerCoefficient = 0;
    const ExSmokerProduct = data.exSmoker * ExSmokerCoefficient;

    const NonSmokerProduct = 0;

    const AF_Coefficient = 0.3149766;
    const AF_Product =
      (typeof data.af === "undefined" ? 0 : data.af) * AF_Coefficient;

    const YearMean = 5.255285;
    const YearCoefficient = 0.0117042;
    const YearProduct =
      ((typeof data.year === "undefined" ? 0 : data.year) - YearMean) *
      YearCoefficient;

    const BMI_Mean = 29.21475;
    const BMI_Coefficient = 0.0156861;
    const BMI_Product = (data.bmi - BMI_Mean) * BMI_Coefficient;

    const SBP_Mean = 131.8995;
    const SBP_Coefficient = 0.004488;
    const SBP_Product = (data.sbp - SBP_Mean) * SBP_Coefficient;

    const TC_HDL_Mean = 4.267316;
    const TC_HDL_Coefficient = 0.0858267;
    const TC_HDL_Product = (data.HdlRatio - TC_HDL_Mean) * TC_HDL_Coefficient;

    const eGFR_Mean = 88.15267;
    const eGFR_Coefficient = -0.002239;
    const eGFR_Product =
      ((typeof data.eGFR === "undefined" ? 0 : data.eGFR) - eGFR_Mean) *
      eGFR_Coefficient;

    const HbA1c_Mean = 57.84909;
    const HbA1c_Coefficient = 0.0065082;
    const HbA1c_Product =
      ((typeof data.HbA1c === "undefined" ? 0 : data.HbA1c) - HbA1c_Mean) *
      HbA1c_Coefficient;

    const ACR_3_To_30_Coefficient = 0.4277236;
    const ACR_3_To_30_Product =
      (typeof data.ACR_3_to_30 === "undefined" ? 0 : data.ACR_3_to_30) *
      ACR_3_To_30_Coefficient;

    const ACR_gt_30_Coefficient = 0.803022;
    const ACR_gt_30_Product =
      (typeof data.ACR_gt_30 === "undefined" ? 0 : data.ACR_gt_30) *
      ACR_gt_30_Coefficient;

    const Insulin_Coefficient = 0.3899748;
    const Insulin_Product =
      (typeof data.insulin === "undefined" ? 0 : data.insulin) *
      Insulin_Coefficient;

    const ODM_Coefficient = 0.1316217;
    const ODM_Product = 1 * ODM_Coefficient;

    const BPLM_Coefficient = 0.1674871;
    const BPLM_Product = data.BPLM * BPLM_Coefficient;

    const LLM_Coefficient = -0.0616832;
    const LLM_Product = data.LLM * LLM_Coefficient;

    const ATM_Coefficient = 0.0273617;
    const ATM_Product = data.OATM * ATM_Coefficient;

    const SumProduct =
      AgeProduct +
      SeifaProduct +
      SmokerProduct +
      ExSmokerProduct +
      NonSmokerProduct +
      AF_Product +
      YearProduct +
      BMI_Product +
      SBP_Product +
      TC_HDL_Product +
      eGFR_Product +
      HbA1c_Product +
      ACR_3_To_30_Product +
      ACR_gt_30_Product +
      Insulin_Product +
      ODM_Product +
      BPLM_Product +
      LLM_Product +
      ATM_Product;

    const uncalibratedRisk =
      (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100 < 1
        ? 1
        : (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100;

    // const uncalibratedRisk =
    //   Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) / 100 < 1
    //     ? 1
    //     : Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) /
    //       100;
    const recalibrationFactor = getRecalibrationFactor(
      data.sex === "0" ? "female" : "male",
      data.age
    );

    alert(
      `uncalibrated CVD risk: ${uncalibratedRisk}` +
        "\n" +
        `calibrated CVD risk: ${uncalibratedRisk * recalibrationFactor!}`
    );
    return Math.round(uncalibratedRisk * recalibrationFactor!);
  };

  const WomenDiabetesEquation = (data: any) => {
    console.log("WomenDiabetesEquation");
    const BSF = 0.9664823;
    const e = 2.718282;

    const AgeMean = 57.8318;
    const AgeCoefficient = 0.0607418;
    const AgeProduct = (data.age - AgeMean) * AgeCoefficient;

    const SeifaMean = 3.033218;
    const SeifaCoefficient = 0.1111981;
    const SeifaProduct =
      ((typeof data.seifa === "undefined" ? 3 : data.seifa) - SeifaMean) *
      SeifaCoefficient;

    const SmokerCoefficient = 0.7319247;
    const SmokerProduct = data.smoker * SmokerCoefficient;

    const ExSmokerCoefficient = 0;
    const ExSmokerProduct = data.exSmoker * ExSmokerCoefficient;

    const NonSmokerProduct = 0;

    const AF_Coefficient = 0.4150528;
    const AF_Product =
      (typeof data.af === "undefined" ? 0 : data.af) * AF_Coefficient;

    const YearMean = 5.222868;
    const YearCoefficient = 0.011011;
    const YearProduct =
      ((typeof data.year === "undefined" ? 0 : data.year) - YearMean) *
      YearCoefficient;

    const BMI_Mean = 30.33892;
    const BMI_Coefficient = 0.0112387;
    const BMI_Product =
      ((typeof data.bmi === "undefined" ? 0 : data.bmi) - BMI_Mean) *
      BMI_Coefficient;

    const SBP_Mean = 132.2317;
    const SBP_Coefficient = 0.0084873;
    const SBP_Product = (data.sbp - SBP_Mean) * SBP_Coefficient;

    const TC_HDL_Mean = 3.882821;
    const TC_HDL_Coefficient = 0.1025064;
    const TC_HDL_Product =
      ((typeof data.HdlRatio === "undefined" ? 0 : data.HdlRatio) -
        TC_HDL_Mean) *
      TC_HDL_Coefficient;

    const eGFR_Mean = 88.38233;
    const eGFR_Coefficient = -0.0082137;
    const eGFR_Product =
      ((typeof data.eGFR === "undefined" ? 0 : data.eGFR) - eGFR_Mean) *
      eGFR_Coefficient;

    const HbA1c_Mean = 56.06538;
    const HbA1c_Coefficient = 0.0109019;
    const HbA1c_Product =
      ((typeof data.HbA1c === "undefined" ? 0 : data.HbA1c) - HbA1c_Mean) *
      HbA1c_Coefficient;

    const ACR_3_To_30_Coefficient = 0.2030524;
    const ACR_3_To_30_Product =
      (typeof data.ACR_3_to_30 === "undefined" ? 0 : data.ACR_3_to_30) *
      ACR_3_To_30_Coefficient;

    const ACR_gt_30_Coefficient = 0.7023991;
    const ACR_gt_30_Product =
      (typeof data.ACR_gt_30 === "undefined" ? 0 : data.ACR_gt_30) *
      ACR_gt_30_Coefficient;

    const ODM_Coefficient = 0.1594838;
    const ODM_Product = 1 * ODM_Coefficient;

    const Insulin_Coefficient = 0.2966913;
    const Insulin_Product =
      (typeof data.insulin === "undefined" ? 0 : data.insulin) *
      Insulin_Coefficient;

    const BPLM_Coefficient = 0.1671067;
    const BPLM_Product = data.BPLM * BPLM_Coefficient;

    const LLM_Coefficient = -0.2702909;
    const LLM_Product = data.LLM * LLM_Coefficient;

    const ATM_Coefficient = 0.1205109;
    const ATM_Product = data.OATM * ATM_Coefficient;

    const SumProduct =
      AgeProduct +
      SeifaProduct +
      SmokerProduct +
      ExSmokerProduct +
      NonSmokerProduct +
      AF_Product +
      YearProduct +
      BMI_Product +
      SBP_Product +
      TC_HDL_Product +
      eGFR_Product +
      HbA1c_Product +
      ACR_3_To_30_Product +
      ACR_gt_30_Product +
      Insulin_Product +
      ODM_Product +
      BPLM_Product +
      LLM_Product +
      ATM_Product;

    // console.log("AgeProduct " + AgeProduct);
    // console.log("SeifaProduct " + SeifaProduct);
    // console.log("SmokerProduct " + SmokerProduct);
    // console.log("ExSmokerProduct " + ExSmokerProduct);
    // console.log("NonSmokerProduct " + NonSmokerProduct);
    // console.log("AF_Product " + AF_Product);
    // console.log("YearProduct " + YearProduct);
    // console.log("BMI_Product " + BMI_Product);
    // console.log("SBP_Product " + SBP_Product);
    // console.log("TC_HDL_Product " + TC_HDL_Product);
    // console.log("eGFR_Product " + eGFR_Product);
    // console.log("HbA1c_Product " + HbA1c_Product);
    // console.log("ACR_3_To_30_Product " + ACR_3_To_30_Product);
    // console.log("ACR_gt_30_Product " + ACR_gt_30_Product);
    // console.log("Insulin_Product " + Insulin_Product);
    // console.log("ODM_Product " + ODM_Product);
    // console.log("BPLM_Product " + BPLM_Product);
    // console.log("LLM_Product " + LLM_Product);
    // console.log("ATM_Product " + ATM_Product);
    // console.log("SumProduct " + SumProduct);

    const uncalibratedRisk =
      (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100 < 1
        ? 1
        : (1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 100;

    // const uncalibratedRisk =
    //   Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) / 100 < 1
    //     ? 1
    //     : Math.round((1 - Math.pow(BSF, Math.pow(e, SumProduct))) * 10000) /
    //       100;
    const recalibrationFactor = getRecalibrationFactor(
      data.sex === "0" ? "female" : "male",
      data.age
    );

    alert(
      `uncalibrated CVD risk: ${uncalibratedRisk}` +
        "\n" +
        `calibrated CVD risk: ${uncalibratedRisk * recalibrationFactor!}`
    );
    return Math.round(uncalibratedRisk * recalibrationFactor!);
  };

  useEffect(() => {
    const value = form.values;

    let result;

    // console.log(value);

    if (value.sex === "1") {
      if (
        value.diabetes === "1" &&
        form.getInputProps("specfic_equation").value
      ) {
        result = MenDiabetesEquation(value);
      } else {
        result = MenGeneralEquation(value);
      }
    } else {
      if (
        value.diabetes === "1" &&
        form.getInputProps("specfic_equation").value
      ) {
        result = WomenDiabetesEquation(value);
      } else {
        result = WomenGeneralEquation(value);
      }
    }

    props.setResult(result);
    setResult(result);
    // alert(result);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={resultProgressWrapper}>
      <h3>Calculated result</h3>
      <div className="result-progress">
        <div className="progress-text">
          <strong>{result}%</strong>
          <span>{CalculatedResult.value}</span>
        </div>
        <div className="progress">
          <Progress
            level={result}
            newLevel={result}
            reClassficationRisk={"show"}
          />
        </div>
      </div>
      <p>{CalculatedResult.label}</p>
    </div>
  );
}
