import { useState } from "react";
import { Globe, Volume2, FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const MultiLanguageSupport = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const supportedLanguages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", flag: "🇮🇳" },
    { code: "ur", name: "Urdu", flag: "🇵🇰" },
    { code: "es", name: "Spanish", flag: "🇪🇸" }
  ];

  const sampleTranslations = {
    en: "This contract contains standard terms and conditions with moderate risk factors.",
    hi: "इस अनुबंध में मानक नियम और शर्तें हैं जिसमें मध्यम जोखिम कारक हैं।",
    ta: "இந்த ஒப்பந்தத்தில் மிதமான ஆபத்து காரணிகளுடன் நிலையான விதிமுறைகள் உள்ளன।",
    te: "ఈ ఒప్పందంలో మధ్యస్థ ప్రమాద కారకాలతో ప్రామాణిక నియమాలు మరియు షరతులు ఉన్నాయి।"
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    
    // Simulate translation API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsTranslating(false);
    toast({
      title: "Translation completed",
      description: `Document translated to ${supportedLanguages.find(l => l.code === selectedLanguage)?.name}`,
    });
  };

  const handleTextToSpeech = async () => {
    setIsSpeaking(true);
    
    // Simulate text-to-speech
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSpeaking(false);
    toast({
      title: "Audio generated",
      description: "Text-to-speech conversion completed",
    });
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: `Legal document template in ${supportedLanguages.find(l => l.code === selectedLanguage)?.name} downloaded`,
    });
  };

  return (
    <Card className="bg-gradient-legal-card border-legal-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-legal-gray-900">
          <Globe className="h-5 w-5 text-legal-primary" />
          Multi-Language Support
          <Badge variant="secondary" className="bg-legal-primary text-white ml-2">
            12+ Languages
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Language Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-legal-gray-900">Select Target Language</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose language" />
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sample Translation Preview */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-legal-gray-900">Translation Preview</label>
          <div className="p-4 bg-legal-gray-50 rounded-lg border">
            <p className="text-sm text-legal-gray-900 leading-relaxed">
              {selectedLanguage === "en" && sampleTranslations.en}
              {selectedLanguage === "hi" && sampleTranslations.hi}
              {selectedLanguage === "ta" && sampleTranslations.ta}
              {selectedLanguage === "te" && sampleTranslations.te}
              {!["en", "hi", "ta", "te"].includes(selectedLanguage) && 
                `[Sample translation in ${supportedLanguages.find(l => l.code === selectedLanguage)?.name}]`
              }
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="bg-legal-primary hover:bg-legal-primary-dark"
          >
            <Globe className="mr-2 h-4 w-4" />
            {isTranslating ? "Translating..." : "Translate Document"}
          </Button>
          
          <Button
            onClick={handleTextToSpeech}
            disabled={isSpeaking}
            variant="outline"
            className="border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            {isSpeaking ? "Speaking..." : "Text to Speech"}
          </Button>
          
          <Button
            onClick={handleDownloadTemplate}
            variant="outline"
            className="border-legal-secondary text-legal-secondary hover:bg-legal-secondary hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>

        {/* Language Statistics */}
        <div className="pt-4 border-t border-legal-gray-200">
          <h4 className="text-sm font-medium text-legal-gray-900 mb-3">Language Usage Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-legal-gray-50 rounded-lg">
              <FileText className="h-6 w-6 text-legal-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-legal-gray-900">1,247</div>
              <div className="text-xs text-legal-gray-300">Documents Translated</div>
            </div>
            <div className="text-center p-3 bg-legal-gray-50 rounded-lg">
              <Volume2 className="h-6 w-6 text-legal-info mx-auto mb-1" />
              <div className="text-lg font-bold text-legal-gray-900">543</div>
              <div className="text-xs text-legal-gray-300">Audio Generated</div>
            </div>
          </div>
        </div>

        {/* Supported Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-legal-gray-900">Supported Features</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-legal-success text-white">
              Document Translation
            </Badge>
            <Badge variant="secondary" className="bg-legal-info text-white">
              Text-to-Speech
            </Badge>
            <Badge variant="secondary" className="bg-legal-secondary text-white">
              Language Templates
            </Badge>
            <Badge variant="secondary" className="bg-legal-accent text-legal-gray-900">
              Cultural Localization
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiLanguageSupport;