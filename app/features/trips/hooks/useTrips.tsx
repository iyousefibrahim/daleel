import { Trip } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  getAllUserTrips,
  getTripById,
  getTripRequirements,
  getTripSteps,
} from "../api/trips";
import useAuth from "../../auth/hooks/useAuth";

const useTrips = () => {
  const { userSession } = useAuth();
  const getAllTripsQuery = useQuery<Trip[]>({
    queryKey: ["trips", "all"],
    queryFn: () => getAllUserTrips(userSession?.id as string),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!userSession?.id,
  });

  const getTripByIdQuery = (id: string) =>
    useQuery({
      queryKey: ["trips", "id", id],
      queryFn: () => getTripById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    });

  const getTripStepsQuery = (tripId: string) =>
    useQuery({
      queryKey: ["trips", "steps", tripId],
      queryFn: () => getTripSteps(tripId),
      enabled: !!tripId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const getTripRequirementsQuery = (tripStepId: string) =>
    useQuery({
      queryKey: ["trips", "requirements", tripStepId],
      queryFn: () => getTripRequirements(tripStepId),
      enabled: !!tripStepId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  return {
    getAllTripsQuery,
    getTripByIdQuery,
    getTripStepsQuery,
    getTripRequirementsQuery,
  };
};

export default useTrips;
