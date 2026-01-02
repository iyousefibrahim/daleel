import Error from "@/app/components/Error";
import { CategoriesStackParamList } from "@/app/navigation/CategoriesStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { H4, XStack, YStack } from "tamagui";
import useCategories from "../hooks/useCategories";
import CategoryCard from "./CategoryCard";

const DiscoverNewTrips = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CategoriesStackParamList>>();
  const { data, isLoading, isError, refetch } =
    useCategories().getCategoriesQuery(5);

  const handleRetry = () => {
    refetch();
  };

  if (isError) {
    return (
      <Error message="حدث خطأ أثناء تحميل الفئات." onClick={handleRetry} />
    );
  }

  // Add "more" item to the end of the data array
  const itemsToRender = [
    ...(data || []),
    { id: "more", name: "المزيد", is_more: true, icon_url: "" },
  ];

  return (
    <YStack flex={1} pt="$4">
      <H4
        fontFamily="$heading"
        color="$gray700"
        fontSize="$6"
        fontWeight="700"
        pb={"$4"}
        textAlign="left"
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
            is_more={cat.is_more}
            onPress={() => {
              const nav = navigation as any;
              if (cat.is_more) {
                nav.navigate("Services", {
                  screen: "CategoriesList",
                });
              } else {
                nav.navigate("Services", {
                  screen: "CategoryServices",
                  params: { categoryId: cat.id },
                });
              }
            }}
          />
        ))}
      </XStack>
    </YStack>
  );
};

export default DiscoverNewTrips;
