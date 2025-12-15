import { useFonts } from "expo-font";

export function useAppFonts() {
  const [loaded] = useFonts({
    "IBMPlexSansArabic-ExtraLight": require("../../assets/fonts/IBMPlexSansArabic-ExtraLight.ttf"),
    "IBMPlexSansArabic-Light": require("../../assets/fonts/IBMPlexSansArabic-Light.ttf"),
    "IBMPlexSansArabic-Regular": require("../../assets/fonts/IBMPlexSansArabic-Regular.ttf"),
    "IBMPlexSansArabic-Medium": require("../../assets/fonts/IBMPlexSansArabic-Medium.ttf"),
    "IBMPlexSansArabic-SemiBold": require("../../assets/fonts/IBMPlexSansArabic-SemiBold.ttf"),
    "IBMPlexSansArabic-Bold": require("../../assets/fonts/IBMPlexSansArabic-Bold.ttf"),
  });

  return loaded;
}
