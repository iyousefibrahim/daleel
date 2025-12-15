import { ScrollView, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeWelcome from "@/app/components/HomeWelcome";
import Notifications from "@/app/components/Notifications";
import { Platform } from "react-native";
import Search from "@/app/features/auth/components/Search";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ backgroundColor: "$color7" }}>
        {/* Header */}
        <XStack pt={Platform.OS === "ios" ? "$0" : "$5"} pb={"$4"}>
          <HomeWelcome />
          <Notifications />
        </XStack>

        <Search />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
