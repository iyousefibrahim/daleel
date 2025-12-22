import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, YStack } from "tamagui";
import { Spinner } from "tamagui";
import { Paragraph } from "tamagui";

const Loader = ({ message }: { message: string }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <YStack
        f={1}
        alignItems="center"
        justifyContent="center"
        bg="$background"
      >
        <Spinner size="large" color="$primary" />
        <Paragraph mt="$4" color="$gray600" fontFamily="$body">
          {message}
        </Paragraph>
      </YStack>
    </SafeAreaView>
  );
};

export default Loader;
