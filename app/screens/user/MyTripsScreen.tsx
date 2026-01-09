import CircularProgressRing from "@/app/components/CircularProgressRing";
import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import NoData from "@/app/components/NoData";
import useTrips from "@/app/features/trips/hooks/useTrips";
import { formatDateWithWeekday } from "@/app/lib/utils/dateUtils";
import { TripsStackParamList } from "@/app/navigation/TripsStackNavigator";
import { TripStatus } from "@/app/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  H3,
  H4,
  Paragraph,
  ScrollView,
  SizableText,
  useTheme,
  XStack,
  YStack,
} from "tamagui";

interface MyTripsScreenProps {
  navigation: NativeStackNavigationProp<TripsStackParamList, "MyTripsList">;
}

const getStatusText = (status?: TripStatus) => {
  switch (status) {
    case "in_progress":
      return "جاري التنفيذ";
    case "completed":
      return "مكتمل";
    case "cancelled":
      return "ملغي";
    default:
      return "جاري التنفيذ";
  }
};

const getStatusColor = (status?: TripStatus) => {
  switch (status) {
    case "in_progress":
      return "$primary500";
    case "completed":
      return "$success";
    case "cancelled":
      return "$error";
    default:
      return "$primary500";
  }
};

const getStatusBgColor = (status?: TripStatus) => {
  switch (status) {
    case "in_progress":
      return "$primary50";
    case "completed":
      return "$white";
    case "cancelled":
      return "$errorBackground";
    default:
      return "$primary50";
  }
};

const MyTripsScreen = ({ navigation }: MyTripsScreenProps) => {
  const { getAllTripsQuery, deleteTripMutation } = useTrips();
  const { data, isLoading, isError } = getAllTripsQuery;
  const swipeRefs = useRef<{ [key: string]: boolean }>({});

  const theme = useTheme();

  const handleRetry = () => {
    getAllTripsQuery.refetch();
  };

  if (isLoading) {
    return <Loader message="جاري تحميل مشاويرك..." />;
  }

  if (isError || !data) {
    return <Error message="حدث خطأ، حاول مرة أخرى." onClick={handleRetry} />;
  }

  const trips = data;

  const handleTripPress = (tripId: string) => {
    // Only navigate if not currently swiping
    if (!swipeRefs.current[tripId]) {
      navigation.navigate("TripDetails", { tripId });
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    deleteTripMutation.mutate(tripId);
  };

  const renderRightActions = (tripId: string) => {
    return (
      <Animated.View>
        <TouchableOpacity
          onPress={() => handleDeleteTrip(tripId)}
          style={{
            backgroundColor: theme.error.get(),
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: "100%",
            borderRadius: 12,
            marginLeft: 8,
          }}
        >
          <SizableText
            color="$white"
            fontSize="$4"
            fontWeight="700"
            fontFamily="$body"
          >
            حذف الرحلة
          </SizableText>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ backgroundColor: theme.background.get() }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <YStack px="$4" pb="$3">
            <H3
              fontFamily="$heading"
              color="$gray900"
              fontSize="$8"
              fontWeight="700"
              marginBottom="$2"
              textAlign="left"
            >
              مشاويري
            </H3>
            <Paragraph
              textAlign="left"
              fontFamily="$body"
              color="$gray600"
              fontSize="$4"
            >
              تتبع جميع مشاويرك ومهامك
            </Paragraph>
          </YStack>

          <YStack px="$4" gap="$3" paddingBottom="$6">
            {trips && trips?.length > 0 ? (
              trips.map((trip) => (
                <Swipeable
                  key={trip.id}
                  renderRightActions={() => renderRightActions(trip.id!)}
                  overshootRight={false}
                  onSwipeableWillOpen={() => {
                    swipeRefs.current[trip.id!] = true;
                  }}
                  onSwipeableClose={() => {
                    // Delay resetting to prevent press during close animation
                    setTimeout(() => {
                      swipeRefs.current[trip.id!] = false;
                    }, 100);
                  }}
                >
                  <YStack
                    disabled={trip.status === "completed"}
                    backgroundColor={
                      trip.status === "completed"
                        ? "$successBackground"
                        : "$card"
                    }
                    padding="$4"
                    borderRadius="$3"
                    shadowColor="$shadowColor"
                    shadowOpacity={0.1}
                    elevation={2}
                    pressStyle={{
                      backgroundColor: "$cardHover",
                      scale: 0.98,
                    }}
                    onPress={() => trip.id && handleTripPress(trip.id)}
                  >
                    <XStack
                      width="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {/* Trip Info */}
                      <YStack alignItems="flex-start" flex={1} marginStart="$4">
                        <H4
                          fontFamily="$heading"
                          color="$primary800"
                          fontSize="$5"
                          fontWeight="700"
                          textAlign="left"
                          marginBottom="$1"
                          w="100%"
                        >
                          {trip.service_name}
                        </H4>

                        {trip.created_at && (
                          <Paragraph
                            fontFamily="$body"
                            color="$gray600"
                            fontSize="$3"
                            marginBottom="$2"
                          >
                            {formatDateWithWeekday(new Date(trip.created_at))}
                          </Paragraph>
                        )}

                        {/* Status Badge */}
                        <XStack
                          backgroundColor={getStatusBgColor(trip.status)}
                          paddingHorizontal="$3"
                          paddingVertical="$1"
                          borderRadius="$2"
                        >
                          <SizableText
                            fontFamily="$body"
                            color={getStatusColor(trip.status)}
                            fontSize="$3"
                            fontWeight="600"
                          >
                            {getStatusText(trip.status)}
                          </SizableText>
                        </XStack>
                      </YStack>

                      {/* Completion Percentage */}
                      {/* Progress Ring */}
                      <CircularProgressRing
                        value={trip.completion_percentage || 0}
                        total={100}
                        showText={true}
                        fontSize={14}
                        size={65}
                        strokeWidth={6}
                      />
                    </XStack>
                  </YStack>
                </Swipeable>
              ))
            ) : (
              <NoData message="لا يوجد مشاوير حالياً" iconName="bookmark" />
            )}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MyTripsScreen;
