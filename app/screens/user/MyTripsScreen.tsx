import CircularProgressRing from "@/app/components/CircularProgressRing";
import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import useTrips from "@/app/features/trips/hooks/useTrips";
import { TripStatus } from "@/app/types/types";
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

const MyTripsScreen = () => {
  const { getAllTripsQuery } = useTrips();
  const theme = useTheme();

  const handleRetry = () => {
    getAllTripsQuery.refetch();
  };

  if (getAllTripsQuery.isLoading) {
    return <Loader message="جاري تحميل مشاويرك..." />;
  }

  if (getAllTripsQuery.isError || !getAllTripsQuery.data) {
    return <Error message="حدث خطأ، حاول مرة أخرى." onClick={handleRetry} />;
  }

  const trips = getAllTripsQuery.data;

  const getStatusText = (status: TripStatus) => {
    switch (status) {
      case "in_progress":
        return "جاري التنفيذ";
      case "completed":
        return "مكتمل";
      case "cancelled":
        return "ملغي";
    }
  };

  const getStatusColor = (status: TripStatus) => {
    switch (status) {
      case "in_progress":
        return "$primary500";
      case "completed":
        return "$success";
      case "cancelled":
        return "$error";
    }
  };

  const getStatusBgColor = (status: TripStatus) => {
    switch (status) {
      case "in_progress":
        return "$primary50";
      case "completed":
        return "$successBackground";
      case "cancelled":
        return "$errorBackground";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const handleTripPress = (tripId: string) => {
    // navigation.navigate("TripDetails", { tripId });
  };

  return (
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

        {/* Trips List */}
        <YStack px="$4" gap="$3" paddingBottom="$6">
          {trips.map((trip) => (
            <YStack
              key={trip.id}
              backgroundColor="$card"
              padding="$4"
              borderRadius="$3"
              shadowColor="$shadowColor"
              shadowOpacity={0.1}
              elevation={2}
              pressStyle={{
                backgroundColor: "$cardHover",
                scale: 0.98,
              }}
              onPress={() => handleTripPress(trip.id)}
            >
              <XStack
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                {/* Progress Ring */}
                <CircularProgressRing
                  value={trip.completion_percentage || 0}
                  total={100}
                />

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
                      {formatDate(trip.created_at)}
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
                <YStack alignItems="center">
                  <SizableText
                    fontFamily="$body"
                    color="$primary500"
                    fontSize="$6"
                    fontWeight="700"
                  >
                    {trip.completion_percentage || 0}%
                  </SizableText>
                  <SizableText
                    fontFamily="$body"
                    color="$gray500"
                    fontSize="$2"
                  >
                    مكتمل
                  </SizableText>
                </YStack>
              </XStack>
            </YStack>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyTripsScreen;
