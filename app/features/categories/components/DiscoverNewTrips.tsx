import { H4, XStack, YStack, SizableText, useTheme } from "tamagui";
import { Entypo } from "@expo/vector-icons";
import { Image } from "react-native";
import useCategories from "../hooks/useCategories";

const DiscoverNewTrips = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useCategories().getCategoriesQuery(5);

  if (isLoading) {
    return (
      <YStack flex={1} pt="$4" alignItems="center" justifyContent="center">
        <SizableText color="$gray500">جاري تحميل الفئات...</SizableText>
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack flex={1} pt="$4" alignItems="center" justifyContent="center">
        <SizableText color="$red800">حدث خطأ أثناء تحميل الفئات.</SizableText>
      </YStack>
    );
  }

  const iconBg = theme.gray100.val;

  // Add "more" item to the end of the data array
  const itemsToRender = [
    ...(data || []),
    { id: "more", name: "المزيد", isMore: true },
  ];

  return (
    <YStack flex={1} pt="$4">
      <H4
        fontFamily="$heading"
        color="$gray700"
        fontSize="$6"
        fontWeight="700"
        mb="$4"
      >
        اكتشف مشاوير جديدة
      </H4>

      <XStack
        width="100%"
        flexWrap="wrap"
        justifyContent="space-between"
        rowGap="$4"
      >
        {itemsToRender.map((cat) => (
          <YStack
            key={cat.id}
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
              {cat.isMore ? (
                <Entypo
                  name="dots-three-horizontal"
                  size={26}
                  color={theme.gray600.val}
                />
              ) : (
                <Image
                  source={{ uri: cat.icon_url }}
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
              {cat.name}
            </SizableText>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
};

export default DiscoverNewTrips;
