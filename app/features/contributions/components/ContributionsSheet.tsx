import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView, Sheet, YStack } from "tamagui";
import { useContributions } from "../hooks/useContributions";
import { ContributionItem } from "./ContributionItem";
import { ContributionsSheetHeader } from "./ContributionsSheetHeader";
import { ContributionsSheetInput } from "./ContributionsSheetInput";
import { ContributionsSheetTrigger } from "./ContributionsSheetTrigger";

export default function ContributionsSheet() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const {
    contributions,
    inputText,
    setInputText,
    handleVote,
    handleAddContribution,
  } = useContributions();

  return (
    <>
      <ContributionsSheetTrigger
        onPress={() => setOpen(true)}
        count={contributions.length}
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
          bg="rgba(0,0,0,0.5)"
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
                count={contributions.length}
                onClose={() => setOpen(false)}
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 24, paddingBottom: 20 }}
              >
                {contributions.map((contribution) => (
                  <ContributionItem
                    key={contribution.id}
                    contribution={contribution}
                    onVote={handleVote}
                  />
                ))}
              </ScrollView>

              <ContributionsSheetInput
                inputText={inputText}
                setInputText={setInputText}
                onAdd={handleAddContribution}
                onFocus={() => setPosition(0)}
              />
            </YStack>
          </KeyboardAvoidingView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
