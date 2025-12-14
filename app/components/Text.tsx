import { styled, GetProps } from "@tamagui/core";
import { Text as TamaguiText } from "@tamagui/core";
import type { ColorTokens } from "@tamagui/core";

const StyledText = styled(TamaguiText, {
  name: "Text",
  fontFamily: "$body", 
  color: "$color",

  variants: {
    size: {
      xs: {
        fontSize: "$1", // 11px
        lineHeight: "$1", // 17px
      },
      sm: {
        fontSize: "$2", // 12px
        lineHeight: "$2", // 18px
      },
      md: {
        fontSize: "$4", // 14px
        lineHeight: "$4", // 21px
      },
      lg: {
        fontSize: "$6", // 18px
        lineHeight: "$6", // 27px
      },
      xl: {
        fontSize: "$8", // 22px
        lineHeight: "$8", // 33px
      },
      xxl: {
        fontSize: "$9", // 30px
        lineHeight: "$9", // 45px
      },
    },

    weight: {
      extralight: {
        fontWeight: "$1", // 200 
      },
      light: {
        fontWeight: "$2", // 300
      },
      normal: {
        fontWeight: "$3", // 400
      },
      medium: {
        fontWeight: "$4", // 500
      },
      semibold: {
        fontWeight: "$5", // 600 
      },
      bold: {
        fontWeight: "$6", // 700 
      },
      extrabold: {
        fontWeight: "$7", // 800 
      },
      black: {
        fontWeight: "$8", // 900
      },
    },

    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
      justify: {
        textAlign: "justify",
      },
    },

    colorVariant: {
      default: {
        color: "$color",
      },
      primary: {
        color: "$primary",
      },
      secondary: {
        color: "$gray600",
      },
      muted: {
        color: "$gray500",
      },
      success: {
        color: "$success",
      },
      error: {
        color: "$error",
      },
      warning: {
        color: "$warning",
      },
      info: {
        color: "$info",
      },
      white: {
        color: "$white",
      },
      black: {
        color: "$black",
      },
    },
  } as const,

  defaultVariants: {
    size: "md",
    weight: "normal",
    colorVariant: "default",
  },
});

type BaseTextProps = GetProps<typeof StyledText>;

export type TextProps = Omit<BaseTextProps, 'color'> & {
  color?: ColorTokens | string;
  colorVariant?: BaseTextProps['colorVariant'];
};

export const Text = StyledText as React.ComponentType<TextProps>;