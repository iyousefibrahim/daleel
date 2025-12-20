import useAuth from "@/app/features/auth/hooks/useAuth";
import { Button, Text, YStack } from "tamagui";

const Profile = () => {
  const { logoutMutation } = useAuth();
  const handleLogOut = async () => {
    logoutMutation.mutate();
  };
  return (
    <YStack height="100%">
      <Text>Profile</Text>
      <Button onPress={handleLogOut}>LogOut</Button>
    </YStack>
  );
};

export default Profile;
