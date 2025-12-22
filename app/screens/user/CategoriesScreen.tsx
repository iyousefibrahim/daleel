import useCategories from "@/app/features/categories/hooks/useCategories";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, ScrollView, SizableText, XStack, YStack } from "tamagui";
import { useTheme } from "tamagui";
import CategoryCard from "@/app/features/categories/components/CategoryCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "@/app/navigation/CategoriesStackNavigator";
import Loader from "@/app/components/Loader";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "CategoriesList"
>;

const CategoriesScreen = () => {
  const { data, isLoading, isError } = useCategories().getCategoriesQuery();
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Loader message="جاري تحميل الفئات..." />
    );
  }

  if (isError) {
    return (
      <YStack flex={1} pt="$4" alignItems="center" justifyContent="center">
        <SizableText color="$red800">حدث خطأ أثناء تحميل الفئات.</SizableText>
      </YStack>
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
        <XStack gap="$1" flexWrap="wrap">
          {data?.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon_url={category.icon_url}
              isMore={category.isMore}
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
