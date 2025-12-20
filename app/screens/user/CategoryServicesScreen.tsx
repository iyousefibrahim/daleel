import { YStack, Text, ScrollView } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const CategoryServicesScreen = () => {
  const route = useRoute();
  const { categoryId } = route.params as { categoryId: string };
  return (
    <SafeAreaView>
      <ScrollView>
        <YStack flex={1} pt="$4" alignItems="center" justifyContent="center">
          <Text>Category Services</Text>
          <Text>{categoryId}</Text>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryServicesScreen;
