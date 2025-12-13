import { Text } from "@/app/components/Text";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Text
        fontSize={"$9"}
        margin={"$4"}
        align="center"
        weight="light"
        padding={"$4"}
      >
        تسجيل الدخول
      </Text>
    </View>
  );
}
