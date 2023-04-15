import {
  Grid,
  Container,
  createStyles,
  Title,
  BackgroundImage,
  Text,
  AspectRatio,
  Modal,
  Image,
} from "@mantine/core";
import variable from "../../../styles/theme/variables";
import { useDisclosure } from "@mantine/hooks";
import Tooltip from "../Tooltip";

const useStyles = createStyles((theme) => ({
  container: {
    "& .low-risk-title >div": {
      svg: {
        top: "4px",
      },
      ">svg": {
        top: "1px",
      },
    },
    "& .mantine-Container-root": {
      [variable.mobileDown]: {
      position: "relative",
      },
    },
    "& .mantine-HoverCard-dropdown": {
      [variable.mobileDown]: {
        maxWidth: "calc(100vw - 48px)",
        left: "24px !important",
      },
    },
  },
  item: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  itemSpan: {
    color: "",
    // fontWeight: variable.fontWeightBold,
  },
  itemImg: {
    position: "absolute",
    right: "10px",
    bottom: "0",
    transform: "translateX(20%) translateY(17.5%)",
  },
  lowerRiskList: {
    "& .mantine-Col-root, & .mantine-Grid-col": {
      maxWidth: "calc(33.333% - 12px)",
      margin: "6px",
      backgroundColor: "#191B5E",
      boxShadow: "0 4px 4px 0 rgb(0 0 0 / 2%), 0 4px 12px 0 rgb(0 0 0 / 8%)",
      borderRadius: "8px",
      padding: "0",
      "& .mantine-AspectRatio-root": {
        maxWidth: "none",
        height: "auto",
        "&>div": {
          backgroundPositionX: 0,
          backgroundPositionY: "85px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "inherit",
        },
      },
      [variable.mobileDown]: {
        maxWidth: "calc(50% - 12px)",
      },
      [variable.smDown]: {
        maxWidth: "calc(100% - 12px)",
        flexBasis: "100%",
      },
    },
  },
}));

interface propsInterface {
  result: number;
  showSmoke: boolean;
}

const Strap3 = (props: propsInterface) => {
  const { container, item, itemImg, lowerRiskList } = useStyles().classes;

  function ImageCard(span: string, index: number, image: string) {
    return (
      <Grid.Col sm={4} xs={6} key={index}>
        <AspectRatio ratio={72 / 40} m={"auto"} maw={300}>
          <BackgroundImage src="/assets/images/discussRiskResult/icons/card-device.svg" className={item}>
            <Text
              sx={(theme) => ({
                position: "absolute",
                left: "0.5em",
                top: "1em",
                "@media (max-width: 768px)": {
                  fontSize: variable.fontSizeSm,
                },
              })}
              style={{
                marginTop: variable.spacer2,
                marginLeft: variable.spacer2,
                marginRight: variable.spacer2,
                color: variable.white,
                fontFamily: variable.fontFamilySemiBold,
                fontWeight: 600,
                zIndex: 2,
              }}
            >
              {span}
            </Text>
            <img
              className={itemImg}
			        width={"30%"}
              src={`/assets/images/discussRiskResult/icons/${image}.svg`}
            />
          </BackgroundImage>
        </AspectRatio>
      </Grid.Col>
    );
  }

  return (
    <Container className={container} mt={variable.spacer10} pl={0} pr={0}>
      <Title
        className="low-risk-title"
        order={2}
        style={{
          color: "#191B5E",
          fontSize: "28px",
          fontFamily: variable.fontFamilyBold,
          fontWeight: "bold",
          lineHeight: "36px",
          marginBottom: variable.spacer5,
          paddingRight: "20px",
        }}
      >
        How to lower your risk
        <Tooltip
          cardDropdownContent={
            <Text>
              <Text>
                Note: Risk factors that should be managed, regardless of Aus CVD
                risk calculator results include:
              </Text>
              <ul>
                <li>
                  severe hyperlipidaemia (serum total cholesterol {">"}7.5
                mmol/L or LDL cholesterol ≥5 mmol/L)
                </li>
                <li>
                  very high blood pressure (systolic BP ≥160 mmHg; diastolic BP
                ≥100 mmHg).
                </li>
              </ul>
              <Text>
                Managing CVD risk should always involve encouraging, supporting
                and advising appropriate healthy lifestyle and behaviours, with
                or without blood pressure-lowering and/or lipid-modifying
                pharmacotherapy. Although the pharmacotherapy interventions
                focused on in this guideline are for blood pressure-lowering and
                lipid modification, a holistic approach to address clinical
                factors that contribute to cardiovascular disease is necessary.
                This includes good glycaemic control in people with diabetes,
                good management of renal disease and addressing other clinical
                risk factors which may contribute to CVD risk.
              </Text>
            </Text>
          }
          cardButtonLink=""
        />
      </Title>
      <Grid gutter={"xl"} className={lowerRiskList} m={-6}>
        {props.result > 3
          ? Array(
              { span: "Quit smoking", image: "icon-badge.smoking.xl" },
              {
                span: "Follow a healthy eating pattern",
                image: "icon-badge.nutrition.xl",
              },
              {
                span: "Incorporate regular physical activity into your routine",
                image: "icon-badge.physical-activity.xl",
              },
              {
                span: "Achieve and maintain a healthy weight",
                image: "icon-badge.weight.xl",
              },
              {
                span: "Limit your intake of alcohol",
                image: "icon-badge.alcohol.xl",
              },
              {
                span: "Blood pressure-lowering or lipid-modifying medicines may be recommended",
                image: "icon-badge.medicine.xl",
              }
            )
              .map((i, index) => {
                return ImageCard(i.span, index, i.image);
              })
              .slice(props.showSmoke ? 0 : 1)
          : Array(
              { span: "Quit smoking", image: "icon-badge.smoking.xl" },
              {
                span: "Follow a healthy eating pattern",
                image: "icon-badge.nutrition.xl",
              },
              {
                span: "Incorporate regular physical activity into your routine",
                image: "icon-badge.physical-activity.xl",
              },
              {
                span: "Achieve and maintain a healthy weight",
                image: "icon-badge.weight.xl",
              },
              {
                span: "Limit your intake of alcohol",
                image: "icon-badge.medicine.xl",
              }
            )
              .map((i, index) => {
                return ImageCard(i.span, index, i.image);
              })
              .slice(props.showSmoke ? 0 : 1)}
      </Grid>
    </Container>
  );
};

export default Strap3;
