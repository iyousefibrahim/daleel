import { Platform } from "react-native";
import React from "react";
import { Button, Paragraph } from "tamagui";
import { AntDesign } from "@expo/vector-icons";

const GoogleButton = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => {
  return (
    Platform.OS === "android" && (
      <Button
        onPress={onPress}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bg="$white"
        borderWidth={1.5}
        borderColor="$gray300"
        borderRadius="$4"
        height="$12"
        px="$4"
        pressStyle={{ opacity: 0.8 }}
      >
        <Paragraph ml="$3" fontSize={16} fontWeight="600" color="black">
          {title}
        </Paragraph>
        <AntDesign name="google" size={24} color="#DB4437" />
      </Button>
    )
  );
};

export default GoogleButton;
