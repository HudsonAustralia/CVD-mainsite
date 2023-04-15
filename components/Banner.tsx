import { createStyles, Container } from "@mantine/core";
import { HomeProps } from "../types";
import variable from "../styles/theme/variables";

interface BannerProps {
	parentTitle: string;
	heroTitle: string;
}

const useStyles = createStyles((theme) => ({
	hero: {
		backgroundColor: variable.blue,
		display: "relative",
		height: "240px",
	},

	left: {
		position: "absolute",
		top: 0,
		left: variable.spacer4,
	},
	right: {
		position: "absolute",
		top: 0,
		right: variable.spacer4,
	},
	wrapper: {
		position: "relative",
		paddingTop: variable.spacer13,
		paddingBottom: variable.spacer13,
		height: "240px",
		display: "flex",
		alignItems: "center",
	},
	inner: {
		maxWidth: variable.breakpointAlt,
		marginLeft: "160px",
		zIndex: 99,

		[variable.lgDown]: {
			margin: "0 auto",
		},

		"&::before": {
			content:
				"url('/assets/cmsImages/banner.left.svg')",
			position: "absolute",
			top: 0,
			left: 0,
		},

		"&::after": {
			content:
				"url('/assets/cmsImages/banner.right.svg')",
			position: "absolute",
			top: 0,
			right: 0,
		},
	},
}));

export default function Banner({ children }: {children?: React.ReactNode}) {
	const { classes } = useStyles();

	return (
		<section className={classes.hero}>
			<Container
				className={classes.wrapper}
				size={variable.breakpointXl}
				px={variable.spacer4}
			>
                
                <div className={classes.inner}>
                    {children}
				</div>
				
			</Container>
		</section>
	);
}
