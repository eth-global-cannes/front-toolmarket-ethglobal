import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { Parameter } from "@/types/parameter";

interface RunAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRun: (parameters: Parameter[]) => void;
}

export function RunAgentModal({ isOpen, onClose, onRun }: RunAgentModalProps) {
  const [parameters, setParameters] = useState<Parameter[]>([
    { key: "", value: "", type: "String" },
  ]);
  const [response, setResponse] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);

    // Simulate agent execution
    setTimeout(() => {
      setResponse("The weather forecast for today is 26 degrees");
      setIsRunning(false);
    }, 2000);

    onRun(parameters);
  };

  const handleClose = () => {
    setResponse("");
    setIsRunning(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[650px] p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold">Run</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Manual Parameters</h3>
            <Button
              onClick={() =>
                setParameters([
                  ...parameters,
                  { key: "", value: "", type: "String" },
                ])
              }
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Param
            </Button>
          </div>

          <div className="space-y-3">
            {parameters.map((param, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={param.key}
                  onChange={(e) => {
                    const newParams = [...parameters];
                    newParams[index].key = e.target.value;
                    setParameters(newParams);
                  }}
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={param.value}
                  onChange={(e) => {
                    const newParams = [...parameters];
                    newParams[index].value = e.target.value;
                    setParameters(newParams);
                  }}
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <select
                  value={param.type}
                  onChange={(e) => {
                    const newParams = [...parameters];
                    newParams[index].type = e.target.value;
                    setParameters(newParams);
                  }}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[80px]"
                >
                  <option value="String">String</option>
                </select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newParams = parameters.filter((_, i) => i !== index);
                    setParameters(newParams);
                  }}
                  className="text-red-500 hover:text-red-700 h-8 w-8"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Response Section */}
          {(response || isRunning) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium mb-2">Agent Response:</h4>
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-gray-600">
                    Running agent...
                  </span>
                </div>
              ) : (
                <p className="text-sm text-gray-800">{response}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleRun}
            className="bg-green-500 hover:bg-green-600 text-white"
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Agent"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
