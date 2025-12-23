import { colors } from "@/app/constants/tamagui.config";
import { Image as ExpoImage } from "expo-image";
import { Paragraph, XStack, YStack } from "tamagui";

interface RequirementItemProps {
  icon_url: string;
  title: string;
  notes?: string;
  iconBg: string;
}

const RequirementItem = ({
  icon_url,
  title,
  notes,
  iconBg,
}: RequirementItemProps) => (
  <XStack gap="$3" alignItems="center">
    <YStack flex={1} gap="$1">
      <Paragraph
        size="$5"
        fontWeight="600"
        color={colors.gray900}
        textAlign="right"
      >
        {title}
      </Paragraph>
      {notes && (
        <Paragraph size="$4" color={colors.gray600} textAlign="right">
          {notes}
        </Paragraph>
      )}
    </YStack>
    <YStack
      width={48}
      height={48}
      backgroundColor={iconBg}
      borderRadius="$3"
      justifyContent="center"
      alignItems="center"
    >
      <ExpoImage
        source={{ uri: icon_url }}
        style={{ width: 24, height: 24 }}
        contentFit="contain"
      />
    </YStack>
  </XStack>
);

export default RequirementItem;
