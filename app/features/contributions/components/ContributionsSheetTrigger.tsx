import { Feather } from "@expo/vector-icons";
import { Button, Paragraph, XStack } from "tamagui";

interface ContributionsSheetTriggerProps {
  onPress: () => void;
  count: number;
}

export const ContributionsSheetTrigger = ({
  onPress,
  count,
}: ContributionsSheetTriggerProps) => {
  return (
    <Button
      unstyled
      onPress={onPress}
      position="absolute"
      bottom={95}
      left="$4"
      right="$4"
      bg="white"
      h={50}
      borderRadius="$6"
      px="$4"
      borderWidth={1}
      borderColor="$gray200"
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
    >
      <XStack f={1} justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap="$2">
          <Feather name="chevron-up" size={18} color="$gray600" />
          <Paragraph fontSize={12} color="$gray500" fontFamily="$body">
            تم التحديث 2 أغسطس
          </Paragraph>
        </XStack>

        <XStack
          bg="#E0F2E9"
          px="$3"
          py="$1.5"
          borderRadius="$6"
          alignItems="center"
        >
          <Paragraph
            fontSize={13}
            fontWeight="700"
            color="#2E7D32"
            fontFamily="$body"
          >
            {`مشاركات الأعضاء (${count})`}
          </Paragraph>
        </XStack>
      </XStack>
    </Button>
  );
};
