import { TextInput, createStyles, Stack, Slider } from "@mantine/core";
import Label from "../Label";
import variable from "../../../styles/theme/variables";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../Form";
import { convertPostcodeToSeifaForEquation, convertPostcodeToSeifaForSlider } from "../../../utility/seifa";
import Tooltip from "../Tooltip";

export interface IComponentClassNames {
	content: string;
}

const useStyles = createStyles({
	content: {
		".SEIFA-rank": {
			"& .SEIFA-text": {
				marginTop: variable.spacer3,
				marginBottom: variable.spacer2,
				color: variable.grey600,
				fontSize: variable.fontSizeSmall,
				letterSpacing: "0.4px",
				lineHeight: "16px",
			},
			"& .SEIFA-slider": {
				marginTop: variable.spacer2,
				"&::before": {
					content: `''`,
					display: "table",
				},
				"&::after": {
					content: `''`,
					display: "table",
					clear: "both",
				},
				"& .SEIFA-slider-left": {
					float: "left",
					width: "calc(50% - 8px)",
					marginRight: variable.spacer2,
					padding: variable.spacer4,
					border: "1px solid #EDEFF1",
					borderRadius: "8px",
					boxShadow:
						"0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.02)",
					[variable.mobileDown]: {
						width: "100%",
						float: "none",
						marginBottom: variable.spacer2,
					},
					"& .number": {
						display: "inline-block",
						marginRight: variable.spacer4,
						width: "44px",
						height: "44px",
						lineHeight: "44px",
            fontFamily: variable.fontFamilyMedium,
						fontSize: variable.fontSizeXLarge,
						fontWeight: variable.fontWeightMedium,
						textAlign: "center",
						borderRadius: "8px",
						// backgroundColor: variable.green100,
						verticalAlign: "middle",
						"&[data-number='5']": {
							backgroundColor: variable.green100,
							color: "#005A55",
						},
						"&[data-number='4']": {
							backgroundColor: "#DCECC8",
							color: "#005B0F",
						},
						"&[data-number='3']": {
							backgroundColor: "#FFE9B3",
							color: "#A84B0D",
						},
						"&[data-number='2']": {
							backgroundColor: "#FFD6C7",
							color: "#C80200",
						},
						"&[data-number='1']": {
							backgroundColor: "#FFBCBC",
							color: "#9C1C44",
						},
					},
					"& .SEIFA-rank-text": {
						display: "inline-block",
						width: "calc(100% - 60px)",
						verticalAlign: "middle",
						"& strong": {
              fontFamily: variable.fontFamilyMedium,
							fontSize: "22px",
							fontWeight: variable.fontWeightMedium,
							lineHeight: "28px",
						},
						"& span": {
							display: "block",
							color: variable.grey600,
							fontSize: variable.fontSizeXs,
							letterSpacing: "0.4px",
							lineHeight: "16px",
						},
					},
				},
				"& .SEIFA-slider-right": {
					width: "calc(50% - 8px)",
					float: "left",
					marginLeft: variable.spacer2,
					[variable.mobileDown]: {
						width: "100%",
						float: "none",
						marginBottom: variable.spacer8,
					},
					"& .slider-text>span": {
						display: "inline-block",
						marginBottom: variable.spacer2,
						color: variable.grey600,
						fontSize: variable.fontSizeSm,
						fontStyle: "italic",
						letterSpacing: "0.1px",
						lineHeight: "20px",
					},
				},
			},
		},
	},
});

const MARKS = [
	{ value: 0, label: "1" },
	{ value: 25, label: "2" },
	{ value: 50, label: "3" },
	{ value: 75, label: "4" },
	{ value: 100, label: "5" },
];

let lastValue: any = undefined

