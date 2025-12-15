import { Text } from "react-native";
import { Button } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "@/app/features/auth/hooks/useAuth";

const HomeScreen = () => {
  const { logoutMutation } = useAuth();
  const handleLogOut = async () => {
    logoutMutation.mutate();
  };
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button onPress={handleLogOut}>LogOut</Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
