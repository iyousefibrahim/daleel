import { createFont, createTamagui, createTokens } from "@tamagui/core";

const cairoFont = createFont({
  family: "Cairo-Regular",

  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 22,
    9: 30,
    10: 42,
  },

  lineHeight: {
    1: 17,
    2: 18,
    3: 19,
    4: 21,
    5: 24,
    6: 27,
    7: 30,
    8: 33,
    9: 45,
    10: 63,
  },

  weight: {
    1: "200",
    2: "300",
    3: "400",
    4: "500",
    5: "600",
    6: "700",
    7: "800",
    8: "900",
  },

  face: {
    "200": { normal: "Cairo-ExtraLight" },
    "300": { normal: "Cairo-Light" },
    "400": { normal: "Cairo-Regular" },
    "500": { normal: "Cairo-Medium" },
    "600": { normal: "Cairo-SemiBold" },
    "700": { normal: "Cairo-Bold" },
    "800": { normal: "Cairo-ExtraBold" },
    "900": { normal: "Cairo-Black" },
  },
});

// Define color palette based on the Daleel app design
const colors = {
  // Primary greens
  primary50: "#E8F5E9",
  primary100: "#C8E6C9",
  primary200: "#A5D6A7",
  primary300: "#81C784",
  primary400: "#66BB6A",
  primary500: "#4CAF50", // Main brand green
  primary600: "#43A047",
  primary700: "#388E3C",
  primary800: "#2E7D32",
  primary900: "#1B5E20",

  // Mint/Light greens (for backgrounds)
  mint50: "#F1F8F4",
  mint100: "#E0F2E9",
  mint200: "#C8E6D4",
  mint300: "#A8D5BA",
  mint400: "#7EC99F",

  // Neutrals
  white: "#FFFFFF",
  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#EEEEEE",
  gray300: "#E0E0E0",
  gray400: "#BDBDBD",
  gray500: "#9E9E9E",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",
  black: "#000000",

  // Semantic colors
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
  info: "#2196F3",

  // Accent colors from the design
  accent: "#00BCD4",

  // Status colors for upvotes/downvotes
  upvote: "#4CAF50",
  downvote: "#F44336",
};

const tokens = createTokens({
  color: colors,

  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    true: 16,
  },

  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    true: 16,
  },

  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    true: 12,
  },

  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
});

const lightTheme = {
  // Backgrounds
  background: colors.gray50,
  backgroundHover: colors.gray50,
  backgroundPress: colors.gray100,
  backgroundFocus: colors.gray100,
  backgroundStrong: colors.gray100,
  backgroundTransparent: "rgba(0,0,0,0)",

  // Primary surfaces
  color1: colors.mint50,
  color2: colors.mint100,
  color3: colors.mint200,
  color4: colors.mint300,
  color5: colors.primary100,
  color6: colors.primary200,
  color7: colors.primary300,
  color8: colors.primary400,
  color9: colors.primary500,
  color10: colors.primary600,
  color11: colors.primary700,
  color12: colors.primary800,

  // Text colors
  color: colors.gray900,
  colorHover: colors.gray800,
  colorPress: colors.gray700,
  colorFocus: colors.gray800,
  colorTransparent: "rgba(0,0,0,0)",

  // Border colors
  borderColor: colors.gray200,
  borderColorHover: colors.gray300,
  borderColorFocus: colors.primary500,
  borderColorPress: colors.primary600,

  // Shadows
  shadowColor: "rgba(0,0,0,0.1)",
  shadowColorHover: "rgba(0,0,0,0.15)",
  shadowColorPress: "rgba(0,0,0,0.2)",
  shadowColorFocus: "rgba(0,0,0,0.15)",

  // Brand colors
  primary: colors.primary500,
  primaryHover: colors.primary600,
  primaryPress: colors.primary700,
  primaryFocus: colors.primary600,

  secondary: colors.mint200,
  secondaryHover: colors.mint300,
  secondaryPress: colors.mint400,

  // Semantic colors
  success: colors.success,
  successBackground: "#E8F5E9",
  warning: colors.warning,
  warningBackground: "#FFF9C4",
  error: colors.error,
  errorBackground: "#FFEBEE",
  info: colors.info,
  infoBackground: "#E3F2FD",

  // Card colors
  card: colors.white,
  cardHover: colors.gray50,
  cardPress: colors.gray100,
  cardBorder: colors.gray200,

  // Input colors
  input: colors.white,
  inputBorder: colors.gray300,
  inputBorderHover: colors.gray400,
  inputBorderFocus: colors.primary500,

  // Placeholder
  placeholderColor: colors.gray400,
};

