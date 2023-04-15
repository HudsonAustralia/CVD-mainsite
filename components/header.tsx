import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Menu,
  NavLink,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import ArrowToBottom from "../public/assets/cmsImages/arrow-alt-to-bottom.svg";
import { NavProps } from "../types";
import Link from "next/link";
import variable from "../styles/theme/variables";
import { LineHeight } from "tabler-icons-react";
import { url } from "inspector";

const useStyles = createStyles((theme) => ({
  "body .mantine-Menu-item": {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  noBorder: {
    border: "none",
  },
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    fontFamily: variable.fontFamilyMedium,
    fontSize: variable.fontSizeBase,
    color: variable.blue,
    "&:hover": {
      "& svg": {
        color: "red",
      },
    },

    "& svg": {
      color: variable.blue,
    },
    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      color: variable.red300,
    }),
  },

  subLink: {
    width: "100%",
    padding: variable.spacer4,
    borderRadius: theme.radius.md,
    color: variable.blue,
    fontFamily: variable.fontFamily,
    fontWeight: variable.fontWeightRegular,

    ...theme.fn.hover({
      color: variable.red300,
      backgroundColor: "unset",
    }),

    "&:active": theme.activeStyles,
  },

  logo: {
    width: "100px",
    marginRight: "25px",
    "& img": {
      width: "100%",
    },
  },

  hiddenMobile: {
    marginRight: "25px",
    "& a": {
      height: "auto",
    },
    "& span": {
      marginRight: 0,
    },
    "@media(max-width: 1351px)": {
      display: "none",
    },
    "&:last-of-type": {
      marginRight: 0,
      marginLeft: "60px",
      "& a": {
        width: "253px",
        height: "42px",
        justifyContent: "center",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "rgba(182,198,207,.12)",
          color: variable.blue,
        },
      },
      "& span": {
        fontFamily: variable.fontFamilySemiBold,
        fontWeight: variable.fontWeightSemiBold,
        lineHeight: "19px",
      },
    },
  },

  mobileDrawer: {
    display: "none",
  },

  hiddenDesktop: {
    "@media(min-width: 1351px)": {
      display: "none",
    },
    "& .mantine-Modal-header": {
      justifyContent: "right",
      "& .mantine-Modal-close": {
        color: variable.grey500,
        "& svg": {
          width: "2rem",
          height: "2rem",
        },
      },
      "@media(max-width: 1351px)": {
        position: "absolute",
        right: "20px",
        top: "20px",
      },
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },

  buttonAlt: {
    fontFamily: variable.fontFamilySemiBold,
    fontWeight: variable.fontWeightSemiBold,
    lineHeight: "19px",
    backgroundColor: variable.red300,
    "&:hover, :not([data-disabled]):hover": {
      backgroundColor: variable.red500,
    },
  },

}));

