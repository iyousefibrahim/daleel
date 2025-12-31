import { createTamagui, TamaguiProvider } from "@tamagui/core";
import RootNavigator from "./navigation/RootNavigator";
import { I18nManager } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useAppFonts } from "./hooks/useAppFonts";
import { tamaguiConfig } from "./constants/tamagui.config";
import { PortalProvider } from "tamagui";

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
        <PortalProvider shouldAddRootHost>
          <RootNavigator />
          <Toast position="top" />
        </PortalProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