export default function SocioeconomicField() {
	let { content } = useStyles().classes;

  const { form, disable } = useContext(FormContext);

	const slider_value = convertPostcodeToSeifaForSlider(
		form.getInputProps("postcode")?.value
	)?.toString();

	const [value, setValue] = useState<string | undefined>(undefined);
  const [showRankText, SetShowRankText] = useState(true);

	useEffect(() => {
    if (lastValue)
      setValue(lastValue);
    else
		setValue(slider_value);
	}, [slider_value]);

	return (
		<Stack className={content}>
			<div
				className="horizontal"
				style={{
          opacity: disable ? "0.5" : "1",
				}}
			>
				<Label
					labelName="Postcode"
					// cardDropdownContent="Postcode is used to calculate the Socio-Economic Indexes for Areas (SEIFA) ranking which is a population-level summary measure that reflects determinants such as education, housing, employment and income. Including socioeconomic status in risk prediction improves accuracy, compared with using other risk factors alone. SEIFA quintiles based on postcode provide the most readily accessible means of incorporating socioeconomic status into CVD risk assessment in Australia at this time."
					cardDropdownContent={
						form.getInputProps("age").error
							? ""
							: "Postcode is used to calculate the Socio-Economic Indexes for Areas (SEIFA) ranking which is a population-level summary measure that reflects determinants such as education, housing, employment and income. Including socioeconomic status in risk prediction improves accuracy, compared with using other risk factors alone. SEIFA quintiles based on postcode provide the most readily accessible means of incorporating socioeconomic status into CVD risk assessment in Australia at this time."
					}
					cardButtonLink=""
				></Label>
				<div className="horizontal-right">
					<TextInput
						label=""
						placeholder="Enter in postcode to generate SEIFA Rank"
						radius="md"
						{...form.getInputProps("postcode")}
            disabled={disable}
						//@ts-ignore
						error={form.getInputProps("postcode").error}
            onChange={(e) => {
              lastValue = undefined;
              form.getInputProps("postcode").onChange(e);
              form.values.seifa = convertPostcodeToSeifaForEquation(
                form.values.postcode
              );
            }}
					/>
					{form.getInputProps("postcode").value && slider_value && (
						<div className="SEIFA-rank">
							<div className="SEIFA-slider">
								<div className="SEIFA-slider-left">
									<div className="number" data-number={value}>
										{value}
									</div>
									<div className="SEIFA-rank-text">
										<strong>SEIFA RANK</strong>
                    {showRankText && <span>Generated postcode result</span>}
                    {!showRankText && <span>Manually adjusted score</span>}
									</div>
								</div>
								<div className="SEIFA-slider-right">
									<div className="slider-text">
										<span>Adjust score via slider</span>
										<Tooltip
											cardDropdownContent="Since SEIFA is an average based on postcode, it may not accurately reflect the socioeconomic status of all individuals within that postcode. If the person has a level of disadvantage that differs markedly from that of the average for their postcode, their socioeconomic quintile can be manually adjusted up or down at the clinician's discretion."
											cardButtonLink=""
										/>
									</div>
									<Slider
										defaultValue={
                      lastValue
                        ? MARKS.find((v) => v.label === lastValue.toString())!.value
                        : MARKS.find((v) => v.label === slider_value)!.value
										}
										onChange={(e) => {
											const v = MARKS.find((v) => v.value === e)?.label;
											setValue(v);
                      form.values.seifa = 6 - Number.parseInt(v as string);
                      lastValue = v;

                      if (v === slider_value) {
                        SetShowRankText(true);
                      } else {
                        SetShowRankText(false);
                      }
										}}
										label={(v) => MARKS.find((mark) => mark.value === v)?.label}
                    disabled={disable}
										step={25}
										marks={MARKS}
										showLabelOnHover={false}
										styles={(theme) => ({
											track: {
												background:
													theme.colorScheme === "dark"
														? theme.colors.dark[3]
														: "red",
												"&:before": {
													background:
														"linear-gradient(to right, #f03110, #ffd569, #58b588)",
												},
											},
											mark: {
												width: 4,
												height: 4,
												borderRadius: 1000,
												border: "none",
												transform: "translateX(0) translateY(2px)",
											},
											markFilled: {
												borderColor: theme.colors.blue[6],
											},
											markLabel: {
												fontSize: variable.fontSizeBase,
												color: variable.grey600,
												marginBottom: 5,
												marginTop: 15,
											},
											bar: {
												backgroundColor: "transparent",
											},
											thumb: {
												height: 16,
												width: 16,
												backgroundColor: theme.white,
												border: "5px solid rgba(25,27,94,0.8)",
												boxShadow: theme.shadows.sm,
											},
											markWrapper: {
												[`&:nth-of-type(${slider_value})`]: {
													"&::before": {
														content: "''",
														display: "block",
														position: "absolute",
														borderRadius: 16,
														transform: "translate(-8px,-4px)",
														height: 16,
														width: 16,
														zIndex: 20,
														backgroundColor: "white",
														border: "5px solid #CFD8DB",
													},
												},
											},
										})}
									/>
								</div>
							</div>
							<div className="SEIFA-text">
								1 being most disadvantaged and 5 being least disadvantaged.
								SEIFA is an average based on postcode, it may not accurately
								reflect the socioeconomic status of all individuals within that
								postcode. If the person has a level of disadvantage that differs
								markedly from that of the average for their postcode, their
								socioeconomic quintile can be manually adjusted up or down in
								the risk equation.
							</div>
						</div>
					)}
				</div>
			</div>
		</Stack>
	);
}
