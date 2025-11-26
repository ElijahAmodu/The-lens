"use client";

import { Card } from "@/component/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/component/ui/table";
import { FileText, Eye } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className=" bg-[#F0F3F9] px-4 md:px-8">
      <div className="bg-[#F0F3F9]">
        <h1 className="text-[20px] md:text-3xl font-bold text-[#003366] mb-8 mt-8 md:mt-0">
          Dashboard Overview
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-6 mb-8">
          <Card className="p-4 md:p-6 bg-[#FFFFFF]">
            <div className="flex items-start justify-between">
              <div className="">
                <p className="text-gray-600 text-xs md:text-sm font-medium mb-2 whitespace-nowrap">
                  Total Articles
                </p>
                <p className="text-lg md:text-3xl font-black text-gray-900">
                  2,543
                </p>
                <p className="text-red-600 text-xs md:text-sm mt-2 whitespace-nowrap">
                  -12% from last month
                </p>
              </div>
              <div className="bg-[#D6EBFF] p-3 rounded-full ">
                <FileText className="md:w-6 md:h-6 h-4 w-4 text-[#0070E0]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#FFFFFF]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm font-medium mb-2 whitespace-nowrap">
                  Page Views
                </p>
                <p className="text-lg md:text-3xl font-black text-gray-900">
                  300k
                </p>
                <p className="text-green-600 text-xs md:text-sm mt-2 whitespace-nowrap">
                  +12% from last month
                </p>
              </div>
              <div className="bg-[#A4F4E7] p-3 rounded-full">
                <Eye className="md:w-6 md:h-6 h-4 w-4 text-[#0B7B69]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Articles Table */}
        <Card className="bg-[#FFFFFF] mb-4">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Articles</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F0F3F9]">
                <TableHead className="text-gray-700 font-semibold">
                  Article
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Author
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Viewed
                </TableHead>
                <TableHead className="text-gray-700 font-semibold">
                  Published
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  article: "The Future of AI In Journalism",
                  author: "John Doe",
                  views: "12.5k",
                  published: "2h",
                },
                {
                  article: "The Future of AI In Journalism",
                  author: "John Doe",
                  views: "3.3M",
                  published: "5h",
                },
                {
                  article: "The Future of AI In Journalism",
                  author: "John Doe",
                  views: "500K",
                  published: "16h",
                },
                {
                  article: "The Future of AI In Journalism",
                  author: "John Doe",
                  views: "8.6K",
                  published: "20h",
                },
              ].map((item, idx) => (
                <TableRow key={idx} className="border-b border-gray-200">
                  <TableCell className="text-gray-900 font-medium whitespace-nowrap">
                    {item.article}
                  </TableCell>
                  <TableCell className="text-gray-600 whitespace-nowrap">
                    {item.author}
                  </TableCell>
                  <TableCell className="text-gray-600">{item.views}</TableCell>
                  <TableCell className="text-gray-600">
                    {item.published}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
