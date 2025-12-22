import { SafeAreaView } from "react-native-safe-area-context";
import { Button, useTheme, YStack } from "tamagui";
import { Paragraph } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";

const Error = ({
  message,
  onClick,
}: {
  message: string;
  onClick?: () => void;
}) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <YStack
        f={1}
        alignItems="center"
        justifyContent="center"
        bg="$background"
        px="$6"
        gap="$4"
      >
        <MaterialIcons
          name="error-outline"
          size={64}
          color={theme.error.get()}
        />

        <Paragraph
          fontSize="$6"
          color="$error"
          fontFamily="$body"
          textAlign="center"
          maxWidth={320}
        >
          {message}
        </Paragraph>

        {onClick && (
          <Button
            size="$5"
            backgroundColor="$primary500"
            color="white"
            height={50}
            onPress={onClick}
            borderRadius="$4"
            minWidth={200}
            fontWeight="600"
          >
            المحاولة مرة أخرى
          </Button>
        )}
      </YStack>
    </SafeAreaView>
  );
};

export default Error;
