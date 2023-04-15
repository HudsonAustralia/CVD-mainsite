import { MantineThemeOverride } from '@mantine/core';
import variable from "./variables";

const mantineTheme: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: variable.primaryColor,
  headings: {
    fontFamily: variable.fontFamily,
    fontWeight: variable.fontWeightLight,
    sizes: {
      h1: {
        fontSize: variable.fontSizeH1.toString(),
        lineHeight: "1.21428571",
      },
      h2: {
        fontSize: variable.fontSizeH2.toString(),
        lineHeight: "1.21153846",

      },
      h3: {
        fontSize: variable.fontSizeH3.toString(),
        lineHeight: "1.20833333",
      },
      h4: {
        fontSize: variable.fontSizeH4.toString(),
        lineHeight: variable.lineHeightLarge,
      },
      h5: {
        fontSize: variable.fontSizeH5.toString(),
        lineHeight: variable.lineHeightLarge,
      },
      h6: {
        fontSize: variable.fontSizeH6.toString(),
        lineHeight: variable.lineHeightLarge,
      },
    },
  },
  fontFamily: variable.fontFamily,
  fontSizes: {
    xs: variable.fontSizeXs.toString(),
    sm: variable.fontSizeSm.toString(),
    md: variable.fontSizeMd.toString(),
    lg: variable.fontSizeLg.toString(),
    xl: variable.fontSizeXl.toString(),
  },
  spacing: {
    xs: variable.spacingXs.toString(),
    sm: variable.spacingSm.toString(),
    md: variable.spacingMd.toString(),
    lg: variable.spacingLg.toString(),
    xl: variable.spacingXl.toString(),
  },
  breakpoints: {
    xs: variable.breakpointXs.toString(),
    sm: variable.breakpointSm.toString(),
    md: variable.breakpointMd.toString(),
    lg: variable.breakpointLg.toString(),
    xl: variable.breakpointXl.toString(),
  },
  other: {
    checkBoxScale: variable.checkBoxScale,
    checkBoxLabelLeft: variable.checkBoxLabelLeft
  },
  globalStyles: (theme) => ({
    //print css
    // ['@meida print']:{
    //   'print-hide': {
    //     display: 'none'
    //   },
    //   'mantine-Modal-inner':{
    //     display: 'none'
    //   }
    // },
    body: {
      '.mantine-Checkbox-label': {
        paddingLeft: `${variable.lablePaddingLeft}px`
      },
      '.mantine-Checkbox-inner': {
        transform: `scale(${variable.scaleNum})`,
        transformOrigin: 'left'
      },
      '.mantine-Radio-label': {
        paddingLeft: `${variable.lablePaddingLeft}px`
      },
      '.mantine-Radio-inner': {
        transform: `scale(${variable.scaleNum})`,
        transformOrigin: 'left'
      },
      '.mantine-Checkbox-root, .mantine-Radio-root': {
        '& .mantine-Checkbox-input:checked, & .mantine-Radio-radio:checked': {
          backgroundColor: variable.customRed,
          borderColor: variable.customRed,
        }
      },
      '.mantine-Tooltip-tooltip': {
        padding: '20px',
        boxShadow: "0 4px 12px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.02)",
        backgroundColor: variable.white,
        color: variable.black,
        letterSpacing: "0.15px",
        fontSize: variable.fontSizeBase,
      },
      '.horizontal': {
        // zIndex: 1,
        display: "flex",
        alignItems: "flex-start",
        [variable.mobileDown]: {
          flexDirection: "column",
        },
        ".horizontal-center": {
          flex: 1,
        },
        '.horizontal-right': {
          width: "60%",
          [variable.mobileDown]: {
            width: "100%",
          },
          '& .mantine-Input-wrapper': {
            '& .mantine-Input-invalid + .mantine-Input-rightSection': {
              color: "#fa5252",
            }
          },
          '&.or-type': {
            [variable.smDown]: {
              flexDirection: "column",
            },
            '& .mantine-Chip-root': {
              '& .mantine-Chip-label': {
                [variable.smDown]: {
                  width: "100%",
                  textAlign: "center",
                },
                '&[data-disabled]': {
                  border: "1px solid #CFD8DB",
                  backgroundColor: "#EDEFF1",
                },
              }
            }
          },
        },
        '.mantine-InputWrapper-root': {
          marginTop: 0,
        },
        '.mantine-Input-disabled': {
          border: "1px solid #CFD8DB",
          backgroundColor: variable.white,
          opacity: 1,
        }
      },
      "& .mantine-Button-root": {
        "&:hover, &:focus, &:active": {
         
        },
      },
    },
    //email & print modal
    '.mantine-Group-root.mantine-jl3r5k': {
      paddingTop: 0
    },
    '.mantine-Textarea-root label': {
      fontSize: variable.fontSizeMd,
      fontWeight: 500
    },
    '.mantine-Chip-checkIcon path':{
      fill: `white`
    },
    '.mantine-Checkbox-icon path':{
      fill: `white`
    }
  })

};

export default mantineTheme;