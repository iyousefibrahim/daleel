import { H4, XStack, YStack, Button, SizableText, Paragraph } from "tamagui";
import CircularProgressRing from "./CircularProgressRing";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { type AuthenticatedNavigatorParamList } from "../types/types";

type NavigationProp = BottomTabNavigationProp<
  AuthenticatedNavigatorParamList,
  "Home"
>;

const CurrentTasks = () => {
  const navigation = useNavigation<NavigationProp>();
  const handleShowAll = () => {
    navigation.navigate("MyTrips");
  };

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
          <CircularProgressRing value={1} total={5} />
          <YStack alignItems="flex-start" flex={1} marginStart="$4">
            <H4
              fontFamily="$heading"
              color="$primary800"
              fontSize="$4"
              width={"100%"}
              fontWeight="700"
              textAlign="left"
            >
              تجديد جواز السفر
            </H4>
            <Paragraph
              fontFamily="$body"
              color="$gray600"
              fontSize="$3"
              marginBottom="$2"
            >
              الاثنين 4 أغسطس
            </Paragraph>
            <Paragraph
              fontFamily="$body"
              color="$gray900"
              fontSize="$4"
              fontWeight="500"
            >
              4. إحضار كعب العمل - مكتب العمل
            </Paragraph>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default CurrentTasks;
