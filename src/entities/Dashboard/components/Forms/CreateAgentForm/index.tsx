import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Upload,
  DollarSign,
  Link,
  Code,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";

interface ApiParam {
  id: string;
  key: string;
  value: string;
  type: "string" | "number" | "boolean";
}

interface ApiEndpoint {
  id: string;
  endpoint: string;
  apiParams: ApiParam[];
}

interface CreateAgentFormProps {
  onSubmit: (data: {
    image: string;
    name: string;
    description: string;
    type: string;
    price: string;
    url: string;
    endpoints: ApiEndpoint[];
  }) => void;
  onSuccess?: () => void;
}

export function CreateAgentForm({ onSubmit, onSuccess }: CreateAgentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    type: "",
    price: "",
    url: "",
    endpoints: [
      {
        id: "1",
        endpoint: "/",
        apiParams: [] as ApiParam[],
      },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [jsonInputs, setJsonInputs] = useState<Record<string, string>>({});
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  const [showParams, setShowParams] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Agent name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.type) {
      newErrors.type = "Pricing type is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = "Price must be a valid number";
    }

    if (!formData.url.trim()) {
      newErrors.url = "Agent URL is required";
    }

    if (formData.endpoints.length === 0) {
      newErrors.endpoints = "At least one endpoint is required";
    } else {
      formData.endpoints.forEach((endpoint, index) => {
        if (!endpoint.endpoint.trim()) {
          newErrors[`endpoint_${index}`] = "Endpoint is required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Send data to API
      const response = await fetch(
        "http://localhost:8000/api/agents/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Agent created successfully:", result);

      // Call the onSubmit callback with the form data
      onSubmit(formData);

      // Reset form
      setFormData({
        image: "",
        name: "",
        description: "",
        type: "",
        price: "",
        url: "",
        endpoints: [
          {
            id: "1",
            endpoint: "/",
            apiParams: [],
          },
        ],
      });
      setErrors({});

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      // You might want to show an error message to the user here
      setErrors({ submit: "Failed to create agent. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    // Clear submit error when user starts making changes
    if (errors.submit) {
      setErrors((prev) => ({ ...prev, submit: "" }));
    }
  };

  const handleEndpointChange = (endpointId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      endpoints: prev.endpoints.map((endpoint) =>
        endpoint.id === endpointId ? { ...endpoint, endpoint: value } : endpoint
      ),
    }));
  };

  const addEndpoint = () => {
    const newEndpoint: ApiEndpoint = {
      id: Date.now().toString(),
      endpoint: "/",
      apiParams: [],
    };

    setFormData((prev) => ({
      ...prev,
      endpoints: [...prev.endpoints, newEndpoint],
    }));
  };

  const removeEndpoint = (endpointId: string) => {
    if (formData.endpoints.length > 1) {
      setFormData((prev) => ({
        ...prev,
        endpoints: prev.endpoints.filter(
          (endpoint) => endpoint.id !== endpointId
        ),
      }));
    }
  };

  const handleJsonInputChange = (endpointId: string, value: string) => {
    setJsonInputs((prev) => ({ ...prev, [endpointId]: value }));
    // Clear error when user starts typing
    if (jsonErrors[endpointId]) {
      setJsonErrors((prev) => ({ ...prev, [endpointId]: "" }));
    }
  };

  const parseJsonToParams = (endpointId: string) => {
    const jsonString = jsonInputs[endpointId] || "";
    if (!jsonString.trim()) {
      setJsonErrors((prev) => ({ ...prev, [endpointId]: "JSON is required" }));
      return;
    }

    // Basic validation to check if it looks like JSON
    const trimmedInput = jsonString.trim();
    if (!trimmedInput.startsWith("{") || !trimmedInput.endsWith("}")) {
      setJsonErrors((prev) => ({
        ...prev,
        [endpointId]:
          "Input must be a valid JSON object (start with { and end with })",
      }));
      return;
    }

    try {
      const parsedObject = JSON.parse(jsonString);

      // Check if parsed result is an object (not array, string, number, etc.)
      if (
        typeof parsedObject !== "object" ||
        parsedObject === null ||
        Array.isArray(parsedObject)
      ) {
        setJsonErrors((prev) => ({
          ...prev,
          [endpointId]: "Input must be a JSON object with key-value pairs",
        }));
        return;
      }

      // Check if object has any properties
      if (Object.keys(parsedObject).length === 0) {
        setJsonErrors((prev) => ({
          ...prev,
          [endpointId]: "JSON object cannot be empty",
        }));
        return;
      }

      // Convert parsed object to ApiParam array
      const newParams: ApiParam[] = Object.entries(parsedObject).map(
        ([key, value]) => ({
          id: key,
          key: key,
          value: String(value),
          type:
            typeof value === "number"
              ? "number"
              : typeof value === "boolean"
                ? "boolean"
                : "string",
        })
      );

      setFormData((prev) => ({
        ...prev,
        endpoints: prev.endpoints.map((endpoint) =>
          endpoint.id === endpointId
            ? { ...endpoint, apiParams: newParams }
            : endpoint
        ),
      }));

      // Clear JSON input and error after successful parsing
      setJsonInputs((prev) => ({ ...prev, [endpointId]: "" }));
      setJsonErrors((prev) => ({ ...prev, [endpointId]: "" }));
      // Show parameters section for this endpoint
      setShowParams((prev) => ({ ...prev, [endpointId]: true }));
    } catch (error) {
      console.error("Error parsing JSON:", error);

      // Provide more specific error messages based on the error
      let errorMessage = "Invalid JSON format";

      if (error instanceof SyntaxError) {
        const errorStr = error.message.toLowerCase();
        if (errorStr.includes("unexpected token")) {
          errorMessage =
            "Invalid JSON syntax. Make sure to use proper JSON format with double quotes around keys and string values.";
        } else if (errorStr.includes("unexpected end")) {
          errorMessage =
            "Incomplete JSON. Make sure all brackets and braces are properly closed.";
        } else {
          errorMessage = "JSON syntax error. Please check your formatting.";
        }
      }

      setJsonErrors((prev) => ({
        ...prev,
        [endpointId]: errorMessage,
      }));
    }
  };

  const addApiParam = (endpointId: string) => {
    const newParam: ApiParam = {
      id: Date.now().toString(),
      key: "",
      value: "",
      type: "string",
    };

    setFormData((prev) => ({
      ...prev,
      endpoints: prev.endpoints.map((endpoint) =>
        endpoint.id === endpointId
          ? { ...endpoint, apiParams: [...endpoint.apiParams, newParam] }
          : endpoint
      ),
    }));
  };

  const removeApiParam = (endpointId: string, paramId: string) => {
    setFormData((prev) => ({
      ...prev,
      endpoints: prev.endpoints.map((endpoint) =>
        endpoint.id === endpointId
          ? {
              ...endpoint,
              apiParams: endpoint.apiParams.filter(
                (param) => param.id !== paramId
              ),
            }
          : endpoint
      ),
    }));
  };

  const updateApiParam = (
    endpointId: string,
    paramId: string,
    field: keyof ApiParam,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      endpoints: prev.endpoints.map((endpoint) =>
        endpoint.id === endpointId
          ? {
              ...endpoint,
              apiParams: endpoint.apiParams.map((param) =>
                param.id === paramId ? { ...param, [field]: value } : param
              ),
            }
          : endpoint
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {/* Image URL Field - Enhanced */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
          <Upload className="w-4 h-4 text-orange-500" />
          <span>Agent Image URL</span>
        </label>
        <Input
          type="url"
          placeholder="https://example.com/agent-image.jpg"
          value={formData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          className="h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
        />
        {formData.image && (
          <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
            <p className="text-xs text-orange-600">Preview: {formData.image}</p>
          </div>
        )}
      </div>

      {/* Name Field - Enhanced */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
          <span className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </span>
          <span>Agent Name *</span>
        </label>
        <Input
          type="text"
          placeholder="Enter agent name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`h-11 rounded-xl transition-all duration-200 ${
            errors.name
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          }`}
        />
        {errors.name && (
          <p className="text-xs text-red-600 flex items-center space-x-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Description Field - Enhanced */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
          <span className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </span>
          <span>Description *</span>
        </label>
        <Textarea
          placeholder="Describe what your agent does..."
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className={`min-h-[100px] rounded-xl transition-all duration-200 ${
            errors.description
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          }`}
        />
        {errors.description && (
          <p className="text-xs text-red-600 flex items-center space-x-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>{errors.description}</span>
          </p>
        )}
      </div>

      {/* Type and Price Grid - Enhanced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Type Field */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <DollarSign className="w-4 h-4 text-orange-500" />
            <span>Pricing Type *</span>
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleInputChange("type", value)}
          >
            <SelectTrigger
              className={`h-11 rounded-xl transition-all duration-200 ${
                errors.type
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              }`}
            >
              <SelectValue placeholder="Select pricing type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-orange-100">
              <SelectItem value="per-use" className="rounded-lg">
                Per Use
              </SelectItem>
              <SelectItem value="monthly" className="rounded-lg">
                Monthly Subscription
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-xs text-red-600 flex items-center space-x-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>{errors.type}</span>
            </p>
          )}
        </div>

        {/* Price Field */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">$</span>
            </span>
            <span>Price *</span>
          </label>
          <Input
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className={`h-11 rounded-xl transition-all duration-200 ${
              errors.price
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            }`}
          />
          {errors.price && (
            <p className="text-xs text-red-600 flex items-center space-x-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>{errors.price}</span>
            </p>
          )}
        </div>
      </div>

      {/* URL Field - Enhanced */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
          <Link className="w-4 h-4 text-orange-500" />
          <span>Agent URL *</span>
        </label>
        <Input
          type="url"
          placeholder="https://your-agent-endpoint.com"
          value={formData.url}
          onChange={(e) => handleInputChange("url", e.target.value)}
          className={`h-11 rounded-xl transition-all duration-200 ${
            errors.url
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          }`}
        />
        {errors.url && (
          <p className="text-xs text-red-600 flex items-center space-x-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>{errors.url}</span>
          </p>
        )}
      </div>

      {/* API Endpoints Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <Code className="w-4 h-4 text-orange-500" />
            <span>API Endpoints *</span>
          </label>
          <Button
            type="button"
            onClick={addEndpoint}
            className="h-9 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
            text-white rounded-lg text-sm font-medium flex items-center space-x-2 shadow-sm hover:shadow-md
            transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Endpoint</span>
          </Button>
        </div>

        {formData.endpoints.map((endpoint, index) => (
          <div
            key={endpoint.id}
            className="border border-gray-200 rounded-xl p-4 bg-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700">
                Endpoint {index + 1}
              </h4>
              {formData.endpoints.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeEndpoint(endpoint.id)}
                  className="h-8 w-8 p-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                  text-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md
                  transition-all duration-200 ease-out transform hover:scale-[1.05] active:scale-[0.95]
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Endpoint Path */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-medium text-gray-600">
                Endpoint Path
              </label>
              <Input
                type="text"
                placeholder="/swap"
                value={endpoint.endpoint}
                onChange={(e) =>
                  handleEndpointChange(endpoint.id, e.target.value)
                }
                className={`h-9 text-sm rounded-lg transition-all duration-200 ${
                  errors[`endpoint_${index}`]
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                }`}
              />
              {errors[`endpoint_${index}`] && (
                <p className="text-xs text-red-600 flex items-center space-x-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span>{errors[`endpoint_${index}`]}</span>
                </p>
              )}
            </div>

            {/* API Parameters */}
            <div className="space-y-3">
              <label className="text-xs font-medium text-gray-600">
                API Parameters
              </label>

              {/* JSON Input Section */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <label className="text-xs font-medium text-blue-700 mb-2 block">
                  Paste JSON Object (Optional)
                </label>
                <div className="mb-2 p-2 bg-blue-100 rounded text-xs text-blue-600">
                  <strong>Example:</strong> {"{"}"user_id": "12345", "amount":
                  100, "slippage": 0.5, "active": true{"}"}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder='{"user_id": "12345", "from_token": "ETH", "to_token": "USDC", "amount": 100, "slippage": 0.5}'
                    value={jsonInputs[endpoint.id] || ""}
                    onChange={(e) =>
                      handleJsonInputChange(endpoint.id, e.target.value)
                    }
                    className="flex-1 min-h-[60px] text-xs rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    onClick={() => parseJsonToParams(endpoint.id)}
                    className="h-fit px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                    text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg
                    transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer
                    relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200"
                  >
                    Parse JSON
                  </Button>
                </div>
                {jsonErrors[endpoint.id] && (
                  <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span>{jsonErrors[endpoint.id]}</span>
                  </p>
                )}
              </div>

              {/* Manual Add Button */}
              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => addApiParam(endpoint.id)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                  text-white rounded-lg text-sm font-medium flex items-center space-x-2 shadow-md hover:shadow-lg
                  transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer
                  relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Parameter Manually</span>
                </Button>
              </div>

              {(showParams[endpoint.id] || endpoint.apiParams.length > 0) && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-gray-600">
                      Manual Parameters
                    </label>
                    <Button
                      type="button"
                      onClick={() => addApiParam(endpoint.id)}
                      className="h-8 px-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                      text-white rounded-lg text-sm font-medium flex items-center space-x-2 shadow-sm hover:shadow-md
                      transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Param</span>
                    </Button>
                  </div>

                  <div className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {endpoint.apiParams.map((param) => (
                      <div
                        key={param.id}
                        className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Input
                            type="text"
                            placeholder="Key"
                            value={param.key}
                            onChange={(e) =>
                              updateApiParam(
                                endpoint.id,
                                param.id,
                                "key",
                                e.target.value
                              )
                            }
                            className="h-8 text-xs rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          />
                          <Input
                            type={param.type === "number" ? "number" : "text"}
                            placeholder="Value"
                            value={param.value}
                            onChange={(e) =>
                              updateApiParam(
                                endpoint.id,
                                param.id,
                                "value",
                                e.target.value
                              )
                            }
                            className="h-8 text-xs rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          />
                          <Select
                            value={param.type}
                            onValueChange={(value) =>
                              updateApiParam(
                                endpoint.id,
                                param.id,
                                "type",
                                value
                              )
                            }
                          >
                            <SelectTrigger className="h-8 text-xs rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="string">String</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="boolean">Boolean</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeApiParam(endpoint.id, param.id)}
                          className="h-8 w-8 p-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                          text-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md
                          transition-all duration-200 ease-out transform hover:scale-[1.05] active:scale-[0.95]
                          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    {endpoint.apiParams.length === 0 && (
                      <div className="text-center py-4 text-gray-500 text-xs">
                        No parameters yet. Use JSON parser or add manually with
                        "Add Param" button.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button - Enhanced */}
      <div className="pt-4">
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 flex items-center space-x-2">
              <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </span>
              <span>{errors.submit}</span>
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
          text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40
          transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer
          relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Agent...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Create Agent</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
