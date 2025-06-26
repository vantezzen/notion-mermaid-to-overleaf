"use client";
import React from "react";
import UrlInput from "./UrlInput";
import { MermaidBlock } from "@/app/api/charts/route";
import SelectChart from "./SelectChart";
import DonePage from "./DonePage";

enum Steps {
  url,
  chart,
  result,
}

function App() {
  const [diagramUrl, setDiagramUrl] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<Steps>(Steps.url);
  const [blocks, setBlocks] = React.useState<MermaidBlock[]>([]);

  if (step === Steps.url) {
    return (
      <UrlInput
        onSubmit={async (url) => {
          const response = await fetch("/api/charts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url,
            }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            return (
              errorData.error || "An error occurred while processing the URL."
            );
          }
          const data = await response.json();
          if (typeof data === "object" && "message" in data) {
            const { message } = data;
            return (
              message || "No Mermaid chart blocks found on this Notion page."
            );
          }

          const blocks = data as MermaidBlock[];
          if (blocks.length === 0) {
            return "No Mermaid chart blocks found on this Notion page.";
          }

          setBlocks(blocks);
          setStep(Steps.chart);
          window.scrollTo({
            top: 0,
          });
        }}
      />
    );
  }

  if (step === Steps.chart) {
    return (
      <SelectChart
        blocks={blocks}
        onSelect={async (chart) => {
          const response = await fetch("/api/package", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              block: chart,
            }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            return (
              errorData.error || "An error occurred while processing the chart."
            );
          }
          const data = await response.json();
          if (typeof data === "object" && "error" in data) {
            const { error } = data;
            return error || "An error occurred while processing the chart.";
          }

          const { chartUrl } = data;
          setDiagramUrl(chartUrl);
          setStep(Steps.result);
          window.scrollTo({
            top: 0,
          });
        }}
        onBack={() => setStep(Steps.url)}
      />
    );
  }

  if (step === Steps.result) {
    return (
      <DonePage
        diagramUrl={diagramUrl!}
        onNew={() => {
          setStep(Steps.url);
          setDiagramUrl(null);
          setBlocks([]);
          window.scrollTo({
            top: 0,
          });
        }}
      />
    );
  }

  return null;
}

export default App;
