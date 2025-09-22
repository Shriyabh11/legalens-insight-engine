
import { useState, useEffect } from "react";
import { MessageSquare, Send, Bot, User, FileText, Zap, Brain, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isAnalyzing?: boolean;
}

interface DocumentChatbotProps {
  hasDocument: boolean;
}

const DocumentChatbot = ({ hasDocument }: DocumentChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: hasDocument
          ? '🤖 Hello! I\'ve analyzed your document using Google\'s AI. Ask me anything about:\n\n📋 Key clauses and terms\n⚠️ Risk factors and issues\n🌐 Translation needs\n📊 Summary insights\n\nWhat would you like to know?'
          : '👋 Hi! I\'m your AI legal assistant powered by Google Cloud. Upload a document first, and I\'ll help you analyze contracts, identify risks, explain legal terms, and more!',
        timestamp: new Date()
      }
    ]);
  }, [hasDocument]);

  const quickActions = hasDocument ? [
    { icon: Search, text: "🔍 Find key risks", query: "What are the main risks in this document?" },
    { icon: FileText, text: "📋 Summarize contract", query: "Give me a summary of this contract" },
    { icon: Brain, text: "🧠 Explain terms", query: "Explain any complex legal terms" },
    { icon: Zap, text: "⚡ Missing clauses", query: "What important clauses might be missing?" }
  ] : [
    { icon: FileText, text: "📄 How it works", query: "How does the document analysis work?" },
    { icon: Brain, text: "🤖 AI capabilities", query: "What can this AI assistant do?" },
    { icon: Search, text: "🔍 Supported formats", query: "What document formats are supported?" },
    { icon: Zap, text: "🌐 Languages", query: "What languages do you support?" }
  ];

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: textToSend }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: data.generated_text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      const errorResponse: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'Sorry, I am having trouble connecting to the AI. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    sendMessage(action.query);
  };

  return (
    <Card className="bg-gradient-legal-card border-legal-gray-200 h-[700px] flex flex-col animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-legal-gray-900">
          <MessageSquare className="h-5 w-5 text-legal-primary" />
          📄 Document AI Assistant
          <Badge variant="secondary">
            <Bot className="h-3 w-3 mr-1" />
            Google AI
          </Badge>
        </CardTitle>
        <p className="text-xs text-legal-gray-300">
          Powered by Google Gemini • Document AI • Translation API
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 pb-3 border-b border-legal-gray-200">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action)}
              className="text-xs h-8 hover:bg-legal-primary hover:text-white transition-all duration-200 hover:scale-105"
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.text}
            </Button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-slide-up ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-legal-primary rounded-full flex items-center justify-center animate-pulse-glow">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                <div
                  className={`p-3 rounded-lg shadow-sm ${
                    message.type === 'user'
                      ? 'bg-legal-primary text-white'
                      : 'bg-legal-gray-50 text-legal-gray-900 border border-legal-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
              
              {message.type === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-legal-gray-200 rounded-full flex items-center justify-center order-1">
                  <User className="h-4 w-4 text-legal-gray-900" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-legal-primary rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-legal-gray-50 p-3 rounded-lg border border-legal-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-legal-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-legal-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-legal-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-legal-gray-300">Google AI is thinking...</span>
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
            placeholder={hasDocument ? "Ask about your document..." : "Ask me about legal analysis..."}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={() => sendMessage()} 
            disabled={!inputValue.trim() || isTyping}
            className="bg-legal-primary hover:bg-legal-primary-dark hover:scale-105 transition-all duration-200"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentChatbot;
