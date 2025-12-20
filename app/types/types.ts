export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export interface Profile {
  id: string; // uuid, default: gen_random_uuid()
  email: string | null; // text, nullable
  username: string | null;
  full_name: string | null;
  role?: "user" | "moderator" | "admin"; // text with default 'user'
  created_at?: string; // timestamptz, default now()
  updated_at?: string; // timestamptz, default now()
  points?: number; // integer, default 0

  // Optional fields
  phone_number?: string | null;
  address?: string | null;
  avatar_url?: string | null;
  is_active?: boolean;
  is_deleted?: boolean;
}

export interface Category {
  id: string; // UUID, default: gen_random_uuid()
  name: string; // text, يمكن يكون NULL
  icon_url: string; // text, يمكن يكون NULL

  // Optional fields
  description?: string | null; // text, يمكن يكون NULL
  is_active?: boolean; // default: TRUE
  is_deleted?: boolean; // default: FALSE

  created_at?: string; // timestamptz, default: now()
  updated_at?: string; // timestamptz, default: now()
}
