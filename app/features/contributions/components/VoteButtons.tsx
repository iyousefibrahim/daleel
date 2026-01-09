import { Feather } from "@expo/vector-icons";
import { Button, Paragraph, XStack } from "tamagui";
import { Contribution } from "@/app/types/types";
import { colors } from "@/app/constants/tamagui.config";

interface ContributionItemProps {
  contribution: Contribution;
  onVote: (id: string, vote: "up" | "down") => void;
}

const VoteButtons = ({ contribution, onVote }: ContributionItemProps) => {
  const isUpvoted = contribution.user_vote === "up";
  const isDownvoted = contribution.user_vote === "down";

  return (
    <>
      <XStack gap="$1" alignItems="center">
        <Paragraph
          fontSize={14}
          color={isUpvoted ? colors.primary500 : "$gray600"}
          fontWeight={isUpvoted ? "700" : "400"}
        >
          {contribution.upvotes_count || 0}
        </Paragraph>
        <Button
          unstyled
          onPress={() => onVote(contribution.id, "up")}
          pressStyle={{ scale: 0.9 }}
          hitSlop={10}
        >
          <Feather
            name="arrow-up"
            size={16}
            color={isUpvoted ? colors.primary500 : colors.gray500}
          />
        </Button>
      </XStack>

      <XStack gap="$1" alignItems="center">
        <Paragraph
          fontSize={14}
          color={isDownvoted ? "red" : "$gray600"}
          fontWeight={isDownvoted ? "700" : "400"}
        >
          {contribution.downvotes_count || 0}
        </Paragraph>
        <Button
          unstyled
          onPress={() => onVote(contribution.id, "down")}
          pressStyle={{ scale: 0.9 }}
          hitSlop={10}
        >
          <Feather
            name="arrow-down"
            size={16}
            color={isDownvoted ? "red" : colors.gray500}
          />
        </Button>
      </XStack>
    </>
  );
};

export default VoteButtons;
