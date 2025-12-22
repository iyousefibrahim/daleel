import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { H2, YStack } from "tamagui";
import { AuthStackParamList } from "@/app/types/types";
import { useTheme } from "@tamagui/core";
import UserRegisterForm from "@/app/features/auth/components/UserRegisterForm";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen = ({ navigation }: Props) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ justifyContent: "center", flex: 1 }}
      >
        <YStack py={Platform.OS === "ios" ? "$0" : "$5"}>
          {/* Header */}
          <YStack pb="$5">
            <H2
              fontSize={30}
              fontWeight="700"
              lineHeight={45}
              width="100%"
              textAlign="left"
            >
              إنشاء حساب جديد
            </H2>
          </YStack>
          <UserRegisterForm navigation={navigation} />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
