import {
	Box,
	Flex,
	Title,
	Text,
	createStyles,
	List,
	Grid,
	Image,
} from "@mantine/core";
import FirstNationsSpecificResources from "./FirstNationalSpecificResource";
import variable from "../../../../styles/theme/variables";
import React from "react";

interface propsInterface {
	smokingReource: boolean;
	nutritionResources: boolean;
	healthyWeightResources: boolean;
	alcoholReductionResources: boolean;
	medicineRelatedResources: boolean;
	firstNationsSpecificResources: boolean;
	patientSmoke: boolean;
}

const PrintResourceList = (props: propsInterface) => {
	const resource = [
		{
			title: "Quit smoking",
			showStatus: props.smokingReource && props.patientSmoke,
			subResources: [
				{
					qrCode: "",
					title: "Smoking cessation apps",
					span: "Royal Australian College of General Practitioners",
					url: `https://www.racgp.org.au/clinical-resources/clinical-guidelines/handi/handi-interventions/apps/smartphone-apps-for-smoking-cessation`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/QuitSmoking/1.png",
				},
				{
					qrCode: "",
					title: "Quitline",
					span: "Confidential telephone counselling service",
					url: `https://www.quit.org.au/`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/QuitSmoking/2.png",
				},
				{
					qrCode: "",
					title: "Smoking and your heart",
					span: "National Heart Foundation of Australia",
					url: `https://www.heartfoundation.org.au/heart-health-education/smoking-and-your-heart`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/QuitSmoking/3.png",
				},
			],
		},
		{
			title: "Follow a healthy eating pattern",
			showStatus: props.nutritionResources,
			subResources: [
				{
					qrCode: "",
					title: "Australian Guide to Healthy Eating - Summary ",
					span: "Australian Government",
					url: `https:// www.eatforhealth.gov.au/sites/default/files/2022-11/ n55i_australian_guide_to_healthy_eating_0.pdf`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Followahealthyeatingpattern/1.png",
				},
				{
					qrCode: "",
					title: "Healthy Eating Quiz",
					span: "Confidential telephone counselling service",
					url: `https://healthyeatingquiz.com.au/`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Followahealthyeatingpattern/2.png",
				},
				{
					qrCode: "",
					title: "Food Switch",
					span: "Helping you to make better food choices",
					url: `https://www.georgeinstitute.org/projects/foodswitch`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Followahealthyeatingpattern/3.png",
				},
			],
		},
		{
			title: "Incorporate regular physical activity into your routine",
			showStatus: true,
			subResources: [
				{
					qrCode: "",
					title: "Personalised walking plans (free online)",
					span: "National Heart Foundation of Australia",
					url: `https://walkingplans.heartfoundation.org.au/?utm_source=web&utm_medium=FeatureTile&utm_campaign=personal_walking_plans`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Incorporateregularphysicalactivityintoyourroutine/1.png",
				},
				{
					qrCode: "",
					title: "Australia’s physical activity and sedentary behaviour guidelines",
					span: "Australian Government Department of Health and Aged Care",
					url: `https://www.health.gov.au/topics/physical-activity-and-exercise/physical-activity-and-exercise-guidelines-for-all-australians/for-adults-18-to-64-years`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Incorporateregularphysicalactivityintoyourroutine/2.png",
				},
			],
		},
		{
			title: "Achieve and maintain a healthy weight",
			showStatus: props.healthyWeightResources,
			subResources: [
				{
					qrCode: "",
					title: "Ten top tips for weight control",
					span: "Royal Australian College of General Practitioners",
					url: `https://www.racgp.org.au/clinical-resources/clinical-guidelines/handi/handi-interventions/nutrition/ten-top-tips-for-weight-control`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Achieve and maintain a healthy weight/1.png",
				},
				{
					qrCode: "",
					title: "Weight loss – a healthy approach",
					span: "Better Health Channel (Victorian Department of Health)",
					url: `https://www.betterhealth.vic.gov.au/health/healthyliving/weight-loss-a-healthy-approach`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Achieve and maintain a healthy weight/2.png",
				},
				{
					qrCode: "",
					title: "Weight loss and dieting",
					span: "Healthdirect - quality, approved health information and advice",
					url: `https://www.healthdirect.gov.au/weight-loss-and-dieting`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Achieve and maintain a healthy weight/3.png",
				},
				{
					qrCode: "",
					title: "Information for patients on achieving and maintaining a healthy body weight",
					span: "National Heart Foundation of Australia",
					url: `https://www.heartfoundation.org.au/bundles/your-heart/healthy-body-weight`,
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Achieve and maintain a healthy weight/4.png",
				},
			],
		},
		{
			title: "Limit your intake of alcohol",
			showStatus: props.alcoholReductionResources,
			subResources: [
				{
					qrCode: "",
					title: "FARE support services",
					span: "Royal Australian College of General Practitioners",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Limit your intake of alcohol/1.png",
					url: `https://fare.org.au/resources/support/`,
				},
				{
					qrCode: "",
					title: "Australian guidelines to reduce health risks from drinking alcohol",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Limit your intake of alcohol/2.png",
					span: "National Health and Medical Research Council (NHMRC)",
					url: `https://www.nhmrc.gov.au/health-advice/alcohol`,
				},
			],
		},
		{
			title: "Blood pressure-lowering and lipid-modifying medicines",
			showStatus: props.medicineRelatedResources,
			subResources: [
				{
					qrCode: "",
					title: "High blood pressure fact sheet",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Blood pressure-lowering and lipid-modifying medicines/1.png",
					span: "Stroke Foundation",
					url: `https://strokefoundation.org.au/media/ixgpi3ga/sf891_high-bp-fact-sheet_0422_v5-final.pdf`,
				},
				{
					qrCode: "",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Blood pressure-lowering and lipid-modifying medicines/2.png",
					title: "Taking a statin to reduce the risk of coronary heart disease and stroke - Patient decision aid",
					span: "National Institute for Health and Care Excellence (NICE)",
					url: `https://www.nice.org.uk/guidance/cg181/resources/patient-decision-aid-pdf-243780159`,
				},
			],
		},
		{
			title: "First Nation specific resources",
			showStatus: props.firstNationsSpecificResources,
			subResources: [
				{
					qrCode: "",
					title: "Heart health resources for First Nations people",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/FirstNationalSpecificResource/1.png",
					span: "National Heart Foundation of",
					url: `https://www.svhhearthealth.com.au/aboriginal-heart-health/heart-risks`,
				},
			],
		},
		{
			title: "First Nation alcohol & smoking related resources",
			showStatus: true,
			subResources: [
				{
					qrCode: "",
					title: "Quitline",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Firstnationalcoholsmokingrelatedresources/1.png",
					span: "Offers a smoking cessation service and resources specifically for First Nations people",
					url: `https://www.quit.org.au/`,
				},
				{
					qrCode: "",
					title: "Alcohol",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Firstnationalcoholsmokingrelatedresources/2.png",
					span: "Strong Spirit Strong Mind",
					url: `https://strongspiritstrongmind.com.au/alcohol`,
				},
			],
		},
		{
			title: "First Nation nutrition related resources",
			showStatus: true,
			subResources: [
				{
					qrCode: "",
					title: "Cooking in the Pilbara",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Firstnationnutritionrelatedresources/1.png",
					span: "National Heart Foundation of Australia",
					url: `https://www.heartfoundation.org.au/getmedia/4edc3153-7cc1-471b-
          bf56-03193f004f38/Cooking-in-the-Pilbara-Recipe-Book_1.pdf`,
				},
				{
					qrCode: "",
					title: "Aboriginal and Torres Strait Islander Guide to Healthy Eating ",
					imageUrl:
						"/assets/images/PrintResourceList/QrCodes/Firstnationnutritionrelatedresources/2.png",
					span: "Department of Health and Aged Care",
					url: `https://www.eatforhealth.gov.au/sites/default/files/content/The%20Guidelines/final_igthe_a3_poster_-_lr.pdf`,
				},
			],
		},
	];
	return (
		<Box>
			<Title
				className="low-risk-title"
				order={2}
				style={{
					color: "#191B5E",
					fontSize: variable.fontSizeXLarge,
					fontWeight: "750",
					lineHeight: "32px",
					marginBottom: variable.spacer5,
				}}
			>
				Australian CVD Risk Calculator - Resources
			</Title>
			<List mt={16}>{resource.map((i) => ListItem(i))}</List>
			{/* {props.firstNationsSpecificResources && <FirstNationsSpecificResources />} */}
		</Box>
	);
};
export default PrintResourceList;

