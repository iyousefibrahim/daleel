import { H4, XStack, YStack, SizableText, useTheme } from "tamagui";

import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome6,
} from "@expo/vector-icons";

const missions = [
  {
    title: "الزواج",
    icon: MaterialCommunityIcons,
    iconName: "ring",
    colorToken: "error",
    bgColorToken: "",
  },
  {
    title: "التخرج الجامعي",
    icon: FontAwesome5,
    iconName: "graduation-cap",
    colorToken: "accent",
    bgColorToken: "mint100",
  },
  {
    title: "السفر للخارج",
    icon: Ionicons,
    iconName: "globe-outline",
    colorToken: "info",
    bgColorToken: "infoBackground",
  },
  {
    title: "ترخيص السيارات",
    icon: Ionicons,
    iconName: "car-sport-outline",
    colorToken: "warning",
    bgColorToken: "warningBackground",
  },
  {
    title: "الجيش",
    icon: FontAwesome6,
    iconName: "person-military-rifle",
    colorToken: "primary800",
    bgColorToken: "primary50",
  },
  {
    title: "المزيد",
    icon: Entypo,
    iconName: "dots-three-horizontal",
    colorToken: "gray600",
    bgColorToken: "gray100",
  },
];

const DiscoverNewMissions = () => {
  const theme = useTheme();

  return (
    <YStack flex={1} pt="$4">
      <H4
        fontFamily="$heading"
        color="$gray700"
        fontSize="$6"
        fontWeight="700"
        mb="$4"
        textAlign="left"
      >
        اكتشف مشاوير جديدة
      </H4>

      {/* Grid */}
      <XStack
        width="100%"
        flexWrap="wrap"
        justifyContent="space-between"
        rowGap="$4"
      >
        {missions.map((mission, index) => {
          const iconColor =
            (theme[mission.colorToken] as any)?.val || theme.gray900.val;

          const iconBg =
            (theme[mission.bgColorToken] as any)?.val || theme.gray100.val;

          const IconComponent = mission.icon;

          return (
            <YStack
              key={index}
              width="32%"
              aspectRatio={1}
              backgroundColor="$background"
              borderRadius="$4"
              alignItems="center"
              justifyContent="center"
              padding="$3"
              shadowColor="$shadowColor"
              shadowOpacity={0.05}
              shadowRadius={4}
              elevation={1}
            >
              {/* Icon with background */}
              <YStack
                width={56}
                height={56}
                borderRadius={28} // دائرة
                backgroundColor={iconBg}
                alignItems="center"
                justifyContent="center"
                mb="$3"
              >
                <IconComponent
                  name={mission.iconName}
                  size={26}
                  color={iconColor}
                />
              </YStack>

              {/* Title */}
              <SizableText
                fontFamily="$body"
                color="$gray900"
                fontSize="$3"
                fontWeight="600"
                textAlign="center"
                numberOfLines={2}
              >
                {mission.title}
              </SizableText>
            </YStack>
          );
        })}
      </XStack>
    </YStack>
  );
};

export default DiscoverNewMissions;
