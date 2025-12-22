import Loader from "@/app/components/Loader";
import { CategoriesStackParamList } from "@/app/navigation/CategoriesStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { H4, XStack, YStack } from "tamagui";
import useCategories from "../hooks/useCategories";
import CategoryCard from "./CategoryCard";
import Error from "@/app/components/Error";

const DiscoverNewTrips = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CategoriesStackParamList>>();
  const { data, isLoading, isError, refetch } =
    useCategories().getCategoriesQuery(5);

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return <Loader message="جاري تحميل الفئات..." />;
  }

  if (isError) {
    return (
      <Error message="حدث خطأ أثناء تحميل الفئات." onClick={handleRetry} />
    );
  }

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
        pb={'$4'}
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
              const nav = navigation as any;
              if (cat.isMore) {
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
