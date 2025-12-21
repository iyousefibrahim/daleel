import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../constants/tamagui.config";
import { TouchableOpacity } from "react-native";

type Props = {
  color?: string;
  size?: number;
};

const BackButton = ({ color = colors.primary500, size = 45 }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ alignItems: "flex-start" }}
    >
      <Ionicons name="arrow-forward-circle" size={size} color={color} />
    </TouchableOpacity>
  );
};

export default BackButton;
