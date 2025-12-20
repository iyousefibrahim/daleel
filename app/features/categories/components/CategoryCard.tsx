import { YStack, SizableText, useTheme } from "tamagui";
import { Entypo } from "@expo/vector-icons";
import { Image } from "react-native";

interface CategoryCardProps {
  name: string;
  icon_url?: string;
  isMore?: boolean;
  onPress?: () => void;
}

const CategoryCard = ({ name, icon_url, isMore, onPress }: CategoryCardProps) => {
  const theme = useTheme();
  const iconBg = theme.gray100.val;

  return (
    <YStack
      width="32%"
      aspectRatio={1}
      backgroundColor="$background"
      borderRadius="$4"
      alignItems="center"
      justifyContent="center"
      padding="$3"
      shadowColor="$shadowColor"
      shadowOpacity={0.05}
      shadowRadius={4}
      elevation={1}
      onPress={onPress}
    >
      <YStack
        width={56}
        height={56}
        borderRadius={28}
        backgroundColor={iconBg}
        alignItems="center"
        justifyContent="center"
        mb="$3"
      >
        {isMore ? (
          <Entypo
            name="dots-three-horizontal"
            size={26}
            color={theme.gray600.val}
          />
        ) : (
          <Image
            source={{ uri: icon_url }}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        )}
      </YStack>

      <SizableText
        fontFamily="$body"
        color="$gray900"
        fontSize="$3"
        fontWeight="600"
        textAlign="center"
        numberOfLines={2}
      >
        {name}
      </SizableText>
    </YStack>
  );
};

export default CategoryCard;
