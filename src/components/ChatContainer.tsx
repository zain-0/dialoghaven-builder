
import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
}

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    const userMessage = { id: Date.now().toString(), text: message, isAi: false };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response - Replace with actual API call
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: "This is a simulated AI response. Replace this with actual API integration.",
        isAi: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAi={message.isAi}
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
