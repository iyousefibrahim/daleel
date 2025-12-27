import { colors } from "@/app/constants/tamagui.config";
import { Ionicons } from "@expo/vector-icons";
import { Button, Paragraph, Spinner, XStack, YStack } from "tamagui";

const ActionFooter = ({
  onPress,
  isLoading,
  text,
  icon,
  disabled,
}: {
  onPress: () => void;
  isLoading?: boolean;
  text: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  disabled?: boolean;
}) => {
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
        backgroundColor={disabled ? colors.gray500 : colors.primary500}
        borderRadius="$3"
        pressStyle={{ backgroundColor: colors.primary700, scale: 0.98 }}
        onPress={onPress}
        disabled={isLoading || disabled}
        opacity={disabled ? 0.6 : 1}
      >
        {isLoading ? (
          <Spinner size="small" color={colors.white} />
        ) : (
          <XStack gap="$2" alignItems="center">
            <Paragraph size="$5" fontWeight="700" color={colors.white}>
              {text}
            </Paragraph>
            {icon && <Ionicons name={icon} size={24} color={colors.white} />}
          </XStack>
        )}
      </Button>
    </YStack>
  );
};

export default ActionFooter;
