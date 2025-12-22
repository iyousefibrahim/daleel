import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Paragraph, ScrollView, YStack, Image, XStack, Button } from "tamagui";
import { useState } from "react";
import BackButton from "@/app/components/BackButton";
import useServices from "@/app/features/services/hooks/useServices";
import { colors } from "@/app/constants/tamagui.config";
import Loader from "@/app/components/Loader";
import { Ionicons } from "@expo/vector-icons";

const ServiceDetailsScreen = () => {
  const route = useRoute();
  const { serviceId } = route.params as { serviceId: string };
  const { getServiceByIdQuery } = useServices();
  const { data, isLoading, isError } = getServiceByIdQuery(serviceId);
  const [activeTab, setActiveTab] = useState<
    "details" | "requirements" | "steps"
  >("details");

  if (isLoading) return <Loader message="جاري تحميل الخدمة..." />;
  if (isError || !data) return <Paragraph>حدث خطأ، حاول مرة أخرى.</Paragraph>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray50 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero Image */}
        <YStack
          position="relative"
          height={240}
          backgroundColor={colors.gray200}
        >
          <Image
            source={{
              uri: data.image_url || "https://via.placeholder.com/400x240",
            }}
            width="100%"
            height={240}
          />
          <YStack position="absolute" top="$4" left="$4" right="$4">
            <XStack justifyContent="space-between">
              <BackButton />
              <XStack gap="$2">
                <Button
                  circular
                  size="$4"
                  backgroundColor="rgba(255,255,255,0.9)"
                  pressStyle={{ scale: 0.95 }}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={colors.gray900}
                  />
                </Button>
                <Button
                  circular
                  size="$4"
                  backgroundColor="rgba(255,255,255,0.9)"
                  pressStyle={{ scale: 0.95 }}
                >
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color={colors.gray900}
                  />
                </Button>
              </XStack>
            </XStack>
          </YStack>
        </YStack>

        {/* Title Section */}
        <YStack
          p="$4"
          backgroundColor={colors.white}
          borderBottomWidth={1}
          borderBottomColor={colors.gray200}
        >
          <XStack
            justifyContent="space-between"
            alignItems="flex-start"
            mb="$2"
          >
            <Paragraph
              size="$8"
              fontWeight="700"
              color={colors.gray900}
              textAlign="left"
              flex={1}
            >
              {data.name}
            </Paragraph>
          </XStack>

          <XStack gap="$3" alignItems="center" justifyContent="flex-end">
            <XStack gap="$1" alignItems="center">
              <Paragraph size="$5" fontWeight="600" color={colors.gray900}>
                4.8
              </Paragraph>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Paragraph size="$3" color={colors.gray500}>
                (120 تقييم)
              </Paragraph>
            </XStack>
            <XStack gap="$1" alignItems="center">
              <Paragraph size="$5" fontWeight="600" color={colors.gray900}>
                5
              </Paragraph>
              <Ionicons name="time-outline" size={16} color={colors.success} />
              <Paragraph size="$3" color={colors.gray500}>
                أيام عمل 3
              </Paragraph>
            </XStack>
          </XStack>
        </YStack>

        {/* Tabs */}
        <XStack
          backgroundColor={colors.white}
          borderBottomWidth={1}
          borderBottomColor={colors.gray200}
          height={48}
          alignItems="center"
        >
          <Button
            flex={1}
            height="100%"
            backgroundColor="transparent"
            borderBottomWidth={activeTab === "details" ? 3 : 0}
            borderBottomColor={colors.primary500}
            borderRadius={0}
            onPress={() => setActiveTab("details")}
            pressStyle={{ backgroundColor: colors.gray50 }}
          >
            <Paragraph
              size="$5"
              fontWeight={activeTab === "details" ? "600" : "400"}
              color={
                activeTab === "details" ? colors.primary500 : colors.gray600
              }
            >
              التفاصيل
            </Paragraph>
          </Button>
          <Button
            flex={1}
            height="100%"
            backgroundColor="transparent"
            borderBottomWidth={activeTab === "requirements" ? 3 : 0}
            borderBottomColor={colors.primary500}
            borderRadius={0}
            onPress={() => setActiveTab("requirements")}
            pressStyle={{ backgroundColor: colors.gray50 }}
          >
            <Paragraph
              size="$5"
              fontWeight={activeTab === "requirements" ? "600" : "400"}
              color={
                activeTab === "requirements"
                  ? colors.primary500
                  : colors.gray600
              }
            >
              المتطلبات
            </Paragraph>
          </Button>
          <Button
            flex={1}
            height="100%"
            backgroundColor="transparent"
            borderBottomWidth={activeTab === "steps" ? 3 : 0}
            borderBottomColor={colors.primary500}
            borderRadius={0}
            onPress={() => setActiveTab("steps")}
            pressStyle={{ backgroundColor: colors.gray50 }}
          >
            <Paragraph
              size="$5"
              fontWeight={activeTab === "steps" ? "600" : "400"}
              color={activeTab === "steps" ? colors.primary500 : colors.gray600}
            >
              الخطوات
            </Paragraph>
          </Button>
        </XStack>

        {/* Content */}
        <YStack p="$4" gap="$4">
          {activeTab === "details" && (
            <YStack gap="$3">
              <Paragraph
                size="$6"
                fontWeight="700"
                color={colors.gray900}
                textAlign="right"
              >
                نبذة عن الخدمة
              </Paragraph>
              <Paragraph
                size="$5"
                lineHeight="$6"
                color={colors.gray700}
                textAlign="right"
              >
                {data.description ||
                  "هذه الخدمة تتيح لك تجديد رخصة القيادة الخاصة بك إلكترونياً وبكل سهولة. تشمل الخدمة الفحص الطبي المعتمد، وتحديث البيانات في الأنظمة الحكومية، وإيصال الرخصة الجديدة إلى عنوانك الوطني."}
              </Paragraph>
            </YStack>
          )}

          {activeTab === "requirements" && (
            <YStack gap="$4">
              <Paragraph
                size="$6"
                fontWeight="700"
                color={colors.gray900}
                textAlign="right"
              >
                المتطلبات الأساسية
              </Paragraph>

              <RequirementItem
                iconName="checkmark-circle"
                title="صورة الرخصة الوطنية"
                subtitle="يجب أن تكون سارية المفعول"
                iconBg={colors.success}
              />
              <RequirementItem
                iconName="document-text-outline"
                title="نتيجة الفحص الطبي"
                subtitle="من مركز معتمد خلال آخر 3 أشهر"
                iconBg={colors.success}
              />
              <RequirementItem
                iconName="card-outline"
                title="سداد رسوم التجديد"
                subtitle="عبر طرق الدفع المتوفرة"
                iconBg={colors.info}
              />

              <Paragraph
                size="$5"
                fontWeight="600"
                color={colors.gray900}
                textAlign="right"
                mt="$3"
              >
                صور توضيحية
              </Paragraph>

              <XStack gap="$3" flexWrap="wrap">
                <ImageCard
                  title="الدفع أولاً"
                  image="https://via.placeholder.com/120x160"
                  badge="عرض الكل"
                />
                <ImageCard
                  title="الفحص الطبي"
                  image="https://via.placeholder.com/120x160"
                />
                <ImageCard
                  title="استلام البطاقة"
                  image="https://via.placeholder.com/120x160"
                />
              </XStack>
            </YStack>
          )}

          {activeTab === "steps" && (
            <YStack gap="$4">
              <Paragraph
                size="$6"
                fontWeight="700"
                color={colors.gray900}
                textAlign="right"
              >
                خطوات الخدمة
              </Paragraph>

              <StepItem
                number={1}
                title="تقديم الطلب"
                description="قم بتعبئة النموذج الإلكتروني ورفع المستندات المطلوبة عبر التطبيق."
              />
              <StepItem
                number={2}
                title="مراجعة البيانات"
                description="سيقوم الفريق المختص بمراجعة طلبك والتأكد من صحة المستندات خلال 24 ساعة."
              />
              <StepItem
                number={3}
                title="استلام الرخصة"
                description="سيتم توصيل الرخصة الجديدة إلى عنوانك الوطني المسجل."
              />
            </YStack>
          )}
        </YStack>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        backgroundColor={colors.white}
        p="$4"
        borderTopWidth={1}
        borderTopColor={colors.gray200}
      >
        <Button
          width="100%"
          height={56}
          backgroundColor={colors.primary500}
          borderRadius="$3"
          pressStyle={{ backgroundColor: colors.primary700, scale: 0.98 }}
        >
          <XStack gap="$2" alignItems="center">
            <Paragraph size="$5" fontWeight="700" color={colors.white}>
              ابدأ الخدمة الآن
            </Paragraph>
            <Ionicons name="arrow-back-circle" size={24} color={colors.white} />
          </XStack>
        </Button>
      </YStack>
    </SafeAreaView>
  );
};

