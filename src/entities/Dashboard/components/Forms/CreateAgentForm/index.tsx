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
import { Loader2, Upload, DollarSign, Link, Code } from "lucide-react";

interface CreateAgentFormProps {
  onSubmit: (data: {
    image: string;
    name: string;
    description: string;
    type: string;
    price: string;
    url: string;
    toolcalls: string;
  }) => void;
}

export function CreateAgentForm({ onSubmit }: CreateAgentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    type: "",
    price: "",
    url: "",
    toolcalls: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

    if (!formData.toolcalls.trim()) {
      newErrors.toolcalls = "Tool calls are required";
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSubmit(formData);

      // Reset form
      setFormData({
        image: "",
        name: "",
        description: "",
        type: "",
        price: "",
        url: "",
        toolcalls: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating agent:", error);
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

      {/* Tool Calls Field - Enhanced */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
          <Code className="w-4 h-4 text-orange-500" />
          <span>Tool Calls *</span>
        </label>
        <Textarea
          placeholder="Describe the tool calls your agent supports..."
          value={formData.toolcalls}
          onChange={(e) => handleInputChange("toolcalls", e.target.value)}
          className={`min-h-[80px] rounded-xl transition-all duration-200 ${
            errors.toolcalls
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          }`}
        />
        {errors.toolcalls && (
          <p className="text-xs text-red-600 flex items-center space-x-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>{errors.toolcalls}</span>
          </p>
        )}
      </div>

      {/* Submit Button - Enhanced */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
          text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
          transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Agent...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">+</span>
              </span>
              <span>Create Agent</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
