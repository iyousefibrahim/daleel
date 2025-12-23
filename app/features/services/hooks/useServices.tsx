import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllServices,
  getServiceById,
  getServiceRequirements,
  getServicesByCategoryId,
  getServiceSteps,
  startService,
} from "../api/services";
import {
  Service,
  ServiceRequirement,
  ServiceStep,
  Trip,
} from "@/app/types/types";

const useServices = () => {
  const getAllServicesQuery = () =>
    useQuery<Service[]>({
      queryKey: ["services", "all"],
      queryFn: getAllServices,
    });

  const getServiceByIdQuery = (id: string) =>
    useQuery<Service>({
      queryKey: ["services", "id", id],
      queryFn: () => getServiceById(id),
      enabled: !!id,
    });

  const getServicesByCategoryIdQuery = (categoryId: string) =>
    useQuery<Service[]>({
      queryKey: ["services", "category", categoryId],
      queryFn: () => getServicesByCategoryId(categoryId),
      enabled: !!categoryId,
    });

  const getServiceStepsQuery = (serviceId: string) =>
    useQuery<ServiceStep[]>({
      queryKey: ["services", "steps", serviceId],
      queryFn: () => getServiceSteps(serviceId),
      enabled: !!serviceId,
    });

  const getServiceRequirementsQuery = (serviceStepId: string) =>
    useQuery<ServiceRequirement[]>({
      queryKey: ["services", "requirements", serviceStepId],
      queryFn: () => getServiceRequirements(serviceStepId),
      enabled: !!serviceStepId,
    });

  const startServiceMutation = useMutation<
    Trip,
    Error,
    { serviceId: string; userId: string }
  >({
    mutationKey: ["service", "start"],
    mutationFn: ({ serviceId, userId }) => startService(serviceId, userId),
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
