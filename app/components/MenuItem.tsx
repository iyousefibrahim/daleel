import { colors } from "@/app/constants/tamagui.config";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Paragraph, XStack, YStack, useTheme } from "tamagui";

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  destructive?: boolean;
}

export const MenuItem = memo(
  ({ icon, label, onPress, destructive = false }: MenuItemProps) => {
    const theme = useTheme();
    return (
      <XStack
        onPress={onPress}
        px="$4"
        py="$3"
        alignItems="center"
        justifyContent="space-between"
        pressStyle={{ backgroundColor: theme.gray200.get(), opacity: 0.8 }}
        borderRadius="$3"
      >
        <XStack alignItems="center" gap="$3">
          <YStack
            backgroundColor={destructive ? "#FFEBEE" : theme.primary50.get()}
            p="$2"
            borderRadius="$2"
          >
            <Ionicons
              name={icon}
              size={20}
              color={destructive ? "#F44336" : colors.primary500}
            />
          </YStack>
          <Paragraph
            fontSize="$4"
            fontWeight="$5"
            color={destructive ? "#F44336" : theme.color.get()}
          >
            {label}
          </Paragraph>
        </XStack>

        <Ionicons
          name="chevron-back"
          size={18}
          color={theme.gray400.get()}
          style={{ transform: [{ scaleX: -1 }] }}
        />
      </XStack>
    );
  }
);
