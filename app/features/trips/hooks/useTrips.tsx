import { Trip } from "@/app/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../auth/hooks/useAuth";
import {
  areAllTripStepsCompleted,
  completeStepRequirement,
  completeTrip,
  getAllUserTrips,
  getTripById,
  getTripRequirements,
  getTripSteps,
  uncompleteStepRequirement,
} from "../api/trips";

const useTrips = () => {
  const { userSession } = useAuth();
  const queryClient = useQueryClient();
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

  const completeStepRequirementMutation = useMutation({
    mutationFn: completeStepRequirement,
  });

  const uncompleteStepRequirementMutation = useMutation({
    mutationFn: uncompleteStepRequirement,
  });

  const completeTripMutation = useMutation({
    mutationFn: completeTrip,
    onSuccess: () => {
      // invalidate all trips query
      queryClient.invalidateQueries({
        queryKey: ["trips", "all"],
      });
    },
  });

  const areAllTripStepsCompletedQuery = (tripId: string) =>
    useQuery({
      queryKey: ["trips", "allStepsCompleted", tripId],
      queryFn: () => areAllTripStepsCompleted(tripId),
      enabled: !!tripId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  return {
    getAllTripsQuery,
    getTripByIdQuery,
    getTripStepsQuery,
    getTripRequirementsQuery,
    areAllTripStepsCompletedQuery,
    completeStepRequirementMutation,
    uncompleteStepRequirementMutation,
    completeTripMutation,
  };
};

export default useTrips;
