import { colors } from "@/app/constants/tamagui.config";
import useCategories from "@/app/features/categories/hooks/useCategories";
import useServices from "@/app/features/services/hooks/useServices";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { Input, ScrollView, SizableText, XStack, YStack } from "tamagui";
import { AuthenticatedNavigatorParamList } from "../types/types";

interface SearchProps {
  placeholder: string;
}

const Search = ({ placeholder }: SearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const { searchServicesQuery } = useServices();
  const { searchCategoriesQuery } = useCategories();

  const { data: services = [], isLoading: isLoadingServices } =
    searchServicesQuery(debouncedSearchText);
  const { data: categories = [], isLoading: isLoadingCategories } =
    searchCategoriesQuery(debouncedSearchText);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthenticatedNavigatorParamList>>();

  const isLoading = isLoadingServices || isLoadingCategories;
  const hasResults = services.length > 0 || categories.length > 0;

  const handleCancel = () => {
    setSearchText("");
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const handleItemPress = (item: any, type: "service" | "category") => {
    setSearchText(item.name);
    setIsFocused(false);
    Keyboard.dismiss();

    if (type === "category") {
      (navigation as any).navigate("Services", {
        screen: "CategoryServices",
        params: { categoryId: item.id },
      });
    } else {
      (navigation as any).navigate("Services", {
        screen: "ServiceDetails",
        params: { serviceId: item.id },
      });
    }
  };

  const renderItem = (item: any, type: "service" | "category") => (
    <TouchableOpacity
      key={`${type}-${item.id}`}
      onPress={() => handleItemPress(item, type)}
    >
      <XStack
        padding="$3"
        borderBottomWidth={1}
        borderBottomColor="$gray100"
        alignItems="center"
        gap="$3"
      >
        <Feather name="arrow-up-left" size={16} color={colors.gray300} />
        <YStack flex={1} alignItems="flex-end">
          <SizableText color="$gray800" fontSize="$4" fontWeight="600">
            {item.name}
          </SizableText>
          <SizableText color="$gray500" fontSize="$2">
            {type === "service" ? "خدمة" : "قسم"}
          </SizableText>
        </YStack>
        <Feather
          name={type === "service" ? "file-text" : "grid"}
          size={18}
          color={colors.gray400}
        />
      </XStack>
    </TouchableOpacity>
  );

  const shouldShowResults = isFocused && debouncedSearchText.trim();

  return (
    <YStack zIndex={100} width="100%" marginBottom={24}>
      <XStack
        width="100%"
        alignItems="center"
        bg="$white"
        borderWidth={1.5}
        borderColor={isFocused ? "$primary500" : "$gray300"}
        borderRadius="$4"
        px="$4"
        py="$1"
      >
        <Feather
          name="search"
          size={22}
          color={isFocused ? colors.primary500 : colors.gray500}
        />

        <Input
          flex={1}
          placeholder={placeholder}
          placeholderTextColor="$gray500"
          autoCapitalize="none"
          bg="transparent"
          color="$black"
          borderWidth={0}
          px="$3"
          textAlign="right"
          height="$12"
          value={searchText}
          onFocus={() => setIsFocused(true)}
          onChangeText={(text: any) => setSearchText(text)}
          focusStyle={{ borderWidth: 0 }}
        />

        {isFocused && (
          <TouchableOpacity onPress={handleCancel}>
            <SizableText color="$primary500" fontSize="$3" fontWeight="600">
              إلغاء
            </SizableText>
          </TouchableOpacity>
        )}
      </XStack>

      {shouldShowResults && (
        <YStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          marginTop="$2"
          bg="$white"
          borderRadius="$4"
          shadowColor="$shadowColor"
          shadowOpacity={0.15}
          shadowRadius={10}
          elevation={5}
          overflow="hidden"
        >
          <ScrollView maxHeight={300} keyboardShouldPersistTaps="handled">
            {isLoading ? (
              <YStack padding="$4" alignItems="center">
                <SizableText color="$gray500">جاري البحث...</SizableText>
              </YStack>
            ) : hasResults ? (
              <YStack padding="$2">
                {categories.length > 0 && (
                  <YStack>
                    <SizableText
                      paddingHorizontal="$3"
                      paddingTop="$2"
                      fontSize="$3"
                      fontWeight="700"
                      color="$gray500"
                      textAlign="right"
                    >
                      أقسام
                    </SizableText>
                    {categories.map((item) => renderItem(item, "category"))}
                  </YStack>
                )}

                {services.length > 0 && (
                  <YStack>
                    <SizableText
                      paddingHorizontal="$3"
                      paddingTop="$2"
                      fontSize="$3"
                      fontWeight="700"
                      color="$gray500"
                      textAlign="right"
                    >
                      خدمات
                    </SizableText>
                    {services.map((item) => renderItem(item, "service"))}
                  </YStack>
                )}
              </YStack>
            ) : (
              <YStack padding="$4" alignItems="center">
                <SizableText color="$gray500">لا توجد نتائج</SizableText>
              </YStack>
            )}
          </ScrollView>
        </YStack>
      )}
    </YStack>
  );
};

export default Search;
