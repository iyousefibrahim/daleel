import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Programmer from "../screens/user/ProgrammerScreen";
import { useTheme } from "tamagui";
import ProfileScreen from "../screens/user/ProfileScreen";

export type ProfileStackParamList = {
  Profile: undefined;
  Programmer: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        contentStyle: {
          backgroundColor: theme.background.get(),
        },
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Programmer" component={Programmer} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
