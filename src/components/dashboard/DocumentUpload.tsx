import { useState, useRef } from "react";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onDocumentAnalyzed: (analysis: any) => void;
}

const DocumentUpload = ({ onDocumentAnalyzed }: DocumentUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);
    const newFiles = Array.from(files);
    
    try {
      // Simulate document analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Mock analysis results
      const mockAnalysis = {
        riskScore: Math.floor(Math.random() * 40) + 60, // 60-100
        piiDetected: Math.floor(Math.random() * 5) + 1,
        clauses: Math.floor(Math.random() * 20) + 10,
        language: "English",
        issues: ["Missing termination clause", "Unclear liability terms"]
      };
      
      onDocumentAnalyzed(mockAnalysis);
      
      toast({
        title: "Document analyzed successfully",
        description: `${newFiles.length} document(s) processed with AI analysis`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Please try again or contact support",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="bg-gradient-legal-card border-legal-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-legal-gray-900">
          <FileText className="h-5 w-5 text-legal-primary" />
          Document Upload & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-legal-gray-200 rounded-lg p-8 text-center hover:border-legal-primary transition-colors cursor-pointer"
          onClick={triggerFileInput}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
          
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin h-12 w-12 border-4 border-legal-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-legal-gray-900 font-medium">Analyzing document with AI...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-legal-primary mx-auto" />
              <div>
                <p className="text-legal-gray-900 font-medium mb-2">
                  Drop your legal documents here or click to browse
                </p>
                <p className="text-legal-gray-300 text-sm">
                  Supports PDF, DOC, DOCX, TXT files up to 20MB
                </p>
              </div>
            </div>
          )}
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-legal-gray-900">Uploaded Documents</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-legal-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-legal-primary" />
                  <span className="text-sm font-medium text-legal-gray-900">{file.name}</span>
                  <Badge variant="secondary" className="bg-legal-success text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Analyzed
                  </Badge>
                </div>
                <span className="text-xs text-legal-gray-300">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={triggerFileInput} 
          disabled={isUploading}
          className="w-full bg-legal-primary hover:bg-legal-primary-dark"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Processing..." : "Select Documents"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;