import { MaterialIcons } from "@expo/vector-icons";
import { memo } from "react";
import { Image } from "react-native";
import { SizableText, useTheme, YStack } from "tamagui";

interface CategoryCardProps {
  name: string;
  icon_url: string;
  is_more?: boolean;
  onPress?: () => void;
}

const CategoryCard = ({
  name,
  icon_url,
  is_more,
  onPress,
}: CategoryCardProps) => {
  const theme = useTheme();

  return (
    <YStack
      width="32%"
      aspectRatio={1}
      backgroundColor="$background"
      borderRadius="$5"
      borderWidth={1}
      borderColor="$gray4"
      alignItems="center"
      justifyContent="center"
      padding="$3"
      shadowColor="$shadowColor"
      shadowOpacity={0.08}
      shadowRadius={8}
      shadowOffset={{ width: 0, height: 2 }}
      elevation={2}
      onPress={onPress}
      pressStyle={{
        opacity: 0.9,
        borderColor: "$primary500",
      }}
    >
      <YStack
        width={60}
        height={60}
        borderRadius={30}
        backgroundColor="$gray200"
        alignItems="center"
        justifyContent="center"
        mb="$3"
      >
        {is_more ? (
          <MaterialIcons
            name="more-horiz"
            size={32}
            color={theme.primary500.get()}
          />
        ) : (
          <Image
            source={{ uri: icon_url }}
            style={{ width: 34, height: 34 }}
            resizeMode="contain"
          />
        )}
      </YStack>

      <SizableText
        fontFamily="$body"
        color="$gray12"
        fontSize="$3"
        fontWeight="600"
        textAlign="center"
        numberOfLines={2}
        lineHeight="$1"
      >
        {name}
      </SizableText>
    </YStack>
  );
};

export default memo(CategoryCard);
