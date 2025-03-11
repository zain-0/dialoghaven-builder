
import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ModelSelector } from "./ModelSelector";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  model?: string;
}

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");

  const handleSendMessage = async (message: string) => {
    const userMessage = { id: Date.now().toString(), text: message, isAi: false };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response - Replace with actual API call
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: `This is a simulated AI response from ${selectedModel}. Replace this with actual API integration.`,
        isAi: true,
        model: selectedModel,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="border-b bg-white p-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">AI Chat</h1>
          <ModelSelector 
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-3">
                <svg className="h-6 w-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
              <p className="text-slate-500 max-w-md">
                Choose a model and start chatting. I can answer questions, provide information, and help with various tasks.
              </p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAi={message.isAi}
              model={message.model}
            />
          ))}
          {isLoading && <ChatMessage message="" isAi isLoading />}
        </div>
      </main>
      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
};
