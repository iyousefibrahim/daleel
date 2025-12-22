import { SafeAreaView } from "react-native-safe-area-context";
import { H3, ScrollView } from "tamagui";

const MyTripsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <H3 textAlign="left" lineHeight={40}>
          مشاويري
        </H3>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyTripsScreen;
