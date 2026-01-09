import { formatDateWithWeekday } from "@/app/lib/utils/dateUtils";
import { Contribution } from "@/app/types/types";
import { memo } from "react";
import { Paragraph, XStack, YStack } from "tamagui";
import VoteButtons from "./VoteButtons";

interface ContributionItemProps {
  contribution: Contribution;
  onVote: (id: string, type: "up" | "down") => void;
}

export const ContributionItem = memo(
  ({ contribution, onVote }: ContributionItemProps) => {
    const authorName =
      contribution.profiles?.full_name ||
      contribution.profiles?.username ||
      "مستخدم";

    const date = formatDateWithWeekday(new Date(contribution.created_at));

    return (
      <YStack gap="$1" alignItems="flex-end" w="100%">
        <XStack justifyContent="space-between" alignItems="center" w="100%">
          <XStack gap="$2" alignItems="center">
            <Paragraph fontWeight="700" fontSize="$5" color="$gray800">
              {authorName}
            </Paragraph>
            <Paragraph fontSize="$3" color="$gray500">
              {`${date} .`}
            </Paragraph>
          </XStack>
          <XStack gap="$3" alignItems="center">
            <VoteButtons contribution={contribution} onVote={onVote} />
          </XStack>
        </XStack>

        <YStack
          bg="$primary50"
          px="$4"
          py="$3"
          br="$3"
          alignSelf="flex-start"
          maxWidth="95%"
        >
          <Paragraph
            fontSize="$5"
            color="$gray800"
            lineHeight="$5"
            textAlign="right"
          >
            {contribution.content}
          </Paragraph>
        </YStack>
      </YStack>
    );
  }
);

