import { useFonts } from "expo-font";

export function useAppFonts() {
  const [loaded] = useFonts({
    "Cairo-ExtraLight": require("../../assets/fonts/Cairo-ExtraLight.ttf"),
    "Cairo-Light": require("../../assets/fonts/Cairo-Light.ttf"),
    "Cairo-Regular": require("../../assets/fonts/Cairo-Regular.ttf"),
    "Cairo-Medium": require("../../assets/fonts/Cairo-Medium.ttf"),
    "Cairo-SemiBold": require("../../assets/fonts/Cairo-SemiBold.ttf"),
    "Cairo-Bold": require("../../assets/fonts/Cairo-Bold.ttf"),
    "Cairo-ExtraBold": require("../../assets/fonts/Cairo-ExtraBold.ttf"),
    "Cairo-Black": require("../../assets/fonts/Cairo-Black.ttf"),
  });

  return loaded;
}
