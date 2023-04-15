import { createStyles, Global, MantineProvider } from "@mantine/core";
import mantineTheme from "../styles/theme/mantineTheme";
import Form from "../components/calculator/Form";
import EmailComponent from "../components/calculator/EmailComponent";
import { HomeProps } from "../types";
import Layout from "../components/Layout";
import { gql } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";
import client from "../pages/api/apolloClient";
import { QUERY_HEADER, QUERY_FOOTER } from "./api/gql";
import { useRouter } from "next/router";
import Banner from "../components/Banner";
import variable from "@/styles/theme/variables";

const useStyles = createStyles((theme) => ({
	title: {
		fontFamily: variable.fontFamilyPoppinMedium,
		fontSize: variable.fontSizeXXXLarge,
		color: variable.white,
		fontWeight: variable.fontWeightMedium,
		marginBottom: variable.spacer2,
		marginTop: variable.spacer4,

		[variable.lgDown]:{
			fontSize: variable.fontSizeXXLarge,
			textAlign: "center",
		},

		[variable.mdDown]: {
			fontSize: variable.fontSizeXLarge,
		}
	},
	subtitle: {
		color: variable.grayTable,
		"& strong": {
			color: variable.white,
			fontWeight: variable.fontWeightMedium,
		},

		[variable.lgDown]:{
			textAlign: "center",
		}
	},
}));

export default function Calculator({ data }: HomeProps) {
	const { classes } = useStyles();
	const router = useRouter();
	const hasQueryParams = Object.keys(router.query).length !== 0;

	return (
		<MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
			<Layout data={data}>
				<Banner>
					<h1 className={classes.title}>Australian CVD Risk Calculator</h1>
					<p className={classes.subtitle}>Australian CVD Risk Calculator is a risk assessment, communication & management tool for health care providers. To learn more about how this calculator works please refer to the <strong>Australian Guideline for assessing and managing cardiovascular disease risk</strong>.</p>
				</Banner>
				{!hasQueryParams ? <Form /> : <EmailComponent />}
			</Layout>
		</MantineProvider>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await client.query({
		query: gql`
            query GetData {
                ${QUERY_HEADER}
                ${QUERY_FOOTER}
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
