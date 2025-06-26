"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MermaidBlock } from "@/app/api/charts/route";

interface ChartSelectionStepProps {
  onSelect: (chart: MermaidBlock) => Promise<string | void>;
  blocks: MermaidBlock[];
  onBack?: () => void;
}

function createKrokiUrl(block: MermaidBlock): string {
  return `/api/preview/${encodeURIComponent(block.content)}`;
}

export default function SelectChart({
  onSelect,
  blocks,
  onBack = () => window.history.back(),
}: ChartSelectionStepProps) {
  const [selectedChart, setSelectedChart] = useState<MermaidBlock | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (chart: MermaidBlock) => {
    setSelectedChart(chart);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleContinue = async () => {
    if (!selectedChart) return;

    setIsLoading(true);
    onSelect(selectedChart)
      .then((error) => {
        setIsLoading(false);
        if (error) {
          setError(error);
        } else {
          setSelectedChart(null);
          setError(null);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error selecting chart:", err);
        setError("An unexpected error occurred. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl text-gray-900 mb-2">Select your chart</h1>
        <p className="text-gray-500 mb-12">
          Found {blocks.length} Mermaid charts in your page
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {blocks.map((chart) => (
            <div
              key={chart.id}
              onClick={() => handleSelect(chart)}
              className={`p-6 bg-white rounded-lg cursor-pointer transition-all border-2 ${
                selectedChart === chart
                  ? "border-black shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600 text-left overflow-hidden relative">
                <img
                  src={createKrokiUrl(chart)}
                  alt="Mermaid chart preview"
                  className="w-full h-32 object-contain mb-2 rounded"
                />

                <pre className="whitespace-pre-wrap break-words h-32">
                  {chart.content}
                </pre>

                <div className="bg-gradient-to-b from-slate-50/0 to-slate-50/100 overflow-hidden absolute bottom-0 left-0 w-full h-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedChart || isLoading}
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating link...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <button
          onClick={onBack}
          className="block mx-auto mt-8 text-gray-400 hover:text-gray-600 text-sm font-light"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
