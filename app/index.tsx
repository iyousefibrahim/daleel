import { TamaguiProvider } from "@tamagui/core/";
import RootNavigator from "./navigation/RootNavigator";
import { useFonts } from "expo-font";
import config from "./constants/tamagui.config";

export default function Index() {
  const [loaded] = useFonts({
    "IBMPlexSansArabic-ExtraLight": require("../assets/fonts/IBMPlexSansArabic-ExtraLight.ttf"),
    "IBMPlexSansArabic-Light": require("../assets/fonts/IBMPlexSansArabic-Light.ttf"),
    "IBMPlexSansArabic-Regular": require("../assets/fonts/IBMPlexSansArabic-Regular.ttf"),
    "IBMPlexSansArabic-Medium": require("../assets/fonts/IBMPlexSansArabic-Medium.ttf"),
    "IBMPlexSansArabic-SemiBold": require("../assets/fonts/IBMPlexSansArabic-SemiBold.ttf"),
    "IBMPlexSansArabic-Bold": require("../assets/fonts/IBMPlexSansArabic-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <RootNavigator />
    </TamaguiProvider>
  );
}
