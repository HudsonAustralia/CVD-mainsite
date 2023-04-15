import { createStyles, Text, HoverCard, Button, Checkbox } from "@mantine/core";
import variable from "../../styles/theme/variables";
import SVG from "../svg";

interface StyledLinkProps {
  labelName?: string;
  cardDropdownContent?: string | React.ReactNode;
  cardButtonLink?: string;
  checkboxClass?: string;
}

export interface IComponentClassNames {
  checkbox: string;
}

export default function CustomCheckbox({
  labelName,
  cardDropdownContent,
  cardButtonLink,
}: StyledLinkProps) {
  const useStyles = createStyles({
    checkbox: {
      position: "relative",
      "& .mantine-Text-root": {
        color: "#546E7A",
        letterSpacing: "0.15px",
        lineHeight: "20px",
        fontWeight: variable.fontWeightRegular,
      },
      "& .mantine-InputWrapper-required": {
        color: "#FF0000",
      },
      "& .circle-question": {
        fill: "#546e7a",
        marginLeft: "4px",
        verticalAlign: "middle",
      },
      "& .mantine-InputWrapper-description": {
        color: "#546E7A",
        fontSize: variable.fontSizeSmall,
        letterSpacing: "0.25px",
        lineHeight: "20px",
      },
      "& .dropdownTop": {
        paddingBottom: variable.spacer2,
        borderBottom: "1px solid rgba(69,89,100,0.16)",
        "&::before": {
          content: `''`,
          display: "table",
        },
        "&::after": {
          content: `''`,
          display: "table",
          clear: "both",
        },
        "& .dropdownTopLeft": {
          float: "left",
          color: "#79909C",
          "& svg": {
            marginRight: variable.spacer1,
          },
          "& span": {
            fontFamily: variable.fontFamilyMedium,
            color: variable.black,
            fontSize: variable.fontSizeSmall,
            fontWeight: variable.fontWeightMedium,
            letterSpacing: "0.1px",
            lineHeight: "20px",
          },
        },
        "& .dropdownTopRight": {
          float: "right",
          "& a": {
            minWidth: "182px",
            height: "30px",
            color: "#191B5E",
            backgroundColor: "rgba(182,198,207,0.4)",
            borderradius: "2px",
            fontSize: variable.fontSizeXSmall,
            lineHeight: "14px",
          },
        },
      },
      "& .cardDropdownContent.cardDropdownContent": {
        marginTop: variable.spacer4,
        color: variable.grey600,
        fontFamily: variable.fontFamily,
        fontSize: variable.fontSizeMd,
        letterSpacing: "0.15px",
        lineHeight: "20px",
        "& .mantine-Text-root": {
          fontFamily: variable.fontFamily,
          fontWeight: variable.fontWeightRegular,
          color: variable.grey600,
        },
      },
      "& .mantine-HoverCard-dropdown": {
        [variable.mobileDown]: {
          maxWidth: "calc(100vw - 48px)",
          left: "0 !important",
          right: "24px !important",
        },
      },
      "& .dropdownInfoIcon": {
        marginRight: "5px",
        fill: "#79909C",
      },
      ".mantine-InputWrapper-label": {
        "&>svg": {
          position: "absolute",
          marginRight: "-20px",
          right: "-8px",
        },
        "& svg": {
          width: "20px",
          height: "20px",
          position: "relative",
          verticalAlign: "bottom",
          "& .cls-1": {
            fill: "rgba(182,198,207,0.4)",
          },
        },
        "&>svg:hover": {
          "& path": {
            fill: variable.red300,
          },
          "& .cls-1": {
            fill: "rgba(231,19,68,0.12)",
          },
        },
      },
      "& .mantine-Checkbox-root": {
        position: "absolute",
        top: "calc(50% - 8px)",
        right: "-16px",
        "& .mantine-Checkbox-input": {
          width: "16px",
          height: "16px",
        },
        "& .mantine-Checkbox-icon": {
          top: "-3px",
          left: "-3px",
        },
      },
    },
  });

  let { checkbox } = useStyles().classes;

  return (
    <div className={checkbox}>
      <Text
        component="label"
        className="mantine-InputWrapper-label"
        pr={20}
        sx={{ fontFamily: variable.fontFamily }}
      >
        {labelName}
        <HoverCard width={555} shadow="md" position="top-start">
          {cardDropdownContent && (
            <HoverCard.Target>
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g id="Duo">
                          <path
                            id="_50"
                            data-name="50"
                            className="cls-1"
                            d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,18.75a1.49,1.49,0,0,1-1.5-1.5,1.46,1.46,0,0,1,1.5-1.5,1.5,1.5,0,0,1,0,3Zm3.24-6.66-2.12,1.32v.09a1.12,1.12,0,0,1-2.24,0v-.75a1.14,1.14,0,0,1,.56-1l2.67-1.6a1,1,0,0,0,.51-.89,1.08,1.08,0,0,0-1.07-1H11.16a1,1,0,0,0-1,1,1.12,1.12,0,1,1-2.24,0A3.25,3.25,0,0,1,11.11,6h2.4a3.26,3.26,0,0,1,1.73,6.09Z"
                            fill="rgba(182,198,207,0.4)"
                          />
                          <path
                            id="_100"
                            data-name="100"
                            d="M12,15.75a1.49,1.49,0,0,0-1.51,1.5A1.46,1.46,0,0,0,12,18.75a1.49,1.49,0,0,0,1.51-1.5A1.52,1.52,0,0,0,12,15.75ZM13.58,6H11.17A3.21,3.21,0,0,0,7.88,9.28,1.17,1.17,0,0,0,9,10.41a1.15,1.15,0,0,0,1.13-1.13,1,1,0,0,1,1-1h2.41a1,1,0,0,1,1.06,1,.89.89,0,0,1-.46.85l-2.69,1.64a1.15,1.15,0,0,0-.56,1v.75a1.13,1.13,0,0,0,2.26,0v-.09l2.12-1.32a3.33,3.33,0,0,0,1.6-2.81A3.21,3.21,0,0,0,13.58,6Z"
                            fill="#546E7A"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
            </HoverCard.Target>
          )}
          {cardDropdownContent && (
            <HoverCard.Dropdown>
              <div className="dropdownTop">
                <div className="dropdownTopLeft">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <g id="Duo">
                          <path
                            id="_50"
                            data-name="50"
                            className="cls-1"
                            d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,18.75a1.49,1.49,0,0,1-1.5-1.5,1.46,1.46,0,0,1,1.5-1.5,1.5,1.5,0,0,1,0,3Zm3.24-6.66-2.12,1.32v.09a1.12,1.12,0,0,1-2.24,0v-.75a1.14,1.14,0,0,1,.56-1l2.67-1.6a1,1,0,0,0,.51-.89,1.08,1.08,0,0,0-1.07-1H11.16a1,1,0,0,0-1,1,1.12,1.12,0,1,1-2.24,0A3.25,3.25,0,0,1,11.11,6h2.4a3.26,3.26,0,0,1,1.73,6.09Z"
                            fill="rgba(182,198,207,0.4)"
                          />
                          <path
                            id="_100"
                            data-name="100"
                            d="M12,15.75a1.49,1.49,0,0,0-1.51,1.5A1.46,1.46,0,0,0,12,18.75a1.49,1.49,0,0,0,1.51-1.5A1.52,1.52,0,0,0,12,15.75ZM13.58,6H11.17A3.21,3.21,0,0,0,7.88,9.28,1.17,1.17,0,0,0,9,10.41a1.15,1.15,0,0,0,1.13-1.13,1,1,0,0,1,1-1h2.41a1,1,0,0,1,1.06,1,.89.89,0,0,1-.46.85l-2.69,1.64a1.15,1.15,0,0,0-.56,1v.75a1.13,1.13,0,0,0,2.26,0v-.09l2.12-1.32a3.33,3.33,0,0,0,1.6-2.81A3.21,3.21,0,0,0,13.58,6Z"
                            fill="#546E7A"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>Info</span>
                </div>
                {cardButtonLink && (
                  <div className="dropdownTopRight">
                    <Button component="a" target="_blank" href={cardButtonLink}>
                      See more guideline insights
                    </Button>
                  </div>
                )}
              </div>
              <Text
                size="sm"
                mt="md"
                className="cardDropdownContent"
                sx={{
                  "& ul": {
                    marginTop: variable.spacer1,
                    marginBottom: variable.spacer1,
                    paddingLeft: "20px",
                    listStyle: "disc",
                  },
                }}
              >
                {cardDropdownContent}
                <br />
              </Text>
            </HoverCard.Dropdown>
          )}
        </HoverCard>
      </Text>
      <Checkbox label="" value="" />
    </div>
  );
}
