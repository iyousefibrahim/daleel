import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, YStack } from "tamagui";
import { Spinner } from "tamagui";
import { Paragraph } from "tamagui";

const Loader = ({ message }: { message?: string }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <YStack
        f={1}
        alignItems="center"
        justifyContent="center"
        bg="$background"
        gap="$4"
        px="$6"
      >
        <Spinner size="large" color="$primary500" />
        {message && (
          <Paragraph
            fontSize="$5"
            color="$gray11"
            fontFamily="$body"
            textAlign="center"
            maxWidth={280}
            opacity={0.9}
          >
            {message}
          </Paragraph>
        )}
      </YStack>
    </SafeAreaView>
  );
};

export default Loader;
