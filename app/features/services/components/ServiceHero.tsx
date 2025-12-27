import BackButton from "@/app/components/BackButton";
import { colors } from "@/app/constants/tamagui.config";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { Button, Image, XStack, YStack } from "tamagui";

interface ServiceHeroProps {
  imageUrl?: string;
  onShare: () => void;
}

const ServiceHero = ({ imageUrl, onShare }: ServiceHeroProps) => {
  return (
    <YStack position="relative" height={240} backgroundColor={colors.gray200}>
      <Image
        source={{
          uri: imageUrl,
        }}
        width="100%"
        height={240}
      />
      <YStack
        position="absolute"
        top={Platform.OS === "ios" ? "$4" : "$10"}
        left="$4"
        right="$4"
      >
        <XStack justifyContent="space-between">
          <BackButton />
          <XStack gap="$2">
            <Button
              onPress={onShare}
              circular
              size="$9"
              backgroundColor="rgba(255,255,255,0.9)"
              pressStyle={{ scale: 0.95 }}
            >
              <Ionicons
                name="share-social-outline"
                size={25}
                color={colors.primary700}
              />
            </Button>
          </XStack>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default ServiceHero;
