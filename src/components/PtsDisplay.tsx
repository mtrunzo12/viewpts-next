"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Trophy, TrendingUp, Users, Zap } from "lucide-react";

interface UserStats {
  totalPts: number;
  rank: number;
  debatesWon: number;
  argumentsSubmitted: number;
  opponentsConverted: number;
  level: number;
  nextLevelPts: number;
}

interface PtsDisplayProps {
  stats: UserStats;
  showDetailed?: boolean;
}

export function PtsDisplay({ stats, showDetailed = false }: PtsDisplayProps) {
  const progressToNextLevel = (stats.totalPts % 1000) / 10;

  if (!showDetailed) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="default" className="text-sm">
          <Zap className="w-3 h-3 mr-1" />
          {stats.totalPts} Pts
        </Badge>
        <Badge variant="outline" className="text-sm">
          Level {stats.level}
        </Badge>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span>Your Debate Stats</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{stats.totalPts}</div>
          <div className="text-sm text-muted-foreground">Total Points</div>
          <Badge variant="default" className="text-sm">
            Rank #{stats.rank}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level {stats.level}</span>
            <span>{stats.nextLevelPts - stats.totalPts} pts to next level</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-semibold text-green-600">{stats.debatesWon}</div>
            <div className="text-xs text-muted-foreground">Debates Won</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="text-2xl font-semibold text-blue-600">{stats.argumentsSubmitted}</div>
            <div className="text-xs text-muted-foreground">Arguments</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="text-2xl font-semibold text-purple-600">{stats.opponentsConverted}</div>
            <div className="text-xs text-muted-foreground">Converted</div>
          </div>
          
          <div className="text-center space-y-1">
            <div className="text-2xl font-semibold text-orange-600">{Math.round(stats.totalPts / stats.argumentsSubmitted)}</div>
            <div className="text-xs text-muted-foreground">Avg Pts/Arg</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Achievements</h4>
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Persuasive Debater
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Community Favorite
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
