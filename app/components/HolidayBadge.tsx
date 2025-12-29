import { Ionicons } from "@expo/vector-icons";
import { Paragraph, useTheme, XStack } from "tamagui";
import { isWeekend } from "../lib/utils/dateUtils";

const HolidayBadge = () => {
  const theme = useTheme();

  const isHoliday = isWeekend(new Date().getDay());

  if (!isHoliday) return null;

  return (
    <XStack
      bg={theme.warningBackground.get()}
      px="$3"
      py="$2"
      br="$3"
      gap="$2"
      alignItems="center"
      borderWidth={1}
      borderColor={theme.warning.get()}
      opacity={0.95}
    >
      <Ionicons name="calendar" size={16} color={theme.warning.get()} />
      <Paragraph
        color={theme.warning.get()}
        fontWeight="$6"
        fontSize="$2"
        lineHeight="$2"
      >
        عطلة رسمية
      </Paragraph>
    </XStack>
  );
};

export default HolidayBadge;
