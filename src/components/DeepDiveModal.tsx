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
    console.log('fetchDeepDive called for topic:', topic);
    setLoading(true);
    
    const mockData: DeepDiveData = {
      topic,
      prosAnalysis: `• Strong evidence supports this position with documented benefits and positive outcomes
• Multiple studies and expert opinions validate this perspective across various domains
• Real-world implementation has shown measurable improvements and success stories
• Economic and social benefits have been demonstrated through comprehensive analysis`,
      consAnalysis: `• Significant concerns have been raised by experts regarding potential negative impacts
• Alternative approaches may be more effective, sustainable, or cost-efficient
• Potential unintended consequences need careful consideration and risk assessment
• Implementation challenges and resource constraints present substantial obstacles`,
      gptCommentary: "This topic involves complex considerations with valid arguments on multiple sides. A balanced approach requires weighing the evidence, considering different stakeholder perspectives, and evaluating both short-term and long-term implications. The debate reflects broader tensions between innovation and caution, progress and stability.",
      influencersFor: [
        { name: "Dr. Sarah Chen", handle: "@sarahchen", platform: "Twitter", avatar: "SC", stance: 'for' },
        { name: "Prof. Michael Torres", handle: "@mtorres", platform: "LinkedIn", avatar: "MT", stance: 'for' },
        { name: "Alex Rivera", handle: "@alexrivera", platform: "Medium", avatar: "AR", stance: 'for' }
      ],
      influencersAgainst: [
        { name: "Dr. Jennifer Walsh", handle: "@jwalsh", platform: "Twitter", avatar: "JW", stance: 'against' },
        { name: "Robert Kim", handle: "@robertkim", platform: "LinkedIn", avatar: "RK", stance: 'against' },
        { name: "Maria Santos", handle: "@msantos", platform: "Medium", avatar: "MS", stance: 'against' }
      ],
      sources: [
        { title: "Comprehensive Research Study", url: "https://scholar.google.com/scholar?q=" + encodeURIComponent(topic), type: 'academic' },
        { title: "Latest News Coverage", url: "https://www.nytimes.com/search?query=" + encodeURIComponent(topic), type: 'news' },
        { title: "Social Media Discussion", url: "https://twitter.com/search?q=" + encodeURIComponent(topic), type: 'social' }
      ],
      educationalLinks: [
        { title: "Background & Context", url: "https://www.britannica.com/search?query=" + encodeURIComponent(topic), description: "Historical context and foundational information" },
        { title: "Expert Analysis", url: "https://www.khanacademy.org/search?page_search_query=" + encodeURIComponent(topic), description: "In-depth expert analysis and educational resources" }
      ]
    };
    
    setDeepDiveData(mockData);
    setLoading(false);
  };

  React.useEffect(() => {
    if (isOpen) {
      setDeepDiveData(null);
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
