export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthenticatedNavigatorParamList = {
  Home: undefined;
  Services: undefined;
  TripsNavigator: undefined;
  ProfileNavigator: undefined;
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
  is_more?: boolean; // default: FALSE

  created_at?: string; // timestamptz, default: now()
  updated_at?: string; // timestamptz, default: now()
}

export interface Service {
  id: string; // uuid
  name: string;
  description: string | null;

  icon_url: string | null;
  image_url: string | null;

  category_id: string;

  is_active: boolean;
  is_deleted: boolean;

  created_at: string; // ISO date
  updated_at: string; // ISO date
}

export interface ServiceStep {
  id: string;
  service_id: string;
  step_number: number;
  title: string;
  description?: string;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
}

export interface ServiceRequirement {
  id: string;
  title: string;
  notes?: string;
  icon_url: string;
  background_color: string;
}

export type TripStatus = "in_progress" | "completed" | "cancelled";

export interface Trip {
  id?: string; // UUID, primary key
  service_id?: string; // UUID, FK to public.services.id
  service_name?: string;
  user_id?: string; // UUID, FK to public.profiles.id
  status?: TripStatus; // Enum (trip_status)

  // Optional fields
  completion_percentage?: number; // smallint, default 0
  created_at?: string; // timestamptz, default now()
  updated_at?: string; // timestamptz, default now()
}

export interface TripStep {
  id: string; // uuid (gen_random_uuid)
  trip_id: string; // uuid (FK -> trips.id)

  title: string; // optional
  step_number: number; // int2

  description?: string; // optional
  compilation_percentage?: number; // int2 (default: 0)

  created_at?: string; // timestamptz (ISO string)
  updated_at?: string; // timestamptz
}

export interface TripStepRequirement {
  id: string; // uuid (gen_random_uuid)
  trip_step_id: string; // uuid (FK -> trip_steps.id)
  title: string;
  background_color: string;
  icon_url: string;
  notes?: string;
  required?: boolean;
  fulfilled?: boolean;
  created_at?: string;
  updated_at?: string;
}
