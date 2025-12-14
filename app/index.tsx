import { TamaguiProvider } from "@tamagui/core";
import RootNavigator from "./navigation/RootNavigator";
import { useFonts } from "expo-font";
import { I18nManager } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "./constants/tamagui.config";
import Toast from "react-native-toast-message";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="light">
        <RootNavigator />
        <Toast position="top" />
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
