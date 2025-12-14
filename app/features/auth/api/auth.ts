import { supabase } from "@/app/lib/supabaseClient";

export default async function register(
  email: string,
  password: string,
  username: string,
  full_name: string
) {
  // 1 - register user in auth supabase table
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // 2 - register user in profiles supabase table
  const { error: profileError, data: profileData } = await supabase
    .from("profiles")
    .insert({
      id: data.user?.id,
      email,
      username,
      full_name,
    });

  if (profileError) {
    throw profileError;
  }

  return profileData;
}
