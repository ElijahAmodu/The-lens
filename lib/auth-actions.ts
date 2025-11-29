import { createSupabaseClient } from "./supabase";

// ============================================
// TYPES
// ============================================

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// ============================================
// SIGNUP FUNCTION
// ============================================

export async function signUp(signupData: SignupData): Promise<AuthResponse> {
  try {
    const supabase = createSupabaseClient();

    // Step 1: Check if email is whitelisted
    const { data: whitelistData, error: whitelistError } = await supabase
      .from("admin_whitelist")
      .select("role")
      .eq("email", signupData.email)
      .single();

    if (whitelistError) {
      console.error("Whitelist check error:", whitelistError);
      return {
        success: false,
        message: "Email not authorized",
        error:
          "Your email is not whitelisted. Please contact a super admin to add your email to the admin list.",
      };
    }

    if (!whitelistData) {
      return {
        success: false,
        message: "Email not authorized",
        error:
          "Your email is not whitelisted. Please contact a super admin to add your email to the admin list.",
      };
    }

    const userRole = whitelistData.role;

    // Step 2: Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        data: {
          full_name: signupData.name,
        },
      },
    });

    if (authError) {
      return {
        success: false,
        message: "Signup failed",
        error: authError.message,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        message: "Signup failed",
        error: "User creation failed. Please try again.",
      };
    }

    // Step 3: Create profile in profiles table
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email: signupData.email,
      full_name: signupData.name,
      role: userRole,
    });

    if (profileError) {
      // If profile creation fails, we should clean up the auth user
      // But Supabase doesn't allow us to delete users from client
      // So we'll just return an error
      return {
        success: false,
        message: "Profile creation failed",
        error: profileError.message,
      };
    }

    // Step 4: Check if email confirmation is required
    if (authData.session) {
      // User is automatically logged in
      return {
        success: true,
        message: "Account created successfully! You are now logged in.",
        data: {
          user: authData.user,
          session: authData.session,
          role: userRole,
        },
      };
    } else {
      // Email confirmation required
      return {
        success: true,
        message:
          "Account created! Please check your email to confirm your account.",
        data: {
          user: authData.user,
          emailConfirmationRequired: true,
        },
      };
    }
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}

// ============================================
// LOGIN FUNCTION
// ============================================

export async function login(loginData: LoginData): Promise<AuthResponse> {
  console.log("=== Login Function Started ===");
  try {
    const supabase = createSupabaseClient();
    console.log("Supabase client created");

    // Step 1: Sign in with email and password
    console.log("Attempting to sign in with password...");
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

    console.log("Auth response:", {
      hasUser: !!authData?.user,
      hasSession: !!authData?.session,
      error: authError,
    });

    if (authError) {
      console.error("Auth error:", authError);
      return {
        success: false,
        message: "Login failed",
        error: authError.message,
      };
    }

    if (!authData.user || !authData.session) {
      console.error("No user or session in auth data");
      return {
        success: false,
        message: "Login failed",
        error: "Invalid credentials. Please try again.",
      };
    }

    // Step 2: Get user profile to check role
    console.log("Fetching user profile for ID:", authData.user.id);
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    console.log("Profile response:", {
      hasProfile: !!profileData,
      role: profileData?.role,
      error: profileError,
    });

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return {
        success: false,
        message: "Profile not found",
        error: `Profile error: ${profileError.message}`,
      };
    }

    if (!profileData) {
      console.error("No profile data returned");
      return {
        success: false,
        message: "Profile not found",
        error:
          "Your account exists but profile is missing. Please contact support.",
      };
    }

    // Step 3: Verify user is admin or super_admin
    console.log("Checking user role:", profileData.role);
    if (profileData.role !== "admin" && profileData.role !== "super_admin") {
      console.warn("User does not have admin privileges");
      // Sign out the user since they're not authorized
      await supabase.auth.signOut();

      return {
        success: false,
        message: "Access denied",
        error: "You do not have permission to access the admin portal.",
      };
    }

    console.log("=== Login Successful ===");
    return {
      success: true,
      message: "Login successful!",
      data: {
        user: authData.user,
        session: authData.session,
        profile: profileData,
      },
    };
  } catch (error: any) {
    console.error("=== Login Exception ===", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}

// ============================================
// LOGOUT FUNCTION
// ============================================

export async function logout(): Promise<AuthResponse> {
  try {
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        message: "Logout failed",
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}

// ============================================
// GET CURRENT SESSION
// ============================================

export async function getCurrentSession() {
  try {
    const supabase = createSupabaseClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Session error:", error);
      return null;
    }

    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}

// ============================================
// GET CURRENT USER WITH PROFILE
// ============================================

export async function getCurrentUserWithProfile() {
  try {
    const supabase = createSupabaseClient();

    const session = await getCurrentSession();

    if (!session) {
      return null;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Profile fetch error:", error);
      return null;
    }

    return {
      user: session.user,
      profile,
    };
  } catch (error) {
    console.error("Get user with profile error:", error);
    return null;
  }
}

// ============================================
// PASSWORD RESET REQUEST
// ============================================

export async function requestPasswordReset(
  email: string
): Promise<AuthResponse> {
  try {
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) {
      return {
        success: false,
        message: "Password reset failed",
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Password reset email sent! Check your inbox.",
    };
  } catch (error: any) {
    console.error("Password reset error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}

// ============================================
// UPDATE PASSWORD
// ============================================

export async function updatePassword(
  newPassword: string
): Promise<AuthResponse> {
  try {
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        message: "Password update failed",
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Password updated successfully!",
    };
  } catch (error: any) {
    console.error("Password update error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      error: error.message || "Please try again later.",
    };
  }
}
