// ============================================
// DATABASE TYPES
// ============================================

export type UserRole = "admin" | "super_admin";

export type ArticleCategory =
  | "global"
  | "politics"
  | "maritime"
  | "health"
  | "business"
  | "sports";

export type DeviceType = "mobile" | "desktop" | "tablet";

// ============================================
// TABLE TYPES
// ============================================

export interface AdminWhitelist {
  id: string;
  email: string;
  role: UserRole;
  added_by: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  category: ArticleCategory;
  is_breaking_news: boolean;
  author_id: string;
  author_name: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArticleView {
  id: string;
  article_id: string;
  device_type: DeviceType;
  viewed_at: string;
  ip_hash: string | null;
  user_agent: string | null;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface AdminStats {
  total_articles: number;
  total_views: number;
  articles_this_period: number;
  articles_previous_period: number;
  views_this_period: number;
  views_previous_period: number;
  percentage_change_articles: number;
  percentage_change_views: number;
}

export interface DeviceDistribution {
  device: DeviceType;
  view_count: number;
  percentage: number;
}

export interface TopArticle {
  article_id: string;
  title: string;
  author_name: string;
  category: ArticleCategory;
  view_count: number;
  created_at: string;
}

// ============================================
// FORM TYPES
// ============================================

export interface CreateArticleData {
  title: string;
  content: string;
  category: ArticleCategory;
  is_breaking_news: boolean;
  featured_image?: File | null;
  published: boolean;
}

export interface AddAdminData {
  email: string;
  role: UserRole;
}

export interface SignupData {
  email: string;
  password: string;
  full_name: string;
}

// ============================================
// DATABASE HELPER FUNCTIONS
// ============================================

import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// AUTH HELPERS
// ============================================

export async function checkEmailWhitelisted(
  email: string
): Promise<{ whitelisted: boolean; role?: UserRole }> {
  const { data, error } = await supabase
    .from("admin_whitelist")
    .select("role")
    .eq("email", email)
    .single();

  if (error || !data) {
    return { whitelisted: false };
  }

  return { whitelisted: true, role: data.role };
}

export async function signUpAdmin(signupData: SignupData) {
  // Check if email is whitelisted
  const { whitelisted, role } = await checkEmailWhitelisted(signupData.email);

  if (!whitelisted) {
    throw new Error(
      "Email is not whitelisted. Contact a super admin to add your email."
    );
  }

  // Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: signupData.email,
    password: signupData.password,
  });

  if (authError) throw authError;

  // Create profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user!.id,
    email: signupData.email,
    full_name: signupData.full_name,
    role: role!,
  });

  if (profileError) throw profileError;

  return authData;
}

export async function getCurrentUserProfile(): Promise<Profile | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) throw error;

  return data;
}

// ============================================
// ADMIN WHITELIST HELPERS
// ============================================

export async function addEmailToWhitelist(email: string, role: UserRole) {
  const { data, error } = await supabase
    .from("admin_whitelist")
    .insert({ email, role })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getWhitelist(): Promise<AdminWhitelist[]> {
  const { data, error } = await supabase
    .from("admin_whitelist")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function removeFromWhitelist(email: string) {
  const { error } = await supabase
    .from("admin_whitelist")
    .delete()
    .eq("email", email);

  if (error) throw error;
}

// ============================================
// ARTICLE HELPERS
// ============================================

export async function createArticle(
  articleData: Omit<
    Article,
    "id" | "author_id" | "author_name" | "created_at" | "updated_at"
  >
) {
  const { data, error } = await supabase
    .from("articles")
    .insert(articleData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateArticle(id: string, updates: Partial<Article>) {
  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getArticlesByCategory(
  category: ArticleCategory,
  published = true
): Promise<Article[]> {
  let query = supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (published) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function getAllArticles(published = true): Promise<Article[]> {
  let query = supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (published) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function getArticlesByAuthor(
  authorId: string
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116 is "not found"
  return data;
}

export async function getBreakingNews(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("is_breaking_news", true)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;
  return data || [];
}

// ============================================
// ANALYTICS HELPERS
// ============================================

export async function trackArticleView(
  articleId: string,
  deviceType: DeviceType,
  userAgent?: string
) {
  // Create a simple IP hash (you should implement proper IP hashing)
  const ipHash =
    typeof window !== "undefined"
      ? btoa(Math.random().toString()).substring(0, 32)
      : null;

  const { error } = await supabase.from("article_views").insert({
    article_id: articleId,
    device_type: deviceType,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (error) throw error;
}

export async function getAdminStats(
  adminId: string,
  startDate?: Date,
  endDate?: Date
): Promise<AdminStats> {
  const { data, error } = await supabase.rpc("get_admin_article_stats", {
    admin_id: adminId,
    start_date:
      startDate?.toISOString() ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: endDate?.toISOString() || new Date().toISOString(),
  });

  if (error) throw error;
  return data[0];
}

export async function getDeviceDistribution(
  adminId?: string,
  startDate?: Date,
  endDate?: Date
): Promise<DeviceDistribution[]> {
  const { data, error } = await supabase.rpc("get_device_distribution", {
    admin_id: adminId || null,
    start_date:
      startDate?.toISOString() ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: endDate?.toISOString() || new Date().toISOString(),
  });

  if (error) throw error;
  return data || [];
}

export async function getTopArticles(
  adminId?: string,
  category?: ArticleCategory,
  limit = 10,
  startDate?: Date
): Promise<TopArticle[]> {
  const { data, error } = await supabase.rpc("get_top_articles", {
    admin_id: adminId || null,
    category_filter: category || null,
    limit_count: limit,
    start_date:
      startDate?.toISOString() ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  if (error) throw error;
  return data || [];
}

export async function getAllAdmins(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .in("role", ["admin", "super_admin"])
    .order("full_name");

  if (error) throw error;
  return data || [];
}

// ============================================
// IMAGE UPLOAD HELPER
// ============================================

export async function uploadArticleImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const filePath = `articles/${fileName}`;

  const { data, error } = await supabase.storage
    .from("article-images")
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("article-images").getPublicUrl(filePath);

  return publicUrl;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function detectDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";

  const userAgent = navigator.userAgent.toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return "tablet";
  }

  if (
    /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  ) {
    return "mobile";
  }

  return "desktop";
}
