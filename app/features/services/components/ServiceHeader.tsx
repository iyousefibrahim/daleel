import { colors } from "@/app/constants/tamagui.config";
import { Feather } from "@expo/vector-icons";
import { Paragraph, XStack, YStack } from "tamagui";

interface ServiceHeaderProps {
  name: string;
  upvotes: number;
  downvotes: number;
}

const ServiceHeader = ({ name, upvotes, downvotes }: ServiceHeaderProps) => {
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
            {upvotes}
          </Paragraph>
          <Feather name="arrow-up" size={16} color={colors.primary500} />
        </XStack>
        <XStack gap="$1" alignItems="center">
          <Paragraph size="$5" fontWeight="600" color={colors.gray900}>
            {downvotes}
          </Paragraph>
          <Feather name="arrow-down" size={16} color="red" />
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ServiceHeader;
