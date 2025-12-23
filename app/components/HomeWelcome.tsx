import { H3, XStack } from "tamagui";
import useAuth from "../features/auth/hooks/useAuth";
import CurrentDate from "./CurrentDate";

const HomeWelcome = () => {
  const user = useAuth();
  const firstName = user.userSession?.user_metadata.full_name.split(" ")[0];

  return (
    <XStack flex={1} gap={5} justifyContent="flex-start" alignItems="center">
      <H3 fontFamily="$heading" fontSize="$6" fontWeight="700">
        مرحباً، {firstName}!
      </H3>

      <CurrentDate />
    </XStack>
  );
};

export default HomeWelcome;
