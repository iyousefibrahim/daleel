import { supabase } from "@/app/lib/supabaseClient";
import { Trip } from "@/app/types/types";

export const getAllUserTrips = async (userId: string) => {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data;
};

export const getTripById = async (id: string): Promise<Trip> => {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getCurrentUserTrip = async (
  userId: string
): Promise<Trip | null> => {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "in_progress")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
export const getTripSteps = async (tripId: string) => {
  const { data, error } = await supabase
    .from("trip_steps")
    .select("*, trip_steps_requirements(*),  is_fully_completed")
    .eq("trip_id", tripId)
    .order("step_number", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const getTripRequirements = async (trip_step_id: string) => {
  const { data, error } = await supabase
    .from("trip_steps_requirements")
    .select("*")
    .eq("trip_step_id", trip_step_id);

  if (error) {
    throw error;
  }

  return data;
};

export const completeStepRequirement = async (tripStepId: string) => {
  const { data, error } = await supabase
    .from("trip_steps_requirements")
    .update({ fulfilled: true })
    .eq("trip_step_id", tripStepId);

  if (error) {
    throw error;
  }

  return data;
};

export const uncompleteStepRequirement = async (tripStepId: string) => {
  const { data, error } = await supabase
    .from("trip_steps_requirements")
    .update({ fulfilled: false })
    .eq("trip_step_id", tripStepId);

  if (error) {
    throw error;
  }

  return data;
};

export const completeTrip = async (tripId: string) => {
  const { data, error } = await supabase
    // set for now percentage to 100 manually
    .from("trips")
    .update({ status: "completed", completion_percentage: 100 })
    .eq("id", tripId);

  if (error) {
    throw error;
  }

  return data;
};

export const deleteTrip = async (tripId: string) => {
  const { data, error } = await supabase
    .from("trips")
    .delete()
    .eq("id", tripId);

  if (error) {
    throw error;
  }

  return data;
};

export const areAllTripStepsCompleted = async (tripId: string) => {
  const { data, error } = await supabase.rpc("check_all_trip_steps_completed", {
    p_trip_id: tripId,
  });

  if (error) {
    throw error;
  }
  return data as boolean;
};
