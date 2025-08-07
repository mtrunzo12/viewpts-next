"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, MessageSquare, ExternalLink, ArrowLeft } from "lucide-react";

interface TopicDashboardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    category: string;
  };
  onBack: () => void;
}

export function TopicDashboard({ topic, onBack }: TopicDashboardProps) {
  const trendingData = [
    { time: '1h', support: 45, opposition: 55 },
    { time: '2h', support: 48, opposition: 52 },
    { time: '3h', support: 52, opposition: 48 },
    { time: '4h', support: 58, opposition: 42 },
    { time: '5h', support: 62, opposition: 38 },
    { time: '6h', support: 60, opposition: 40 },
  ];

  const getColorPair = (category: string) => {
    const colorPairs = {
      'Politics': { support: '#3B82F6', opposition: '#EF4444' }, // Blue/Red
      'Technology': { support: '#10B981', opposition: '#F59E0B' }, // Green/Orange
      'Entertainment': { support: '#8B5CF6', opposition: '#EC4899' }, // Purple/Pink
      'Sports': { support: '#06B6D4', opposition: '#F97316' }, // Cyan/Orange
      'Science': { support: '#84CC16', opposition: '#6366F1' }, // Lime/Indigo
    };
    return colorPairs[category as keyof typeof colorPairs] || { support: '#6B7280', opposition: '#9CA3AF' };
  };

  const colors = getColorPair(topic.category);
  const currentSupport = trendingData[trendingData.length - 1].support;

  const mockInfluencers = [
    { name: "Expert A", handle: "@expertA", platform: "Twitter", stance: "support", followers: "1.2M", profileUrl: "https://twitter.com/expertA" },
    { name: "Analyst B", handle: "@analystB", platform: "LinkedIn", stance: "support", followers: "500K", profileUrl: "https://linkedin.com/in/analystB" },
    { name: "Critic C", handle: "@criticC", platform: "Twitter", stance: "opposition", followers: "800K", profileUrl: "https://twitter.com/criticC" },
    { name: "Scholar D", handle: "@scholarD", platform: "Medium", stance: "opposition", followers: "300K", profileUrl: "https://medium.com/@scholarD" },
  ];

  const mockSources = [
    { title: "Breaking: Major Development in Topic", url: "https://www.cnn.com", platform: "CNN", time: "2h ago" },
    { title: "Analysis: What This Means", url: "https://www.nytimes.com", platform: "NYT", time: "4h ago" },
    { title: "Expert Opinion Thread", url: "https://twitter.com", platform: "Twitter", time: "6h ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <Badge variant="secondary">{topic.category}</Badge>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <p className="text-muted-foreground">{topic.description}</p>
        </div>
      </div>

      {/* Support Trending Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Support Trending Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: colors.support }}>Support: {currentSupport}%</span>
              <span style={{ color: colors.opposition }}>Opposition: {100 - currentSupport}%</span>
            </div>
            <Progress value={currentSupport} className="h-3" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendingData}>
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Line 
                  type="monotone" 
                  dataKey="support" 
                  stroke={colors.support} 
                  strokeWidth={3}
                  dot={{ fill: colors.support, strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="opposition" 
                  stroke={colors.opposition} 
                  strokeWidth={3}
                  dot={{ fill: colors.opposition, strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Influencers and Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Influential Voices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Influential Voices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2" style={{ color: colors.support }}>
                  Supporting ({mockInfluencers.filter(i => i.stance === 'support').length})
                </h4>
                <div className="space-y-2">
                  {mockInfluencers.filter(i => i.stance === 'support').map((influencer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-green-300 transition-colors">
                          {influencer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{influencer.name}</p>
                          <p className="text-xs text-gray-500">{influencer.handle} • {influencer.followers}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(influencer.profileUrl, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2" style={{ color: colors.opposition }}>
                  Opposing ({mockInfluencers.filter(i => i.stance === 'opposition').length})
                </h4>
                <div className="space-y-2">
                  {mockInfluencers.filter(i => i.stance === 'opposition').map((influencer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-xs font-medium cursor-pointer hover:bg-red-300 transition-colors">
                          {influencer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{influencer.name}</p>
                          <p className="text-xs text-gray-500">{influencer.handle} • {influencer.followers}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(influencer.profileUrl, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Recent Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSources.map((source, idx) => (
                <div key={idx} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <a 
                        href={source.url}
                        className="text-sm font-medium text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <span>{source.platform}</span>
                        <span>•</span>
                        <span>{source.time}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button size="lg" variant="outline">
          <MessageSquare className="w-4 h-4 mr-2" />
          Join Discussion
        </Button>
        <Button 
          size="lg"
          onClick={() => window.location.href = '/?tab=arena'}
        >
          <Users className="w-4 h-4 mr-2" />
          Enter Arena
        </Button>
      </div>
    </div>
  );
}
