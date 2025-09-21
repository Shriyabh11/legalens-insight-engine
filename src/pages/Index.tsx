import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DocumentUpload from "@/components/dashboard/DocumentUpload";
import RiskAssessment from "@/components/dashboard/RiskAssessment";
import DocumentChatbot from "@/components/dashboard/DocumentChatbot";
import MultiLanguageSupport from "@/components/dashboard/MultiLanguageSupport";

const Index = () => {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);

  const handleDocumentAnalyzed = (analysis: any) => {
    setCurrentAnalysis(analysis);
  };

  return (
    <div className="min-h-screen bg-gradient-legal-subtle">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Document Upload & Risk Assessment */}
          <div className="lg:col-span-1 space-y-6">
            <DocumentUpload onDocumentAnalyzed={handleDocumentAnalyzed} />
            <RiskAssessment analysis={currentAnalysis} />
          </div>
          
          {/* Right Column - Enhanced Document Chatbot */}
          <div className="lg:col-span-2">
            <DocumentChatbot hasDocument={!!currentAnalysis} />
          </div>
        </div>

        {/* Multi-Language Support */}
        <MultiLanguageSupport />

        {/* Google Technologies Credit Footer */}
        <div className="bg-gradient-legal-card border-legal-gray-200 rounded-lg p-6 text-center animate-fade-in">
          <h3 className="text-lg font-semibold text-legal-gray-900 mb-4">🚀 Powered by Google Cloud Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-legal-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-sm font-medium text-legal-gray-900">Gemini AI</div>
              <div className="text-xs text-legal-gray-300">Advanced reasoning</div>
            </div>
            <div className="bg-legal-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-2">📄</div>
              <div className="text-sm font-medium text-legal-gray-900">Document AI</div>
              <div className="text-xs text-legal-gray-300">Text extraction</div>
            </div>
            <div className="bg-legal-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-2">🌐</div>
              <div className="text-sm font-medium text-legal-gray-900">Translation API</div>
              <div className="text-xs text-legal-gray-300">12+ languages</div>
            </div>
            <div className="bg-legal-gray-50 p-3 rounded-lg">
              <div className="text-2xl mb-2">🔊</div>
              <div className="text-sm font-medium text-legal-gray-900">Text-to-Speech</div>
              <div className="text-xs text-legal-gray-300">Voice synthesis</div>
            </div>
          </div>
          <p className="text-xs text-legal-gray-300">
            ⚡ Demo built for hackathon • Real integration requires Supabase backend
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
