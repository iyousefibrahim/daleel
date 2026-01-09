import ActionFooter from "@/app/components/ActionFooter";
import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import useAuth from "@/app/features/auth/hooks/useAuth";
import ServiceHeader from "@/app/features/services/components/ServiceHeader";
import ServiceHero from "@/app/features/services/components/ServiceHero";
import ServiceTabs from "@/app/features/services/components/ServiceTabs";
import useServices from "@/app/features/services/hooks/useServices";
import { useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import { ScrollView, useTheme } from "tamagui";

const ServiceDetailsScreen = () => {
  const route = useRoute();
  const { serviceId } = route.params as { serviceId: string };
  const { userSession } = useAuth();
  const theme = useTheme();

  const {
    getServiceByIdQuery,
    getServiceStepsQuery,
    getServiceRequirementsQuery,
    startServiceMutation,
    getServiceVoteTotalsQuery,
  } = useServices();

  const {
    data,
    isLoading: serviceByIdLoading,
    isError: serviceByIdError,
    refetch: refetchServiceById,
  } = getServiceByIdQuery(serviceId);

  const {
    data: serviceStepsData,
    isLoading: serviceStepsLoading,
    isError: serviceStepsError,
    refetch: refetchServiceSteps,
  } = getServiceStepsQuery(serviceId);

  const serviceStepId = serviceStepsData?.[0]?.id || "";

  const {
    data: serviceRequirementsData,
    isLoading: serviceRequirementsLoading,
    isError: serviceRequirementsError,
  } = getServiceRequirementsQuery(serviceStepId);

  const {
    data: voteTotals,
    isLoading: voteTotalsLoading,
    isError: voteTotalsError,
  } = getServiceVoteTotalsQuery(serviceId);

  const handleRetry = useCallback(() => {
    refetchServiceById();
    refetchServiceSteps();
  }, [refetchServiceById, refetchServiceSteps]);

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: "success",
      text1: "تم نسخ النص",
    });
  };

  const startService = async () => {
    startServiceMutation.mutate(
      {
        serviceId,
        userId: userSession?.id || "",
        serviceName: data?.name,
        serviceSteps: serviceStepsData,
      },
      {
        onSuccess: (data) => {
          console.log("Service started successfully", data);
          Toast.show({
            type: "success",
            text1: "تم بدء الخدمة",
          });
        },
        onError: (error) => {
          console.log("Error starting service", error);
          Toast.show({
            type: "error",
            text1: "حدث خطأ، حاول مرة أخرى.",
          });
        },
      }
    );
  };

  if (
    serviceByIdLoading ||
    serviceStepsLoading ||
    serviceRequirementsLoading ||
    voteTotalsLoading
  )
    return <Loader message="جاري تحميل الخدمة..." />;
  if (
    serviceByIdError ||
    serviceStepsError ||
    serviceRequirementsError ||
    voteTotalsError ||
    !data
  )
    return <Error message="حدث خطأ، حاول مرة أخرى." onClick={handleRetry} />;

  return (
    <>
      <ScrollView
        contentContainerStyle={{ backgroundColor: theme.background.get() }}
      >
        <ServiceHero
          imageUrl={data.image_url || undefined}
          onShare={() =>
            copyToClipboard("https://daleel.app/services/" + serviceId)
          }
        />

        <ServiceHeader
          name={data.name}
          upvotes={voteTotals?.upvotes_count || 0}
          downvotes={voteTotals?.downvotes_count || 0}
        />

        <ServiceTabs
          description={data.description}
          steps={serviceStepsData}
          requirements={serviceRequirementsData}
        />
      </ScrollView>

      <ActionFooter
        onPress={startService}
        isLoading={startServiceMutation.isPending}
        text="بدء الخدمة"
        icon="arrow-back-circle"
      />
    </>
  );
};

export default ServiceDetailsScreen;
