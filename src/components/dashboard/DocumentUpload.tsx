
import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
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
      const file = newFiles[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const document_text = event.target?.result;
        
        const response = await fetch("http://127.0.0.1:5001/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ document_text }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const analysis = await response.json();
        
        setUploadedFiles(prev => [...prev, ...newFiles]);
        onDocumentAnalyzed(analysis);
        
        toast({
          title: "Document analyzed successfully",
          description: `${newFiles.length} document(s) processed with AI analysis`,
        });
      };

      reader.readAsText(file);

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

  const handleDemoDocument = () => {
    const demoContent = `
    # Sample Employment Agreement

    This Employment Agreement ("Agreement") is made and entered into as of this 1st day of January, 2023, by and between:
    
    **Tech Solutions Inc.**, a corporation organized and existing under the laws of the State of Delaware, with its principal office located at 123 Innovation Drive, Techville, CA 94000 (hereinafter referred to as the "Company"), and
    
    **John Doe**, an individual residing at 456 Main Street, Anytown, USA 12345 (hereinafter referred to as the "Employee").
    
    ## 1. Position and Duties
    
    The Company agrees to employ the Employee in the position of Senior Software Engineer. The Employee will be responsible for designing, developing, and maintaining software applications as assigned by the Company.
    
    ## 2. Compensation
    
    The Company will pay the Employee an annual salary of **$150,000**, payable in bi-weekly installments. The Employee's salary may be subject to review and adjustment from time to time at the sole discretion of the Company.
    
    ## 3. Confidentiality
    
    The Employee agrees that all information, whether written or oral, concerning the Company's business, technology, business relationships, or financial affairs that the Company has not made publicly available is "Confidential Information." The Employee will not, either during or after the term of this Agreement, disclose any Confidential Information to any third party for any reason.
    
    ## 4. Term and Termination
    
    This Agreement shall commence on the date first written above and shall continue until terminated by either party with at least **thirty (30) days' written notice**. The Company may terminate this Agreement for cause at any time, without notice or payment in lieu of notice.
    
    ## 5. Governing Law
    
    This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles.
    
    IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.
    
    **Company:** Tech Solutions Inc.
    
    _________________________
    By: Jane Smith, CEO
    
    **Employee:**
    
    _________________________
    John Doe
    `;
    const demoFile = new File([demoContent], "demo-document.txt", { type: "text/plain" });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(demoFile);
    handleFileUpload(dataTransfer.files);
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
          className="border-2 border-dashed border-legal-gray-200 rounded-lg p-8 text-center hover:border-legal-primary hover:bg-legal-primary/5 transition-all duration-300 cursor-pointer group animate-fade-in"
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
              <p className="text-legal-gray-900 font-medium">🤖 Google AI is analyzing your document...</p>
              <div className="flex justify-center gap-2 text-xs text-legal-gray-300">
                <span>📄 Extracting text</span>
                <span>•</span>
                <span>🔍 Risk analysis</span>
                <span>•</span>
                <span>🌐 Language detection</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-legal-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-legal-gray-900 font-medium mb-2">
                  🎯 Drop your legal documents here or click to browse
                </p>
                <p className="text-legal-gray-300 text-sm">
                  ⚡ Instant AI analysis • Supports PDF, DOC, DOCX, TXT • Up to 20MB
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
                  <Badge variant="secondary">
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

        <div className="flex gap-2">
          <Button 
            onClick={triggerFileInput} 
            disabled={isUploading}
            className="w-full bg-legal-primary hover:bg-legal-primary-dark"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Processing..." : "Select Documents"}
          </Button>
          <Button 
            onClick={handleDemoDocument} 
            disabled={isUploading}
            className="w-full bg-legal-secondary hover:bg-legal-secondary-dark"
          >
            <FileText className="mr-2 h-4 w-4" />
            {isUploading ? "Processing..." : "Demo Document"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
