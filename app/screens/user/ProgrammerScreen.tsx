import BackButton from "@/app/components/BackButton";
import { colors } from "@/app/constants/tamagui.config";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Linking, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  Card,
  H2,
  H3,
  H4,
  Paragraph,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

const ProgrammerScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.background.get() }}
        showsVerticalScrollIndicator={false}
      >
        <YStack p="$4" gap="$6">
          {/* Header */}
          <XStack alignItems="center" gap="$4">
            <BackButton size={40} />
            <H3 fontWeight="800" color={theme.color.get()} textAlign="right">
              عن المطور
            </H3>
          </XStack>

          {/* Profile Section */}
          <YStack alignItems="center" mt="$4" gap="$4">
            <Avatar
              circular
              size="$15"
              bordered
              borderColor="$primary100"
              borderWidth={6}
            >
              <Avatar.Image src="https://avatars.githubusercontent.com/u/101850785?v=4" />
              <Avatar.Fallback backgroundColor={colors.primary500} />
            </Avatar>

            <YStack alignItems="center" gap="$1">
              <H2 fontWeight="800" color={theme.color.get()}>
                يوسف إبراهيم
              </H2>
              <Paragraph
                color={colors.primary600}
                fontWeight="700"
                fontSize="$5"
              >
                Full Stack Developer
              </Paragraph>
            </YStack>

            <Card
              p="$5"
              br="$6"
              backgroundColor={theme.backgroundStrong.get()}
              bordered
            >
              <Paragraph
                textAlign="center"
                fontSize="$4"
                lineHeight={24}
                color={theme.color.get()}
              >
                مطور برمجيات شغوف ببناء تطبيقات الهاتف المحمول وتجارب الويب
                الحديثة. تم بناء تطبيق "دليل" ليكون الرفيق الأمثل للمواطن المصري
                في رحلاته الحكومية، جامعاً بين سهولة الاستخدام ودقة المعلومات.
              </Paragraph>
            </Card>
          </YStack>

          {/* Social Links */}
          <YStack gap="$3">
            <H4 fontWeight="700" textAlign="left" px="$2">
              تواصل معي
            </H4>
            <XStack gap="$2" flexWrap="wrap">
              <SocialButton
                icon="logo-github"
                label="GitHub"
                url="https://github.com/iyousefibrahim"
                color="#24292e"
              />
              <SocialButton
                icon="logo-linkedin"
                label="LinkedIn"
                url="https://linkedin.com/in/iyousefibrahim"
                color="#0077b5"
              />
            </XStack>
            <SocialButton
              icon="globe-outline"
              label="Portfolio"
              url="https://iyousefibrahim.vercel.app/"
              color={colors.primary500}
            />
            <Button
              icon={
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.primary500}
                />
              }
              variant="outlined"
              borderColor={theme.primary200.get()}
              color={theme.color.get()}
              h={"$10"}
              onPress={() =>
                Linking.openURL("mailto:yousefibrahim9@outlook.com")
              }
            >
              ارسل بريداً إلكترونياً
            </Button>
          </YStack>

          <YStack alignItems="center" mt="$4">
            <Paragraph color="$gray500" fontSize="$5">
              تم التطوير بكل فخر 🇪🇬
            </Paragraph>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

interface SocialButtonProps {
  icon: any;
  label: string;
  url: string;
  color: string;
}

export const SocialButton = ({
  icon,
  label,
  url,
  color,
}: SocialButtonProps) => {
  const handleOpenLink = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <Button
      flex={1}
      h={"$10"}
      icon={<Ionicons name={icon} size={25} color="white" />}
      backgroundColor={color}
      color="white"
      fontWeight="700"
      onPress={() => handleOpenLink(url)}
      pressStyle={{ opacity: 0.8, scale: 0.98 }}
    >
      {label}
    </Button>
  );
};

export default ProgrammerScreen;
