"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How does the synchronization work?",
    answer: (
      <>
        After connecting your Notion account, you select a page and choose which
        Mermaid chart to sync. We generate a unique URL for your chart that you
        can add to Overleaf as an external image. This URL always serves the
        latest version of your chart, so you can refresh it in Overleaf whenever
        you make changes in Notion.
      </>
    ),
  },
  {
    question: "Why isn't my Mermaid chart being detected?",
    answer: (
      <>
        Make sure your Mermaid code is inside a proper "Mermaid" code block in
        Notion. If you can see a preview of your chart in Notion, you're all
        set! If not, use the{" "}
        <code className="bg-gray-100 px-1 rounded">/mermaid</code> command in
        Notion to create a proper Mermaid block.
      </>
    ),
  },
  {
    question: "Can I customize how my chart looks?",
    answer: (
      <>
        Yes! You can customize your chart's appearance by adding a config block
        at the top of your Mermaid code:
        <pre className="bg-gray-50 p-3 rounded-lg mt-2 text-sm font-mono border">
          {`---
config:
  theme: base
  themeVariables:
    primaryColor: "#ff6b6b"
---`}
        </pre>
      </>
    ),
  },
  {
    question: "How do I update my chart in Overleaf?",
    answer: (
      <>
        It's simple! In Overleaf, just click on your chart image and hit the{" "}
        <code className="bg-gray-100 px-1 rounded">Refresh</code> button. The
        latest version from Notion will appear automatically - no need to come
        back to our website.
      </>
    ),
  },
  {
    question: "Do you store my Notion data?",
    answer: (
      <>
        No, we don't permanently store your Notion data on our servers. Your
        chart URL contains encrypted information that allows us to access only
        your specific Mermaid code block when needed. We then use{" "}
        <a
          href="https://kroki.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          kroki.io
        </a>{" "}
        to render the chart and serve it to Overleaf.
      </>
    ),
  },
  {
    question: "Is there a limit on charts or cost?",
    answer: (
      <>
        Not at all! You can sync as many Mermaid charts as you need, completely
        free. There are no hidden costs, usage limits, or premium tiers.
      </>
    ),
  },
  {
    question: "Can I use this with private Notion pages?",
    answer: (
      <>
        Yes! As long as you've granted our app permission to access your Notion
        workspace, we can sync charts from both public and private pages. Your
        privacy settings remain intact.
      </>
    ),
  },
  {
    question: "Is this service open source?",
    answer: (
      <>
        Yes! The complete source code is available on GitHub at{" "}
        <a
          href="https://github.com/vantezzen/notion-mermaid-to-overleaf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline font-mono text-sm"
        >
          github.com/vantezzen/notion-mermaid-to-overleaf
        </a>
        . You're welcome to contribute, report issues, or self-host the service.
      </>
    ),
  },
];

function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about syncing your Mermaid charts
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4">
                  <div className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
