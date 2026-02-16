import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { colors } from "../constants/tamagui.config";

type Props = {
  color?: string;
  size?: number;
};

const BackButton = ({ color = colors.primary500, size = 45 }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ alignItems: "flex-start" }}
    >
      <Ionicons name="arrow-forward-circle" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default BackButton;
