import { Button, Input, Paragraph, XStack, YStack } from "tamagui";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { loginSchema } from "../validators/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import z from "zod";
import { Entypo } from "@expo/vector-icons";

import { AuthStackParamList } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GoogleButton from "./GoogleButton";
import AppleButton from "./AppleButton";
import Divider from "./Divider";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const UserLoginForm = ({ navigation }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
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

    if (isValid) {
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
    }
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
    <YStack gap="$4">
      {/* Email */}
      <YStack gap="$1">
        <Paragraph
          textAlign="left"
          fontSize={16}
          lineHeight={25}
          fontWeight="600"
        >
          البريد الإلكتروني
        </Paragraph>
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
          <Paragraph textAlign="right" fontSize={12} color="red">
            {errors.email.message}
          </Paragraph>
        )}
      </YStack>

      {/* Password */}
      <YStack gap="$1" position="relative">
        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph textAlign="left" fontSize={16} fontWeight="600">
            كلمة المرور
          </Paragraph>
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
          <Paragraph textAlign="right" color="red" fontSize={12}>
            {errors.password.message}
          </Paragraph>
        )}
      </YStack>

      {/* Forgot Password */}
      <XStack justifyContent="flex-end">
        <Button
          onPress={handleForgotPassword}
          unstyled
          pressStyle={{ opacity: 0.7 }}
        >
          <Paragraph fontSize={14} fontWeight="600" color="$primary500">
            نسيت كلمة المرور؟
          </Paragraph>
        </Button>
      </XStack>

      {/* Login Button */}
      <Button
        onPress={handleLogin}
        disabled={isLoading}
        bg="$color9"
        borderRadius="$4"
        height="$12"
        pressStyle={{ bg: "$primary700", scale: 0.98 }}
        disabledStyle={{ bg: "$primary200", opacity: 0.6 }}
      >
        <Paragraph color="white" fontWeight="600" pointerEvents="none">
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Paragraph>
      </Button>

      {/* Divider */}
      <Divider title="أو" />

      <GoogleButton
        onPress={handleGoogleLogin}
        title="تسجيل الدخول باستخدام Google"
      />

      {/* Apple Button iOS */}
      <AppleButton
        onPress={handleAppleLogin}
        title="تسجيل الدخول باستخدام Apple"
      />

      {/* Register Link */}
      <XStack gap="$1" alignItems="center" justifyContent="center">
        <Paragraph fontSize={14}>ليس لديك حساب؟</Paragraph>
        <Button
          onPress={() => navigation.navigate("Register")}
          unstyled
          pressStyle={{ opacity: 0.7 }}
        >
          <Paragraph fontSize={14} fontWeight="700">
            إنشاء حساب
          </Paragraph>
        </Button>
      </XStack>
    </YStack>
  );
};

export default UserLoginForm;
