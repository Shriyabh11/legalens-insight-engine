import { Scale, FileText, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/legallens-hero.jpg";

const DashboardHeader = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-legal-primary text-white">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative container mx-auto px-6 py-16">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-12 w-12 text-white" />
            <h1 className="text-4xl font-bold">LegalLens AI</h1>
          </div>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-fade-in">
            🚀 AI-Powered Legal Document Analysis • Multi-Language Support • Real-time Risk Assessment
          </p>
          <div className="flex flex-wrap gap-4 mb-8 animate-slide-up">
            <Button variant="secondary" size="lg" className="bg-white text-legal-primary hover:bg-legal-gray-50 hover:scale-105 transition-all duration-300 animate-pulse-glow">
              <FileText className="mr-2 h-5 w-5" />
              🎯 Try Demo Upload
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-legal-primary hover:scale-105 transition-all duration-300">
              <Shield className="mr-2 h-5 w-5" />
              ⚡ Quick Analysis
            </Button>
          </div>
          
          {/* Powered by Google Cloud Banner */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/30 animate-scale-in">
            <div className="flex items-center justify-center gap-4 text-white">
              <span className="text-sm font-medium">⚡ Powered by Google Cloud Technologies:</span>
              <div className="flex gap-3 text-xs">
                <span className="bg-white/20 px-2 py-1 rounded">Gemini AI</span>
                <span className="bg-white/20 px-2 py-1 rounded">Document AI</span>
                <span className="bg-white/20 px-2 py-1 rounded">Translation API</span>
                <span className="bg-white/20 px-2 py-1 rounded">Text-to-Speech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;