import { useQuery } from "@tanstack/react-query";
import {
  getAllServices,
  getServiceById,
  getServicesByCategoryId,
} from "../api/services";

const useServices = () => {
  const getAllServicesQuery = () =>
    useQuery({
      queryKey: ["services", "all"],
      queryFn: getAllServices,
    });

  const getServiceByIdQuery = (id: string) =>
    useQuery({
      queryKey: ["services", "id", id],
      queryFn: () => getServiceById(id),
      enabled: !!id,
    });

  const getServicesByCategoryIdQuery = (categoryId: string) =>
    useQuery({
      queryKey: ["services", "category", categoryId],
      queryFn: () => getServicesByCategoryId(categoryId),
      enabled: !!categoryId,
    });

  return {
    getAllServicesQuery,
    getServiceByIdQuery,
    getServicesByCategoryIdQuery,
  };
};

export default useServices;
