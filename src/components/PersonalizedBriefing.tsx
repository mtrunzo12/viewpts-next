"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Users, MessageSquare, TrendingUp, Zap, ExternalLink } from "lucide-react";
import { DeepDiveModal } from "./DeepDiveModal";
import { TopicDashboard } from "./TopicDashboard";

interface BriefingTile {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl?: string;
  influencerViewpoint: string;
  opposingViewpoint: string;
  category: string;
  engagement: number;
  timeToRead: number;
  trending: boolean;
}

interface PersonalizedBriefingProps {
  tiles: BriefingTile[];
}

export function PersonalizedBriefing({ tiles }: PersonalizedBriefingProps) {
  const [deepDiveModal, setDeepDiveModal] = useState<{ isOpen: boolean; topic: string; content: string }>({
    isOpen: false,
    topic: '',
    content: ''
  });
  const [selectedTopic, setSelectedTopic] = useState<BriefingTile | null>(null);

  const handleDeepDive = (tile: BriefingTile) => {
    setDeepDiveModal({
      isOpen: true,
      topic: tile.title,
      content: `${tile.summary}\n\nInfluencer Viewpoint: ${tile.influencerViewpoint}\n\nOpposing Viewpoint: ${tile.opposingViewpoint}`
    });
  };

  const handleTopicClick = (tile: BriefingTile) => {
    setSelectedTopic(tile);
  };

  const handleEnterArena = (tile: BriefingTile) => {
    window.location.href = '/?tab=arena';
  };

  if (selectedTopic) {
    return (
      <TopicDashboard 
        topic={{
          id: selectedTopic.id,
          title: selectedTopic.title,
          description: selectedTopic.summary,
          category: selectedTopic.category
        }}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Daily Briefing</h2>
        <Badge variant="outline" className="text-sm">
          <Clock className="w-3 h-3 mr-1" />
          Updated 2 hours ago
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((tile) => (
          <Card 
            key={tile.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleTopicClick(tile)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="text-xs">
                  {tile.category}
                </Badge>
                {tile.trending && (
                  <Badge variant="destructive" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg leading-tight">{tile.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {tile.summary}
              </p>
              
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 rounded-md">
                  <p className="text-xs font-medium text-blue-800">Influencer Take:</p>
                  <p className="text-xs text-blue-700 line-clamp-2">{tile.influencerViewpoint}</p>
                </div>
                
                <div className="p-2 bg-orange-50 rounded-md">
                  <p className="text-xs font-medium text-orange-800">Counter-Perspective:</p>
                  <p className="text-xs text-orange-700 line-clamp-2">{tile.opposingViewpoint}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {tile.timeToRead} min read
                  </span>
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {tile.engagement}
                  </span>
                </div>
                {tile.sourceUrl ? (
                  <a 
                    href={tile.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <Badge variant="outline" className="text-xs mr-1">
                      {tile.source}
                    </Badge>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {tile.source}
                  </Badge>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeepDive(tile);
                  }}
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Deep Dive
                </Button>
                <Button 
                  size="sm" 
                  variant="default" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnterArena(tile);
                  }}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Enter Arena
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeepDiveModal
        isOpen={deepDiveModal.isOpen}
        onClose={() => setDeepDiveModal({ isOpen: false, topic: '', content: '' })}
        topic={deepDiveModal.topic}
        content={deepDiveModal.content}
      />
    </div>
  );
}
