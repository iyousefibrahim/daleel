import { Contribution } from "@/app/types/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Button, Paragraph, XStack, YStack } from "tamagui";

interface ContributionItemProps {
  contribution: Contribution;
  onVote: (id: number, type: "up" | "down") => void;
}

export const ContributionItem = ({
  contribution,
  onVote,
}: ContributionItemProps) => {
  return (
    <YStack gap="$1" alignItems="flex-end" w="100%">
      <XStack justifyContent="space-between" alignItems="center" w="100%">
        <XStack gap="$2" alignItems="center">
          {contribution.verified && (
            <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
          )}
          <Paragraph fontWeight="700" fontSize={15} color="#455A64">
            {contribution.author}
          </Paragraph>
          <Paragraph fontSize={13} color="$gray500">
            {`${contribution.date} .`}
          </Paragraph>
        </XStack>
        <XStack gap="$3" alignItems="center">
          <VoteButtons contribution={contribution} onVote={onVote} />
        </XStack>
      </XStack>

      <YStack
        bg="#E8F5E9"
        px="$4"
        py="$3"
        br="$3"
        alignSelf="flex-start"
        maxWidth="95%"
      >
        <Paragraph
          fontSize={16}
          color="#37474F"
          lineHeight={24}
          textAlign="right"
        >
          {contribution.text}
        </Paragraph>
      </YStack>
    </YStack>
  );
};

const VoteButtons = ({ contribution, onVote }: ContributionItemProps) => {
  return (
    <>
      <XStack gap="$1" alignItems="center">
        <Paragraph fontSize={14} color="$gray600">
          {contribution.upvotes}
        </Paragraph>
        <Button
          unstyled
          onPress={() => onVote(contribution.id, "up")}
          pressStyle={{ scale: 0.9 }}
          hitSlop={10}
        >
          <Feather name="arrow-up" size={16} color="#4CAF50" />
        </Button>
      </XStack>

      {contribution.downvotes >= 0 && (
        <XStack gap="$1" alignItems="center">
          <Paragraph fontSize={14} color="$gray600">
            {contribution.downvotes}
          </Paragraph>
          <Button
            unstyled
            onPress={() => onVote(contribution.id, "down")}
            pressStyle={{ scale: 0.9 }}
            hitSlop={10}
          >
            <Feather name="arrow-down" size={16} color="#F44336" />
          </Button>
        </XStack>
      )}
    </>
  );
};
