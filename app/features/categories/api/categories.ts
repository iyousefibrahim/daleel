import { supabase } from "@/app/lib/supabaseClient";

export const getCategories = async (limit: number = 5) => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .limit(limit);

  if (error) throw error;

  return categories;
};

export const searchCategories = async (query: string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw error;

  return data;
};
