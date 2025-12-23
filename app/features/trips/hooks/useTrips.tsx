import { useQuery } from "@tanstack/react-query";
import {
  getAllUserTrips,
  getTripById,
  getTripRequirements,
  getTripSteps,
} from "../api/trips";
import { Trip } from "@/app/types/types";

const useTrips = () => {
  const getAllTripsQuery = useQuery<Trip[]>({
    queryKey: ["trips", "all"],
    queryFn: getAllUserTrips,
  });

  const getTripByIdQuery = (id: string) =>
    useQuery({
      queryKey: ["trips", "id", id],
      queryFn: () => getTripById(id),
      enabled: !!id,
    });

  const getTripStepsQuery = (tripId: string) =>
    useQuery({
      queryKey: ["trips", "steps", tripId],
      queryFn: () => getTripSteps(tripId),
      enabled: !!tripId,
    });

  const getTripRequirementsQuery = (tripStepId: string) =>
    useQuery({
      queryKey: ["trips", "requirements", tripStepId],
      queryFn: () => getTripRequirements(tripStepId),
      enabled: !!tripStepId,
    });

  return {
    getAllTripsQuery,
    getTripByIdQuery,
    getTripStepsQuery,
    getTripRequirementsQuery,
  };
};

export default useTrips;
