import { useState } from "react";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: hasDocument 
        ? '🤖 Hello! I\'ve analyzed your document using Google\'s AI. Ask me anything about:\n\n📋 Key clauses and terms\n⚠️ Risk factors and issues\n🌐 Translation needs\n📊 Summary insights\n\nWhat would you like to know?'
        : '👋 Hi! I\'m your AI legal assistant powered by Google Cloud. Upload a document first, and I\'ll help you analyze contracts, identify risks, explain legal terms, and more!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

    // Simulate AI response with Google technologies
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: generateSmartResponse(textToSend, hasDocument),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const generateSmartResponse = (question: string, hasDoc: boolean): string => {
    const lowerQ = question.toLowerCase();
    
    if (!hasDoc) {
      if (lowerQ.includes('work') || lowerQ.includes('analysis')) {
        return '🚀 Here\'s how LegalLens AI works:\n\n1. **Document Upload** - Drop your PDF/DOC files\n2. **Google Document AI** - Extracts and structures text\n3. **Gemini Analysis** - Identifies risks, clauses, and issues\n4. **Multi-language Support** - Translation in 12+ languages\n5. **Interactive Chat** - Ask questions about your document\n\n✨ All powered by Google Cloud technologies!';
      }
      if (lowerQ.includes('capabilities') || lowerQ.includes('assistant')) {
        return '🤖 **My AI Capabilities:**\n\n• 📄 **Document Analysis** - Contract review, risk assessment\n• 🔍 **PII Detection** - Find sensitive information\n• 🌐 **Translation** - 12+ languages including Hindi, Tamil, Telugu\n• 💬 **Legal Q&A** - Explain complex terms and clauses\n• ⚖️ **Risk Scoring** - Automated compliance checking\n• 📊 **Insights** - Key findings and recommendations\n\n*Powered by Google Gemini & Document AI*';
      }
      return '👋 Upload a legal document first, and I\'ll analyze it using Google\'s AI to help you understand risks, terms, and provide insights!';
    }

    // Document-specific responses
    if (lowerQ.includes('risk') || lowerQ.includes('danger')) {
      return '⚠️ **Key Risks Identified:**\n\n🔴 **High Priority:**\n• Missing termination clauses (Lines 23-45)\n• Unclear liability limitations\n• Data protection gaps\n\n🟡 **Medium Priority:**\n• Payment terms need clarification\n• Intellectual property provisions incomplete\n\n💡 **Recommendation:** Review sections 4.2 and 7.1 for better legal protection.\n\n*Analysis powered by Google Gemini AI*';
    }
    
    if (lowerQ.includes('summary') || lowerQ.includes('overview')) {
      return '📋 **Document Summary:**\n\n**Type:** Service Agreement\n**Parties:** Company A ↔ Company B\n**Duration:** 2 years (renewable)\n**Value:** $50,000 annually\n\n**Key Terms:**\n• Monthly service delivery\n• 30-day termination notice\n• Limited liability clause present\n• IP ownership retained by provider\n\n**Risk Score:** 72/100 (Medium-Low Risk)\n\n🤖 *Analyzed using Google Document AI + Gemini*';
    }
    
    if (lowerQ.includes('terms') || lowerQ.includes('explain')) {
      return '🧠 **Legal Terms Explained:**\n\n**"Force Majeure"** - Events beyond reasonable control (natural disasters, war, etc.)\n\n**"Indemnification"** - One party protects another from legal claims/damages\n\n**"Limitation of Liability"** - Cap on damages one party can claim\n\n**"Intellectual Property"** - Patents, trademarks, copyrights owned by parties\n\n💡 Want me to explain any specific clause? Just ask!\n\n*Definitions powered by Google\'s legal knowledge base*';
    }
    
    if (lowerQ.includes('missing') || lowerQ.includes('clause')) {
      return '🔍 **Missing Standard Clauses:**\n\n❌ **Critical Missing:**\n• Data breach notification requirements\n• Dispute resolution mechanism\n• Governing law specification\n\n⚠️ **Recommended Additions:**\n• Confidentiality/NDA provisions\n• Performance benchmarks\n• Service level agreements (SLAs)\n\n✅ **Present & Good:**\n• Termination procedures\n• Payment terms\n• Basic liability coverage\n\n*Gap analysis by Google AI*';
    }

    // Default responses
    const responses = [
      '🔍 Based on my analysis using Google\'s AI, this document has moderate complexity with some areas requiring attention. The main concern is around liability clauses in section 4.',
      '📊 Google Document AI found 23 key clauses in your document. The risk assessment shows 3 high-priority items and 7 medium-priority considerations.',
      '🌐 This document is in English. I can translate key sections to Hindi, Tamil, Telugu, or 9+ other languages using Google Translate API.',
      '⚖️ The legal structure appears sound, but I recommend reviewing the indemnification clause (page 3) and adding clearer termination procedures.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
          <Badge variant="secondary" className="bg-legal-primary text-white ml-2 animate-pulse-glow">
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