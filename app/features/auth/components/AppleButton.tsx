import { Platform } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "tamagui";
import { Text } from "@/app/components/Text";

const AppleButton = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => {
  return (
    Platform.OS === "ios" && (
      <Button
        onPress={onPress}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bg="$black"
        borderRadius="$4"
        height="$12"
        px="$4"
        textAlign="left"
        pressStyle={{ opacity: 0.8 }}
      >
        <Text
          textAlign="left"
          ml="$3"
          fontSize={16}
          fontWeight="600"
          color="white"
        >
          {title}
        </Text>
        <FontAwesome textAlign="left" name="apple" size={24} color="white" />
      </Button>
    )
  );
};

export default AppleButton;
