import ActionFooter from "@/app/components/ActionFooter";
import CurrentDate from "@/app/components/CurrentDate";
import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import NoData from "@/app/components/NoData";
import TripStepItem from "@/app/features/trips/components/TripStepItem";
import useTrips from "@/app/features/trips/hooks/useTrips";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Accordion, Paragraph, useTheme, XStack, YStack } from "tamagui";
import BackButton from "../../components/BackButton";
import { colors } from "../../constants/tamagui.config";
import HolidayBadge from "@/app/components/HolidayBadge";
import { formatDateWithWeekday } from "@/app/lib/utils/dateUtils";

export default function TripDetailsScreen() {
  const [expandedId, setExpandedId] = useState<string>("5");
  const route = useRoute();
  const theme = useTheme();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { tripId } = route.params as { tripId: string };

  const {
    getTripByIdQuery,
    getTripStepsQuery,
    areAllTripStepsCompletedQuery,
    completeStepRequirementMutation,
    uncompleteStepRequirementMutation,
    completeTripMutation,
  } = useTrips();
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

  const completeRequirement = useCallback(
    (tripStepId: string) => {
      completeStepRequirementMutation.mutate(tripStepId, {
        onSuccess: () => {
          refetchSteps();
          // Invalidate the allStepsCompleted query to update button state
          queryClient.invalidateQueries({
            queryKey: ["trips", "allStepsCompleted", tripId],
          });
          console.log("completed requirement for ", tripStepId);
        },
        onError: (error) => {
          console.log("error completing requirement for ", tripStepId, error);
        },
      });
    },
    [completeStepRequirementMutation, refetchSteps, queryClient, tripId]
  );

  const uncompleteRequirement = useCallback(
    (tripStepId: string) => {
      uncompleteStepRequirementMutation.mutate(tripStepId, {
        onSuccess: () => {
          refetchSteps();
          // Invalidate the allStepsCompleted query to update button state
          queryClient.invalidateQueries({
            queryKey: ["trips", "allStepsCompleted", tripId],
          });
          console.log("uncompleted requirement for ", tripStepId);
        },
        onError: (error) => {
          console.log("error uncompleting requirement for ", tripStepId, error);
        },
      });
    },
    [uncompleteStepRequirementMutation, refetchSteps, queryClient, tripId]
  );

  const completeTrip = useCallback(() => {
    completeTripMutation.mutate(tripId, {
      onSuccess: () => {
        refetchTrip();
        console.log("completed trip for ", tripId);
        navigation.goBack();
      },
      onError: (error) => {
        console.log("error completing trip for ", tripId, error);
      },
    });
  }, [completeTripMutation, refetchTrip]);

  // Check if all requirements are completed
  const {
    data: allRequirementsCompletedData,
    isLoading: isAllRequirementsCompletedLoading,
    isError: isAllRequirementsCompletedError,
  } = areAllTripStepsCompletedQuery(tripId);

  const trip = tripData?.[0];
  const steps = stepsData;

  const handleRetry = useCallback(() => {
    refetchTrip();
    refetchSteps();
  }, [refetchTrip, refetchSteps]);

  if (isAllRequirementsCompletedLoading || isTripLoading || isStepsLoading) {
    return <Loader message="جاري تحميل تفاصيل المشوار..." />;
  }

  if (isTripError || isStepsError || !trip || isAllRequirementsCompletedError) {
    return (
      <Error
        message="حدث خطأ أثناء تحميل تفاصيل المشوار"
        onClick={handleRetry}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
          backgroundColor: theme.background.get(),
        }}
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
            <HolidayBadge />
          </XStack>
        </XStack>

        {/* Main Title */}
        <YStack px="$4" mt="$2" mb="$6">
          <Paragraph fontSize={24} color={colors.gray900} textAlign="left">
            {trip.service_name}
          </Paragraph>
          <Paragraph fontSize={14} color={colors.gray500} textAlign="left">
            تم بدء الخدمة في: {formatDateWithWeekday(new Date(trip.created_at))}
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
                  completeRequirement={completeRequirement}
                  uncompleteRequirement={uncompleteRequirement}
                />
              );
            })
          ) : (
            <NoData message="لا يوجد خطوات لهذا المشوار" />
          )}
        </Accordion>
      </ScrollView>
      {/* Footer */}
      <YStack position="absolute" bottom={0} left={0} right={0}>
        <ActionFooter
          onPress={completeTrip}
          isLoading={completeTripMutation.isPending}
          text="إكمال المشوار"
          icon="arrow-back-circle"
          disabled={!allRequirementsCompletedData}
        />
      </YStack>
    </SafeAreaView>
  );
}
