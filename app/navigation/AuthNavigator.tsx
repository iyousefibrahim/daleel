import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { AuthStackParamList } from "../types/types";
import { useTheme } from "@tamagui/core";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: "simple_push",
        contentStyle: {
          backgroundColor: theme.background.get(),
          paddingEnd: 10,
          paddingStart: 10,
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
