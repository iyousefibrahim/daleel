import { H3, Paragraph, XStack } from "tamagui";

const HomeWelcome = () => {
  return (
    <XStack flex={1} gap={5} justifyContent="flex-start" marginBottom="$5">
      <H3 fontFamily="$heading" color="$color" fontSize="$6" fontWeight="700">
        مرحباً، يمنى!
      </H3>
      <Paragraph
        fontFamily="$body"
        color="$gray600"
        fontSize="$3"
        marginRight="$4"
        alignSelf="flex-end"
      >
        اليوم، الأربعاء 6 أغسطس
      </Paragraph>
    </XStack>
  );
};

export default HomeWelcome;
