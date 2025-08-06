"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MessageCircle, Share2 } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  trendingScore: number;
  sources: string[];
  perspectives: number;
  lastUpdated: string;
}

interface TrendingCardProps {
  topic: Topic;
}

export function TrendingCard({ topic }: TrendingCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            {topic.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 mr-1" />
            {topic.trendingScore}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">
          {topic.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {topic.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            {topic.perspectives} perspectives
          </div>
          <div>
            {topic.sources.length} sources
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="flex-1 mr-2">
            Explore Views
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground">
          Updated {topic.lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
}
