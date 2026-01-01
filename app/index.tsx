import { TamaguiProvider } from "@tamagui/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { PortalProvider } from "tamagui";
import { tamaguiConfig } from "./constants/tamagui.config";
import { useAppFonts } from "./hooks/useAppFonts";
import RootNavigator from "./navigation/RootNavigator";

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
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <SafeAreaProvider>
          <PortalProvider shouldAddRootHost>
            <RootNavigator />
            <Toast position="top" />
          </PortalProvider>
        </SafeAreaProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
