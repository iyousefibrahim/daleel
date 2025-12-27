import {
  Service,
  ServiceRequirement,
  ServiceStep,
  Trip,
} from "@/app/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllServices,
  getServiceById,
  getServiceRequirements,
  getServicesByCategoryId,
  getServiceSteps,
  startService,
} from "../api/services";

const useServices = () => {
  const queryClient = useQueryClient();

  const getAllServicesQuery = () =>
    useQuery<Service[]>({
      queryKey: ["services", "all"],
      queryFn: getAllServices,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
    });

  const getServiceByIdQuery = (id: string) =>
    useQuery<Service>({
      queryKey: ["services", "id", id],
      queryFn: () => getServiceById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
    });

  const getServicesByCategoryIdQuery = (categoryId: string) =>
    useQuery<Service[]>({
      queryKey: ["services", "category", categoryId],
      queryFn: () => getServicesByCategoryId(categoryId),
      enabled: !!categoryId,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
    });

  const getServiceStepsQuery = (serviceId: string) =>
    useQuery<ServiceStep[]>({
      queryKey: ["services", "steps", serviceId],
      queryFn: () => getServiceSteps(serviceId),
      enabled: !!serviceId,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
    });

  const getServiceRequirementsQuery = (serviceStepId: string) =>
    useQuery<ServiceRequirement[]>({
      queryKey: ["services", "requirements", serviceStepId],
      queryFn: () => getServiceRequirements(serviceStepId),
      enabled: !!serviceStepId,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
    });

  const startServiceMutation = useMutation<
    Trip,
    Error,
    {
      serviceId: string;
      userId: string;
      serviceName?: string;
      serviceSteps?: ServiceStep[];
    }
  >({
    mutationKey: ["service", "start"],
    mutationFn: ({ serviceId, userId, serviceName, serviceSteps }) =>
      startService(serviceId, userId, serviceName, serviceSteps),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trips", "all"],
      });
    },
  });

  return {
    getAllServicesQuery,
    getServiceByIdQuery,
    getServicesByCategoryIdQuery,
    getServiceStepsQuery,
    getServiceRequirementsQuery,
    startServiceMutation,
  };
};

export default useServices;