const RequirementItem = ({
  iconName,
  title,
  subtitle,
  iconBg,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  iconBg: string;
}) => (
  <XStack gap="$3" alignItems="flex-start">
    <YStack flex={1} alignItems="flex-end" gap="$1">
      <Paragraph
        size="$5"
        fontWeight="600"
        color={colors.gray900}
        textAlign="right"
      >
        {title}
      </Paragraph>
      <Paragraph size="$4" color={colors.gray600} textAlign="right">
        {subtitle}
      </Paragraph>
    </YStack>
    <YStack
      width={48}
      height={48}
      backgroundColor={`${iconBg}15`}
      borderRadius="$3"
      justifyContent="center"
      alignItems="center"
    >
      <Ionicons name={iconName} size={24} color={iconBg} />
    </YStack>
  </XStack>
);

const ImageCard = ({
  title,
  image,
  badge,
}: {
  title: string;
  image: string;
  badge?: string;
}) => (
  <YStack width={110} gap="$2">
    <YStack position="relative" borderRadius="$3" overflow="hidden">
      <Image
        source={{ uri: image }}
        width={110}
        height={140}
        resizeMode="cover"
      />
      {badge && (
        <YStack
          position="absolute"
          top="$2"
          left="$2"
          backgroundColor={colors.primary500}
          px="$2"
          py="$1"
          borderRadius="$2"
        >
          <Paragraph size="$2" fontWeight="600" color={colors.white}>
            {badge}
          </Paragraph>
        </YStack>
      )}
    </YStack>
    <Paragraph
      size="$4"
      fontWeight="500"
      color={colors.gray900}
      textAlign="center"
    >
      {title}
    </Paragraph>
  </YStack>
);

const StepItem = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <XStack gap="$3" alignItems="flex-start">
    <YStack flex={1} gap="$2" alignItems="flex-end">
      <Paragraph
        size="$5"
        fontWeight="600"
        color={colors.gray900}
        textAlign="right"
      >
        {title}
      </Paragraph>
      <Paragraph
        size="$4"
        color={colors.gray600}
        textAlign="right"
        lineHeight="$5"
      >
        {description}
      </Paragraph>
    </YStack>
    <YStack
      width={40}
      height={40}
      backgroundColor={colors.primary500}
      borderRadius={20}
      justifyContent="center"
      alignItems="center"
    >
      <Paragraph size="$6" fontWeight="700" color={colors.white}>
        {number}
      </Paragraph>
    </YStack>
  </XStack>
);

export default ServiceDetailsScreen;
