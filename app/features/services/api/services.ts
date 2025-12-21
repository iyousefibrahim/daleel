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
    .eq("id", id);

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
