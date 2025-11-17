export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_whitelist: {
        Row: {
          id: string;
          email: string;
          role: "admin" | "super_admin";
          added_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: "admin" | "super_admin";
          added_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: "admin" | "super_admin";
          added_by?: string | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "admin" | "super_admin";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role: "admin" | "super_admin";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "admin" | "super_admin";
          created_at?: string;
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          featured_image: string | null;
          category: "global" | "politics" | "maritime" | "health" | "business";
          is_breaking_news: boolean;
          author_id: string;
          author_name: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          featured_image?: string | null;
          category: "global" | "politics" | "maritime" | "health" | "business";
          is_breaking_news?: boolean;
          author_id: string;
          author_name?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          featured_image?: string | null;
          category?: "global" | "politics" | "maritime" | "health" | "business";
          is_breaking_news?: boolean;
          author_id?: string;
          author_name?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      article_views: {
        Row: {
          id: string;
          article_id: string;
          device_type: "mobile" | "desktop" | "tablet";
          viewed_at: string;
          ip_hash: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          article_id: string;
          device_type: "mobile" | "desktop" | "tablet";
          viewed_at?: string;
          ip_hash?: string | null;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          article_id?: string;
          device_type?: "mobile" | "desktop" | "tablet";
          viewed_at?: string;
          ip_hash?: string | null;
          user_agent?: string | null;
        };
      };
    };
  };
}