export default function HeaderMenu({ nav }: NavProps): JSX.Element {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const headerItems = nav.filter((item) => item.navHandle === "header");
  const pdfItems = nav.filter((item) => item.navHandle === "downloadpdf");

  const mainHeader = headerItems.map((nv) => {
    const menuItems = nv.children?.map((n) => (
      <Link key={n.id} href={n.nodeUri}>
        <Menu.Item className={classes.subLink}>{n.title}</Menu.Item>
      </Link>
    ));

    if (menuItems) {
      return (
        <Menu
          key={nv.id}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={nv.url}
              className={classes.link}
              aria-label={nv.navHandle}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{nv.title}</span>
                <IconChevronDown size="1.2rem" stroke={2.3} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown
            sx={{
              boxShadow:
                "0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.02)",
              border: "1px solid #EDEFF1",
            }}
          >
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={nv.id}
        href={nv.url}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {nv.title}
      </a>
    );
  });

  const pdfHeader = pdfItems.map((nv) => {
    const menuItems = nv.children?.map((n) => (
      <Link key={n.id} href={n.nodeUri} aria-label={nv.navHandle}>
        <Menu.Item className={classes.subLink}>{n.title}</Menu.Item>
      </Link>
    ));

    if (menuItems) {
      return (
        <Menu
          key={nv.id}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={nv.url}
              className={classes.link}
              aria-label={nv.navHandle}
              onClick={(event) => event.preventDefault()}
            >
              <Center
                sx={{
                  "& .arrow-alt-to-bottom": {
                    width: "16px",
                    height: "16px",
                    marginLeft: variable.spacer1,
                    fill: variable.red300,
                  },
                }}
              >
                <span className={classes.linkLabel}>{nv.title}</span>
                <ArrowToBottom className="arrow-alt-to-bottom" />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={nv.id}
        href={nv.url}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {nv.title}
      </a>
    );
  });

  const mainNavMobile = headerItems.map((nv) => {
    const subNav = nv.children?.map((n) => (
      <NavLink key={n.id} component="a" href={n.nodeUri} label={n.title} />
    ));

    if (subNav) {
      return (
        <NavLink key={nv.id} label={nv.title}>
          {subNav}
        </NavLink>
      );
    }

    return (
      <a
        key={nv.id}
        href={nv.url}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {nv.title}
      </a>
    );
  });

  const pdfNavMobile = pdfItems.map((nv) => {
    const subNav = nv.children?.map((n) => (
      <NavLink component="a" href={n.nodeUri} label={n.title} key={n.id} />
    ));

    if (subNav) {
      return (
        <NavLink key={nv.id} label={nv.title}>
          {subNav}
        </NavLink>
      );
    }

    return (
      <a
        key={nv.id}
        href={nv.url}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {nv.title}
      </a>
    );
  });

  return (
    <Container size={variable.breakpointXl} px={variable.spacer4}>
      <Header
        height={98}
        px="md"
        className={classes.noBorder}
        sx={{
          "@media(max-width: 1351px)": {
            height: "64px",
            maxHeight: "64px",
          },
        }}
      >
        <Group
          position="apart"
          sx={{
            height: "100%",
            
            "@media(max-width: 1351px)": {
              justifyContent: "space-between",
            },
          }}
        >
          <Group className={classes.logo}>
            <a href="#">
              <img src="/assets/cmsImages/CVD-logo.png" alt="CVD Logo" />
            </a>
          </Group>
          <Group
            className={classes.hiddenMobile}
            sx={{
              "& a": {
                height: "42px ",
              },
            }}
          >
            <Button
              component="a"
              href="/calculator"
              className={classes.buttonAlt}
            >
              Australian CVD Risk Calculator
            </Button>
          </Group>
          <Group
            sx={{ height: "100%", gap: "25px" }}
            spacing={variable.spacer4}
            className={classes.hiddenMobile}
          >
            {mainHeader}
          </Group>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            {pdfHeader}
          </Group>
          <Burger
            size={17}
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Group className={classes.logo} sx={{ margin: "14px 0 14px 16px" }}>
            <a href="#">
              <img src="/assets/cmsImages/CVD-logo.png" alt="CVD Logo" />
            </a>
          </Group>
          <Divider
            my="sm"
            color={
              theme.colorScheme === "dark"
                ? "rgba(69,89,100,0.16)"
                : "rgba(69,89,100,0.16)"
            }
          />

          <Group
            sx={{
              height: "100%",
              padding: "25px 16px 2px 16px",
              "& .mantine-NavLink-root": {
                marginBottom: "15px",
              },
              "& .mantine-NavLink-label": {
                fontSize: variable.fontSizeBase,
                fontFamily: variable.fontFamilyMedium,
                fontWeight: variable.fontWeightMedium,
                color: "#191B5E",
                LineHeight: "25px",
              },
              "& .mantine-NavLink-body": {
                flex: "inherit",
              },
              "& .mantine-NavLink-rightSection": {
                transform: "rotate(90deg)",
                "& svg": {
                  width: "20px",
                  height: "20px",
                },
              },
              "& .mantine-UnstyledButton-root": {
                "&:hover, &:focus, &:active": {
                  backgroundColor: "transparent",
                },
                "&[data-expanded='true']": {
                  "& .mantine-NavLink-label": {
                    color: variable.red300,
                  },
                  "& .mantine-NavLink-rightSection": {
                    "& svg": {
                      color: variable.red300,
                      transform: "rotate(90deg) !important",
                    },
                  },
                },
              },
              "& .mantine-NavLink-children": {
                paddingBottom: variable.spacer3,
                "& .mantine-NavLink-label": {
                  fontFamily: variable.fontFamily,
                  fontWeight: variable.fontWeightRegular,
                  fontSize: variable.fontSizeSm,
                  lineHeight: "20px",
                },
              },
            }}
            spacing={0}
          >
            {mainNavMobile}
          </Group>
          <Divider
            my="sm"
            sx={{
              width: "calc(100% - 32px)",
              margin: "auto",
            }}
            color={
              theme.colorScheme === "dark"
                ? "rgba(69,89,100,0.16)"
                : "rgba(69,89,100,0.16)"
            }
          />
          <Group
            sx={{
              height: "100%",
              padding: "25px 20px 20px 16px",
              justifyContent: "center",
              "& .mantine-NavLink-label": {
                fontSize: variable.fontSizeBase,
                fontFamily: variable.fontFamilyMedium,
                fontWeight: variable.fontWeightMedium,
                color: "#191B5E",
                LineHeight: "25px",
                textAlign: "center",
              },
              "& .mantine-NavLink-body": {
                flex: "inherit",
              },
              "& .mantine-NavLink-rightSection": {
                "&:before": {
                  content: `''`,
                  width: "17px",
                  height: "17px",
                  marginLeft: "2px",
                  background: "url('/assets/cmsImages/arrow-alt-to-bottom.svg')",
                  backgroundRepeat: "no-repeat",
                },
                "& svg": {
                  display: "none",
                },
              },
              "& .mantine-UnstyledButton-root": {
                justifyContent: "center",
                "&:hover, &:focus, &:active": {
                  backgroundColor: "transparent",
                },
                "&[data-expanded='true']": {
                  "& .mantine-NavLink-label": {
                    color: variable.red300,
                  },
                  "& .mantine-NavLink-rightSection": {
                    transform: "rotate(0deg)",
                  },
                },
              },
              "& .mantine-NavLink-children": {
                paddingBottom: variable.spacer3,
                "& .mantine-NavLink-label": {
                  fontFamily: variable.fontFamily,
                  fontWeight: variable.fontWeightRegular,
                  fontSize: variable.fontSizeSm,
                  lineHeight: "20px",
                },
              },
            }}
            spacing={0}
          >
            {pdfNavMobile}
          </Group>

          <Group
            position="center"
            grow
            pb="xl"
            px="md"
            sx={{ padding: "0px 20px 20px 16px" }}
          >
            <Button
              component="a"
              href="/calculator"
              className={classes.buttonAlt}
            >
              Australian CVD Risk Calculator
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Container>
  );
}