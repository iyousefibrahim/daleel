import CurrentDate from "@/app/components/CurrentDate";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Accordion,
  Paragraph,
  Separator,
  Switch,
  XStack,
  YStack,
} from "tamagui";
import BackButton from "../../components/BackButton";
import { colors } from "../../constants/tamagui.config";

interface Trip {
  id: string;
  title: string;
  subtitle?: string;
  fullfilled: boolean;
  isHeader?: boolean;
  sectionTitle?: string;
  details?: {
    description: string;
    location: string;
    hours: string;
    waitingTime?: string;
    documents: string[];
    contributions?: {
      user: string;
      date: string;
      comment: string;
      color?: string;
    }[];
  };
}

const trips: Trip[] = [
  {
    id: "1",
    title: "1. أصل شهادة الميلاد",
    subtitle: "السجل المدني",
    fullfilled: true,
  },
  {
    id: "5",
    title: "5. برينت التأمينات (الرقم التأميني)",
    subtitle: "مكتب التأمينات الاجتماعية",
    fullfilled: false,
    details: {
      description:
        "البرينت التأميني ورقة من مكتب التأمينات بيكون فيها رقمك التأميني وتاريخ إشتراكك.",
      location: "مكتب التأمينات الاجتماعية التابع لمنطقتك حسب البطاقة",
      hours: "مواعيد العمل الرسمية 8ص - 2م",
      waitingTime: "8 مشاركات عن وقت انتظار من 30 ل 90 دقيقة",
      documents: ["أصل و صورة البطاقة الشخصية"],
      contributions: [
        {
          user: "يمنى ياسين",
          date: "2 أغسطس",
          comment: "الموظف طلب صورتين للبطاقة",
          color: "#E8F5E9",
        },
        {
          user: "علي رشاد",
          date: "23 يوليو",
          comment: "الصبح طابور طويل جدا, روح قبل ما يقفلوا ب10 دقايق",
          color: "#E8F5E9",
        },
      ],
    },
  },
];

const StatusIcon = ({ fullfilled }: { fullfilled: boolean }) => {
  if (fullfilled === true) {
    return (
      <YStack
        bg={colors.success}
        br={20}
        w={28}
        h={28}
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons name="checkmark" size={18} color="white" />
      </YStack>
    );
  }
  if (fullfilled === false) {
    return (
      <YStack br={20} w={35} h={35} alignItems="center" justifyContent="center">
        <Ionicons name="ellipse-outline" size={35} color={colors.gray500} />
      </YStack>
    );
  }
};

export default function TripDetailsScreen() {
  const [expandedId, setExpandedId] = useState<string>("5");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {/* Top Header Bar */}
        <XStack
          px="$4"
          py="$2"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton />

          <XStack alignItems="center" gap="$2">
            <CurrentDate />
            {/* Handle Holidays */}
            <YStack bg="#FFF9C4" px="$2" py="$1" br="$4">
              <Paragraph color="#F57F17" fontSize={12}>
                عطلة رسمية
              </Paragraph>
            </YStack>
          </XStack>
        </XStack>

        {/* Main Title */}
        <YStack px="$4" mt="$2" mb="$6">
          <Paragraph fontSize={24} color={colors.gray900} textAlign="left">
            تجديد جواز السفر
          </Paragraph>
          <Paragraph fontSize={14} color={colors.gray500} textAlign="left">
            تم بدء الخدمة في: الاثنين 4 أغسطس
          </Paragraph>
        </YStack>

        {/* List */}
        <Accordion
          type="single"
          collapsible
          value={expandedId}
          onValueChange={setExpandedId}
          width="100%"
          gap="$3"
        >
          {trips.map((req) => {
            if (req.isHeader) {
              return (
                <Paragraph
                  key={req.id}
                  fontSize={14}
                  color={colors.gray500}
                  textAlign="right"
                  mt="$2"
                >
                  {req.sectionTitle}
                </Paragraph>
              );
            }

            const isExpanded = expandedId === req.id;

            return (
              <Accordion.Item
                key={req.id}
                value={req.id}
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
                      <Paragraph
                        fontSize={14}
                        color={colors.gray900}
                        textAlign="right"
                      >
                        {req.title}
                      </Paragraph>
                      {req.subtitle && (
                        <Paragraph
                          fontSize={12}
                          color={colors.gray500}
                          textAlign="right"
                        >
                          {req.subtitle}
                        </Paragraph>
                      )}
                    </YStack>
                    {/* Status Icon */}
                    <StatusIcon fullfilled={req.fullfilled} />
                  </XStack>
                </Accordion.Trigger>

                <Accordion.Content>
                  {req.details && (
                    <YStack flex={1} px="$1">
                      {/* Info Box */}
                      <YStack gap="$4">
                        <XStack
                          gap="$3"
                          flexDirection="row-reverse"
                          alignItems="center"
                        >
                          <Feather
                            name="info"
                            size={20}
                            color={colors.gray500}
                          />
                          <Paragraph
                            fontSize={13}
                            color={colors.gray600}
                            textAlign="right"
                          >
                            {req.details.description}
                          </Paragraph>
                        </XStack>

                        <XStack
                          gap="$3"
                          flexDirection="row-reverse"
                          alignItems="center"
                        >
                          <Ionicons
                            name="location-outline"
                            size={20}
                            color={colors.gray500}
                          />
                          <Paragraph
                            fontSize={13}
                            color={colors.gray600}
                            textAlign="right"
                          >
                            {req.details.location}
                          </Paragraph>
                        </XStack>

                        <XStack
                          gap="$3"
                          flexDirection="row-reverse"
                          alignItems="center"
                        >
                          <Ionicons
                            name="time-outline"
                            size={20}
                            color={colors.gray500}
                          />
                          <Paragraph
                            fontSize={13}
                            color={colors.gray600}
                            textAlign="right"
                          >
                            {req.details.hours}
                          </Paragraph>
                        </XStack>

                        {/* Waiting Time (Red Text)
                        <XStack gap="$3" flexDirection="row-reverse">
                          <View style={{ width: 20 }} />
                          <Paragraph
                            fontSize={13}
                            color="#F44336"
                            textAlign="right"
                          >
                            {req.details.waitingTime}
                          </Paragraph>
                        </XStack> */}

                        <XStack
                          gap="$3"
                          flexDirection="row-reverse"
                          alignItems="center"
                        >
                          <Ionicons
                            name="document-text-outline"
                            size={20}
                            color={colors.gray500}
                          />
                          <YStack f={1}>
                            <Paragraph
                              fontSize={13}
                              color={colors.gray600}
                              textAlign="right"
                            >
                              المستندات المطلوبة:
                            </Paragraph>
                            {req.details.documents.map((doc, idx) => (
                              <Paragraph
                                key={idx}
                                fontSize={13}
                                color={colors.gray600}
                                textAlign="right"
                              >
                                • {doc}
                              </Paragraph>
                            ))}
                          </YStack>
                        </XStack>

                        <Separator borderColor={colors.gray200} />

                        {/* Toggle */}
                        <XStack
                          justifyContent="space-between"
                          alignItems="center"
                          flexDirection="row-reverse"
                        >
                          <Paragraph fontSize={14} color={colors.gray600}>
                            الخطوة غير مطلوبة مني
                          </Paragraph>
                          <Switch
                            backgroundColor={colors.primary500}
                            size="$10"
                          >
                            <Switch.Thumb />
                          </Switch>
                        </XStack>
                      </YStack>
                    </YStack>
                  )}
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </ScrollView>
    </SafeAreaView>
  );
}
