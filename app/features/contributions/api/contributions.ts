import { supabase } from "@/app/lib/supabaseClient";

export const getContributions = async (serviceId?: string) => {
  if (!serviceId) return [];

  const { data, error } = await supabase.rpc("get_contributions_with_votes", {
    service_id_param: serviceId,
  });

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

export const voteOnContribution = async (
  contributionId: string,
  userId: string,
  voteType: "up" | "down"
) => {
  // Check if vote already exists
  const { data: existingVote, error: fetchError } = await supabase
    .from("contribution_votes")
    .select("*")
    .eq("user_id", userId)
    .eq("contribution_id", contributionId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 is "The result contains 0 rows"
    throw fetchError;
  }

  if (existingVote) {
    if (existingVote.vote_type === voteType) {
      // Toggle off - delete the vote
      const { error } = await supabase
        .from("contribution_votes")
        .delete()
        .eq("id", existingVote.id);

      if (error) throw error;
      return null; // Vote removed
    } else {
      // Change vote - update
      const { data, error } = await supabase
        .from("contribution_votes")
        .update({ vote_type: voteType })
        .eq("id", existingVote.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } else {
    // New vote - insert
    const { data, error } = await supabase
      .from("contribution_votes")
      .insert({
        user_id: userId,
        contribution_id: contributionId,
        vote_type: voteType,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
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
