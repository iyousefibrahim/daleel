import { View, Text } from "react-native";
import React from "react";
import useAuth from "@/app/features/auth/hooks/useAuth";
import { Button } from "tamagui";

const Profile = () => {
  const { logoutMutation } = useAuth();
  const handleLogOut = async () => {
    logoutMutation.mutate();
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={handleLogOut}>LogOut</Button>
    </View>
  );
};

export default Profile;
