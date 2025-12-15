import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "tamagui";

const Notifications = () => {
  const theme = useTheme();
  return (
    <View>
      {/* notifications icons */}
      <Ionicons
        name="notifications-outline"
        size={30}
        backgroundColor={theme.color1.get()}
        borderRadius={100}
        padding={10}
        color={theme.color9.get()}
      />
      {/* bade one notification */}
    </View>
  );
};

export default Notifications;
