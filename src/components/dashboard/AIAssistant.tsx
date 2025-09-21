import { useState } from "react";
import { MessageSquare, Send, Bot, User, Lightbulb, FileSearch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: generateAIResponse(inputValue),
        suggestions: [
          'Tell me more about liability clauses',
          'What should I negotiate?',
          'Are there any red flags?'
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const responses = [
      'Based on the document analysis, I\'ve identified several key areas that require attention. The contract contains standard commercial terms but lacks specific provisions for data protection compliance.',
      'The main risks I\'ve detected include unclear termination conditions and potential liability exposure. I recommend reviewing clauses 4.2 and 7.1 for better protection.',
      'This document shows a moderate risk profile. The PII detection system found personal information that should be properly anonymized according to privacy regulations.',
      'I\'ve analyzed the legal structure and found that while the agreement is generally sound, there are opportunities to strengthen your negotiating position in sections related to intellectual property rights.'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <Card className="bg-gradient-legal-card border-legal-gray-200 h-[600px] flex flex-col">
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
        {/* Messages */}
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
                  <p className="text-sm">{message.content}</p>
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

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about legal terms, risks, or document analysis..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={sendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="bg-legal-primary hover:bg-legal-primary-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;