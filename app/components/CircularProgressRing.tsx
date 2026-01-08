import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { Paragraph, View, YStack, useTheme } from "tamagui";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressRingProps {
  value: number;
  total?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showText?: boolean;
  fontSize?: number;
}

const CircularProgressRing = ({
  value,
  total = 100,
  size = 60,
  strokeWidth = 5,
  color,
  trackColor,
  showText = false,
  fontSize = 12,
}: CircularProgressRingProps) => {
  const theme = useTheme();

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const progress = useSharedValue(0);

  useEffect(() => {
    const percentage = Math.min(Math.max(value / total, 0), 1);
    progress.value = withTiming(percentage, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [value, total]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  const primaryColor = color || theme.primary500.get();
  const secondaryColor = trackColor || theme.gray200.get();
  const textColor = theme.gray800.get();

  return (
    <View
      width={size}
      height={size}
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      {/* Background Track */}
      <Svg
        width={size}
        height={size}
        style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>

      {/* Center Text */}
      {showText && (
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
        >
          <Paragraph
            fontFamily="$body"
            fontWeight="700"
            color={textColor}
            fontSize={fontSize}
            textAlign="center"
          >
            {Math.round((value / total) * 100)}%
          </Paragraph>
        </YStack>
      )}
    </View>
  );
};

export default CircularProgressRing;
