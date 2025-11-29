"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

// Simple debug component to test article creation step by step
export default function DebugArticleCreation() {
  const [log, setLog] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    console.log(message);
    setLog((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testSession = async () => {
    setIsLoading(true);
    setLog([]);

    try {
      addLog("Creating Supabase client...");
      const supabase = createSupabaseClient();

      addLog("Fetching session...");
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        addLog(`❌ Session error: ${error.message}`);
      } else if (session) {
        addLog(`✅ Session found: ${session.user.email}`);
        addLog(`User ID: ${session.user.id}`);
      } else {
        addLog("❌ No session found - user not logged in");
      }
    } catch (err: any) {
      addLog(`❌ Exception: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testImageUpload = async () => {
    setIsLoading(true);
    setLog([]);

    try {
      addLog("Creating test file...");
      const blob = new Blob(["test"], { type: "image/png" });
      const file = new File([blob], "test.png", { type: "image/png" });

      addLog("Creating Supabase client...");
      const supabase = createSupabaseClient();

      const fileName = `test-${Date.now()}.png`;
      const filePath = `articles/${fileName}`;

      addLog(`Uploading to: ${filePath}`);

      const { data, error } = await supabase.storage
        .from("article-images")
        .upload(filePath, file);

      if (error) {
        addLog(`❌ Upload error: ${error.message}`);
      } else {
        addLog(`✅ Upload successful: ${data.path}`);

        const {
          data: { publicUrl },
        } = supabase.storage.from("article-images").getPublicUrl(filePath);

        addLog(`✅ Public URL: ${publicUrl}`);
      }
    } catch (err: any) {
      addLog(`❌ Exception: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testArticleInsert = async () => {
    setIsLoading(true);
    setLog([]);

    try {
      addLog("Creating Supabase client...");
      const supabase = createSupabaseClient();

      addLog("Fetching session...");
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        addLog("❌ Not logged in");
        return;
      }

      addLog(`✅ Logged in as: ${session.user.email}`);

      const testArticle = {
        title: "Test Article " + Date.now(),
        slug: "test-article-" + Date.now(),
        content: "This is a test article",
        category: "global" as const,
        is_breaking_news: false,
        author_id: session.user.id,
        published: false,
      };

      addLog("Inserting article...");
      const { data, error } = await supabase
        .from("articles")
        .insert(testArticle)
        .select()
        .single();

      if (error) {
        addLog(`❌ Insert error: ${error.message}`);
        addLog(`Error code: ${error.code}`);
        addLog(`Error details: ${JSON.stringify(error.details)}`);
      } else {
        addLog(`✅ Article created with ID: ${data.id}`);
      }
    } catch (err: any) {
      addLog(`❌ Exception: ${err.message}`);
      addLog(`Stack: ${err.stack}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debug Article Creation</h1>

      <div className="space-y-4 mb-6">
        <button
          onClick={testSession}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Test Session
        </button>

        <button
          onClick={testImageUpload}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 ml-2"
        >
          Test Image Upload
        </button>

        <button
          onClick={testArticleInsert}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50 ml-2"
        >
          Test Article Insert
        </button>
      </div>

      <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
        {log.length === 0 ? (
          <div className="text-gray-500">
            Click a button to start testing...
          </div>
        ) : (
          log.map((entry, i) => <div key={i}>{entry}</div>)
        )}
      </div>
    </div>
  );
}
