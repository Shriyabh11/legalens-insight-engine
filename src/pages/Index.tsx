import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DocumentUpload from "@/components/dashboard/DocumentUpload";
import RiskAssessment from "@/components/dashboard/RiskAssessment";
import AIAssistant from "@/components/dashboard/AIAssistant";
import Analytics from "@/components/dashboard/Analytics";
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
          
          {/* Right Column - AI Assistant */}
          <div className="lg:col-span-2">
            <AIAssistant />
          </div>
        </div>

        {/* Multi-Language Support */}
        <MultiLanguageSupport />

        {/* Analytics Dashboard */}
        <div>
          <h2 className="text-2xl font-bold text-legal-gray-900 mb-6">Analytics & Insights</h2>
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default Index;
