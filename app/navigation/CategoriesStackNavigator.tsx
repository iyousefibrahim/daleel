import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/user/CategoriesScreen";
import CategoryServicesScreen from "../screens/user/CategoryServicesScreen";
import { useTheme } from "tamagui";
import ServiceDetailsScreen from "../screens/user/ServiceDetailsScreen";

export type CategoriesStackParamList = {
  CategoriesList: undefined;
  CategoryServices: { categoryId: string };
  ServiceDetails: { serviceId: string };
};

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

export default function CategoriesStackNavigator() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        contentStyle: { backgroundColor: theme.background.get() },
      }}
    >
      <Stack.Screen name="CategoriesList" component={CategoriesScreen} />

      <Stack.Screen
        name="CategoryServices"
        component={CategoryServicesScreen}
      />

      <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
    </Stack.Navigator>
  );
}
