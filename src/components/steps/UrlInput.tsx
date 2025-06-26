"use client";

import type React from "react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "../ui/alert";

export default function UrlInput({
  onSubmit,
}: {
  onSubmit: (url: string) => Promise<string | null>;
}) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!/^https:\/\/www\.notion\.so\/.+/.test(url)) {
      setError("Please enter a valid Notion page URL.");
      return;
    }

    setIsLoading(true);
    onSubmit(url)
      .then((error) => {
        setIsLoading(false);
        if (error) {
          setError(error);
        } else {
          setUrl("");
          setError(null);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error submitting URL:", err);
        setError("An unexpected error occurred. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-medium text-gray-900 mb-8">
          Enter your Notion page URL
        </h1>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2 mb-4">
            <Input
              type="url"
              placeholder="https://www.notion.so/your-page-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
            <Button
              type="submit"
              disabled={!url.trim() || isLoading}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        <p className="text-sm text-gray-500 mx-auto">
          In Notion, click "Share" on your page and copy the link.
          <br />
          Make sure the page contains at least one Mermaid diagram.
        </p>
      </div>
    </div>
  );
}
