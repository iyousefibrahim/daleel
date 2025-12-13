import { styled, GetProps } from "@tamagui/core";
import { Text as TamaguiText } from "@tamagui/core";

// Custom Text component using Cairo font from config
export const Text = styled(TamaguiText, {
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
        fontWeight: "$1", // 200 - Cairo-ExtraLight
      },
      light: {
        fontWeight: "$2", // 300 - Cairo-Light
      },
      normal: {
        fontWeight: "$3", // 400 - Cairo-Regular
      },
      medium: {
        fontWeight: "$4", // 500 - Cairo-Medium
      },
      semibold: {
        fontWeight: "$5", // 600 - Cairo-SemiBold
      },
      bold: {
        fontWeight: "$6", // 700 - Cairo-Bold
      },
      extrabold: {
        fontWeight: "$7", // 800 - Cairo-ExtraBold
      },
      black: {
        fontWeight: "$8", // 900 - Cairo-Black
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

    color: {
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
    color: "default",
  },
});

// Export type for TypeScript
export type TextProps = GetProps<typeof Text>;
