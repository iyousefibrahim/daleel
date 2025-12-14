import { View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type AuthStackParamList } from "@/app/types/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/app/components/Text";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      {/* Your login form here */}

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>إنشاء حساب جديد</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
