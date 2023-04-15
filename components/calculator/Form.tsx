import variable from "../../styles/theme/variables";
import {
	Button,
	Text,
	createStyles,
	Group,
	MantineProvider,
	Stack,
	Stepper,
	Container,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import {
	createContext,
	FormEvent,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	convertPostcodeToSeifaForEquation,
	convertPostcodeToSeifaForSlider,
} from "../../utility/seifa";
import AgeField from "./FormFields/AgeField";
import AssessmentList from "./FormFields/AssessmentList";
import ClinicallyField from "./FormFields/ClinicallyField";
import SexField from "./FormFields/SexField";
import SmokingField from "./FormFields/SmokingField";
import BloodPressureField from "./FormFields/BloodPressureField";
import CholesterolField from "./FormFields/CholesterolField";
import MedicinesField from "./FormFields/MedicinesField";
import AtrialFibrillationField from "./FormFields/AtrialFibrillationField";
import PostcodeField from "./FormFields/PostcodeField";
import DiabetesField from "./FormFields/DiabetesField";
import SpecficEquationField from "./FormFields/SpecficEquationField";
import DiabetesDiagnosisField from "./FormFields/DiabetesDiagnosisField";
import HbA1cField from "./FormFields/HbA1cField";
import UacrField from "./FormFields/UacrField";
import EgfrField from "./FormFields/EgfrField";
import BMIField from "./FormFields/BMIField";
import InsulinField from "./FormFields/InsulinField";
import ResultProgress from "./ResultProgress";
import ResultReclassifying from "./ResultReclassifying";
import DiscussRiskResult from "./DiscussRiskResult";

export interface IComponentClassNames {
	content: string;
}

const useStyles = createStyles({
	content: {
		"& .mantine-Text-root.mantine-InputWrapper-label, .mantine-Text-root": {
			fontFamily: variable.fontFamilyMedium,
		},

		"& .mantine-Radio-label, .mantine-Checkbox-label, .mantine-Input-input, .mantine-Button-label, .mantine-List-itemWrapper, .mantine-Stepper-root .mantine-Stepper-content":
			{
				fontFamily: variable.fontFamily,
			},

		marginBottom: "50px",
		".layout": {
			width: "100%",
			maxWidth: "960px",
			margin: "0 auto",
			gap: 0,
			padding: variable.oneColPaddingMobile,
		},
		"input::placeholder": {
			display: "none",
			color: variable.grey500,
			letterSpacing: variable.letterSpacingXs,
			fontSize: variable.fontSizeBase,
			opacity: 1,
			fontFamily: variable.fontFamily,
		},
		"input:-ms-input-placeholder": {
			color: variable.grey500,
			letterSpacing: variable.letterSpacingXs,
			fontSize: variable.fontSizeBase,
			fontFamily: variable.fontFamily,
		},
		"input::-ms-input-placeholder": {
			color: variable.grey500,
			letterSpacing: variable.letterSpacingXs,
			fontSize: variable.fontSizeBase,
			fontFamily: variable.fontFamily,
		},
		".mantine-Stepper-stepIcon": {
			color: "#546E7A",
			fontWeight: variable.fontWeightMedium,
			backgroundColor: "rgba(182,198,207,0.2)",
			"&[data-completed]": {
				backgroundColor: "rgba(182,198,207,0.2)",
				borderColor: "rgba(182,198,207,0.2)",
				"& svg": {
					width: "15px",
					height: "15px",
					"& path": {
						fill: "#546E7A",
					},
				},
			},
		},
		".mantine-NumberInput-root .mantine-NumberInput-label, .mantine-RadioGroup-root .mantine-RadioGroup-label, .mantine-TextInput-root .mantine-TextInput-label, .mantine-CheckboxGroup-root .mantine-CheckboxGroup-label":
			{
				marginTop: variable.formLabelSpaceXs,
				marginBottom: variable.formLabelSpaceXs,
				fontSize: variable.fontSizeBase,
				fontFamily: variable.fontFamily,
				fontWeight: variable.fontWeightMedium,
			},
		".mantine-Input-rightSection": {
			color: variable.grey600,
			letterSpacing: variable.letterSpacingXs,
			fontFamily: variable.fontFamily,
		},
		".mantine-Stepper-root": {
			marginTop: "30px",
			"& .mantine-Stepper-steps": {
				"@media (min-width: 1000px)": {
					width: "960px",
					margin: "auto",
				},
				[variable.mdDown]: {
					alignItems: "center",
				},
			},
			"& .mantine-Stepper-step": {
				width: "248px",
				padding: "14px 12px",
			},
			"& .mantine-Stepper-step[data-progress]": {
				backgroundColor: "rgba(182,198,207,.12)",
				borderRadius: "16px",
				"& .mantine-Stepper-stepIcon": {
					color: variable.white,
					borderColor: "transparent",
					backgroundColor: variable.customRed,
				},
				"& .mantine-Stepper-stepLabel": {
					color: "#191B5E",
				},
			},
			"& .mantine-Stepper-content": {
				marginTop: "15px",
			},
			"& .mantine-Stepper-separator": {
				"@media (min-width: 767px)": {
					marginLeft: 0,
					marginRight: 0,
					backgroundColor: "transparent",
				},
			},
			"& .mantine-Stepper-stepLabel": {
				maxWidth: "165px",
				color: "#546E7A",
				letterSpacing: "0.15px",
				lineHeight: "17px",
			},
		},
		"& .horizontal": {
			"& .mantine-Text-root": {
				position: "relative",
				lineHeight: "20px",
				letterSpacing: variable.letterSpacingXs,
				marginBottom: variable.spacer1,
			},
		},
		".horizontal": {
			borderTop: "1px solid #E0E0E0",
			paddingTop: variable.spacer2,
			marginTop: variable.spacer3,
			gap: 30,
			[variable.mobileDown]: {
				gap: 15,
			},
			"& > div": {
				width: "40%",
				[variable.mobileDown]: {
					width: "100%",
				},
        "& .mantine-InputWrapper-required": {
          fontSize: variable.fontSizeBase,
        },
			},
		},
		".horizontal-right": {
			width: "60%",
			marginTop: "0 !important",
			[variable.mobileDown]: {
				width: "100%",
			},
			"& .mantine-Chip-root": {
				"& .mantine-Chip-label": {
					fontFamily: variable.fontFamily,
					fontSize: variable.fontSizeMd,
					color: "#191B5E",
					height: "36px",
					borderRadius: "16px",
					border: "2px solid rgba(25,27,94,0.2)",
					// backgroundColor: "rgba(182,198,207,0.04)",
					"&[data-disabled]": {
						border: "2px solid rgba(25,27,94,0.2) !important",
						backgroundColor: "#fff !important",
					},
				},
				"& .mantine-Chip-label[data-checked]": {
					backgroundColor: variable.red300,
					borderColor: variable.red300,
					borderRadius: "16px",
					color: variable.white,
					"& .mantine-Chip-iconWrapper": {
						color: variable.white,
					},
				},
			},
			"& .accordion-open": {
				display: "block",
				color: "rgba(25,27,94,0.8)",
			},
			"&.active": {
				"& .mantine-InputWrapper-root": {
					marginBottom: variable.spacer,
				},
				".short-input-wrapper": {
					maxHeight: "100%",
				},
				"& .accordion-open": {
					display: "none",
				},
				"& .accordion-close": {
					display: "block",
					marginTop: variable.spacer4,
					color: "rgba(25,27,94,0.8)",
					"& svg": {
						transform: "rotate(180deg)",
					},
				},
			},
		},
		".mantine-Checkbox-inner": {
			transform: "none",
			marginRight: variable.spacer4,
		},
		".mantine-Radio-inner": {
			transform: "none",
			position: "relative",
			top: 2,
			marginRight: variable.spacer3,
		},
		".mantine-Checkbox-label": {
			fontSize: variable.fontSizeBase,
		},
		".mantine-Radio-radio": {
			width: 20,
			height: 20,
		},
		".mantine-InputWrapper-description": {
			position: "relative",
			top: 2,
			[variable.mobileDown]: {
				position: "static",
			},
		},
		".mantine-NumberInput-root": {
			marginBottom: 1.25 * variable.spacer,
		},
		".mantine-Input-input": {
			height: 40,
		},
		".mantine-InputWrapper-required": {
			fontSize: variable.fontSizeLarge,
			top: "2px",
		},
		".mantine-Group-root": {
			paddingTop: 0,
		},
		".mantine-Radio-root": {
			flex: "1",
			marginTop: variable.spacer1,
		},
		".mantine-CheckboxGroup-root > div": {
			gap: variable.spacer2,
		},
		".mantine-InputWrapper-root > div": {
			padding: 0,
		},
		".mantine-RadioGroup-root": {
			".mantine-Stack-root": {
				gap: variable.spacer0,
			},
		},
		".or-type": {
			display: "flex",
			gap: 16,
			"& .or-type-left": {
				[variable.smDown]: {
					marginBottom: 0,
				},
			},
			"> div": {
				flex: 1,
			},
			".or-type-flex-2": {
				flex: 2,
			},
			"> span": {
				position: "relative",
				top: "7px",
				color: variable.grey500,
				[variable.smDown]: {
					position: "static",
				},
			},
		},
		".and-type": {
			display: "flex",
			gap: 20,
			"> div": {
				flex: 1,
			},
		},
		".chip": {
			width: "100%",
			"& label": {
				height: 40,
			},
		},
		".buttom-button": {
			height: "42px",
			minWidth: "110px",
			backgroundColor: variable.red300,
			"& span": {
				color: variable.white,
				fontSize: variable.fontSizeBase,
				fontWeight: "bold",
				letterSpacing: 0,
				lineHeight: "17px",
			},
			"&[data-disabled]": {
				backgroundColor: "#EDEFF1",
				"& span": {
					color: variable.grey400,
				},
			},
			"&:hover,&:focus,&:active,&:not([data-disabled]):hover": {
				backgroundColor: variable.red500,
			},
		},
		"& .diabetesOpen": {
			maxWidth: "1020px",
			marginLeft: "auto",
			marginRight: "auto",
			borderRadius: "8px",
			clear: "both",
			backgroundColor: "rgba(182,198,207,0.12)",
			paddingTop: variable.spacer5,
			paddingBottom: variable.spacer5,
			marginTop: variable.spacer5,
			marginBottom: variable.spacer1,
			"& .diabetes-equation-text": {
				display: "block",
				marginTop: variable.spacer4,
				fontSize: variable.fontSizeSmall,
				color: variable.grey600,
				letterSpacing: variable.letterSpacingSm,
				lineHeight: "20px",
			},
			"& .diabetes-equation-title": {
				fontWeight: 500,
				letterSpacing: variable.letterSpacingXs,
				lineHeight: "20px",
			},
		},
		'& .mantine-Alert-root[aria-title="Age is required"]': {
			display: "none",
		},
		"& .mantine-Alert-root.ageAlert": {
			backgroundColor: "rgba(255,0,0,0.08)",
			opacity: 0.98,
			"& .mantine-Alert-icon svg": {
				width: "20px",
				height: "20px",
				strokeWidth: "2.5px",
			},
			"& .mantine-Alert-title": {
				color: "#FF0000",
				fontFamily: variable.fontFamilySemiBold,
				fontWeight: variable.fontWeightSemiBold,
			},
			"& .mantine-Alert-message": {
				color: variable.grey600,
				fontFamily: variable.fontFamily,
				letterSpacing: variable.letterSpacingSm,
			},
		},
	},
});

export type FormContextType = {
	form: UseFormReturnType<any>;
	disable: boolean;
	setDisable: React.Dispatch<SetStateAction<boolean>>;
};

export const FormContext = createContext<FormContextType>(
	{} as FormContextType
);

export default function Form() {
	//overlay
  const [visible, setVisible] = useState(false);

	let { content } = useStyles().classes;
	//result
	const [result, setResult] = useState<number>(0);

	//
	const [reClassification, setReClassficationRisk] = useState<string>("show");
	// Stepper
	const [active, setActive] = useState(0);

	const [disable, setDisable] = useState<boolean>(false);

	const setResultHandler = (arg: number) => {
		setResult(arg);
	};
	const nextStep = () => {
		setActive((current) => (current < 3 ? current + 1 : current));
	};
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	// Diabetes status
	const [showDiabetes, SetShowDiabetes] = useState(false);
	const onChangeYes = () => {
		SetShowDiabetes(true);
	};
	const onChangeNo = () => {
		SetShowDiabetes(false);
	};

	const formValidateObject = useMemo(() => {
		const initialValues = {
			high_risk: undefined,
			postcode: undefined,
			af: undefined,
			age: undefined,
			sbp: undefined,
			sex: undefined,
			smoking: undefined,
			cvd_medicine: undefined,
			diabetes: undefined,
			hdlRatio: undefined,
			hdlTotal: undefined,
			hdlHighDensity: undefined,
		};

		const hiddenField = {
			specfic_equation: undefined,
			year: undefined,
			uACR: undefined,
			weight: undefined,
			height: undefined,
			insulin: undefined,
			bmi: undefined,
			mol: undefined,
			percentage: undefined,
			eGFRLeft: undefined,
			eGFRRight: undefined,
		};

		if (showDiabetes) return { ...initialValues, ...hiddenField };

		return initialValues;
	}, [showDiabetes]);

	const formValidateFn = (values: any) => {
		const initValidate = {
			high_risk:
				values.high_risk === undefined || values.high_risk.length === 0
					? "Please make a selection to continue"
					: null,
			age:
				values.age === undefined
					? "Please enter an age between 30-79 years to continue"
					: values.age < 30
					? "Age is too low for accurate risk assessment."
					: values.age > 79
					? "Age is too high for accurate risk assessment"
					: null,
			sbp:
				values.sbp === undefined
					? "Please enter a valid number"
					: values.sbp > 220
					? "Please enter an between 75-220 to continue"
					: values.sbp < 75
					? "Please enter an between 75-220 to continue"
					: null,
			postcode:
				values.postcode === undefined || values.postcode === ""
					? null
					: convertPostcodeToSeifaForSlider(values.postcode)
					? null
					: "Please enter a valid Postcode number",
			// af: values.af === undefined ? "This field is required" : null,
			sex:
        values.sex === undefined ? "Please make a selection to continue" : null,
			smoking:
				values.smoking === undefined
					? "Please make a selection to continue"
					: null,
			cvd_medicine:
        values.cvd_medicine === undefined || values.cvd_medicine.length === 0
					? "Please make a selection to continue"
					: null,
			diabetes:
				values.diabetes === undefined
					? "Please make a selection to continue"
					: null,
			hdlRatio: ((): string | null => {
				if (values.hdlRatio) return null;

				if (values.hdlTotal || values.hdlHighDensity) return null;

				return "Please enter a valid number";
			})(),
			hdlTotal: ((): string | null => {
				if (values.hdlRatio) return null;

				if (values.hdlTotal) return null;

				return "Please enter a valid number";
			})(),
			hdlHighDensity: ((): string | null => {
				if (values.hdlRatio) return null;

				if (values.hdlHighDensity) return null;

				return "Please enter a valid number";
			})(),
		};

		const hiddenField = {
			specfic_equation:
        values.specfic_equation === undefined ? "This field is required" : null,
			year:
				values.year === undefined
					? "Please enter a valid number to continue."
					: values.year > 100
					? "Please enter an between 0-100 to continue"
					: values.year < 0
					? "Please enter an between 0-100 to continue"
					: null,
      uACR: values.uACR === undefined ? "Please enter a valid number" : null,
			weight:
				values.weight === undefined
					? "Please enter a valid number to continue"
					: values.weight > 350
					? "Please enter an between 30-350 to continue"
					: values.weight < 30
					? "Please enter an between 30-350 to continue"
					: null,
			height:
				values.height === undefined
					? "Please enter a valid number to continue"
					: values.height > 2.3
					? "Please enter an between 1-2.3 to continue"
					: values.height < 1
					? "Please enter an between 1-2.3 to continue"
					: null,
			insulin:
				values.insulin === undefined
					? "Please make a selection to continue"
					: null,
			mol: values.percentage
				? null
				: !values.percentage && !values.mol
				? "Please enter a valid number"
				: values.mol < 11
				? "Please enter an between 11-194 to continue"
				: values.mol > 194
				? "Please enter an between 11-194 to continue"
				: null,
			percentage: values.mol
				? null
				: !values.percentage && !values.mol
				? "Please enter a valid number"
				: values.percentage < 3
				? "Please enter an between 3-20 to continue"
				: values.percentage >= 21
				? "Please enter an between 3-20 to continue"
				: null,
			eGFRLeft: values.eGFRRight
				? null
				: !values.eGFRLeft && !values.eGFRRight
				? "Please enter a valid number"
				: values.eGFRLeft < 0
				? "Please enter an more than 0 to continue"
				: // : values.eGFRLeft > 88
				  // ? "Please enter an between 1-88 to continue"
				  // : values.eGFRLeft < 0
				  // ? "Please enter an between 1-88 to continue"
				  null,
			eGFRRight: values.eGFRLeft
				? null
				: !values.eGFRLeft && !values.eGFRRight
				? "This field is required"
				: null,
		};

		const specfic_equation = form.getInputProps("specfic_equation").value;

		if (showDiabetes && specfic_equation)
			return { ...initValidate, ...hiddenField };

		return initValidate;
	};

	// Form validation
	const form = useForm<
		{
			age: number | undefined;
			sbp: number | undefined;
			sex: string | undefined;
			smoking: string | undefined;
			cvd_medicine: string[] | undefined;
			diabetes: string | undefined;
			year?: number | undefined;
			uACR?: number | undefined;
			weight?: number | undefined;
			height?: number | undefined;
			insulin?: string | undefined;
			mol?: string | undefined;
			percentage?: string | undefined;
			seifa?: string | undefined;
			postcode?: string | undefined;
		} & any
	>({
		initialValues: formValidateObject,
		validate: formValidateFn,
		validateInputOnChange: true,
	});

	const handleSubmit = () => {
		// nextStep();

		console.log(form.values);

		if (form.isValid()) {
			if (!form.values.seifa) {
				form.values.seifa = convertPostcodeToSeifaForEquation(
					form.values.postcode
				);
			}

			const BPLM =
				(form.values.cvd_medicine as string[]).findIndex(
					(v) => v === "Blood pressure-lowering medicines"
				) === -1
					? 0
					: 1;
			const LLM =
				(form.values.cvd_medicine as string[]).findIndex(
					(v) => v === "Lipid-modifying medicines"
				) === -1
					? 0
					: 1;
			const OATM =
				(form.values.cvd_medicine as string[]).findIndex(
					(v) => v === "Antithrombotic medicines"
				) === -1
					? 0
					: 1;

			form.values.BPLM = BPLM;
			form.values.LLM = LLM;
			form.values.OATM = OATM;

			form.values.smoker = form.values.smoking === "2" ? 1 : 0;
			form.values.exSmoker = form.values.smoking === "1" ? 1 : 0;

			if (form.values.hdlRatio) {
				form.values.HdlRatio = form.values.hdlRatio;
			} else if (form.values.hdlHighDensity && form.values.hdlTotal) {
				form.values.HdlRatio =
					form.values.hdlTotal / form.values.hdlHighDensity;
			}

			if (form.values.diabetes === "1") {
				const weightValue =
          typeof form.values.weight === "undefined" ? 0 : form.values.weight;
				const heightValue =
          typeof form.values.height === "undefined" ? 0 : form.values.height;
				if (weightValue === 0 || heightValue === 0) {
					form.values.bmi = 0;
				} else {
					form.values.bmi = weightValue / heightValue / heightValue;
				}

        if (form.values.eGFRLeft) form.values.eGFR = form.values.eGFRLeft;
				else if (form.values.eGFRRight) form.values.eGFR = 100;

				if (form.values.uACR > 30) {
					form.values.ACR_gt_30 = 1;
					form.values.ACR_3_to_30 = 0;
				} else if (form.values.uACR >= 3 && form.values.uACR <= 30) {
					form.values.ACR_gt_30 = 0;
					form.values.ACR_3_to_30 = 1;
				} else {
					form.values.ACR_gt_30 = 0;
					form.values.ACR_3_to_30 = 0;
				}

				if (form.values.mol) form.values.HbA1c = form.values.mol;
				else if (form.values.percentage)
          form.values.HbA1c = ((form.values.percentage - 2.15) * 10.929) | 0;
			}

			const {
				high_risk,
				cvd_medicine,
				bmi,
				eGFRRight,
				eGFRLeft,
				postcode,
				height,
				weight,
				mol,
				percentage,
				...final
			} = form.values;

			form.values = final;

			//   console.log(final);

			nextStep();
		} else {
			// alert(
			//   "There are errors in the form, please correct them before continue to next part."
			// );
		}
	};

	return (
		<MantineProvider>
			<FormContext.Provider
				value={{
					form,
					disable,
					setDisable,
				}}
			>
				{/* temporary overlay
        {!visible && (
          <Container sx={{ width: "100%", textAlign: "center" }}>
            <Button
              onClick={() => {
                setVisible(true);
              }}
              size="xl"
              sx={{
                margin: "auto",
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%);",
                "&:hover": {
                  transform: "translate(-50%, -50%);",
                },
              }}
            >
              Click to start
            </Button>
          </Container>
            )} */}
				{/* {visible && ( temporary overlay */}
				<Stack className={content}>
					<Stepper
						active={active}
						onStepClick={setActive}
						breakpoint="sm"
              sx={{
                "& .mantine-Stepper-stepBody": {
                  "& .mantine-Text-root": {
                    fontFamily: variable.fontFamilyMedium,
                    fontWeight: variable.fontWeightMedium,
                  },
                },
              }}
					>
						<Stepper.Step label="Enter variables" description="">
							<form
								onSubmit={form.onSubmit((values) =>
									console.log(form.isValid())
								)}
							>
								<Stack className="layout">
									<AssessmentList />
									<ClinicallyField
										reDirectToHigh={() => {
											setActive((current) => current + 2);
											setResult(100);
											setReClassficationRisk("high risk");
										}}
									/>
									<AgeField />
									<SexField />
									<SmokingField />
									<BloodPressureField />
									<CholesterolField />
									<MedicinesField />
									<AtrialFibrillationField />
									<PostcodeField />
									<DiabetesField
										parentCallbackYes={onChangeYes}
										parentCallbackNo={onChangeNo}
									/>
								</Stack>

								{showDiabetes && (
									<div className="diabetesOpen">
										<Stack className="layout">
											<div className="gray-background-wrapper">
												<SpecficEquationField />
												<div className="use-diabetes">
													<DiabetesDiagnosisField />
													<HbA1cField />
													<UacrField />
													<EgfrField />
													<BMIField />
													<InsulinField />
												</div>
											</div>
										</Stack>
									</div>
								)}

								<Stack className="layout">
                    <Group position="center" mt="xl" color="#E71344">
										<Button
											type="submit"
											onClick={handleSubmit}
											// disabled={
											//   form.getInputProps("age").error &&
											//   form.getInputProps("age").value
											// }
											// disabled={!form.isValid() ? true : false}
											disabled={disable}
											className="buttom-button"
										>
											Calculate
										</Button>
									</Group>
								</Stack>
							</form>
						</Stepper.Step>
						<Stepper.Step
							disabled={!form.isValid()}
							label={
								<Text
									sx={{
										whiteSpace: "nowrap",
										lineHeight: "17px",
									}}
								>
									Consider
									<br />
									reclassification factors
								</Text>
							}
							description=""
						>
							<Stack className="layout">
								<ResultProgress setResult={setResultHandler} />
								<ResultReclassifying
									reClassficationRisk={setReClassficationRisk}
									nextStep={nextStep}
									setResult={setResult}
									result={result}
								/>
							</Stack>
							<Stack className="layout">
								<Group position="center" mt="xl">
									{/* <Button
                    variant="default"
                    onClick={prevStep}
                    className="buttom-button"
                  >
                    Back
                  </Button> */}
									{/* <Button
                    type="submit"
                    onClick={() => {
                      nextStep();
                    }}
                    className="buttom-button"
                  >
                    Continue
                  </Button> */}
								</Group>
							</Stack>
						</Stepper.Step>
						<Stepper.Step
							disabled={!form.isValid()}
							label={
								<Text
									sx={{
										whiteSpace: "nowrap",
										lineHeight: "17px",
									}}
								>
									Discuss risk result
									<br />& management
								</Text>
							}
							description=""
						>
							<Stack className="layout">
								<DiscussRiskResult
									result={result}
									reClassficationRisk={reClassification}
									smoke={true}
								/>
							</Stack>
							<Stack className="layout">
								{/* <Group position="center" mt="xl">
                                <Button
                                    variant="default"
                                    onClick={prevStep}
                                    className="buttom-button"
                                >
                                    Back
                                </Button>
                                <Button type="submit" className="buttom-button">
                                    Calculate estimated risk
                                </Button>
                                </Group> */}
							</Stack>
						</Stepper.Step>
						<Stepper.Completed>
							<Stack className="layout">
								{/* Completed, click back button to get to previous step */}
							</Stack>
						</Stepper.Completed>
					</Stepper>
				</Stack>
				{/* } temporary overlay */}
			</FormContext.Provider>
		</MantineProvider>
	);
}
