import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { YStack } from "tamagui";
import { Text } from "@/app/components/Text";
import { AuthStackParamList } from "@/app/types/types";
import { useTheme } from "@tamagui/core";
import UserLoginForm from "@/app/features/auth/components/UserLoginForm";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get(),
        justifyContent: "center",
        height: "100%",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <YStack px="$5">
          {/* Header */}
          <YStack mb="$8" mt="$4">
            <Text
              fontSize={30}
              fontWeight="700"
              mb="$3"
              lineHeight={35}
              width="100%"
              textAlign="left"
            >
              تسجيل الدخول
            </Text>
            <Text fontSize={16} width="100%" textAlign="left">
              أهلاً بعودتك! سجل الدخول للمتابعة
            </Text>
          </YStack>

          <UserLoginForm navigation={navigation} />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
