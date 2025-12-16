import { supabase } from "@/app/lib/supabaseClient";

export async function register(
  email: string,
  password: string,
  username: string,
  full_name: string
) {
  // 1 - register user in auth supabase table
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        username,
      },
    },
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

export async function loginWithPassword(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getUserSession() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  return user;
}
