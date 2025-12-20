import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/user/CategoriesScreen";
import CategoryServicesScreen from "../screens/user/CategoryServicesScreen";

export type CategoriesStackParamList = {
  CategoriesList: undefined;
  CategoryServices: { categoryId: string };
};

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

export default function CategoriesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesList" component={CategoriesScreen} />

      <Stack.Screen
        name="CategoryServices"
        component={CategoryServicesScreen}
      />
    </Stack.Navigator>
  );
}
