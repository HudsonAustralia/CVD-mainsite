import { Checkbox, createStyles, Text, Button, Alert } from "@mantine/core";
import { useCallback, useContext } from "react";
import { FormContext } from "../Form";
import Label from "../Label";
import Tooltip from "../Tooltip";
import CustomCheckbox from "../CustomCheckbox";
import { IconAlertCircle } from "@tabler/icons-react";
import variable from "../../../styles/theme/variables";
const values = [
	"Moderate-severe chronic kidney disease",
	"Familial hypercholesterolaemia",
	"Neither present",
];

export interface IComponentClassNames {
	cdhrAlert: string;
}

const useStyles = createStyles({
	cdhrAlert: {
		"& .mantine-Alert-icon": {
			color: "#A84B0D",
		},
		"& .mantine-Alert-label": {
			fontFamily: variable.fontFamilySemiBold,
			fontSize: variable.fontSizeSmall,
			color: "#A84B0D",
			fontWeight: variable.fontWeightSemiBold,
			letterSpacing: "0.1px",
			lineHeight: "20px",
		},
		"& .mantine-Alert-message": {
			fontFamily: variable.fontFamily,
			"& .mantine-Text-root": {
				fontFamily: variable.fontFamily,
				fontWeight: variable.fontWeightRegular,
				maxWidth: "784px",
				color: variable.grey600,
				fontSize: variable.fontSizeSm,
				letterSpacing: "0.25px",
				lineHeight: "20px",
			},
			"& .mantine-Button-root": {
				height: "30px",
				marginTop: variable.spacer4,
				fontSize: variable.fontSizeXs,
				lineHeight: "14px",
				fontWeight: "normal",
			},
		},
	},
	".horizontal": {
		[variable.mobileDown]: {
			maxWidth: "calc(100vw - 48px)",
			left: "0 !important",
			right: "24px !important",
		},
	},
});

export default function ClinicallyField(props: { reDirectToHigh: () => void }) {
	let { cdhrAlert } = useStyles().classes;

	const { form, disable } = useContext(FormContext);

	const isHighRisk = useCallback(() => {
		if (form.getInputProps("high_risk").value) {
			const value =
				form
					.getInputProps("high_risk")
					.value.find(
						(v: string) =>
							v === "Moderate-severe chronic kidney disease"
					) ||
				form
					.getInputProps("high_risk")
					.value.find(
						(v: string) => v === "Familial hypercholesterolaemia"
					);

			return value;
		} else {
			return false;
		}
	}, [form.getInputProps("high_risk")]);

	const disabled = useCallback(
		(fieldValue: string) => {
			const value = form.getInputProps("high_risk").value;

			if (value && value.length) {
				if (
					value[0] === "Neither present" &&
					fieldValue !== "Neither present"
				)
					return true;
				else if (
					value[0] !== "Neither present" &&
					fieldValue === "Neither present"
				)
					return true;
				else return false;
			}

			return false;
		},
		[form.getInputProps("high_risk")]
	);

	const highRiskValue = isHighRisk();

	return (
		<>
			<div className="horizontal">
				<Label
					labelName="Clinically determined high risk"
					labelRequired="*"
					labelDescription="Clinical conditions that automatically confer high risk. If either of these apply, you will be redirected to management for high risk category"
				></Label>
				<div className="horizontal-right">
					<Checkbox.Group
						description=""
						withAsterisk
						{...form.getInputProps("high_risk")}
					>
						{values.map((v, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									flexFlow: "row nowrap",
									alignItems: "center",
								}}
							>
								<Checkbox
									value={v}
									label={v}
									disabled={disabled(v)}
								/>
								{i === 0 && (
									<Tooltip
										cardDropdownContent={
											<Text>
												<Text>
													Manage as high risk. Do not
													use the Aus CVD risk
													calculator for people with
													moderate-to-severe chronic
													kidney disease as they are
													considered at automatic high
													risk of CVD. This includes:
												</Text>
												<ul>
													<li>
														people with sustained
														eGFR {"<"}45 mL/min/1.73
														m2
													</li>
													<li>
														men with persistent uACR{" "}
														{">"}25 mg/mmol
													</li>
													<li>
														women with persistent
														uACR {">"}35 mg/mmol.
													</li>
												</ul>
											</Text>
										}
										cardButtonLink=""
									/>
								)}
								{i === 1 && (
									<Tooltip
										cardDropdownContent="Manage as high risk. Do not use the Aus CVD risk calculator for people with diagnosed familial hypercholesterolaemia (FH), as they are considered at automatic high risk of CVD. Treat according to Australian guidelines for managing FH. FH-specific calculators may be useful."
										cardButtonLink=""
									/>
								)}
							</div>
						))}
					</Checkbox.Group>
				</div>
			</div>
			{isHighRisk() && (
				<Alert
					className={cdhrAlert}
					styles={{
						root: {
							backgroundColor: "rgba(255,168,90,0.12)",
							marginTop: 10,
						},
					}}
					icon={<IconAlertCircle size={16} />}
					title={"Clinically determined high risk"}
					aria-label={"Clinically determined high risk"}
				>
					<Text>
						This person is considered to be at automatic high risk.
						You will be redirected to the management page for high
						risk category.
					</Text>
					<Button
						onClick={props.reDirectToHigh}
						sx={{
							background: "#191b5e",
							"&:hover": {
								backgroundColor: "#1f2176",
							},
						}}
					>
						Continue
					</Button>
				</Alert>
			)}
		</>
	);
}
