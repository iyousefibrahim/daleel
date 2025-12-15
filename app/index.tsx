import { TamaguiProvider } from "@tamagui/core";
import RootNavigator from "./navigation/RootNavigator";
import { useFonts } from "expo-font";
import { I18nManager } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "./constants/tamagui.config";
import Toast from "react-native-toast-message";
import useAuthListener from "./features/auth/hooks/useAuthListener";
import { useAppFonts } from "./hooks/useAppFonts";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const queryClient = new QueryClient();

export default function Index() {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="light">
        <RootNavigator />
        <Toast position="top" />
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
