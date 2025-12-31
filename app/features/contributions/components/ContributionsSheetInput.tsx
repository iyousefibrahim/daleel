import { Feather } from "@expo/vector-icons";
import { Button, Input, Paragraph, XStack, YStack } from "tamagui";

interface ContributionsSheetInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onAdd: () => void;
  onFocus?: () => void;
}

export const ContributionsSheetInput = ({
  inputText,
  setInputText,
  onAdd,
  onFocus,
}: ContributionsSheetInputProps) => {
  return (
    <YStack gap="$3" bg="$background" pb="$2">
      <XStack
        bg="#FAFAFA"
        borderWidth={1}
        borderColor="#EEEEEE"
        br="$4"
        px="$3"
        h={50}
        alignItems="center"
      >
        <Button unstyled p="$2" pressStyle={{ opacity: 0.5 }} onPress={onAdd}>
          <Feather
            name="send"
            size={20}
            color={inputText.trim() ? "$primary" : "$gray500"}
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
        fontSize={11}
        color="$gray500"
        textAlign="center"
        lineHeight={16}
        px="$4"
      >
        نعتمد على دقة مشاركتك لمساعدة الآخرين.
      </Paragraph>
    </YStack>
  );
};
