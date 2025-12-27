import { supabase } from "@/app/lib/supabaseClient";

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

export const getTripById = async (id: string) => {
  const { data, error } = await supabase.from("trips").select("*").eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

export const getTripSteps = async (tripId: string) => {
  const { data, error } = await supabase
    .from("trip_steps")
    .select("*")
    .eq("trip_id", tripId);

  if (error) {
    throw error;
  }

  return data;
};

export const getTripRequirements = async (trip_step_id: string) => {
  const { data, error } = await supabase
    .from("trip_requirements")
    .select("*")
    .eq("trip_step_id", trip_step_id);

  if (error) {
    throw error;
  }

  return data;
};
