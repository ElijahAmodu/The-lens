"use client";
import { Card } from "@/component/ui/card";
import {
  Users,
  Eye,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 mb-10">
      <div>
        <h1 className="text-[20px] md:text-3xl font-bold text-[#003366] mb-8 mt-8 md:mt-0">
          Analytics
        </h1>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-[#FFFFFF]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm font-medium mb-2 whitespace-nowrap">
                  Total Visitors
                </p>
                <p className="text-lg md:text-3xl font-black text-gray-900">
                  2,543
                </p>
                <div className="flex items-center gap-1 text-red-600 text-sm mt-2">
                  <TrendingDown className="w-4 h-4" />
                  -12% from last month
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="md:w-6 md:h-6 h-4 w-4 text-blue-500" />
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
                  5.8M
                </p>
                <div className="text-green-600 text-xs md:text-sm mt-2 whitespace-nowrap">
                  <TrendingUp className="w-4 h-4" />
                  +12% from last month
                </div>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <Eye className="md:w-6 md:h-6 h-4 w-4 text-teal-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Top Performing Articles */}
          <Card className="p-6 bg-[#FFFFFF]">
            <h2 className="text-xl font-bold text-[#003366] mb-6">
              Top Performing Articles
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "The Future of AI In Journalism",
                  views: "36.76K Views",
                  change: "+12%",
                  positive: true,
                },
                {
                  title: "The Future of AI In Journalism",
                  views: "36.76K Views",
                  change: "-12%",
                  positive: false,
                },
                {
                  title: "The Future of AI In Journalism",
                  views: "36.76K Views",
                  change: "+12%",
                  positive: true,
                },
                {
                  title: "The Future of AI In Journalism",
                  views: "36.76K Views",
                  change: "-12%",
                  positive: false,
                },
              ].map((article, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{article.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {article.views}
                    </p>
                  </div>
                  <div
                    className={
                      article.positive ? "text-green-600" : "text-red-600"
                    }
                  >
                    <div className="flex items-center gap-1 text-sm font-medium">
                      {article.positive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {article.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Device Distribution */}
          <Card className="p-6 bg-[#FFFFFF]">
            <h2 className="text-xl font-bold text-[#003366] mb-6">
              Device Distribution
            </h2>
            <div className="space-y-4">
              {[
                {
                  device: "Mobile",
                  percentage: 58,
                  icon: Smartphone,
                  color: "text-blue-500",
                  bgColor: "bg-blue-100",
                },
                {
                  device: "Desktop",
                  percentage: 32,
                  icon: Monitor,
                  color: "text-teal-500",
                  bgColor: "bg-teal-100",
                },
                {
                  device: "Tablet",
                  percentage: 10,
                  icon: Tablet,
                  color: "text-purple-500",
                  bgColor: "bg-purple-100",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`${item.bgColor} p-2 rounded-lg`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="font-medium text-gray-900">
                        {item.device}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
