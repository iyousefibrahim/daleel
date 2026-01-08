import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useTheme, XStack } from "tamagui";

const Notifications = () => {
  const theme = useTheme();
  return (
    <XStack
      onPress={() => {
        Toast.show({
          type: "info",
          text1: "هذه الميزة قيد التطوير",
        });
        console.log("Notifications clicked");
      }}
    >
      <Ionicons
        name="notifications-outline"
        size={30}
        backgroundColor={theme.color1.get()}
        borderRadius={100}
        padding={10}
        color={theme.color9.get()}
      />
    </XStack>
  );
};

export default Notifications;
