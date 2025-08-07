"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Loader2, Users, BookOpen, Lightbulb } from "lucide-react";

interface InfluencerProfile {
  name: string;
  handle: string;
  platform: string;
  avatar: string;
  stance: 'for' | 'against';
}

interface DeepDiveData {
  topic: string;
  prosAnalysis: string;
  consAnalysis: string;
  gptCommentary: string;
  influencersFor: InfluencerProfile[];
  influencersAgainst: InfluencerProfile[];
  sources: Array<{
    title: string;
    url: string;
    type: 'news' | 'academic' | 'social';
  }>;
  educationalLinks: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

interface DeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  content: string;
}

export function DeepDiveModal({ isOpen, onClose, topic, content }: DeepDiveModalProps) {
  const [loading, setLoading] = useState(false);
  const [deepDiveData, setDeepDiveData] = useState<DeepDiveData | null>(null);
  const [showInfluencers, setShowInfluencers] = useState<'for' | 'against' | null>(null);

  const fetchDeepDive = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Analyze this topic: "${topic}". Provide:
1. Strong arguments FOR (3-4 key points with evidence)
2. Strong arguments AGAINST (3-4 key points with evidence)  
3. Balanced commentary explaining both perspectives
4. Key facts and context

Content: ${content}

Format as JSON with: prosAnalysis, consAnalysis, gptCommentary fields.`
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const mockData: DeepDiveData = {
        topic,
        prosAnalysis: data.summary || "Analysis not available due to API limits.",
        consAnalysis: "Counter-arguments and opposing perspectives would be analyzed here.",
        gptCommentary: "AI commentary providing balanced perspective on both sides.",
        influencersFor: [
          { name: "Expert A", handle: "@expertA", platform: "Twitter", avatar: "EA", stance: 'for' },
          { name: "Analyst B", handle: "@analystB", platform: "LinkedIn", avatar: "AB", stance: 'for' }
        ],
        influencersAgainst: [
          { name: "Critic C", handle: "@criticC", platform: "Twitter", avatar: "CC", stance: 'against' },
          { name: "Scholar D", handle: "@scholarD", platform: "Medium", avatar: "SD", stance: 'against' }
        ],
        sources: [
          { title: "Primary Research Study", url: "https://scholar.google.com", type: 'academic' },
          { title: "News Analysis", url: "https://www.nytimes.com", type: 'news' },
          { title: "Social Discussion", url: "https://twitter.com", type: 'social' }
        ],
        educationalLinks: [
          { title: "Background Context", url: "https://www.britannica.com", description: "Historical context and background information" },
          { title: "Expert Analysis", url: "https://www.khanacademy.org", description: "In-depth expert analysis and research" }
        ]
      };

      setDeepDiveData(mockData);
    } catch (error) {
      console.error('Deep dive error:', error);
      setDeepDiveData({
        topic,
        prosAnalysis: "Unable to fetch AI analysis. This feature requires OpenAI API access.",
        consAnalysis: "Counter-arguments would be analyzed here with proper API access.",
        gptCommentary: "AI commentary would provide balanced insights on both perspectives.",
        influencersFor: [],
        influencersAgainst: [],
        sources: [],
        educationalLinks: []
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !deepDiveData) {
      fetchDeepDive();
    }
  }, [isOpen]);

  const InfluencerCircles = ({ influencers, stance }: { influencers: InfluencerProfile[], stance: 'for' | 'against' }) => (
    <div className="flex -space-x-2">
      {influencers.slice(0, 3).map((influencer, idx) => (
        <div
          key={idx}
          className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setShowInfluencers(stance)}
          title={influencer.name}
        >
          {influencer.avatar}
        </div>
      ))}
      {influencers.length > 3 && (
        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs cursor-pointer">
          +{influencers.length - 3}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{topic}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Analyzing perspectives...</span>
          </div>
        ) : deepDiveData ? (
          <div className="space-y-6">
            {/* Arguments For/Against */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Arguments For
                    </Badge>
                    <InfluencerCircles influencers={deepDiveData.influencersFor} stance="for" />
                  </div>
                  <p className="text-sm text-gray-700">{deepDiveData.prosAnalysis}</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      Arguments Against
                    </Badge>
                    <InfluencerCircles influencers={deepDiveData.influencersAgainst} stance="against" />
                  </div>
                  <p className="text-sm text-gray-700">{deepDiveData.consAnalysis}</p>
                </CardContent>
              </Card>
            </div>

            {/* AI Commentary */}
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                  <Badge variant="outline" className="text-blue-600">AI Analysis</Badge>
                </div>
                <p className="text-sm text-gray-700">{deepDiveData.gptCommentary}</p>
              </CardContent>
            </Card>

            {/* Sources & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <h4 className="font-medium">Sources</h4>
                  </div>
                  <div className="space-y-2">
                    {deepDiveData.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        className="block text-sm text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <h4 className="font-medium">Learn More</h4>
                  </div>
                  <div className="space-y-2">
                    {deepDiveData.educationalLinks.map((link, idx) => (
                      <div key={idx}>
                        <a
                          href={link.url}
                          className="text-sm text-blue-600 hover:underline block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.title}
                        </a>
                        <p className="text-xs text-gray-500">{link.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Influencer Details Modal */}
            {showInfluencers && (
              <Card className="border-2 border-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">
                      Influencers {showInfluencers === 'for' ? 'Supporting' : 'Opposing'}
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => setShowInfluencers(null)}>
                      ✕
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(showInfluencers === 'for' ? deepDiveData.influencersFor : deepDiveData.influencersAgainst).map((influencer, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {influencer.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{influencer.name}</p>
                          <p className="text-xs text-gray-500">{influencer.handle} • {influencer.platform}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`https://${influencer.platform.toLowerCase()}.com/${influencer.handle}`, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => {/* Navigate to Arena */}}>
                <Users className="w-4 h-4 mr-1" />
                Enter Arena
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
