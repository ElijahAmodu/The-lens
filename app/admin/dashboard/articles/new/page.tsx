// "use client";

// import type React from "react";

// import { useState } from "react";
// import Link from "next/link";
// import { Card } from "@/component/ui/card";
// import { Button } from "@/component/ui/button";
// import { Input } from "@/component/ui/input";
// import { Textarea } from "@/component/ui/textarea";
// import {
//   ChevronLeft,
//   Bold,
//   Italic,
//   Underline,
//   List,
//   LinkIcon,
//   ImageIcon,
//   Code,
// } from "lucide-react";

// export default function NewArticlePage() {
//   const [formData, setFormData] = useState({
//     title: "",
//     type: "",
//     content: "",
//     publishDate: "",
//     image: null as File | null,
//   });

//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         image: file,
//       }));
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (
//       file &&
//       ["image/png", "image/jpeg", "image/gif", "video/mp4"].includes(file.type)
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         image: file,
//       }));
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Article submitted:", formData);
//   };

//   return (
//     <div className="px-8">
//       <div className="flex items-center gap-4 mb-6">
//         <Link
//           href="/admin/dashboard/articles"
//           className="flex gap-2 items-center"
//         >
//           <Button className=" h-auto bg-white p-2 rounded-md hover:bg-gray-100 cursor-pointer">
//             <ChevronLeft className="w-8 h-8 text-black" />
//           </Button>
//           <p className="text-sm text-[#898384]">
//             Back to Articles / New Article
//           </p>
//         </Link>
//       </div>
//       <div className="flex flex-col gap-8 ">
//         <div className="flex flex-col md:flex-row gap-8">
//           <Card className="p-8 md:w-9/12">
//             <form onSubmit={handleSubmit} className="space-y-8 w-full">
//               <div className=" w-full">
//                 <div className="w-full">
//                   <label className="block text-sm font-semibold text-[#003366] mb-2">
//                     Article Title
//                   </label>
//                   <Input
//                     type="text"
//                     name="title"
//                     placeholder="Enter article title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="w-full border border-[#E3E3E3] py-2 px-4 rounded-xl placeholder:text-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-[#003366] mb-4">
//                   Content
//                 </label>

//                 <div
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={handleDragDrop}
//                   className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-4 bg-gray-50 hover:bg-gray-100 transition"
//                 >
//                   {uploadedImage ? (
//                     <div className="flex flex-col items-center">
//                       <img
//                         src={uploadedImage || "/placeholder.svg"}
//                         alt="Uploaded"
//                         className="max-h-32 mb-4 rounded"
//                       />
//                       <label className="cursor-pointer text-blue-600 hover:text-blue-700 underline text-sm">
//                         Change image
//                         <input
//                           type="file"
//                           accept="image/png,image/jpeg,image/gif,video/mp4"
//                           onChange={handleImageUpload}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   ) : (
//                     <div>
//                       <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                       <p className="text-gray-700 font-medium mb-1">
//                         Upload a file or drag and drop
//                       </p>
//                       <p className="text-gray-500 text-sm mb-4">
//                         PNG, JPG, GIF and MP4 File
//                       </p>
//                       <label className="inline-block cursor-pointer">
//                         <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
//                           Browse Files
//                         </span>
//                         <input
//                           type="file"
//                           accept="image/png,image/jpeg,image/gif,video/mp4"
//                           onChange={handleImageUpload}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                   )}
//                 </div>

//                 <div className="border border-gray-300 rounded-lg overflow-hidden">
//                   <div className="bg-gray-50 border-b border-gray-300 p-3 flex items-center gap-1">
//                     <button
//                       type="button"
//                       className="p-2 hover:bg-gray-200 rounded text-gray-600"
//                       title="Bold"
//                     >
//                       <Bold className="w-4 h-4" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-2 hover:bg-gray-200 rounded text-gray-600"
//                       title="Italic"
//                     >
//                       <Italic className="w-4 h-4" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-2 hover:bg-gray-200 rounded text-gray-600"
//                       title="Underline"
//                     >
//                       <Underline className="w-4 h-4" />
//                     </button>
//                     <div className="w-px h-6 bg-gray-300 mx-1" />
//                     <button
//                       type="button"
//                       className="p-2 hover:bg-gray-200 rounded text-gray-600"
//                       title="List"
//                     >
//                       <List className="w-4 h-4" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-2 hover:bg-gray-200 rounded text-gray-600"
//                       title="Link"
//                     >
//                       <LinkIcon className="w-4 h-4" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-2 hover:bg-gray-200 rounded text-gray-600"
//                       title="Image"
//                     >
//                       <ImageIcon className="w-4 h-4" />
//                     </button>
//                     <button
//                       type="button"
//                       className="p-2 hover:bg-gray-200 rounded text-gray-600"
//                       title="Code"
//                     >
//                       <Code className="w-4 h-4" />
//                     </button>
//                   </div>

//                   <Textarea
//                     name="content"
//                     placeholder="Write your article content here"
//                     value={formData.content}
//                     onChange={handleInputChange}
//                     className="w-full min-h-80 p-4 border-0 focus:ring-0 resize-none rounded-none bg-transparent text-black placeholder:text-gray-400"
//                   />
//                 </div>
//               </div>

//               {/*  mobile date and type selection */}
//               <div className="py-8 w-full h-fit md:hidden">
//                 <div className="grid grid-cols-1 gap-6">
//                   {/* <div></div> */}
//                   <div>
//                     <label className="block text-sm font-semibold text-[#003366] mb-2">
//                       Article Type
//                     </label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//                     >
//                       <option value="" className="text-gray-400">
//                         Select Title
//                       </option>
//                       <option value="news">Global</option>
//                       <option value="opinion">Politics</option>
//                       <option value="analysis">Maritime</option>
//                       <option value="feature">Business</option>
//                       <option value="interview">Health</option>
//                       <option value="interview">Sports</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-[#003366] mb-2">
//                       Publish date
//                     </label>
//                     <Input
//                       type="date"
//                       name="publishDate"
//                       value={formData.publishDate}
//                       onChange={handleInputChange}
//                       className="w-full border border-[#E3E3E3] py-2 px-4 rounded-xl placeholder:text-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//                 <Link href="/dashboard/articles">
//                   <Button
//                     variant="outline"
//                     className="border-gray-300 bg-transparent text-[#000000]"
//                   >
//                     Save Draft
//                   </Button>
//                 </Link>
//                 <Button
//                   type="submit"
//                   className="bg-[#003366] hover:bg-blue-800 text-white"
//                 >
//                   Publish
//                 </Button>
//               </div>
//             </form>
//           </Card>

//           <Card className="p-8  max-w-[349px] h-fit hidden md:block">
//             <div className="grid grid-cols-1 gap-6">
//               <div>
//                 <label className="block text-sm font-semibold text-[#003366] mb-2">
//                   Article Type
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//                 >
//                   <option value="" className="text-gray-400">
//                     Select Title
//                   </option>
//                   <option value="news">Global</option>
//                   <option value="opinion">Politics</option>
//                   <option value="analysis">Maritime</option>
//                   <option value="feature">Business</option>
//                   <option value="interview">Health</option>
//                   <option value="interview">Sports</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-[#003366] mb-2">
//                   Publish date
//                 </label>
//                 <Input
//                   type="date"
//                   name="publishDate"
//                   value={formData.publishDate}
//                   onChange={handleInputChange}
//                   className="w-full border border-[#E3E3E3] py-2 px-4 rounded-xl placeholder:text-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Textarea } from "@/component/ui/textarea";
import {
  ChevronLeft,
  Bold,
  Italic,
  Underline,
  List,
  LinkIcon,
  ImageIcon,
  Code,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { createArticle } from "@/lib/articles";
import type { ArticleCategory } from "@/lib/db-helper";
import { useAuth } from "@/context/AuthContext";

// Add debug function to window for testing
if (typeof window !== "undefined") {
  (window as any).debugArticleForm = () => {
    console.log("=== DEBUG INFO ===");
    console.log("createArticle function:", createArticle);
    console.log("createArticle type:", typeof createArticle);
  };
}

export default function NewArticlePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "" as ArticleCategory | "",
    content: "",
    is_breaking_news: false,
    image: null as File | null,
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError(null);
    setSuccess(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (PNG, JPG, or GIF)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    console.log("=== 🎬 SUBMIT HANDLER CALLED ===");
    console.log("Event:", e);
    console.log("isDraft:", isDraft);

    e.preventDefault();
    e.stopPropagation();

    console.log("🚀 Submit triggered", { isDraft });
    console.log("👤 Current user:", user?.id);
    console.log("📦 Form data:", formData);

    // Check authentication
    if (!user) {
      console.error("❌ No user found");
      setError("You must be logged in to create articles");
      return;
    }

    console.log("✅ User authenticated, proceeding...");

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.title.trim()) {
      console.error("❌ No title");
      setError("Please enter an article title");
      setIsLoading(false);
      return;
    }

    if (!formData.content.trim()) {
      console.error("❌ No content");
      setError("Please enter article content");
      setIsLoading(false);
      return;
    }

    if (!formData.category) {
      console.error("❌ No category");
      setError("Please select an article category");
      setIsLoading(false);
      return;
    }

    console.log("✅ All validations passed");

    try {
      const articleData = {
        title: formData.title,
        content: formData.content,
        category: formData.category as ArticleCategory,
        is_breaking_news: formData.is_breaking_news,
        featured_image: formData.image,
        published: !isDraft,
      };

      console.log("📋 Article data prepared:", articleData);
      console.log("🔑 User ID:", user.id);
      console.log("🖼️ Has image:", !!formData.image);

      // Pass user ID from auth context
      console.log("📞 Calling createArticle...");
      const result = await createArticle(articleData, user.id);

      console.log("📊 Article creation result:", result);

      if (result.success) {
        setSuccess(result.message);
        setIsLoading(false);
        console.log("✅ Success! Redirecting in 2s...");

        // Redirect after delay
        setTimeout(() => {
          console.log("🔀 Redirecting now...");
          router.push("/admin/dashboard/articles");
        }, 2000);
      } else {
        console.error("❌ Failed:", result.error);
        setError(result.error || "Failed to create article");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("💥 Unexpected error:", err);
      console.error("Stack trace:", err.stack);
      setError(err.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#003366]" />
      </div>
    );
  }

  // Show error if not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-center mb-2">
            Not Authenticated
          </h2>
          <p className="text-center text-gray-600 mb-4">
            You must be logged in to create articles
          </p>
          <Button
            onClick={() => router.push("/admin/login")}
            className="w-full bg-[#003366]"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-8">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/dashboard/articles"
          className="flex gap-2 items-center"
        >
          <Button className="h-auto bg-white p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <ChevronLeft className="w-8 h-8 text-black" />
          </Button>
          <p className="text-sm text-[#898384]">
            Back to Articles / New Article
          </p>
        </Link>
      </div>

      {/* Success/Error Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="p-8 md:w-9/12">
            <form
              onSubmit={(e) => handleSubmit(e, false)}
              className="space-y-8 w-full"
            >
              <div className="w-full">
                <label className="block text-sm font-semibold text-[#003366] mb-2">
                  Article Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter article title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full border border-[#E3E3E3] py-2 px-4 rounded-xl placeholder:text-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-4">
                  Featured Image
                </label>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDragDrop}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  {uploadedImage ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-h-48 w-full mb-4 rounded object-cover"
                      />
                      <label className="cursor-pointer text-blue-600 hover:text-blue-700 underline text-sm">
                        Change image
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/gif"
                          onChange={handleImageUpload}
                          disabled={isLoading}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium mb-1">
                        Upload an image or drag and drop
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        PNG, JPG, or GIF (max 5MB)
                      </p>
                      <label className="inline-block cursor-pointer">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                          Browse Files
                        </span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/gif"
                          onChange={handleImageUpload}
                          disabled={isLoading}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-4">
                  Content *
                </label>

                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-300 p-3 flex items-center gap-1">
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-200 rounded text-gray-600"
                      title="Bold"
                      disabled={isLoading}
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-200 rounded text-gray-600"
                      title="Italic"
                      disabled={isLoading}
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-200 rounded text-gray-600"
                      title="Underline"
                      disabled={isLoading}
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-gray-300 mx-1" />
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-200 rounded text-gray-600"
                      title="List"
                      disabled={isLoading}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-200 rounded text-gray-600"
                      title="Link"
                      disabled={isLoading}
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-gray-200 rounded text-gray-600"
                      title="Code"
                      disabled={isLoading}
                    >
                      <Code className="w-4 h-4" />
                    </button>
                  </div>

                  <Textarea
                    name="content"
                    placeholder="Write your article content here..."
                    value={formData.content}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-full min-h-80 p-4 border-0 focus:ring-0 resize-none rounded-none bg-transparent text-black placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Mobile category and breaking news */}
              <div className="py-8 w-full h-fit md:hidden">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#003366] mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="global">Global</option>
                      <option value="politics">Politics</option>
                      <option value="maritime">Maritime</option>
                      <option value="business">Business</option>
                      <option value="health">Health</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="breaking-news-mobile"
                      name="is_breaking_news"
                      checked={formData.is_breaking_news}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="breaking-news-mobile"
                      className="text-sm font-medium text-[#003366]"
                    >
                      Mark as Breaking News
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => handleSubmit(e as any, true)}
                  disabled={isLoading}
                  className="border-gray-300 bg-transparent text-[#000000]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Draft"
                  )}
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#003366] hover:bg-blue-800 text-white"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </span>
                  ) : (
                    "Publish"
                  )}
                </Button>
              </div>
            </form>
          </Card>

          <Card className="p-8 max-w-[349px] h-fit hidden md:block">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#003366] mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="global">Global</option>
                  <option value="politics">Politics</option>
                  <option value="maritime">Maritime</option>
                  <option value="business">Business</option>
                  <option value="health">Health</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="breaking-news"
                  name="is_breaking_news"
                  checked={formData.is_breaking_news}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="breaking-news"
                  className="text-sm font-medium text-[#003366]"
                >
                  Mark as Breaking News
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
