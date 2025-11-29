import { createSupabaseClient } from "./supabase";
import type { Article, ArticleCategory } from "./db-helper";

// ============================================
// TYPES
// ============================================

export interface CreateArticleData {
  title: string;
  content: string;
  category: ArticleCategory;
  is_breaking_news: boolean;
  featured_image?: File | null;
  published: boolean;
}

export interface ArticleResponse {
  success: boolean;
  message: string;
  data?: Article;
  error?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

// ============================================
// IMAGE UPLOAD
// ============================================

export async function uploadArticleImage(file: File): Promise<string> {
  console.log("📤 Starting image upload...");
  const supabase = createSupabaseClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const filePath = `articles/${fileName}`;

  console.log("📍 Upload path:", filePath);

  const { data, error } = await supabase.storage
    .from("article-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("❌ Upload error:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  console.log("✅ Upload successful:", data.path);

  const {
    data: { publicUrl },
  } = supabase.storage.from("article-images").getPublicUrl(filePath);

  console.log("🔗 Public URL:", publicUrl);
  return publicUrl;
}

// ============================================
// CREATE ARTICLE - Takes userId directly from auth context
// ============================================

export async function createArticle(
  articleData: CreateArticleData,
  userId: string
): Promise<ArticleResponse> {
  console.log("=== 📝 Create Article Started ===");
  console.log("👤 User ID:", userId);
  console.log("📋 Article data:", {
    title: articleData.title,
    category: articleData.category,
    hasImage: !!articleData.featured_image,
    published: articleData.published,
  });

  if (!userId) {
    console.error("❌ No user ID provided");
    return {
      success: false,
      message: "Not authenticated",
      error: "You must be logged in to create articles.",
    };
  }

  try {
    const supabase = createSupabaseClient();

    // Upload image if provided
    let imageUrl: string | null = null;
    if (articleData.featured_image) {
      console.log("🖼️ Uploading featured image...");
      imageUrl = await uploadArticleImage(articleData.featured_image);
    }

    // Generate slug from title
    const slug = generateSlug(articleData.title);
    console.log("🔗 Generated slug:", slug);

    // Check if slug already exists
    console.log("🔍 Checking for duplicate slug...");
    const { data: existingArticle, error: checkError } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (checkError) {
      console.error("❌ Error checking slug:", checkError);
      throw checkError;
    }

    if (existingArticle) {
      console.warn("⚠️ Slug already exists");
      return {
        success: false,
        message: "Slug already exists",
        error:
          "An article with a similar title already exists. Please use a different title.",
      };
    }

    // Create article
    console.log("💾 Inserting article into database...");
    const insertData = {
      title: articleData.title,
      slug: slug,
      content: articleData.content,
      category: articleData.category,
      is_breaking_news: articleData.is_breaking_news,
      featured_image: imageUrl,
      author_id: userId,
      published: articleData.published,
    };

    console.log("📦 Insert data:", insertData);

    const { data, error } = await supabase
      .from("articles")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("❌ Database insert error:", error);
      console.error("Error code:", error.code);
      console.error("Error details:", error.details);
      console.error("Error hint:", error.hint);
      return {
        success: false,
        message: "Failed to create article",
        error: `${error.message} (${error.code})`,
      };
    }

    console.log("✅ Article created successfully!");
    console.log("📄 Article ID:", data.id);

    return {
      success: true,
      message: articleData.published
        ? "Article published successfully!"
        : "Article saved as draft!",
      data: data,
    };
  } catch (error: any) {
    console.error("=== ❌ Create Article Exception ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}

// ============================================
// UPDATE ARTICLE
// ============================================

export async function updateArticle(
  articleId: string,
  updates: Partial<CreateArticleData>,
  userId: string
): Promise<ArticleResponse> {
  console.log("=== 📝 Update Article Started ===");

  if (!userId) {
    return {
      success: false,
      message: "Not authenticated",
      error: "You must be logged in to update articles.",
    };
  }

  try {
    const supabase = createSupabaseClient();

    // Upload new image if provided
    let imageUrl: string | undefined;
    if (updates.featured_image) {
      console.log("🖼️ Uploading new featured image...");
      imageUrl = await uploadArticleImage(updates.featured_image);
    }

    // Generate new slug if title changed
    let slug: string | undefined;
    if (updates.title) {
      slug = generateSlug(updates.title);
    }

    // Prepare update data
    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (slug) updateData.slug = slug;
    if (updates.content) updateData.content = updates.content;
    if (updates.category) updateData.category = updates.category;
    if (updates.is_breaking_news !== undefined)
      updateData.is_breaking_news = updates.is_breaking_news;
    if (imageUrl) updateData.featured_image = imageUrl;
    if (updates.published !== undefined)
      updateData.published = updates.published;

    console.log("💾 Updating article:", articleId);
    const { data, error } = await supabase
      .from("articles")
      .update(updateData)
      .eq("id", articleId)
      .select()
      .single();

    if (error) {
      console.error("❌ Database update error:", error);
      return {
        success: false,
        message: "Failed to update article",
        error: error.message,
      };
    }

    console.log("✅ Article updated successfully!");
    return {
      success: true,
      message: "Article updated successfully!",
      data: data,
    };
  } catch (error: any) {
    console.error("=== ❌ Update Article Exception ===", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}

// ============================================
// DELETE ARTICLE
// ============================================

export async function deleteArticle(
  articleId: string
): Promise<ArticleResponse> {
  try {
    const supabase = createSupabaseClient();

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", articleId);

    if (error) {
      return {
        success: false,
        message: "Failed to delete article",
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Article deleted successfully!",
    };
  } catch (error: any) {
    console.error("Delete article error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}

// ============================================
// GET ARTICLES
// ============================================

export async function getMyArticles(userId: string): Promise<Article[]> {
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("author_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getAllArticles(publishedOnly = true): Promise<Article[]> {
  try {
    const supabase = createSupabaseClient();

    let query = supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (publishedOnly) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticlesByCategory(
  category: ArticleCategory,
  publishedOnly = true
): Promise<Article[]> {
  try {
    const supabase = createSupabaseClient();

    let query = supabase
      .from("articles")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (publishedOnly) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}
