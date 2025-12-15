import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { YStack } from "tamagui";
import { Text } from "@/app/components/Text";
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
      >
        <YStack px="$5" py={Platform.OS === "ios" ? "$0" : "$5"}>
          {/* Header */}
          <YStack mb="$8">
            <Text
              fontSize={30}
              fontWeight="700"
              mb="$3"
              lineHeight={35}
              width="100%"
              textAlign="left"
            >
              إنشاء حساب جديد
            </Text>
            <Text fontSize={16} width="100%" textAlign="left">
              أدخل بياناتك للبدء
            </Text>
          </YStack>
          <UserRegisterForm navigation={navigation} />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
