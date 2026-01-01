import { colors } from "@/app/constants/tamagui.config";
import { memo } from "react";
import { Paragraph, XStack, YStack } from "tamagui";

interface StepItemProps {
  number: number;
  title: string;
  description?: string;
}

const StepItem = ({ number, title, description }: StepItemProps) => (
  <XStack gap="$3" alignItems="flex-start">
    <YStack flex={1} gap="$2" alignItems="flex-end">
      <Paragraph
        size="$5"
        fontWeight="600"
        color={colors.gray900}
        textAlign="right"
      >
        {title}
      </Paragraph>
      <Paragraph
        size="$4"
        color={colors.gray600}
        textAlign="right"
        lineHeight="$5"
      >
        {description}
      </Paragraph>
    </YStack>
    <YStack
      width={40}
      height={40}
      backgroundColor={colors.primary500}
      borderRadius={20}
      justifyContent="center"
      alignItems="center"
      p="$2"
    >
      <Paragraph size="$6" fontWeight="700" color={colors.white}>
        {number}
      </Paragraph>
    </YStack>
  </XStack>
);

export default memo(StepItem);