function ListItem(payload: any) {
	return (
		payload.showStatus && (
			<>
				
					<List.Item 
						sx={{ textDecoration: "none", listStyleType: "none" }}
					>
						<Flex  direction={"column"} gap={"md"} mb={32}>
							<Title
								// sx={{
								//   color: "#191B5E",
								//   fontSize: "24px",
								//   fontWeight: 750,
								//   letterSpacing: "0.15px",
								//   lineHeight: "36px",
								// }}
								sx={{ fontSize: "24px" }}
								order={3}
								fw={750}
                
							>
								{payload.title}
							</Title>
							{payload.subResources.map((i: any) =>
								SubListItem(i)
							)}
						</Flex>
					</List.Item>
				
			</>
		)
	);
}

function SubListItem(payload: {
	qrCode: string;
	title: string;
	span: string;
	url: string;
	imageUrl: string;
}) {
	return (
		
			<Grid>
				<Grid.Col span={2}>
					<Image src={payload.imageUrl} />
				</Grid.Col>
				<Grid.Col span={10}>
					<Flex direction={"column"} gap={"sm"}>
						<Text fw={750} >
							{payload.title}
							<Text
								color="#191B5E"
								fw={500}
								sx={{ display: "inline" }}
							>
								{" "}
								- {payload.span}
							</Text>
						</Text>
						<Text color="#191B5E" fw={500}>
							{payload.url}
						</Text>
					</Flex>
				</Grid.Col>
			</Grid>
		
	);
}
