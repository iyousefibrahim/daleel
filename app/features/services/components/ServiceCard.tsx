import { Service } from "@/app/types/types";
import React from "react";
import { Card, H4, Paragraph, XStack, YStack, Image } from "tamagui";

const ServiceCard = ({
  service,
  onClick,
}: {
  service: Service;
  onClick?: () => void;
}) => {
  return (
    <Card
      elevate
      size="$4"
      bordered
      pressStyle={{
        scale: 0.98,
        borderColor: "$primary",
      }}
      hoverStyle={{
        borderColor: "$primary",
        shadowColor: "$shadowColorHover",
        y: -2,
      }}
      bg="$card"
      br="$4"
      borderWidth={1}
      borderColor="$cardBorder"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      onPress={onClick}
    >
      <Card.Header p="$4">
        <XStack gap="$3">
          <YStack f={1} gap="$1">
            <H4
              color="$gray900"
              fontFamily="$heading"
              fontWeight="600"
              size="$6"
              lineHeight="$6"
            >
              {service.name}
            </H4>
            <Paragraph
              color="$gray600"
              size="$3"
              fontFamily="$body"
              lineHeight="$3"
              numberOfLines={2}
            >
              {service.description}
            </Paragraph>
          </YStack>

          <YStack
            bg="$mint100"
            p="$3"
            br="$3"
            w={56}
            h={56}
            borderWidth={1}
            borderColor="$mint200"
          >
            <Image
              source={{
                uri: service.icon_url || "",
                width: 32,
                height: 32,
              }}
              w={32}
              h={32}
            />
          </YStack>
        </XStack>
      </Card.Header>
    </Card>
  );
};

export default ServiceCard;
