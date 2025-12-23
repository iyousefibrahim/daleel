import { colors } from "@/app/constants/tamagui.config";
import { ServiceRequirement, ServiceStep } from "@/app/types/types";
import { Paragraph, SizableText, Tabs, YStack } from "tamagui";
import RequirementItem from "./RequirementItem";
import StepItem from "./StepItem";

interface ServiceTabsProps {
  description?: string | null;
  steps?: ServiceStep[];
  requirements?: ServiceRequirement[];
}

const ServiceTabs = ({
  description,
  steps,
  requirements,
}: ServiceTabsProps) => {
  return (
    <Tabs
      defaultValue="details"
      orientation="horizontal"
      flexDirection="column"
      backgroundColor={colors.white}
    >
      <Tabs.List
        backgroundColor={colors.white}
        borderBottomWidth={1}
        borderBottomColor={colors.gray200}
        paddingHorizontal={0}
      >
        <Tabs.Tab
          flex={1}
          height={"$12"}
          value="steps"
          backgroundColor="transparent"
          borderRadius={0}
          borderBottomWidth={3}
          borderBottomColor="transparent"
          pressStyle={{
            backgroundColor: colors.gray50,
          }}
          focusStyle={{
            borderBottomColor: colors.primary500,
          }}
          hoverStyle={{
            backgroundColor: colors.gray50,
          }}
        >
          <SizableText
            fontFamily="$body"
            fontSize="$5"
            fontWeight="600"
            color={colors.gray900}
          >
            الخطوات
          </SizableText>
        </Tabs.Tab>

        <Tabs.Tab
          flex={1}
          height={"$12"}
          value="requirements"
          backgroundColor="transparent"
          borderRadius={0}
          borderBottomWidth={3}
          borderBottomColor="transparent"
          pressStyle={{
            backgroundColor: colors.gray50,
          }}
          focusStyle={{
            borderBottomColor: colors.primary500,
          }}
          hoverStyle={{
            backgroundColor: colors.gray50,
          }}
        >
          <SizableText
            fontFamily="$body"
            fontSize="$5"
            fontWeight="600"
            color={colors.gray900}
          >
            المتطلبات
          </SizableText>
        </Tabs.Tab>

        <Tabs.Tab
          flex={1}
          value="details"
          backgroundColor="transparent"
          borderRadius={0}
          height={"$12"}
          borderBottomWidth={3}
          borderBottomColor="transparent"
          pressStyle={{
            backgroundColor: colors.gray50,
          }}
          focusStyle={{
            borderBottomColor: colors.primary500,
          }}
          hoverStyle={{
            backgroundColor: colors.gray50,
          }}
        >
          <SizableText
            fontFamily="$body"
            fontSize="$5"
            fontWeight="600"
            color={colors.gray900}
          >
            التفاصيل
          </SizableText>
        </Tabs.Tab>
      </Tabs.List>

      {/* Details Tab Content */}
      <Tabs.Content value="details" p="$4" h={"100%"}>
        <YStack gap="$3">
          <Paragraph
            size="$6"
            fontWeight="700"
            color={colors.gray900}
            textAlign="right"
          >
            نبذة عن الخدمة
          </Paragraph>
          <Paragraph
            size="$5"
            lineHeight="$6"
            color={colors.gray700}
            textAlign="right"
          >
            {description || "لا يوجد تفاصيل عن الخدمة"}
          </Paragraph>
        </YStack>
      </Tabs.Content>

      {/* Requirements Tab Content */}
      <Tabs.Content value="requirements" p="$4" h={"100%"}>
        <YStack gap="$4">
          <Paragraph
            size="$6"
            fontWeight="700"
            color={colors.gray900}
            textAlign="right"
          >
            المتطلبات الأساسية
          </Paragraph>

          {requirements?.length ? (
            requirements.map((requirement) => (
              <RequirementItem
                key={requirement.id}
                icon_url={requirement.icon_url}
                title={requirement.title}
                notes={requirement.notes}
                iconBg={requirement.background_color}
              />
            ))
          ) : (
            <Paragraph size="$5" color={colors.gray600} textAlign="right">
              لا يوجد متطلبات أساسية
            </Paragraph>
          )}
        </YStack>
      </Tabs.Content>

      {/* Steps Tab Content */}
      <Tabs.Content value="steps" p="$4" h={400}>
        <YStack gap="$4">
          <Paragraph
            size="$6"
            fontWeight="700"
            color={colors.gray900}
            textAlign="right"
          >
            خطوات الخدمة
          </Paragraph>

          {steps?.length ? (
            steps.map((step) => (
              <StepItem
                key={step.id}
                number={step.step_number}
                title={step.title}
                description={step.description}
              />
            ))
          ) : (
            <Paragraph size="$5" color={colors.gray600} textAlign="right">
              لا يوجد خطوات
            </Paragraph>
          )}
        </YStack>
      </Tabs.Content>
    </Tabs>
  );
};

export default ServiceTabs;
