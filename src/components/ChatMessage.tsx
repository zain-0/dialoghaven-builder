
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isAi?: boolean;
  isLoading?: boolean;
}

export const ChatMessage = ({ message, isAi, isLoading }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4 animate-fade-up",
        isAi ? "bg-slate-50" : "bg-white"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md",
          isAi ? "bg-primary text-white" : "bg-slate-100"
        )}
      >
        {isAi ? "AI" : "U"}
      </div>
      <div className="flex-1 space-y-2">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm text-slate-500">AI is thinking...</p>
          </div>
        ) : (
          <p className="leading-relaxed">{message}</p>
        )}
      </div>
    </div>
  );
};
