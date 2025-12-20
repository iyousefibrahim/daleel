import { ScrollView, XStack, YStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeWelcome from "@/app/components/HomeWelcome";
import Notifications from "@/app/components/Notifications";
import Search from "@/app/components/Search";
import CurrentTasks from "@/app/components/CurrentTasks";
import { useTheme } from "tamagui";
import DiscoverNewTrips from "@/app/features/categories/components/DiscoverNewTrips";

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.background.get() }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="on-drag"
      >
        {/* Header */}
        <XStack pb={"$4"} alignItems="center">
          <HomeWelcome />
          <Notifications />
        </XStack>

        <Search />
        <CurrentTasks />

        {/* Divider */}
        <XStack gap="$4" alignItems="center">
          <YStack f={1} h={1} bg="$gray300" />
          <YStack f={1} h={1} bg="$gray300" />
        </XStack>

        <DiscoverNewTrips />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
