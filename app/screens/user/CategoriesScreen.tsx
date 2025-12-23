import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import Search from "@/app/components/Search";
import CategoryCard from "@/app/features/categories/components/CategoryCard";
import useCategories from "@/app/features/categories/hooks/useCategories";
import { CategoriesStackParamList } from "@/app/navigation/CategoriesStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, ScrollView, useTheme, XStack } from "tamagui";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "CategoriesList"
>;

const CategoriesScreen = () => {
  const { data, isLoading, isError, refetch } =
    useCategories().getCategoriesQuery();
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const theme = useTheme();

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

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.background.get() }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="on-drag"
      >
        <H3 textAlign="left" pb="$4">
          كل الخدمات
        </H3>
        <Search placeholder="إبحث عن خدمات" />
        <XStack gap="$1" flexWrap="wrap">
          {data?.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon_url={category.icon_url}
              onPress={() => {
                navigation.navigate("CategoryServices", {
                  categoryId: category.id,
                });
              }}
            />
          ))}
        </XStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
