"use client";

import {
  X,
  FileText,
  Upload,
  FolderOpen,
  Globe,
  FileImage,
  BookOpen,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddFilesModal({
  url,
  fileName,
}: {
  url?: string;
  fileName?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl h-[200px] flex flex-col">
      {/* Content */}
      <div className="grid grid-cols-3">
        {/* Left Sidebar */}
        <div className="bg-gray-50 border-r border-gray-200 p-4">
          <div className="space-y-1">
            <div className="flex items-center px-3 py-2 text-gray-700 rounded">
              <FileText className="h-4 w-4 mr-3 text-gray-500" />
              <span className="text-sm">New file</span>
            </div>

            <div className="flex items-center px-3 py-2 text-gray-700 rounded">
              <Upload className="h-4 w-4 mr-3 text-gray-500" />
              <span className="text-sm">Upload</span>
            </div>

            {/* Selected option */}
            <div className="flex items-center px-3 py-2 text-blue-700 bg-blue-50 border border-blue-200 rounded">
              <Globe className="h-4 w-4 mr-3 text-blue-600" />
              <span className="text-sm font-medium">From external URL</span>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 col-span-2">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL to fetch the file from
              </label>
              <Input
                type="url"
                value={url || ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Name In This Project
              </label>
              <Input
                type="text"
                readOnly
                value={fileName || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
