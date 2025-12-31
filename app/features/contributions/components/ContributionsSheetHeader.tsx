import { Feather } from "@expo/vector-icons";
import { Button, H6, Paragraph, XStack } from "tamagui";

interface ContributionsSheetHeaderProps {
  count: number;
  updatedAt: string;
  onClose: () => void;
}

export const ContributionsSheetHeader = ({
  count,
  updatedAt,
  onClose,
}: ContributionsSheetHeaderProps) => {
  return (
    <XStack justifyContent="space-between" alignItems="center" pt="$2">
      <XStack alignItems="center" gap="$2">
        <Button unstyled onPress={onClose} p="$1">
          <Feather name="chevron-down" size={24} color="$gray700" />
        </Button>
        <Paragraph fontSize={12} color="$gray500">
          تم التحديث في: {updatedAt}
        </Paragraph>
      </XStack>

      <H6 fontWeight="800" color="$black">
        {`مشاركات الأعضاء (${count})`}
      </H6>
    </XStack>
  );
};
