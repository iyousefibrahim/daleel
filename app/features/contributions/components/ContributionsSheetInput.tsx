import { Feather } from "@expo/vector-icons";
import { Button, Input, Paragraph, XStack, YStack } from "tamagui";

interface ContributionsSheetInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAdd: () => void;
  onFocus?: () => void;
  isLoading?: boolean;
}

export const ContributionsSheetInput = ({
  inputText,
  setInputText,
  onAdd,
  onFocus,
  isLoading,
}: ContributionsSheetInputProps) => {
  return (
    <YStack gap="$3" bg="$background" pb="$2">
      <XStack
        bg="$gray50"
        borderWidth={1}
        borderColor="$gray200"
        br="$4"
        px="$3"
        h="$12"
        alignItems="center"
      >
        <Button
          unstyled
          p="$2"
          pressStyle={{ opacity: 0.5 }}
          onPress={onAdd}
          disabled={isLoading || !inputText.trim()}
        >
          <Feather
            name="send"
            size={20}
            color={inputText.trim() && !isLoading ? "$primary" : "$gray500"}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </Button>

        <Input
          unstyled
          flex={1}
          placeholder="إضافة مشاركة"
          textAlign="right"
          value={inputText}
          onChangeText={setInputText as any}
          placeholderTextColor="$gray500"
          paddingHorizontal="$3"
          height="100%"
          onFocus={onFocus}
        />
      </XStack>

      <Paragraph
        fontSize="$3"
        color="$gray500"
        textAlign="center"
        lineHeight="$3"
        fontWeight={'$4'}
        px="$4"
      >
        نعتمد على دقة مشاركتك لمساعدة الآخرين.
      </Paragraph>
    </YStack>
  );
};
