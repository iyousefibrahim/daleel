import { Input, XStack } from "tamagui";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/app/constants/tamagui.config";

const Search = () => {
  return (
    <XStack
      width="100%"
      alignItems="center"
      bg="$white"
      borderWidth={1.5}
      borderColor="$gray300"
      borderRadius="$4"
      px="$4"
      py="$1"
      marginBottom={24}
    >
      <Feather
        name="search"
        style={{ paddingBottom: 1 }}
        size={22}
        color={colors.gray500}
      />

      <Input
        flex={1}
        placeholder="اكتب مشوارك تجديد بطاقة رخصة، قيد عائلي"
        placeholderTextColor="$gray500"
        autoCapitalize="none"
        bg="transparent"
        color="$color4"
        borderWidth={0}
        px="$3"
        textAlign="right"
        height="$12"
        fontSize={16}
        focusStyle={{
          borderColor: "$primary500",
        }}
      />
    </XStack>
  );
};

export default Search;
