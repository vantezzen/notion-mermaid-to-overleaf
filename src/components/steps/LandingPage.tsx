"use client";

import {
  ArrowRight,
  Zap,
  RefreshCw,
  Link2,
  CheckCircle,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-8">
              <Zap className="h-4 w-4 mr-2" />
              Seamless diagram synchronization
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Sync your{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Mermaid charts
              </span>
              <br />
              from Notion to Overleaf
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Stop manually copying diagrams between platforms. Connect your
              Notion workspace to Overleaf and keep your charts automatically
              synchronized with a single click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={() => signIn("notion")}
                size="lg"
                className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Connect with Notion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Fully free and open-source
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 border-2 border-white" />
                </div>
                <span>
                  We don't store your data,
                  <a
                    href="https://github.com/vantezzen/notion-mermaid-to-overleaf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    you can self-host
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to connect your workflow and never manually
              sync diagrams again
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Link2,
                title: "Connect & Authenticate",
                description:
                  "Link your Notion account and paste the URL of any page containing Mermaid charts",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                step: "01",
              },
              {
                icon: Zap,
                title: "Select Your Chart",
                description:
                  "Choose which Mermaid diagram you want to sync from your Notion page",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                step: "02",
              },
              {
                icon: RefreshCw,
                title: "Auto-Sync Forever",
                description:
                  "Get a direct Overleaf link that automatically updates whenever you modify your chart",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
                step: "03",
              },
            ].map((feature, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mr-4`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-mono text-gray-400">
                      {feature.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why should you use this integration?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "No more version conflicts",
                    description:
                      "Keep your diagrams in sync automatically. One source of truth for all your charts.",
                  },
                  {
                    title: "Seamless collaboration",
                    description:
                      "You update diagrams in Notion, they appear instantly in your LaTeX documents.",
                  },
                  {
                    title: "Always up-to-date",
                    description:
                      "Never submit papers with outdated diagrams. Changes propagate automatically.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                    <span className="text-xs text-gray-500 ml-2">
                      notion.so
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-gray-200 rounded w-1/2" />
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
                      <div className="text-xs text-blue-600 font-mono">
                        mermaid
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        graph TD...
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                    <span className="text-xs text-gray-500 ml-2">
                      overleaf.com
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-2/3" />
                    <div className="h-2 bg-green-200 rounded w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to streamline your workflow?
          </h2>

          <Button
            onClick={() => signIn("notion")}
            size="lg"
            className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-gray-400 mt-4">
            Fully free and open-source.
          </p>
        </div>
      </div>
    </div>
  );
}
