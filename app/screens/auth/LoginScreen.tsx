import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { H2, YStack } from "tamagui";
import { AuthStackParamList } from "@/app/types/types";
import { useTheme } from "@tamagui/core";
import UserLoginForm from "@/app/features/auth/components/UserLoginForm";
import { Paragraph } from "tamagui";

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
        <YStack>
          {/* Header */}
          <YStack pb="$8">
            <H2
              fontSize={30}
              fontWeight="700"
              mb="$3"
              lineHeight={39}
              width="100%"
              textAlign="left"
            >
              تسجيل الدخول
            </H2>
            <Paragraph fontSize={16} width="100%" textAlign="left">
              أهلاً بعودتك! سجل الدخول للمتابعة
            </Paragraph>
          </YStack>

          <UserLoginForm navigation={navigation} />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
