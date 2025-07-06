import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateAgentForm } from "@/entities/Dashboard/components/Forms/CreateAgentForm";
import { useFlowCurrentUser } from "@onflow/kit";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface CreateAgentButtonProps {
  handleCreateAgent: (data: {
    image: string;
    name: string;
    description: string;
    type: string;
    price: string;
    url: string;
  }) => void;
}
export const CreateAgentButton = ({ handleCreateAgent }: CreateAgentButtonProps) => {
  const { user } = useFlowCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user?.addr) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DialogTrigger asChild>
      <button
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
        text-white rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
        p-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 
        flex items-center space-x-1 sm:space-x-2 
        transition-all duration-200 ease-out transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
        aria-label="Create new agent"
      >
        <PlusIcon
          className="w-4 h-4 sm:w-5 sm:h-5"
          strokeWidth={2.5}
        />
        <span className="hidden sm:inline text-sm lg:text-base font-semibold">
          Create Agent
        </span>
      </button>
    </DialogTrigger>
    <DialogContent className="w-[95vw] max-w-lg mx-auto max-h-[90vh] p-0 m-4 bg-white border border-orange-100 shadow-2xl shadow-orange-500/10">
      <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4 bg-gradient-to-r from-orange-50 to-orange-50/50 border-b border-orange-100">
        <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
          Create New Agent
        </DialogTitle>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details to create your AI agent
        </p>
      </DialogHeader>
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto custom-scrollbar">
        <CreateAgentForm
          onSubmit={handleCreateAgent}
          onSuccess={() => setIsModalOpen(false)}
        />
      </div>
    </DialogContent>
  </Dialog>
  )
}