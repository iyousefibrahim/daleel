import Error from "@/app/components/Error";
import Loader from "@/app/components/Loader";
import useAuth from "@/app/features/auth/hooks/useAuth";
import ServiceActionFooter from "@/app/features/services/components/ServiceActionFooter";
import ServiceHeader from "@/app/features/services/components/ServiceHeader";
import ServiceHero from "@/app/features/services/components/ServiceHero";
import ServiceTabs from "@/app/features/services/components/ServiceTabs";
import useServices from "@/app/features/services/hooks/useServices";
import { useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { ScrollView, useTheme } from "tamagui";

const ServiceDetailsScreen = () => {
  const route = useRoute();
  const { serviceId } = route.params as { serviceId: string };
  const {
    getServiceByIdQuery,
    getServiceStepsQuery,
    getServiceRequirementsQuery,
    startServiceMutation,
  } = useServices();
  const { data, isLoading, isError, refetch } = getServiceByIdQuery(serviceId);
  const { data: serviceStepsData } = getServiceStepsQuery(serviceId);
  const { userSession } = useAuth();

  const { data: serviceRequirementsData } = getServiceRequirementsQuery(
    serviceStepsData?.[0]?.id || ""
  );

  const theme = useTheme();

  const handleRetry = () => {
    refetch();
  };

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

  if (isLoading) return <Loader message="جاري تحميل الخدمة..." />;
  if (isError || !data)
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

        <ServiceHeader name={data.name} />

        <ServiceTabs
          description={data.description}
          steps={serviceStepsData}
          requirements={serviceRequirementsData}
        />
      </ScrollView>

      <ServiceActionFooter onPress={startService} />
    </>
  );
};

export default ServiceDetailsScreen;
