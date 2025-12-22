import { XStack, YStack, Paragraph } from "tamagui";

const Divider = ({ title }: { title: string }) => {
  return (
    <XStack gap="$4" alignItems="center">
      <YStack f={1} h={1} bg="$gray300" />
      <Paragraph fontSize={14}>{title}</Paragraph>
      <YStack f={1} h={1} bg="$gray300" />
    </XStack>
  );
};

export default Divider;
