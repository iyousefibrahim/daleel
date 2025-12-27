import { Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "tamagui";
import { cairoFont } from "../constants/tamagui.config";
import HomeScreen from "../screens/user/HomeScreen";
import Profile from "../screens/user/Profile";
import { type AuthenticatedNavigatorParamList } from "../types/types";
import TripsStackNavigator from "././TripsStackNavigator";
import CategoriesStackNavigator from "./CategoriesStackNavigator";

const Tab = createBottomTabNavigator<AuthenticatedNavigatorParamList>();

export default function AuthenticatedNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.background.get(),
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
          sceneStyle: {
            paddingEnd: 0,
            paddingStart: 0,
          },
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
        component={TripsStackNavigator}
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
