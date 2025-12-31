import { formatDateWithWeekday } from "@/app/lib/utils/dateUtils";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView, Sheet, YStack } from "tamagui";
import { useContributions } from "../hooks/useContributions";
import { ContributionItem } from "./ContributionItem";
import { ContributionsSheetHeader } from "./ContributionsSheetHeader";
import { ContributionsSheetInput } from "./ContributionsSheetInput";
import { ContributionsSheetTrigger } from "./ContributionsSheetTrigger";

export default function ContributionsSheet({
  serviceId,
}: {
  serviceId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [position, setPosition] = useState(0);
  const {
    addContributionMutation,
    getContributionsQuery,
    contributionsUpdatedAtQuery,
  } = useContributions(serviceId);

  const handleAddContribution = () => {
    if (!inputText.trim()) return;
    addContributionMutation.mutate(inputText);
    setInputText("");
  };

  const { data: contributions, isLoading, isError } = getContributionsQuery;

  const updatedAt = contributionsUpdatedAtQuery.data;
  const formattedUpdatedAt = updatedAt
    ? formatDateWithWeekday(new Date(updatedAt))
    : "";

  return (
    <>
      <ContributionsSheetTrigger
        onPress={() => setOpen(true)}
        count={contributions?.length || 0}
        updatedAt={formattedUpdatedAt}
      />

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 50]}
        snapPointsMode="percent"
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
        moveOnKeyboardChange
      >
        <Sheet.Overlay
          animation="medium"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          bg="$black"
          opacity={0.5}
        />

        <Sheet.Handle bg="$gray300" />

        <Sheet.Frame bg="$background" px="$3" pt="$2" pb="$5">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
          >
            <YStack f={1} gap="$4">
              <ContributionsSheetHeader
                updatedAt={formattedUpdatedAt || ""}
                count={contributions?.length || 0}
                onClose={() => setOpen(false)}
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: "$6", paddingBottom: "$5" }}
              >
                {contributions?.map((contribution) => (
                  <ContributionItem
                    key={contribution.id}
                    contribution={contribution}
                    onVote={() => {
                      console.log("vote");
                    }}
                  />
                ))}
              </ScrollView>

              <ContributionsSheetInput
                inputText={inputText}
                setInputText={setInputText}
                onAdd={handleAddContribution}
                onFocus={() => setPosition(0)}
              />

              {/* : (
                <YStack
                  gap="$2"
                  bg="$gray100"
                  p="$4"
                  br="$4"
                  borderWidth={1}
                  borderColor="$gray200"
                >
                  <Paragraph
                    fontSize={14}
                    color="$primary"
                    textAlign="center"
                    fontWeight="700"
                  >
                    أكمل المشوار أولاً لتتمكن من إضافة مشاركة.
                  </Paragraph>
                  <Paragraph fontSize={12} color="$gray500" textAlign="center">
                    نعتمد على تجارب المستخدمين الذين أتموا مشوارهم بنجاح.
                  </Paragraph>
                </YStack>
              )} */}
            </YStack>
          </KeyboardAvoidingView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
