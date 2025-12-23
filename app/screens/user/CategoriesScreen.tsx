import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import Search from "@/app/components/Search";
import CategoryCard from "@/app/features/categories/components/CategoryCard";
import useCategories from "@/app/features/categories/hooks/useCategories";
import { CategoriesStackParamList } from "@/app/navigation/CategoriesStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { H3, Paragraph, ScrollView, useTheme, XStack, YStack } from "tamagui";

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
        <YStack px="$4" pb="$3">
          <H3
            fontFamily="$heading"
            color="$gray900"
            fontSize="$8"
            fontWeight="700"
            marginBottom="$2"
            textAlign="left"
          >
            كل الخدمات
          </H3>
          <Paragraph
            textAlign="left"
            fontFamily="$body"
            color="$gray600"
            fontSize="$4"
          >
            جميع الخدمات المتاحة في دليل
          </Paragraph>
        </YStack>

        <XStack px="$2">
          <Search placeholder="إبحث عن خدمات" />
        </XStack>
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
