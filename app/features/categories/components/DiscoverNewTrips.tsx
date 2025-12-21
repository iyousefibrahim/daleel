import { H4, XStack, YStack, SizableText, useTheme } from "tamagui";
import useCategories from "../hooks/useCategories";
import CategoryCard from "./CategoryCard";

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
          <CategoryCard
            key={cat.id}
            name={cat.name}
            icon_url={cat.icon_url}
            isMore={cat.isMore}
            onPress={() => {
              console.log(cat.id);
            }}
          />
        ))}
      </XStack>
    </YStack>
  );
};

export default DiscoverNewTrips;
