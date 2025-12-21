import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H2, ScrollView, YStack } from "tamagui";
import BackButton from "@/app/components/BackButton";

const ServiceDetailsScreen = () => {
  const route = useRoute();
  const { serviceId } = route.params as { serviceId: string };
  return (
    <SafeAreaView>
      <ScrollView>
        <BackButton />
        <H2>تفاصيل الخدمة</H2>
        <YStack p="$5" gap="$3" bg="$background">
          <H2>{serviceId}</H2>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceDetailsScreen;
