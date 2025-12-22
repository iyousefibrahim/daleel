import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/user/HomeScreen";
import MyTripsScreen from "../screens/user/MyTripsScreen";
import Profile from "../screens/user/Profile";
import { Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "tamagui";
import { cairoFont } from "../constants/tamagui.config";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import { type AuthenticatedNavigatorParamList } from "../types/types";

const Tab = createBottomTabNavigator<AuthenticatedNavigatorParamList>();

export default function AuthenticatedNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.background.get(),
          paddingEnd: 10,
          paddingStart: 10,
        },
        tabBarStyle: {
          backgroundColor: theme.background.get(),
          height: 75,
        },
        tabBarLabelStyle: {
          fontFamily: cairoFont.family,
          fontSize: 14,
          textAlign: "center",
          fontWeight: "600",
        },
        tabBarIconStyle: {
          alignSelf: "center",
        },
        tabBarActiveTintColor: theme.primary500.get(),
        tabBarInactiveTintColor: theme.gray500.get(),
      }}
    >
      <Tab.Screen
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: "الخدمات",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
        name="Services"
        component={CategoriesStackNavigator}
      />
      <Tab.Screen
        options={{
          title: "مشاويري",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="bookmark" size={size} color={color} />
          ),
        }}
        name="MyTrips"
        component={MyTripsScreen}
      />
      <Tab.Screen
        options={{
          title: "الملف الشخصي",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
