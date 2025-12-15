import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { YStack, XStack, Input, Button } from "tamagui";
import { Text } from "@/app/components/Text";
import { AuthStackParamList } from "@/app/types/types";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Entypo from "@expo/vector-icons/Entypo";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@tamagui/core";
import Toast from "react-native-toast-message";
import useAuth from "@/app/features/auth/hooks/useAuth";
import { loginSchema } from "@/app/features/auth/validators/authSchema";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const { loginWithPasswordMutation } = useAuth();
  const isLoading = loginWithPasswordMutation.isPending;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = handleSubmit((data) => {
    console.log("Login Form Submitted", data);

    loginWithPasswordMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "تم تسجيل الدخول بنجاح!",
            text2: "مرحباً بعودتك",
          });
          // Navigate to main app or home screen
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "حدث خطأ أثناء تسجيل الدخول";
          Toast.show({
            type: "error",
            text1: "فشل تسجيل الدخول",
            text2: errorMessage,
          });
        },
      }
    );
  });

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log("Google Login pressed");
    Toast.show({
      type: "info",
      text1: "قريباً",
      text2: "تسجيل الدخول باستخدام Google سيكون متاحاً قريباً",
    });
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple login logic
    console.log("Apple Login pressed");
    Toast.show({
      type: "info",
      text1: "قريباً",
      text2: "تسجيل الدخول باستخدام Apple سيكون متاحاً قريباً",
    });
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen or implement logic
    console.log("Forgot password pressed");
    Toast.show({
      type: "info",
      text1: "قريباً",
      text2: "إعادة تعيين كلمة المرور ستكون متاحة قريباً",
    });
  };

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

          {/* Form */}
          <YStack gap="$4">
            {/* Email */}
            <YStack gap="$2">
              <Text textAlign="left" fontSize={14} fontWeight="600">
                البريد الإلكتروني
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="example@email.com"
                    textAlign="right"
                    placeholderTextColor="$gray400"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    bg="$white"
                    color="black"
                    borderWidth={1.5}
                    borderColor="$gray300"
                    borderRadius="$4"
                    px="$4"
                    py="$2"
                    height="$12"
                    fontSize={16}
                    focusStyle={{ borderColor: "$primary500", borderWidth: 2 }}
                  />
                )}
              />
              {errors.email && (
                <Text textAlign="right" fontSize={12} color="red">
                  {errors.email.message}
                </Text>
              )}
            </YStack>

            {/* Password */}
            <YStack gap="$2" position="relative">
              <XStack justifyContent="space-between" alignItems="center">
                <Text textAlign="left" fontSize={14} fontWeight="600">
                  كلمة المرور
                </Text>
              </XStack>

              <YStack position="relative">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="أدخل كلمة المرور"
                      placeholderTextColor="$gray400"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      bg="$white"
                      color="black"
                      borderWidth={1.5}
                      borderColor="$gray300"
                      borderRadius="$4"
                      px="$4"
                      py="$2"
                      textAlign="right"
                      height="$12"
                      fontSize={16}
                      focusStyle={{
                        borderColor: "$primary500",
                        borderWidth: 2,
                      }}
                    />
                  )}
                />
                <Button
                  position="absolute"
                  right="$2"
                  top="45%"
                  y="-50%"
                  onPress={() => setShowPassword(!showPassword)}
                  bg="transparent"
                  borderWidth={0}
                  chromeless
                  pressStyle={{ bg: "transparent", opacity: 0.7 }}
                  zIndex={10}
                >
                  {showPassword ? (
                    <Entypo name="eye-with-line" size={20} color="black" />
                  ) : (
                    <Entypo name="eye" size={20} color="black" />
                  )}
                </Button>
              </YStack>

              {errors.password && (
                <Text textAlign="right" color="red" fontSize={12}>
                  {errors.password.message}
                </Text>
              )}
            </YStack>

            {/* Forgot Password */}
            <XStack justifyContent="flex-end">
              <Button
                onPress={handleForgotPassword}
                unstyled
                pressStyle={{ opacity: 0.7 }}
              >
                <Text fontSize={14} fontWeight="600" color="$primary500">
                  نسيت كلمة المرور؟
                </Text>
              </Button>
            </XStack>

            {/* Login Button */}
            <Button
              onPress={handleLogin}
              disabled={isLoading || !isValid}
              bg="$color9"
              borderRadius="$4"
              height="$12"
              pressStyle={{ bg: "$primary700", scale: 0.98 }}
              disabledStyle={{ bg: "$primary200", opacity: 0.6 }}
            >
              <Text color="white" fontWeight="600" pointerEvents="none">
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Text>
            </Button>

            {/* Divider */}
            <XStack gap="$4" alignItems="center">
              <YStack f={1} h={1} bg="$gray300" />
              <Text fontSize={14}>أو</Text>
              <YStack f={1} h={1} bg="$gray300" />
            </XStack>

            {/* Google Button Android */}
            {Platform.OS === "android" && (
              <Button
                onPress={handleGoogleLogin}
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
                <Text ml="$3" fontSize={16} fontWeight="600" color="black">
                  تسجيل باستخدام Google
                </Text>
                <AntDesign name="google" size={24} color="#DB4437" />
              </Button>
            )}

            {/* Apple Button iOS */}
            {Platform.OS === "ios" && (
              <Button
                onPress={handleAppleLogin}
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
                  تسجيل باستخدام Apple
                </Text>
                <FontAwesome
                  textAlign="left"
                  name="apple"
                  size={24}
                  color="white"
                />
              </Button>
            )}

            {/* Register Link */}
            <XStack gap="$1" alignItems="center" justifyContent="center">
              <Text fontSize={14}>ليس لديك حساب؟</Text>
              <Button
                onPress={() => navigation.navigate("Register")}
                unstyled
                pressStyle={{ opacity: 0.7 }}
              >
                <Text fontSize={14} fontWeight="700">
                  إنشاء حساب
                </Text>
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
