import useAuth from "@/app/features/auth/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, ScrollView, YStack } from "tamagui";

const Profile = () => {
  const { logoutMutation } = useAuth();
  const handleLogOut = async () => {
    logoutMutation.mutate();
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <YStack height="100%">
          <H3 textAlign="left">الملف الشخصي</H3>
          <Button
            size="large"
            height={50}
            backgroundColor={"$primary500"}
            color={"white"}
            onPress={handleLogOut}
          >
            تسجيل الخروج
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
