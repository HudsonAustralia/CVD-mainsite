import { Container, createStyles, Title, Flex, List } from "@mantine/core";
import variable from "../../../styles/theme/variables";
import { useDisclosure } from "@mantine/hooks";
import Tooltip from "../Tooltip";

const useStyles = createStyles((theme) => ({
  container: {
    "& .low-risk-title >div": {
      position: "relative",
      top: "-3px",
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
    right: "0",
    bottom: "0",
    transform: "translateX(55%) translateY(17.5%)",
  },
}));

interface propsInterface {
  result: number;
  showSmoke: boolean;
}

const Strap3 = (props: propsInterface) => {
  const { container, item, itemImg } = useStyles().classes;
  // console.log(props.showSmoke);
  return (
    <Container className={container} mt={0} pl={0}>
      <Title
        className="low-risk-title"
        order={2}
        style={{
          color: "#191B5E",
          fontSize: variable.fontSizeXLarge,
          fontWeight: "bold",
          lineHeight: "36px",
          marginBottom: variable.spacer5,
          paddingRight: "20px",
        }}
      >
        How to lower your risk
      </Title>
      <Flex
        gap="md"
        justify="center"
        align="flex-start"
        direction="column"
        wrap="wrap"
      >
        <List withPadding size={"lg"}>
          {props.result > 3
            ? Array(
                { span: "Quit smoking", image: "icon-badge.nutrition.xl" },
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
                  return <List.Item key={index}>{i.span}</List.Item>;
                })
                .slice(props.showSmoke ? 0 : 1)
            : Array(
                { span: "Quit smoking", image: "icon-badge.nutrition.xl" },
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
                  return <List.Item key={index}>{i.span}</List.Item>;
                })
                .slice(props.showSmoke ? 0 : 1)}
        </List>
      </Flex>
    </Container>
  );
};

export default Strap3;
