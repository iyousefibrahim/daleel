import { colors } from "@/app/constants/tamagui.config";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Accordion,
  Paragraph,
  Separator,
  Switch,
  XStack,
  YStack,
} from "tamagui";
import RequirementItem from "../../services/components/RequirementItem";

type TripStepItemProps = {
  step: any;
  isExpanded: boolean;
  completeRequirement: (tripStepId: string) => void;
  uncompleteRequirement: (tripStepId: string) => void;
};

const TripStepItem = React.memo(function TripStepItem({
  step,
  isExpanded,
  completeRequirement,
  uncompleteRequirement,
}: TripStepItemProps) {
  const [checked, setChecked] = useState(false);
  const isCompleted = step.is_fully_completed;
  return (
    <Accordion.Item
      value={step.id}
      bg={colors.gray50}
      br="$5"
      overflow="hidden"
    >
      <Accordion.Trigger
        borderWidth={0}
        backgroundColor="transparent"
        p={0}
        unstyled
      >
        <XStack
          p="$4"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row-reverse"
          width="100%"
        >
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={colors.gray600}
          />

          {/* Text Content */}
          <YStack f={1} mr="$3" gap="$1">
            <Paragraph fontSize={14} color={colors.gray900} textAlign="right">
              {step.step_number}. {step.title}
            </Paragraph>
          </YStack>

          {/* Status Icon */}
          <YStack
            bg={isCompleted ? colors.success : "transparent"}
            br={20}
            w={30}
            h={30}
            alignItems="center"
            justifyContent="center"
            onPress={() => {
              if (isCompleted) {
                uncompleteRequirement(step.id);
              } else {
                completeRequirement(step.id);
              }
            }}
          >
            {isCompleted ? (
              <Ionicons name="checkmark" size={18} color="white" />
            ) : (
              <Ionicons
                name="ellipse-outline"
                size={32}
                color={colors.gray500}
              />
            )}
          </YStack>
        </XStack>
      </Accordion.Trigger>

      <Accordion.Content>
        <YStack flex={1} px="$1">
          {/* Info Box */}
          <YStack gap="$4">
            {step.trip_steps_requirements &&
              step.trip_steps_requirements.length > 0 &&
              step.trip_steps_requirements.map((req: any) => (
                <YStack gap="$4" key={req.id}>
                  <RequirementItem
                    key={req.id}
                    icon_url={req.icon_url}
                    title={req.title}
                    notes={req.notes}
                    iconBg={req.background_color}
                  />
                </YStack>
              ))}

            <Separator borderColor={colors.gray200} />

            {/* Problem with toggle + must edit Supbase Database function */}
            {/* Toggle */}
            {/* <XStack
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row-reverse"
            >
              <Paragraph fontSize={14} color={colors.gray600}>
                لا أحتاج هذه الخطوة
              </Paragraph>
              <Switch
                size="$5"
                checked={checked}
                onCheckedChange={setChecked}
                backgroundColor={checked ? colors.primary500 : colors.gray300}
              >
                <Switch.Thumb />
              </Switch>
            </XStack> */}

          </YStack>
        </YStack>
      </Accordion.Content>
    </Accordion.Item>
  );
});

export default TripStepItem;
