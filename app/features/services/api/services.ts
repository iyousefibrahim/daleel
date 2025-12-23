import { supabase } from "@/app/lib/supabaseClient";

export const getAllServices = async () => {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceById = async (id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getServicesByCategoryId = async (category_id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", category_id);

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceSteps = async (service_id: string) => {
  const { data, error } = await supabase
    .from("service_steps")
    .select("*")
    .eq("service_id", service_id)
    .order("step_number", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceRequirements = async (service_steps_id: string) => {
  const { data, error } = await supabase
    .from("service_requirements")
    .select("*")
    .eq("service_steps_id", service_steps_id);

  if (error) {
    throw error;
  }

  return data;
};

export const startService = async (service_id: string) => {
  // TODO: implement start service
};

export const completeService = async (service_id: string) => {
  // TODO: implement complete service
};

export const cancelService = async (service_id: string) => {
  // TODO: implement cancel service
};
