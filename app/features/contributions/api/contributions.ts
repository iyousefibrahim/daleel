import { supabase } from "@/app/lib/supabaseClient";

export const getContributions = async (serviceId?: string) => {
  let query = supabase
    .from("contributions")
    .select("*, profiles(username, full_name)");

  if (serviceId) {
    query = query.eq("service_id", serviceId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw error || new Error("Failed to fetch contributions");
  }

  return data;
};

export const addContribution = async (
  content: string,
  serviceId: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("contributions")
    .insert([{ content, service_id: serviceId, user_id: userId }])
    .select()
    .single();

  if (error) {
    throw error || new Error("Failed to add contribution");
  }

  return data;
};

export const contributionsUpdatedAt = async (serviceId?: string) => {
  const { data, error } = await supabase
    .from("contributions")
    .select("updated_at")
    .eq("service_id", serviceId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error || new Error("Failed to fetch contributions");
  }

  return data?.updated_at;
};
