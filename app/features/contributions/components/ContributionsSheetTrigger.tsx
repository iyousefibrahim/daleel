import { Feather } from "@expo/vector-icons";
import { Button, Paragraph, useTheme, XStack } from "tamagui";

interface ContributionsSheetTriggerProps {
  onPress: () => void;
  count: number;
  updatedAt: string;
}

export const ContributionsSheetTrigger = ({
  onPress,
  count,
  updatedAt,
}: ContributionsSheetTriggerProps) => {
  const theme = useTheme();
  return (
    <Button
      unstyled
      onPress={onPress}
      position="absolute"
      bottom={95}
      left="$4"
      right="$4"
      bg="$white"
      h="$12"
      borderRadius="$6"
      px="$4"
      borderWidth={1}
      borderColor="$gray200"
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
    >
      <XStack f={1} justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap="$2">
          <Feather name="chevron-up" size={18} color={theme.gray600.get()} />
          <Paragraph fontSize={12} color="$gray500" fontFamily="$body">
            تم التحديث في: {updatedAt}
          </Paragraph>
        </XStack>

        <XStack
          bg="$mint100"
          px="$3"
          py="$1.5"
          borderRadius="$6"
          alignItems="center"
        >
          <Paragraph
            fontSize={13}
            fontWeight="700"
            color="$primary800"
            fontFamily="$body"
          >
            {`مشاركات الأعضاء (${count})`}
          </Paragraph>
        </XStack>
      </XStack>
    </Button>
  );
};
