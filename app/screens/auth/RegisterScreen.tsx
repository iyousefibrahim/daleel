import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { YStack, XStack, Input, Button } from "tamagui";
import { useToastController } from "@tamagui/toast";
import { Text } from "@/app/components/Text";
import { AuthStackParamList } from "@/app/types/types";
import useAuth from "@/app/features/auth/hooks/useAuth";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/features/auth/validators/authSchema";
import Entypo from "@expo/vector-icons/Entypo";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen = ({ navigation }: Props) => {
  const { registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = registerMutation.isPending;
  const toast = useToastController();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = handleSubmit((data) => {
    console.log("Form Submitted", data);

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
          toast.show("تم إنشاء الحساب بنجاح!", {
            message: "مرحباً بك! يمكنك الآن تسجيل الدخول",
            duration: 4000,
          });
        },
        onError: (error: any) => {
          console.log("error", error);
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "حدث خطأ أثناء إنشاء الحساب";
          toast.show("فشل التسجيل", {
            message: errorMessage,
            duration: 4000,
          });
        },
      }
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <YStack px="$5" py={Platform.OS === "ios" ? "$3" : "$5"}>
          {/* Header */}
          <YStack mb="$8">
            <Text
              fontSize={30}
              fontWeight="700"
              mb="$3"
              lineHeight={35}
              width="100%"
            >
              إنشاء حساب جديد
            </Text>
            <Text fontSize={16} width="100%">
              أدخل بياناتك للبدء
            </Text>
          </YStack>

          {/* Form */}
          <YStack gap="$5">
            <XStack gap="$2">
              {/* First Name */}
              <YStack gap="$2" flex={1}>
                <Text fontSize={14} fontWeight="600">
                  الاسم الأول
                </Text>
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
                      height="$12"
                      focusStyle={{
                        borderColor: "$primary500",
                        borderWidth: 2,
                      }}
                    />
                  )}
                />
                {errors.first_name && (
                  <Text fontSize={12} color="red">
                    {errors.first_name.message}
                  </Text>
                )}
              </YStack>

              {/* Last Name */}
              <YStack gap="$2" flex={1}>
                <Text fontSize={14} fontWeight="600">
                  الاسم الأخير
                </Text>
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
                  <Text fontSize={12}>{errors.last_name.message}</Text>
                )}
              </YStack>
            </XStack>

            {/* Username */}
            <YStack gap="$2">
              <Text fontSize={14} fontWeight="600">
                اسم المستخدم
              </Text>
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
                    textAlign="right"
                    height="$12"
                    fontSize={16}
                    focusStyle={{ borderColor: "$primary500", borderWidth: 2 }}
                  />
                )}
              />
              {errors.username && (
                <Text fontSize={12}>{errors.username.message}</Text>
              )}
            </YStack>

            {/* Email */}
            <YStack gap="$2">
              <Text fontSize={14} fontWeight="600">
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
                    height="$12"
                    fontSize={16}
                    focusStyle={{ borderColor: "$primary500", borderWidth: 2 }}
                  />
                )}
              />
              {errors.email && (
                <Text fontSize={12} color={"red"}>
                  {errors.email.message}
                </Text>
              )}
            </YStack>

            {/* Password */}
            <YStack gap="$2" position="relative">
              <Text fontSize={14} fontWeight="600">
                كلمة المرور
              </Text>

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
                <Text color="red" fontSize={12}>
                  {errors.password.message}
                </Text>
              )}
              <Text fontSize={12} color="$gray500">
                يجب أن تحتوي على 6 أحرف على الأقل
              </Text>
            </YStack>

            {/* Register Button */}
            <Button
              onPress={handleRegister}
              disabled={isLoading || !isValid}
              bg="$color9"
              borderRadius="$4"
              height="$12"
              pressStyle={{ bg: "$primary700", scale: 0.98 }}
              disabledStyle={{ bg: "$primary200", opacity: 0.6 }}
            >
              <Text color="white" fontWeight="600" pointerEvents="none">
                {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
              </Text>
            </Button>

            {/* Divider */}
            <XStack gap="$4" alignItems="center">
              <YStack f={1} h={1} bg="$gray300" />
              <Text fontSize={14}>أو</Text>
              <YStack f={1} h={1} bg="$gray300" />
            </XStack>

            {/* Login Link */}
            <XStack gap="$1" alignItems="center" justifyContent="center">
              <Text fontSize={14}>لديك حساب بالفعل؟</Text>
              <Button
                onPress={() => navigation.navigate("Login")}
                unstyled
                pressStyle={{ opacity: 0.7 }}
              >
                <Text fontSize={14} fontWeight="700">
                  تسجيل الدخول
                </Text>
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
