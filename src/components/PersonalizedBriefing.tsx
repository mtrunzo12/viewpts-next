"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Users, MessageSquare, TrendingUp, Zap } from "lucide-react";

interface BriefingTile {
  id: string;
  title: string;
  summary: string;
  source: string;
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
          <Card key={tile.id} className="hover:shadow-lg transition-shadow cursor-pointer">
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
                <Badge variant="outline" className="text-xs">
                  {tile.source}
                </Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Deep Dive
                </Button>
                <Button size="sm" variant="default" className="flex-1">
                  <Zap className="w-3 h-3 mr-1" />
                  Enter Arena
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
