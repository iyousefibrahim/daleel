import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Circle, Paragraph, useTheme, YStack } from "tamagui";

interface NoDataProps {
  message: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const NoData = ({
  message,
  iconName = "file-document-outline",
}: NoDataProps) => {
  const theme = useTheme();

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap="$4"
      padding="$6"
      minHeight={200}
    >
      <Circle size={80} backgroundColor="$gray100" elevation="$1">
        <MaterialCommunityIcons
          name={iconName}
          size={40}
          color={theme.gray500.val}
        />
      </Circle>

      <Paragraph
        color="$gray500"
        fontSize="$5"
        fontWeight="600"
        textAlign="center"
      >
        {message}
      </Paragraph>
    </YStack>
  );
};

export default NoData;
