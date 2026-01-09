import { Trip, TripStep, TripStepRequirement } from "@/app/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../auth/hooks/useAuth";
import {
  areAllTripStepsCompleted,
  completeStepRequirement,
  completeTrip,
  deleteTrip,
  getAllUserTrips,
  getCurrentUserTrip,
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

  const getCurrentUserTripQuery = useQuery<Trip | null>({
    queryKey: ["trips", "current"],
    queryFn: () => getCurrentUserTrip(userSession?.id as string),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!userSession?.id,
  });

  const getTripByIdQuery = (id: string) =>
    useQuery<Trip | null>({
      queryKey: ["trips", "id", id],
      queryFn: () => getTripById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    });

  const getTripStepsQuery = (tripId: string) =>
    useQuery<TripStep[]>({
      queryKey: ["trips", "steps", tripId],
      queryFn: () => getTripSteps(tripId),
      enabled: !!tripId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const getTripRequirementsQuery = (tripStepId: string) =>
    useQuery<TripStepRequirement[]>({
      queryKey: ["trips", "requirements", tripStepId],
      queryFn: () => getTripRequirements(tripStepId),
      enabled: !!tripStepId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const completeStepRequirementMutation = useMutation({
    mutationFn: completeStepRequirement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  const uncompleteStepRequirementMutation = useMutation({
    mutationFn: uncompleteStepRequirement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  const completeTripMutation = useMutation({
    mutationFn: completeTrip,
    onSuccess: () => {
      // invalidate all trips query
      queryClient.invalidateQueries({
        queryKey: ["trips", "all"],
      });
      // invalidate current trip query because the status changed
      queryClient.invalidateQueries({
        queryKey: ["trips", "current"],
      });
    },
  });

  const areAllTripStepsCompletedQuery = (tripId: string) =>
    useQuery<boolean>({
      queryKey: ["trips", "allStepsCompleted", tripId],
      queryFn: () => areAllTripStepsCompleted(tripId),
      enabled: !!tripId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const deleteTripMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips", "all"] });
      queryClient.invalidateQueries({ queryKey: ["trips", "current"] });
    },
  });

  return {
    getAllTripsQuery,
    getCurrentUserTripQuery,
    getTripByIdQuery,
    getTripStepsQuery,
    getTripRequirementsQuery,
    areAllTripStepsCompletedQuery,
    completeStepRequirementMutation,
    uncompleteStepRequirementMutation,
    completeTripMutation,
    deleteTripMutation,
  };
};

export default useTrips;
