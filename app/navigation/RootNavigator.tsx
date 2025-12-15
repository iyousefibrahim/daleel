import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import useAuth from "../features/auth/hooks/useAuth";
import useAuthListener from "../features/auth/hooks/useAuthListener";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const ready = useAuthListener();
  const { userSession } = useAuth();

  if (!ready) return null; // Splash screen

  return (
    <Stack.Navigator
      key={userSession ? "user" : "guest"}
      screenOptions={{ headerShown: false }}
    >
      {userSession ? (
        <Stack.Screen name="Main" component={AuthenticatedNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
