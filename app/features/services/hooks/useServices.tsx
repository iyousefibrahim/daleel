import { useQuery } from "@tanstack/react-query";
import {
  getAllServices,
  getServiceById,
  getServiceRequirements,
  getServicesByCategoryId,
  getServiceSteps,
} from "../api/services";
import { Service, ServiceRequirement, ServiceStep } from "@/app/types/types";

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

  return {
    getAllServicesQuery,
    getServiceByIdQuery,
    getServicesByCategoryIdQuery,
    getServiceStepsQuery,
    getServiceRequirementsQuery,
  };
};

export default useServices;
