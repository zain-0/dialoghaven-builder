
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Model {
  id: string;
  name: string;
  description: string;
}

const models: Model[] = [
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5",
    description: "Fast and efficient for most tasks",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Most capable model for complex tasks",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description: "Advanced reasoning and comprehension",
  },
  {
    id: "llama-3",
    name: "Llama 3",
    description: "Open source model with good performance",
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export const ModelSelector = ({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) => {
  const [open, setOpen] = useState(false);
  
  const currentModel = models.find((model) => model.id === selectedModel) || models[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
          aria-label="Select model"
        >
          {currentModel.name}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              model.id === selectedModel && "bg-slate-100"
            )}
            onClick={() => {
              onModelChange(model.id);
              setOpen(false);
            }}
          >
            <div className="flex flex-col">
              <span className="font-medium">{model.name}</span>
              <span className="text-xs text-slate-500">{model.description}</span>
            </div>
            {model.id === selectedModel && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
