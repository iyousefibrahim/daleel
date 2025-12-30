import { MenuItem } from "@/app/components/MenuItem";
import { colors } from "@/app/constants/tamagui.config";
import useAuth from "@/app/features/auth/hooks/useAuth";
import { ProfileStackParamList } from "@/app/navigation/ProfileStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Card,
  H3,
  H4,
  Paragraph,
  ScrollView,
  Separator,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<ProfileStackParamList, "Profile">;
}

interface SettingItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { logoutMutation, userSession } = useAuth();
  const theme = useTheme();

  const handleLogOut = async () => {
    logoutMutation.mutate();
  };

  const otherSettings: SettingItem[] = [
    {
      icon: "information-circle-outline",
      label: "عن تطبيق دليل",
      onPress: () => console.log("About"),
    },
    {
      icon: "code",
      label: "عن مطور التطبيق",
      onPress: () => navigation.navigate("Programmer"),
    },
  ];

  const accountSettings: SettingItem[] = [
    {
      icon: "person-outline",
      label: "المعلومات الشخصية",
      onPress: () => console.log("Personal Info"),
    },
    {
      icon: "shield-checkmark-outline",
      label: "الأمان وكلمة المرور",
      onPress: () => console.log("Security"),
    },
  ];

  const fullName = userSession?.user_metadata?.full_name || "مستخدم دليل";
  const email = userSession?.email || "";
  const username = userSession?.user_metadata?.username || "";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack p="$4" gap="$6">
          {/* Header */}
          <XStack justifyContent="space-between" alignItems="center">
            <H3 fontWeight="800" lineHeight={"$9"} color={theme.color.get()}>
              حسابي
            </H3>
          </XStack>

          {/* User Profile Card */}
          <Card
            elevate
            p="$4"
            borderRadius="$6"
            bg={theme.background.get()}
            bordered
          >
            <XStack alignItems="center" gap="$4">
              <Avatar
                circular
                size="$12"
                bordered
                borderColor="$primary50"
                borderWidth={4}
              >
                <Avatar.Image
                  width="100%"
                  height="100%"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    fullName
                  )}&background=4CAF50&color=fff`}
                />
                <Avatar.Fallback backgroundColor={colors.primary500} />
              </Avatar>
              <YStack gap="$1" flex={1}>
                <H4 fontWeight="700" textAlign="left">
                  {fullName}
                </H4>
                <Paragraph color="$gray500" fontSize="$3" textAlign="left">
                  @{username}
                </Paragraph>
                <Paragraph color="$gray500" fontSize="$3" textAlign="left">
                  {email}
                </Paragraph>
              </YStack>
            </XStack>
          </Card>

          {/* Settings Groups */}
          <YStack gap="$4">
            <YStack
              bg={theme.backgroundStrong.get()}
              borderRadius="$4"
              p="$2"
              gap="$1"
            >
              <Paragraph
                px="$3"
                py="$2"
                fontSize="$2"
                fontWeight="700"
                color="$gray500"
                textAlign="left"
              >
                إعدادات الحساب
              </Paragraph>
              {accountSettings.map((item, index) => (
                <YStack key={item.label}>
                  <MenuItem
                    icon={item.icon}
                    label={item.label}
                    onPress={item.onPress}
                  />
                  {index < accountSettings.length - 1 && (
                    <Separator marginHorizontal="$4" />
                  )}
                </YStack>
              ))}
            </YStack>

            <YStack
              bg={theme.backgroundStrong.get()}
              borderRadius="$4"
              p="$2"
              gap="$1"
            >
              <Paragraph
                px="$3"
                py="$2"
                fontSize="$2"
                fontWeight="700"
                color="$gray500"
                textAlign="left"
              >
                أخرى
              </Paragraph>
              {otherSettings.map((item, index) => (
                <YStack key={item.label}>
                  <MenuItem
                    icon={item.icon}
                    label={item.label}
                    onPress={item.onPress}
                  />
                  {index < otherSettings.length - 1 && (
                    <Separator marginHorizontal="$4" />
                  )}
                </YStack>
              ))}
              <Separator marginHorizontal="$4" />
              <MenuItem
                icon="log-out-outline"
                label="تسجيل الخروج"
                destructive
                onPress={handleLogOut}
              />
            </YStack>
          </YStack>

          {/* Footer Info */}
          <YStack alignItems="center" py="$4">
            <Paragraph color="$gray500" fontSize="$4" textAlign="center">
              نسخة التطبيق Beta 1.0.0
            </Paragraph>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
