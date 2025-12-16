import { View, Paragraph, useTheme } from "tamagui";
import Svg, { Circle } from "react-native-svg";

const CircularProgressRing = ({
  value,
  total,
}: {
  value: number;
  total: number;
}) => {
  const theme = useTheme();

  const effectiveValue = Math.min(value, total);
  const percentage = Math.round((effectiveValue / total) * 100);

  const size = 60;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View
      width={size}
      height={size}
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Svg width={size} height={size}>
        <Circle
          stroke={theme.gray200.val}
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />

        <Circle
          stroke={theme.primary500.get()}
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>

      <Paragraph
        position="absolute"
        fontFamily="$body"
        color={theme.primary900.val}
        fontSize="$4"
        fontWeight="700"
      >
        {value}/{total}
      </Paragraph>
    </View>
  );
};

export default CircularProgressRing;
