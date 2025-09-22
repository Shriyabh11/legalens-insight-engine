
import { useState, useRef } from "react";
import { MessageSquare, Send, Bot, User, Lightbulb, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI legal assistant. I can help you analyze documents, explain legal terms, and provide insights. What would you like to know?',
      suggestions: [
        'Explain the main risks in this contract',
        'What are the termination clauses?',
        'Summarize key obligations',
        'Check for missing standard clauses'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (prompt?: string) => {
    const messageContent = prompt || inputValue;
    if (!messageContent.trim() || !apiKey.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: messageContent
    };

    setMessages(prev => [...prev, newMessage]);
    if (!prompt) {
      setInputValue('');
    }
    setIsTyping(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(messageContent);
      const response = await result.response;
      const text = response.text();

      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: text,
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error(error);
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'Sorry, I am having trouble connecting to the AI service. Please check your API key and try again.',
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        sendMessage(`Analyze the following document for risks and provide a summary:
${content}`);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="bg-gradient-legal-card border-legal-gray-200 h-[700px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-legal-gray-900">
          <MessageSquare className="h-5 w-5 text-legal-primary" />
          AI Legal Assistant
          <Badge variant="secondary" className="bg-legal-primary text-white ml-2">
            <Bot className="h-3 w-3 mr-1" />
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 bg-legal-primary rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-legal-primary text-white'
                      : 'bg-legal-gray-50 text-legal-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.suggestions && (
                  <div className="mt-2 space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs text-legal-primary hover:text-legal-primary-dark border border-legal-primary/20 hover:border-legal-primary/40 rounded px-2 py-1 transition-colors"
                      >
                        <Lightbulb className="h-3 w-3 inline mr-1" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-legal-gray-200 rounded-full flex items-center justify-center order-1">
                  <User className="h-4 w-4 text-legal-gray-900" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-legal-primary rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-legal-gray-50 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-legal-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-legal-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-legal-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API Key"
            className="flex-1"
          />
        </div>

        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about legal terms, risks, or document analysis..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!inputValue.trim() || isTyping || !apiKey.trim()}
            className="bg-legal-primary hover:bg-legal-primary-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isTyping || !apiKey.trim()}
            className="w-full bg-legal-secondary hover:bg-legal-secondary-dark"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload and Analyze for Risk
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
