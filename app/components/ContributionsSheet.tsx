import React, { useState } from "react";
import {
  Button,
  Sheet,
  YStack,
  XStack,
  Text,
  ScrollView,
  Separator,
} from "tamagui";

// Mock data للمشاركات
const contributions = [
  {
    id: 1,
    author: "يمنى ياسين",
    date: "2 أغسطس",
    upvotes: 4,
    downvotes: 0,
    text: "الموظف طلب صوتين للبطاقة",
    verified: true,
    status: "updated",
  },
  {
    id: 2,
    author: "على رشاد",
    date: "23 يوليو",
    upvotes: 8,
    downvotes: 1,
    text: "الصبح طابور طويل جدا. يوح قبل ما يفتحوا ب10 دقائق",
    verified: false,
    status: null,
  },
  {
    id: 3,
    author: "محمد فراج",
    date: "4 يوليو",
    upvotes: 23,
    downvotes: 0,
    text: "أول مكتب، أستاذ سامح بيتخلص الورق بسرعة جدا",
    verified: false,
    status: null,
  },
  {
    id: 4,
    author: "إيمان نجم",
    date: "1 يونيه",
    upvotes: 110,
    downvotes: 0,
    text: "مفيش ركنات حول المكتب، يفضل استخدام المواصلات.",
    verified: true,
    status: null,
  },
];

const ContributionItem = ({
  contribution,
}: {
  contribution: (typeof contributions)[0];
}) => {
  return (
    <YStack bg="$card" p="$4" br="$3" gap="$3">
      {/* Header with author and date */}
      <XStack justifyContent="space-between" alignItems="center">
        <XStack gap="$2" alignItems="center">
          <Text
            fontFamily="$body"
            fontWeight="600"
            fontSize={15}
            color="$color"
          >
            {contribution.author}
          </Text>
          {contribution.verified && (
            <Text fontFamily="$body" fontSize={12} color="$primary700">
              موثوق
            </Text>
          )}
        </XStack>
        <Text fontFamily="$body" fontSize={13} color="$gray500">
          {contribution.date}
        </Text>
      </XStack>

      {/* Status badge if exists */}
      {contribution.status && (
        <XStack bg="$mint100" px="$3" py="$1.5" br="$2" alignSelf="flex-start">
          <Text fontFamily="$body" fontSize={12} color="$primary700">
            تم التحديث {contribution.status === "updated" ? "2 أغسطس" : ""}
          </Text>
        </XStack>
      )}

      {/* Contribution text */}
      <Text fontFamily="$body" fontSize={15} color="$color" lineHeight={24}>
        {contribution.text}
      </Text>

      {/* Votes */}
      <XStack gap="$4" alignItems="center">
        <XStack gap="$1.5" alignItems="center">
          <Text
            fontFamily="$body"
            fontSize={14}
            color="$success"
            fontWeight="500"
          >
            {contribution.upvotes}
          </Text>
        </XStack>

        {contribution.downvotes > 0 && (
          <XStack gap="$1.5" alignItems="center">
            <Text
              fontFamily="$body"
              fontSize={14}
              color="$error"
              fontWeight="500"
            >
              {contribution.downvotes}
            </Text>
          </XStack>
        )}
      </XStack>
    </YStack>
  );
};

export default function ContributionsSheet() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  return (
    <>
      {/* Button to open sheet */}
      <Button
        onPress={() => setOpen(true)}
        bg="$primary"
        color="white"
        fontFamily="$body"
        fontSize={16}
        px="$6"
        py="$3"
        br="$3"
        pressStyle={{ bg: "$primaryPress", scale: 0.98 }}
        hoverStyle={{ bg: "$primaryHover" }}
      >
        عرض المشاركات
      </Button>

      {/* Sheet */}
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 50, 25]}
        snapPointsMode="percent"
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="medium"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          bg="rgba(0,0,0,0.5)"
        />

        <Sheet.Handle bg="$gray300" />

        <Sheet.Frame bg="$background" px="$4" pt="$2" pb="$6">
          <YStack f={1} gap="$4">
            {/* Header */}
            <XStack justifyContent="space-between" alignItems="center" py="$3">
              <Button unstyled onPress={() => setOpen(false)} p="$2">
                <Text fontFamily="$body" fontSize={16} color="$color">
                  إغلاق
                </Text>
              </Button>

              <Text
                fontFamily="$heading"
                fontSize={18}
                fontWeight="700"
                color="$color"
              >
                مشاركات الأعضاء (4)
              </Text>

              <Button
                unstyled
                bg="$mint100"
                px="$3"
                py="$2"
                br="$2"
                pressStyle={{ bg: "$mint200" }}
              >
                <Text
                  fontFamily="$body"
                  fontSize={13}
                  color="$primary700"
                  fontWeight="600"
                >
                  تم التحديث 2 أغسطس
                </Text>
              </Button>
            </XStack>

            <Separator borderColor="$borderColor" />

            {/* Contributions list */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
            >
              {contributions.map((contribution) => (
                <ContributionItem
                  key={contribution.id}
                  contribution={contribution}
                />
              ))}
            </ScrollView>

            <Separator borderColor="$borderColor" />

            {/* Add contribution button */}
            <Button
              bg="$background"
              borderWidth={1}
              borderColor="$borderColor"
              color="$color"
              fontFamily="$body"
              fontSize={15}
              py="$3"
              br="$3"
              pressStyle={{ bg: "$backgroundPress" }}
              icon={<Text fontSize={18}>+</Text>}
            >
              إضافة مشاركة
            </Button>

            {/* Footer text */}
            <Text
              fontFamily="$body"
              fontSize={12}
              color="$gray500"
              textAlign="center"
              lineHeight={18}
              px="$4"
            >
              يمكنك إضافة المشاركات فقط عندما تنتهي من المشوار، أعضاء دقيقة
              المشاركات مهمشا كلنا نحافظ على جدية و دقة المشاركات
            </Text>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
