import CircularProgressRing from "@/app/components/CircularProgressRing";
import Error from "@/app/components/Error";
import { formatDateWithWeekday } from "@/app/lib/utils/dateUtils";
import { AuthenticatedNavigatorParamList } from "@/app/types/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { Button, H4, Paragraph, SizableText, XStack, YStack } from "tamagui";
import useTrips from "../hooks/useTrips";

type NavigationProp = BottomTabNavigationProp<
  AuthenticatedNavigatorParamList,
  "Home"
>;

const CurrentTrip = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getCurrentUserTripQuery } = useTrips();
  const { data: trip, isLoading, isError } = getCurrentUserTripQuery;

  const handleShowAll = useCallback(() => {
    navigation.navigate("TripsNavigator");
  }, [navigation]);

  const currentTrip = useMemo(() => {
    return trip;
  }, [trip]);

  if (isError) {
    return <Error message="حدث خطأ أثناء تحميل المشاوير" />;
  }

  if (!currentTrip) {
    return null;
  }

  return (
    <YStack width="100%">
      <XStack
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$4"
      >
        <H4
          fontFamily="$heading"
          color="$gray700"
          fontSize="$6"
          fontWeight="700"
        >
          مشاويري الحالية
        </H4>
        <Button
          variant="outlined"
          size="$6"
          height={"100%"}
          onPress={handleShowAll}
          backgroundColor="$primary50"
          borderWidth={0}
          paddingHorizontal={10}
        >
          <SizableText
            fontFamily="$body"
            color="$primary500"
            fontSize="$5"
            fontWeight="700"
            lineHeight={40}
          >
            إظهار الكل
          </SizableText>
        </Button>
      </XStack>

      {/* Current Task Card */}
      <YStack
        backgroundColor="$card"
        padding="$4"
        shadowColor="$shadowColor"
        shadowOpacity={0.1}
        elevation={3}
        width="100%"
      >
        <XStack width="100%" alignItems="center" justifyContent="space-between">
          <CircularProgressRing
            value={currentTrip.completion_percentage || 0}
            total={100}
            showText={true}
            size={65}
            fontSize={13}
            strokeWidth={6}
          />
          <YStack alignItems="flex-start" flex={1} marginStart="$4">
            <H4
              fontFamily="$heading"
              color="$primary800"
              fontSize="$4"
              width={"100%"}
              fontWeight="700"
              textAlign="left"
            >
              {currentTrip.service_name}
            </H4>
            <Paragraph fontFamily="$body" color="$gray600" fontSize="$3">
              {currentTrip.created_at
                ? formatDateWithWeekday(new Date(currentTrip.created_at))
                : ""}
            </Paragraph>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default CurrentTrip;