const darkTheme = {
  // Backgrounds
  background: colors.gray900,
  backgroundHover: colors.gray800,
  backgroundPress: colors.gray700,
  backgroundFocus: colors.gray800,
  backgroundStrong: colors.gray800,
  backgroundTransparent: "rgba(0,0,0,0)",

  // Primary surfaces (darker versions)
  color1: "#1A2E1F",
  color2: "#2A3E2F",
  color3: "#3A4E3F",
  color4: "#4A5E4F",
  color5: colors.primary900,
  color6: colors.primary800,
  color7: colors.primary700,
  color8: colors.primary600,
  color9: colors.primary500,
  color10: colors.primary400,
  color11: colors.primary300,
  color12: colors.primary200,

  // Text colors
  color: colors.gray100,
  colorHover: colors.gray200,
  colorPress: colors.gray300,
  colorFocus: colors.gray200,
  colorTransparent: "rgba(255,255,255,0)",

  // Border colors
  borderColor: colors.gray700,
  borderColorHover: colors.gray600,
  borderColorFocus: colors.primary500,
  borderColorPress: colors.primary600,

  // Shadows
  shadowColor: "rgba(0,0,0,0.3)",
  shadowColorHover: "rgba(0,0,0,0.4)",
  shadowColorPress: "rgba(0,0,0,0.5)",
  shadowColorFocus: "rgba(0,0,0,0.4)",

  // Brand colors
  primary: colors.primary400,
  primaryHover: colors.primary500,
  primaryPress: colors.primary600,
  primaryFocus: colors.primary500,

  secondary: colors.primary900,
  secondaryHover: colors.primary800,
  secondaryPress: colors.primary700,

  // Semantic colors
  success: colors.success,
  successBackground: "#1B5E20",
  warning: colors.warning,
  warningBackground: "#F57F17",
  error: colors.error,
  errorBackground: "#B71C1C",
  info: colors.info,
  infoBackground: "#0D47A1",

  // Card colors
  card: colors.gray800,
  cardHover: colors.gray700,
  cardPress: colors.gray600,
  cardBorder: colors.gray700,

  // Input colors
  input: colors.gray800,
  inputBorder: colors.gray600,
  inputBorderHover: colors.gray500,
  inputBorderFocus: colors.primary500,

  // Placeholder
  placeholderColor: colors.gray500,
};

const config = createTamagui({
  tokens,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  fonts: {
    heading: cairoFont,
    body: cairoFont,
    mono: cairoFont,
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  },
  shorthands: {
    bg: "backgroundColor",
    br: "borderRadius",
    px: "paddingHorizontal",
    py: "paddingVertical",
    f: "flex",
    w: "width",
    h: "height",
    m: "margin",
    mt: "marginTop",
    mb: "marginBottom",
    ml: "marginLeft",
    mr: "marginRight",
    p: "padding",
    pt: "paddingTop",
    pb: "paddingBottom",
    pl: "paddingLeft",
    pr: "paddingRight",
  } as const,
});

export type AppConfig = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AppConfig {}
}
export default config;

// Export individual theme objects for use in components
export { cairoFont, colors, darkTheme, lightTheme, tokens };
