import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Analytics = () => {
  const analyticsData = {
    totalDocuments: 2847,
    riskTrends: [
      { month: 'Jan', high: 15, medium: 45, low: 40 },
      { month: 'Feb', high: 12, medium: 38, low: 50 },
      { month: 'Mar', high: 18, medium: 42, low: 40 },
      { month: 'Apr', high: 10, medium: 35, low: 55 },
      { month: 'May', high: 8, medium: 32, low: 60 },
      { month: 'Jun', high: 14, medium: 36, low: 50 },
    ],
    commonIssues: [
      { issue: 'Missing termination clauses', count: 234, percentage: 82 },
      { issue: 'Unclear liability terms', count: 187, percentage: 65 },
      { issue: 'Data protection gaps', count: 156, percentage: 55 },
      { issue: 'Intellectual property concerns', count: 143, percentage: 50 },
      { issue: 'Payment terms ambiguity', count: 98, percentage: 34 },
    ],
    languageDistribution: [
      { language: 'English', count: 1650, percentage: 58 },
      { language: 'Hindi', count: 427, percentage: 15 },
      { language: 'Spanish', count: 312, percentage: 11 },
      { language: 'French', count: 228, percentage: 8 },
      { language: 'German', count: 142, percentage: 5 },
      { language: 'Others', count: 88, percentage: 3 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-legal-card border-legal-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-gray-300 text-sm font-medium">Total Documents</p>
                <p className="text-2xl font-bold text-legal-gray-900">{analyticsData.totalDocuments.toLocaleString()}</p>
              </div>
              <div className="bg-legal-primary/10 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-legal-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-legal-success" />
              <span className="text-sm text-legal-success font-medium">+12.5%</span>
              <span className="text-sm text-legal-gray-300">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-legal-card border-legal-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-gray-300 text-sm font-medium">Avg Risk Score</p>
                <p className="text-2xl font-bold text-legal-gray-900">76.3</p>
              </div>
              <div className="bg-legal-success/10 p-3 rounded-full">
                <Activity className="h-6 w-6 text-legal-success" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={76.3} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-legal-card border-legal-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-gray-300 text-sm font-medium">PII Detected</p>
                <p className="text-2xl font-bold text-legal-gray-900">1,247</p>
              </div>
              <div className="bg-legal-warning/10 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-legal-warning" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-legal-warning font-medium">-8.2%</span>
              <span className="text-sm text-legal-gray-300">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-legal-card border-legal-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-legal-gray-300 text-sm font-medium">Languages</p>
                <p className="text-2xl font-bold text-legal-gray-900">12+</p>
              </div>
              <div className="bg-legal-info/10 p-3 rounded-full">
                <Activity className="h-6 w-6 text-legal-info" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-legal-info font-medium">+2</span>
              <span className="text-sm text-legal-gray-300">new languages</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Common Issues */}
        <Card className="bg-gradient-legal-card border-legal-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-legal-gray-900">
              <BarChart3 className="h-5 w-5 text-legal-primary" />
              Most Common Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.commonIssues.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-legal-gray-900">{item.issue}</span>
                  <span className="text-sm text-legal-gray-300">{item.count}</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card className="bg-gradient-legal-card border-legal-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-legal-gray-900">
              <PieChart className="h-5 w-5 text-legal-primary" />
              Language Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.languageDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: `hsl(${215 + index * 30}, 70%, ${60 + index * 5}%)` }}
                  />
                  <span className="text-sm font-medium text-legal-gray-900">{item.language}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-legal-gray-900">{item.count}</div>
                  <div className="text-xs text-legal-gray-300">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Trends Chart Placeholder */}
      <Card className="bg-gradient-legal-card border-legal-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-legal-gray-900">
            <TrendingUp className="h-5 w-5 text-legal-primary" />
            Risk Score Trends (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4 p-4">
            {analyticsData.riskTrends.map((month, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div 
                    className="bg-legal-danger rounded-t"
                    style={{ height: `${month.high * 2}px` }}
                  />
                  <div 
                    className="bg-legal-warning"
                    style={{ height: `${month.medium * 2}px` }}
                  />
                  <div 
                    className="bg-legal-success rounded-b"
                    style={{ height: `${month.low * 2}px` }}
                  />
                </div>
                <span className="text-xs text-legal-gray-300 font-medium">{month.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-legal-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-legal-danger rounded-full" />
              <span className="text-sm text-legal-gray-300">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-legal-warning rounded-full" />
              <span className="text-sm text-legal-gray-300">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-legal-success rounded-full" />
              <span className="text-sm text-legal-gray-300">Low Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;