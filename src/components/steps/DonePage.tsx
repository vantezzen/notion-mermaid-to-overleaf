import { useState } from "react";
import { Copy, ExternalLink, CheckCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddFilesModal from "../AddFilesModal";
import ContextMenu from "../ContextMenu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface FinalInstructionsStepProps {
  diagramUrl: string;
  onNew: () => void;
}

export default function DonePage({
  diagramUrl,
  onNew,
}: FinalInstructionsStepProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(diagramUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>

        <h1 className="text-2xl text-gray-900 mb-6">Your chart is ready</h1>

        <div className="bg-white rounded-lg p-6 mb-8 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chart URL
          </label>
          <div className="flex gap-2 mb-4">
            <Input
              value={diagramUrl}
              readOnly
              className="flex-1 font-mono text-sm bg-gray-50 font-medium"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="px-4"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900 mb-1">
                1. Click on "New file" in Overleaf
              </p>

              <ContextMenu />
            </div>

            <div>
              <p className="font-medium text-gray-900 mb-1">
                2. Select "From external URL", enter the URL, and name the file
              </p>
              <AddFilesModal url={diagramUrl} fileName="chart.png" />
            </div>

            <div>
              <p className="font-medium text-gray-900 mb-1">
                3. Update when needed
              </p>
              <p>
                If you need to update the chart, simply select the image in
                Overleaf and select "Refresh".
              </p>
            </div>
          </div>

          <Alert variant="destructive">
            <TriangleAlert className="h-4 w-4 mr-2" />
            <AlertTitle>Do not share this URL publicly</AlertTitle>
            <AlertDescription>
              This URL is unique to your chart and contains information about
              your Notion account. Sharing it may expose sensitive data.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => window.open(diagramUrl, "_blank")}
            variant="outline"
            className="px-6"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Chart
          </Button>
          <Button
            onClick={onNew}
            className="bg-black hover:bg-gray-800 text-white px-6"
          >
            Sync Another
          </Button>
        </div>
      </div>
    </div>
  );
}
