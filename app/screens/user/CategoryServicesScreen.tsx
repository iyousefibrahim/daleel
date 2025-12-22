import { YStack, H2, ScrollView, Paragraph, useTheme } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import useServices from "@/app/features/services/hooks/useServices";
import ServiceCard from "@/app/features/services/components/ServiceCard";
import { CategoriesStackParamList } from "@/app/navigation/CategoriesStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BackButton from "@/app/components/BackButton";
import Loader from "@/app/components/Loader";
import Error from "@/app/components/Error";

type CategoriesStackNavProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "CategoryServices"
>;

const CategoryServicesScreen = () => {
  const route = useRoute();
  const { categoryId } = route.params as { categoryId: string };
  const { getServicesByCategoryIdQuery } = useServices();
  const { data, isLoading, isError, refetch } =
    getServicesByCategoryIdQuery(categoryId);
  const navigator = useNavigation<CategoriesStackNavProp>();
  const theme = useTheme();

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return <Loader message="جاري تحميل الخدمات..." />;
  }

  if (isError) {
    return (
      <Error message="حدث خطأ أثناء تحميل الخدمات." onClick={handleRetry} />
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.background.get() }}
        showsVerticalScrollIndicator={true}
        bounces={true}
        keyboardDismissMode="on-drag"
        height={"100%"}
      >
        <YStack p="10" gap="$3" bg="$background">
          <YStack mb="$2">
            <BackButton />
            <H2
              fontFamily="$heading"
              fontWeight="700"
              size="$9"
              textAlign="left"
              color="$gray900"
              lineHeight="$9"
            >
              الخدمات المتاحة
            </H2>
            <Paragraph
              fontFamily="$body"
              size="$4"
              textAlign="left"
              color="$gray600"
              mt="$1"
            >
              اختر الخدمة المناسبة لك
            </Paragraph>
          </YStack>

          {data && data.length > 0 ? (
            data.map((service: any) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() =>
                  navigator.navigate("ServiceDetails", {
                    serviceId: service.id,
                  })
                }
              />
            ))
          ) : (
            <YStack
              alignItems="center"
              mt="$10"
              p="$6"
              bg="$card"
              br="$4"
              borderWidth={1}
              borderColor="$cardBorder"
            >
              <Paragraph
                textAlign="center"
                color="$gray500"
                fontFamily="$body"
                size="$5"
              >
                لا توجد خدمات متاحة حالياً في هذا القسم
              </Paragraph>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryServicesScreen;
