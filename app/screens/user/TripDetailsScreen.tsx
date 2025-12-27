import CurrentDate from "@/app/components/CurrentDate";
import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import NoData from "@/app/components/NoData";
import useTrips from "@/app/features/trips/hooks/useTrips";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Accordion,
  Paragraph,
  Separator,
  Switch,
  XStack,
  YStack,
} from "tamagui";
import BackButton from "../../components/BackButton";
import { colors } from "../../constants/tamagui.config";

export default function TripDetailsScreen() {
  const [expandedId, setExpandedId] = useState<string>("5");

  const route = useRoute();
  const { tripId } = route.params as { tripId: string };

  const { getTripByIdQuery, getTripStepsQuery } = useTrips();
  const {
    data: tripData,
    isLoading: isTripLoading,
    isError: isTripError,
    refetch: refetchTrip,
  } = getTripByIdQuery(tripId);

  const {
    data: stepsData,
    isLoading: isStepsLoading,
    isError: isStepsError,
    refetch: refetchSteps,
  } = getTripStepsQuery(tripId);

  const trip = tripData?.[0];
  const steps = stepsData;

  const handleRetry = () => {
    refetchTrip();
    refetchSteps();
  };

  if (isTripLoading || isStepsLoading) {
    return <Loader message="جاري تحميل تفاصيل المشوار..." />;
  }

  if (isTripError || isStepsError || !trip) {
    return (
      <Error
        message="حدث خطأ أثناء تحميل تفاصيل المشوار"
        onClick={handleRetry}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {/* Top Header Bar */}
        <XStack
          px="$4"
          py="$2"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton />

          <XStack alignItems="center" gap="$2">
            <CurrentDate />
            {/* Handle Holidays */}
            <YStack bg="#FFF9C4" px="$2" py="$1" br="$4">
              <Paragraph color="#F57F17" fontSize={12}>
                عطلة رسمية
              </Paragraph>
            </YStack>
          </XStack>
        </XStack>

        {/* Main Title */}
        <YStack px="$4" mt="$2" mb="$6">
          <Paragraph fontSize={24} color={colors.gray900} textAlign="left">
            {trip.service_name}
          </Paragraph>
          <Paragraph fontSize={14} color={colors.gray500} textAlign="left">
            تم بدء الخدمة في:{" "}
            {new Date(trip.created_at || Date.now()).toLocaleDateString(
              "ar-EG"
            )}
          </Paragraph>
        </YStack>

        {/* List */}
        <Accordion
          type="single"
          collapsible
          value={expandedId}
          onValueChange={setExpandedId}
          width="100%"
          gap="$3"
        >
          {steps && steps.length > 0 ? (
            steps.map((step) => {
              const isExpanded = expandedId === step.id;
              return (
                <TripStepItem
                  key={step.id}
                  step={step}
                  isExpanded={isExpanded}
                />
              );
            })
          ) : (
            <NoData message="لا يوجد خطوات لهذا المشوار" />
          )}
        </Accordion>
      </ScrollView>
    </SafeAreaView>
  );
}

function TripStepItem({
  step,
  isExpanded,
}: {
  step: any;
  isExpanded: boolean;
}) {
  const [checked, setChecked] = useState(false);
  // Check if step is completed
  const isCompleted = (step as any).status === "completed";

  return (
    <Accordion.Item
      value={step.id}
      bg={colors.gray50}
      br="$5"
      overflow="hidden"
    >
      <Accordion.Trigger
        borderWidth={0}
        backgroundColor="transparent"
        p={0}
        unstyled
      >
        <XStack
          p="$4"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row-reverse"
          width="100%"
        >
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={colors.gray600}
          />

          {/* Text Content */}
          <YStack f={1} mr="$3" gap="$1">
            <Paragraph fontSize={14} color={colors.gray900} textAlign="right">
              {step.step_number}. {step.title}
            </Paragraph>
            {step.description && (
              <Paragraph fontSize={12} color={colors.gray500} textAlign="right">
                {step.description.substring(0, 50) +
                  (step.description.length > 50 ? "..." : "")}
              </Paragraph>
            )}
          </YStack>

          {/* Status Icon Replacement Inline */}
          <YStack
            bg={isCompleted ? colors.success : "transparent"}
            br={20}
            w={isCompleted ? 28 : 35}
            h={isCompleted ? 28 : 35}
            alignItems="center"
            justifyContent="center"
          >
            {isCompleted ? (
              <Ionicons name="checkmark" size={18} color="white" />
            ) : (
              <Ionicons
                name="ellipse-outline"
                size={35}
                color={colors.gray500}
              />
            )}
          </YStack>
        </XStack>
      </Accordion.Trigger>

      <Accordion.Content>
        <YStack flex={1} px="$1">
          {/* Info Box */}
          <YStack gap="$4">
            {step.description && (
              <XStack gap="$3" flexDirection="row-reverse" alignItems="center">
                <Feather name="info" size={20} color={colors.gray500} />
                <Paragraph
                  fontSize={13}
                  color={colors.gray600}
                  textAlign="right"
                >
                  {step.description}
                </Paragraph>
              </XStack>
            )}

            <Separator borderColor={colors.gray200} />

            {/* Toggle */}
            <XStack
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row-reverse"
            >
              <Paragraph fontSize={14} color={colors.gray600}>
                لا أحتاج هذه الخطوة
              </Paragraph>
              <Switch
                size="$5"
                checked={checked}
                onCheckedChange={setChecked}
                backgroundColor={checked ? colors.primary500 : colors.gray300}
              >
                <Switch.Thumb />
              </Switch>
            </XStack>
          </YStack>
        </YStack>
      </Accordion.Content>
    </Accordion.Item>
  );
}
