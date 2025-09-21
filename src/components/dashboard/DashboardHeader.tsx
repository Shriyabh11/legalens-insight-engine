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
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Comprehensive legal document analysis system with AI-powered risk assessment, 
            multi-language support, and intelligent insights for modern legal practice.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="secondary" size="lg" className="bg-white text-legal-primary hover:bg-legal-gray-50">
              <FileText className="mr-2 h-5 w-5" />
              Upload Document
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-legal-primary">
              <Shield className="mr-2 h-5 w-5" />
              View Analytics
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <FileText className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">2.5K+</div>
              <div className="text-blue-100">Documents Analyzed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">98.7%</div>
              <div className="text-blue-100">Risk Detection Accuracy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">12+</div>
              <div className="text-blue-100">Supported Languages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;