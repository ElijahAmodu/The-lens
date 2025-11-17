import { createClient } from "@supabase/supabase-js";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Base client (use sparingly, prefer the component-specific clients below)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// For client components
export const createSupabaseClient = () =>
  createClientComponentClient<Database>();

// For server components (App Router)
export const createSupabaseServerClient = () => {
  const cookieStore = require("next/headers").cookies;
  return createServerComponentClient<Database>({
    cookies: cookieStore,
  });
};

// For API routes and server actions
export const createSupabaseRouteClient = () => {
  const { cookies } = require("next/headers");
  return createServerComponentClient<Database>({
    cookies,
  });
};

// Helper to get current session
export async function getSession() {
  const supabase = createSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
    return null;
  }

  return session;
}

// Helper to get current user profile
export async function getCurrentUser() {
  const session = await getSession();

  if (!session) return null;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.error("Error getting user profile:", error);
    return null;
  }

  return data;
}

// Helper to check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "admin" || user?.role === "super_admin";
}

// Helper to check if user is super admin
export async function isSuperAdmin() {
  const user = await getCurrentUser();
  return user?.role === "super_admin";
}
