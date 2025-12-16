import { H3, Paragraph, XStack } from "tamagui";
import useAuth from "../features/auth/hooks/useAuth";

const HomeWelcome = () => {
  const user = useAuth();
  const firstName = user.userSession?.user_metadata.full_name.split(" ")[0];

  const formattedDate = new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <XStack flex={1} gap={5} justifyContent="flex-start" alignItems="center">
      <H3 fontFamily="$heading" fontSize="$6" fontWeight="700">
        مرحباً، {firstName}!
      </H3>

      <Paragraph
        fontFamily="$body"
        color="$gray600"
        fontSize="$3"
        marginRight="$4"
      >
        اليوم، {formattedDate}
      </Paragraph>
    </XStack>
  );
};

export default HomeWelcome;
