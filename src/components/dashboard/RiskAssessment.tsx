import { Shield, AlertTriangle, TrendingUp, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface RiskAssessmentProps {
  analysis: {
    riskScore: number;
    piiDetected: number;
    clauses: number;
    language: string;
    issues: string[];
  } | null;
}

const RiskAssessment = ({ analysis }: RiskAssessmentProps) => {
  if (!analysis) {
    return (
      <Card className="bg-gradient-legal-card border-legal-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-legal-gray-900">
            <Shield className="h-5 w-5 text-legal-primary" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12 text-legal-gray-300">
          Upload a document to view risk analysis
        </CardContent>
      </Card>
    );
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Low", color: "legal-success", bgColor: "bg-legal-success" };
    if (score >= 60) return { level: "Medium", color: "legal-warning", bgColor: "bg-legal-warning" };
    return { level: "High", color: "legal-danger", bgColor: "bg-legal-danger" };
  };

  const risk = getRiskLevel(analysis.riskScore);

  return (
    <Card className="bg-gradient-legal-card border-legal-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-legal-gray-900">
          <Shield className="h-5 w-5 text-legal-primary" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Score */}
        <div className="text-center space-y-4">
          <div className="relative inline-flex items-center justify-center">
            <div className={`w-24 h-24 rounded-full ${risk.bgColor} flex items-center justify-center text-white font-bold text-2xl`}>
              {analysis.riskScore}
            </div>
          </div>
          <div>
            <Badge 
              variant="secondary" 
              className={`${risk.bgColor} text-white font-medium px-3 py-1`}
            >
              {risk.level} Risk
            </Badge>
            <p className="text-sm text-legal-gray-300 mt-2">
              Overall document safety score
            </p>
          </div>
        </div>

        {/* Risk Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-legal-gray-300">Risk Level</span>
            <span className="font-medium text-legal-gray-900">{analysis.riskScore}/100</span>
          </div>
          <Progress value={analysis.riskScore} className="h-2" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-legal-gray-50 rounded-lg p-4 text-center">
            <Eye className="h-6 w-6 text-legal-info mx-auto mb-2" />
            <div className="text-2xl font-bold text-legal-gray-900">{analysis.piiDetected}</div>
            <div className="text-xs text-legal-gray-300">PII Elements</div>
          </div>
          <div className="bg-legal-gray-50 rounded-lg p-4 text-center">
            <TrendingUp className="h-6 w-6 text-legal-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-legal-gray-900">{analysis.clauses}</div>
            <div className="text-xs text-legal-gray-300">Clauses Analyzed</div>
          </div>
        </div>

        {/* Issues Identified */}
        {analysis.issues.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-legal-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-legal-warning" />
              Issues Identified
            </h4>
            <div className="space-y-2">
              {analysis.issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-legal-warning/10 rounded-lg border border-legal-warning/20">
                  <AlertTriangle className="h-4 w-4 text-legal-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-legal-gray-900">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Info */}
        <div className="pt-4 border-t border-legal-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-legal-gray-300">Language:</span>
            <span className="font-medium text-legal-gray-900">{analysis.language}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;