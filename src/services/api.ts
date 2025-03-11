
interface ChatCompletionRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
}

interface ChatCompletionResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
  model: string;
}

export const generateChatCompletion = async (
  prompt: string, 
  history: Array<{text: string; isAi: boolean}>,
  model: string
): Promise<string> => {
  try {
    // Convert our app's message format to the API format
    const messages = history.map(msg => ({
      role: msg.isAi ? "assistant" : "user",
      content: msg.text
    }));
    
    // Add the current prompt
    messages.push({
      role: "user",
      content: prompt
    });

    // For demonstration, we'll use a public test API - replace with your actual API endpoint
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add your API key here if needed
        // "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: 500
      } as ChatCompletionRequest)
    });

    if (!response.ok) {
      // If the API is not connected, provide fallback behavior
      console.warn("API request failed, using fallback response");
      return `This is a fallback response simulating ${model}. In a real application, this would be a response from the AI model.`;
    }

    const data = await response.json() as ChatCompletionResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating chat completion:", error);
    return `Sorry, there was an error communicating with the AI service. Please try again later.`;
  }
};
