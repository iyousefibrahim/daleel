import { colors } from "@/app/constants/tamagui.config";
import { Ionicons } from "@expo/vector-icons";
import { Paragraph, XStack, YStack } from "tamagui";

interface ServiceHeaderProps {
  name: string;
}

const ServiceHeader = ({ name }: ServiceHeaderProps) => {
  return (
    <YStack
      p="$4"
      backgroundColor={colors.white}
      borderBottomWidth={1}
      borderBottomColor={colors.gray200}
    >
      <XStack justifyContent="space-between" alignItems="flex-start" mb="$2">
        <Paragraph
          size="$8"
          fontWeight="700"
          color={colors.gray900}
          textAlign="left"
          flex={1}
        >
          {name}
        </Paragraph>
      </XStack>

      <XStack gap="$3" alignItems="center" justifyContent="flex-start">
        <XStack gap="$1" alignItems="center">
          <Paragraph size="$5" fontWeight="600" color={colors.gray900}>
            4.8
          </Paragraph>
          <Ionicons name="star" size={16} color={colors.warning} />
          <Paragraph size="$3" color={colors.gray500}>
            (120 تقييم)
          </Paragraph>
        </XStack>
        <XStack gap="$1" alignItems="center">
          <Paragraph size="$3" color={colors.gray500}>
            أيام عمل 3
          </Paragraph>
          <Ionicons name="time-outline" size={16} color={colors.success} />
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ServiceHeader;
