import { Feather } from "@expo/vector-icons";
import { Button, H4, Paragraph, XStack } from "tamagui";

interface ContributionsSheetHeaderProps {
  count: number;
  onClose: () => void;
}

export const ContributionsSheetHeader = ({
  count,
  onClose,
}: ContributionsSheetHeaderProps) => {
  return (
    <XStack justifyContent="space-between" alignItems="center" pt="$2">
      <XStack alignItems="center" gap="$2">
        <Button unstyled onPress={onClose} p="$1">
          <Feather name="chevron-down" size={24} color="#455A64" />
        </Button>
        <Paragraph fontSize={13} color="$gray500">
          تم التحديث الآن
        </Paragraph>
      </XStack>

      <H4 fontWeight="800" color="#263238">
        {`مشاركات الأعضاء (${count})`}
      </H4>
    </XStack>
  );
};
