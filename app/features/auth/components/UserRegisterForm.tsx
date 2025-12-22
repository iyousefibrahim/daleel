import { Button, Input, XStack, YStack, Paragraph } from "tamagui";
import AppleButton from "./AppleButton";
import GoogleButton from "./GoogleButton";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { registerSchema } from "../validators/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Toast from "react-native-toast-message";
import { AuthStackParamList } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import Divider from "./Divider";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const UserRegisterForm = ({ navigation }: Props) => {
  const { registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = registerMutation.isPending;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = handleSubmit((data) => {
    console.log("Form Submitted", data);

    if (isValid) {
      registerMutation.mutate(
        {
          email: data.email,
          password: data.password,
          username: data.username,
          full_name: data.first_name + " " + data.last_name,
        },
        {
          onSuccess: () => {
            console.log("success", registerMutation.data);
            Toast.show({
              type: "success",
              text1: "تم إنشاء الحساب بنجاح!",
              text2: "مرحباً بك! يمكنك الآن تسجيل الدخول",
            });
            navigation.navigate("Login");
          },
          onError: (error: any) => {
            console.log("error", error);
            const errorMessage =
              error?.response?.data?.message ||
              error?.message ||
              "حدث خطأ أثناء إنشاء الحساب";
            Toast.show({
              type: "error",
              text1: "فشل التسجيل",
              text2: errorMessage,
            });
          },
        }
      );
    }
  });

  const handleGoogleRegister = () => {
    console.log("Google Register");
  };

  const handleAppleRegister = () => {
    console.log("Apple Register");
  };

  return (
    <YStack gap="$4">
      <XStack gap="$2">
        {/* First Name */}
        <YStack gap="$2" flex={1}>
          <Paragraph textAlign="left" fontSize={14} fontWeight="600">
            الاسم الأول
          </Paragraph>
          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="أدخل اسمك الأول"
                placeholderTextColor="$gray400"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                bg="$white"
                color="black"
                textAlign="right"
                borderWidth={1.5}
                borderColor="$gray300"
                borderRadius="$4"
                px="$4"
                py="$2"
                height="$12"
                focusStyle={{
                  borderColor: "$primary500",
                  borderWidth: 2,
                }}
              />
            )}
          />
          {errors.first_name && (
            <Paragraph textAlign="right" fontSize={12} color="red">
              {errors.first_name.message}
            </Paragraph>
          )}
        </YStack>

        {/* Last Name */}
        <YStack gap="$2" flex={1}>
          <Paragraph textAlign="left" fontSize={14} fontWeight="600">
            الاسم الأخير
          </Paragraph>
          <Controller
            control={control}
            name="last_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="أدخل اسمك الأخير"
                placeholderTextColor="$gray400"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                bg="$white"
                color="black"
                borderWidth={1.5}
                borderColor="$gray300"
                borderRadius="$4"
                px="$4"
                py="$2"
                height="$12"
                textAlign="right"
                fontSize={16}
                focusStyle={{
                  borderColor: "$primary500",
                  borderWidth: 2,
                }}
              />
            )}
          />
          {errors.last_name && (
            <Paragraph textAlign="right" color="red" fontSize={12}>
              {errors.last_name.message}
            </Paragraph>
          )}
        </YStack>
      </XStack>

      {/* Username */}
      <YStack gap="$2">
        <Paragraph textAlign="left" fontSize={14} fontWeight="600">
          اسم المستخدم
        </Paragraph>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="اختر اسم مستخدم"
              placeholderTextColor="$gray400"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
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
              focusStyle={{ borderColor: "$primary500", borderWidth: 2 }}
            />
          )}
        />
        {errors.username && (
          <Paragraph textAlign="right" fontSize={12}>
            {errors.username.message}
          </Paragraph>
        )}
      </YStack>

      {/* Email */}
      <YStack gap="$2">
        <Paragraph textAlign="left" fontSize={14} fontWeight="600">
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
          <Paragraph textAlign="right" fontSize={12} color={"red"}>
            {errors.email.message}
          </Paragraph>
        )}
      </YStack>

      {/* Password */}
      <YStack gap="$2" position="relative">
        <Paragraph textAlign="left" fontSize={14} fontWeight="600">
          كلمة المرور
        </Paragraph>

        <YStack position="relative">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="أدخل كلمة مرور قوية"
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
        <Paragraph textAlign="right" fontSize={12} color="$gray500">
          يجب أن تحتوي على 6 أحرف على الأقل
        </Paragraph>
      </YStack>

      {/* Register Button */}
      <Button
        onPress={handleRegister}
        disabled={isLoading}
        bg="$color9"
        borderRadius="$4"
        height="$12"
        pressStyle={{ bg: "$primary700", scale: 0.98 }}
        disabledStyle={{ bg: "$primary200", opacity: 0.6 }}
      >
        <Paragraph color="white" fontWeight="600" pointerEvents="none">
          {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
        </Paragraph>
      </Button>

      {/* Divider */}
      <Divider title="أو" />

      <GoogleButton
        onPress={handleGoogleRegister}
        title="تسجيل باستخدام Google"
      />

      <AppleButton onPress={handleAppleRegister} title="تسجيل باستخدام Apple" />

      {/* Login Link */}
      <XStack gap="$1" alignItems="center" justifyContent="center">
        <Paragraph fontSize={14}>لديك حساب بالفعل؟</Paragraph>
        <Button
          onPress={() => navigation.navigate("Login")}
          unstyled
          pressStyle={{ opacity: 0.7 }}
        >
          <Paragraph fontSize={14} fontWeight="700">
            تسجيل الدخول
          </Paragraph>
        </Button>
      </XStack>
    </YStack>
  );
};

export default UserRegisterForm;
