import { createStyles, Text, Container, rem, Button } from "@mantine/core";
import { HomeProps } from "../types";
import Link from "next/link";
import variable from "../styles/theme/variables";

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: variable.spacer7,
    paddingBottom: variable.spacer7,
    backgroundColor: variable.blue,
    color: variable.white,
	"& .footer-logo": {
    marginTop: variable.spacer5,
    
		"& img": {
			width: "200px",
			marginRight: "30px",
			[variable.mdDown]: {
				marginBottom: "10px",
			}
		}
	}
  },

  logo: {
    width: "100px",
    display: "inline-block",
    marginRight: variable.spacer7,
    "& img": {
      width: "100%",
    },
  },
  row: {
    marginBottom: variable.spacer7,
  },
  inner: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    alignItems: "stretch",
    columnGap: variable.spacer2,

    [variable.lgDown]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "none",
    },

    [variable.mobileDown]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "none",
    }
  },

  groups: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: variable.spacer7,
    "&:last-child": {
      paddingBottom: 0,
    },
    [variable.lgUp]: {
      "&": {
        gridRowStart: 1,
        gridRowEnd: 3,
        paddingBottom: 0,
      },
      "&:nth-of-type(3)": {
        gridRowStart: 1,
        gridRowEnd: 2,
      },
      "&:nth-of-type(4)": {
        gridRowStart: 2,
        gridRowEnd: 3,
      },
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: "block",
    color: variable.white,
    fontSize: variable.fontSizeSmall,
    paddingTop: variable.spacer2,
    fontWeight: variable.fontWeightLight,
    fontFamily: variable.fontFamilyLight,
    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: variable.fontSizeBase,
    fontFamily: variable.fontFamily,
    color: variable.white,
	lineHeight: "17px",
  },

  afterFooter: {
    marginTop: variable.spacer5,
    paddingTop: variable.spacer5,
    borderTop: `1px solid ${variable.grayLight}`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
  buttonAlt: {
	fontFamily: variable.fontFamilySemiBold,
    backgroundColor: variable.red300,
	lineHeight: "19px",
	[variable.smDown]: {
		display: "block",
		width: "100%",
		marginTop: "30px",
	},

    "&:hover, :not([data-disabled]):hover": {
      backgroundColor: variable.red500,
    },
  },
  ackn: {
    p: {
      paddingTop: variable.spacer2,
      fontSize: variable.fontSizeSmall,
      color: variable.white,
      fontWeight: variable.fontWeightLight,
      lineHeight: "24px",
      letterSpacing: "0.25px",
      fontFamily: variable.fontFamilyLight,
    },
  },
  copyright: {
    fontSize: variable.fontSizeXSmall,
	fontFamily: variable.fontFamilyLight,
    color: variable.white,
    fontWeight: variable.fontWeightLight,
  },
}));

export default function FooterLinks({ data }: HomeProps) {
  const { classes } = useStyles();

  const copyItem = data.CopyrightEntry.redactor;
  const acknowledgeItem = data.AOCEntry;
  const initiativeItem = data.InitiativeEntry;

  const filteredItems = data.navigationNodes.filter(
    (item) => item.navHandle === "footer"
  );

  //console.log(filteredItems);
  const items = filteredItems.map((nv) => {
    const menuItems = nv.children?.map((n) => (
      <Link key={n.id} href={n.nodeUri}>
        <Text className={classes.link}>{n.title}</Text>
      </Link>
    ));

    if (menuItems) {
      return (
        <div className={classes.groups} key={nv.title}>
          <Text className={classes.title}>{nv.title}</Text>
          {menuItems}
        </div>
      );
    }
  });

  return (
    <footer className={classes.footer}>
      <Container size={variable.breakpointXl} px={variable.spacer4}>
        <div className={classes.row}>
          <div className={classes.logo}>
            <a href="#">
              <img src="/assets/cmsImages/CVD-logo.png" alt="CVD Logo" />
            </a>
          </div>
          <Button
            component="a"
            href="/calculator"
            className={classes.buttonAlt}
          >
            Australian CVD Risk Calculator
          </Button>
        </div>

        <div className={classes.row}>
          <div className={classes.inner}>
            {items}
            <div className={classes.groups}>
              <Text className={classes.title}>{acknowledgeItem.title}</Text>
              <div
                className={classes.ackn}
                dangerouslySetInnerHTML={{
                  __html: acknowledgeItem.redactor,
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <Text className={classes.title} fw={500} ff={variable.fontFamilyMedium}>{initiativeItem.title}</Text>
          <div className="footer-logo">
            <img
              src="/assets/cmsImages/RACGP-lockup_endorsed-clinical-guideline_for screen.png"
              alt="RACGP Logo"
            />
            <img src="/assets/cmsImages/logo.ACDPA.webp" alt="ACDPA Logo" /><br/>
			
            <img
              src="/assets/cmsImages/logo.heart-foundation.svg"
              alt="heart foundation Logo"
            />
			
            <img
              src="/assets/cmsImages/logo.kidney-foundation.svg"
              alt="kidney Logo"
            />
            <img
              src="/assets/cmsImages/logo.diabetes-australia.svg"
              alt="diabetes Logo"
            />
            <img
              src="/assets/cmsImages/logo.stroke-foundation.svg"
              alt="stroke Logo"
            />
          </div>
        </div>

        <div className={classes.afterFooter}>
          <Text className={classes.copyright}>
            <div dangerouslySetInnerHTML={{ __html: copyItem }} />
          </Text>
        </div>
      </Container>
    </footer>
  );
}
