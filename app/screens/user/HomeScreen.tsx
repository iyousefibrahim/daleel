import HomeWelcome from "@/app/components/HomeWelcome";
import Notifications from "@/app/components/Notifications";
import Search from "@/app/components/Search";
import DiscoverNewTrips from "@/app/features/categories/components/DiscoverNewTrips";
import CurrentTrip from "@/app/features/trips/components/CurrentTrip";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, useTheme, XStack } from "tamagui";

import Loader from "@/app/components/Loader";
import useCategories from "@/app/features/categories/hooks/useCategories";
import useTrips from "@/app/features/trips/hooks/useTrips";

const HomeScreen = () => {
  const theme = useTheme();
  const { getCurrentUserTripQuery } = useTrips();
  const { getCategoriesQuery } = useCategories();

  const tripLoading = getCurrentUserTripQuery.isLoading;
  const categoriesLoading = getCategoriesQuery(5).isLoading;

  if (tripLoading || categoriesLoading) {
    return <Loader message="جاري التحميل..." />;
  }

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

        <Search placeholder="إكتب مشوارك, تجديد بطاقة, قيد عائلي" />
        <CurrentTrip />
        <DiscoverNewTrips />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
