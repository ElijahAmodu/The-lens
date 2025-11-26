"use client";

import { Card } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Badge } from "@/component/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: "UNGA 79: 'Prioritise Debt Forgiveness', Tinubu Tells UN",
      author: "John Doe",
      category: "Politics",
      date: "2025-03-10",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      title: "Customs Resorts to Sensitization on 4% FOB Levy",
      author: "John Doe",
      category: "Politics",
      date: "2025-03-10",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      title: "Climate Change: New Research Findings",
      author: "John Doe",
      category: "Politics",
      date: "2025-03-10",
      status: "Draft",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      title: "Climate Change: New Research Findings",
      author: "John Doe",
      category: "Politics",
      date: "2025-03-10",
      status: "Draft",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      title: "Customs Resorts to Sensitization on 4% FOB Levy",
      author: "John Doe",
      category: "Politics",
      date: "2025-03-10",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 md:px-8">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[21px] md:text-3xl font-bold text-[#003366]">
              Article Management
            </h1>
            <p className="text-[#898384] mt-1">
              Create and manage your article
            </p>
          </div>
          <Link href="/admin/dashboard/articles/new">
            <Button className="bg-[#003366] hover:bg-[#003366]/80 text-white hover:cursor-pointer hidden md:flex ">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        <Card className="p-4 md:p-6 bg-[#FAFAFA] ">
          <div className="mb-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold text-[#003366] mb-4">
                Articles
              </h2>
              <Button className="bg-[#003366] hover:bg-[#003366]/80 text-white hover:cursor-pointer md:hidden flex text-lg">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </div>

            <div className="flex gap-4 mt-10 md:mt-0">
              <div className="flex border border-[#E3E3E3] rounded-md w-full px-2 py-2">
                <Search className=" top-3 w-6 h-6 text-[#CCCBCB]" />
                <Input
                  placeholder="Search"
                  className="pl-2  placeholder:text-gray-400 text-black w-full"
                />
              </div>
              <Button
                variant="outline"
                className=" border-none bg-transparent text-black"
              >
                <Filter className="w-4 h-4 mr-2 text-black" />
                Filter
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-start gap-3 md:p-4 border-none md:border border-gray-200  rounded-lg hover:bg-[#F0F3F9]"
              >
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-10 h-10 md:w-16 md:h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[16px] md:text-lg font-semibold text-gray-900 line-clamp-1">
                    {article.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-1">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="mt-3 md:hidden">
                    <Badge
                      variant={
                        article.status === "Published" ? "default" : "secondary"
                      }
                    >
                      {article.status}
                    </Badge>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Badge
                    variant={
                      article.status === "Published" ? "default" : "secondary"
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
