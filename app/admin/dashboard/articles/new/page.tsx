"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function NewArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    content: "",
    publishDate: "",
    image: null as File | null,
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (
      file &&
      ["image/png", "image/jpeg", "image/gif", "video/mp4"].includes(file.type)
    ) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Article submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/articles">
            <Button variant="ghost" className="p-0 h-auto">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Article
          </h1>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Article Title
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter article title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Article Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Title</option>
                  <option value="news">News</option>
                  <option value="opinion">Opinion</option>
                  <option value="analysis">Analysis</option>
                  <option value="feature">Feature</option>
                  <option value="interview">Interview</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Content
              </label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDragDrop}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                {uploadedImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="max-h-32 mb-4 rounded"
                    />
                    <label className="cursor-pointer text-blue-600 hover:text-blue-700 underline text-sm">
                      Change image
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif,video/mp4"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium mb-1">
                      Upload a file or drag and drop
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      PNG, JPG, GIF and MP4 File
                    </p>
                    <label className="inline-block cursor-pointer">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        Browse Files
                      </span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif,video/mp4"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-300 p-3 flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded text-gray-600"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded text-gray-600"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded text-gray-600"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded text-gray-600"
                    title="List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded text-gray-600"
                    title="Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded text-gray-600"
                    title="Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-200 rounded text-gray-600"
                    title="Code"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                </div>

                <Textarea
                  name="content"
                  placeholder="Write your article content here"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full min-h-80 p-4 border-0 focus:ring-0 resize-none rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div></div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Publish date
                </label>
                <Input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Link href="/dashboard/articles">
                <Button
                  variant="outline"
                  className="border-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                Publish Article
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
