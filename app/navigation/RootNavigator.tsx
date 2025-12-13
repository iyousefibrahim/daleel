import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import AuthenticatedNavigator from "./AuthenticatedNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // Temp
  const isLoggedIn = false;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={AuthenticatedNavigator} />
      )}
    </Stack.Navigator>
  );
}
