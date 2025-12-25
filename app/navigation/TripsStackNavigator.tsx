import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "tamagui";
import MyTripsScreen from "../screens/user/MyTripsScreen";
import TripDetailsScreen from "../screens/user/TripDetailsScreen";

export type TripsStackParamList = {
  MyTripsList: undefined;
  TripDetails: { tripId: string };
};

const Stack = createNativeStackNavigator<TripsStackParamList>();

export default function TripsStackNavigator() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        contentStyle: { backgroundColor: theme.background.get() },
      }}
    >
      <Stack.Screen name="MyTripsList" component={MyTripsScreen} />

      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
    </Stack.Navigator>
  );
}
