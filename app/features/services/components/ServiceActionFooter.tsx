import { colors } from "@/app/constants/tamagui.config";
import { Ionicons } from "@expo/vector-icons";
import { Button, Paragraph, XStack, YStack } from "tamagui";

const ServiceActionFooter = () => {
  return (
    <YStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor={colors.white}
      p="$4"
      borderTopWidth={1}
      borderTopColor={colors.gray200}
    >
      <Button
        width="100%"
        height={56}
        backgroundColor={colors.primary500}
        borderRadius="$3"
        pressStyle={{ backgroundColor: colors.primary700, scale: 0.98 }}
      >
        <XStack gap="$2" alignItems="center">
          <Paragraph size="$5" fontWeight="700" color={colors.white}>
            ابدأ الخدمة الآن
          </Paragraph>
          <Ionicons name="arrow-back-circle" size={24} color={colors.white} />
        </XStack>
      </Button>
    </YStack>
  );
};

export default ServiceActionFooter;
