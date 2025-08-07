"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Trophy, Users, Zap, TrendingUp, Crown, Medal, Award } from "lucide-react";

interface LeaderboardTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  participants: number;
  totalArguments: number;
  trending: boolean;
  sideA: {
    name: string;
    support: number;
    topContributors: Array<{
      name: string;
      pts: number;
      rank: number;
    }>;
  };
  sideB: {
    name: string;
    support: number;
    topContributors: Array<{
      name: string;
      pts: number;
      rank: number;
    }>;
  };
}

interface ArenaLeaderboardProps {
  topics: LeaderboardTopic[];
  onJoinDebate: (topicId: string) => void;
}

export function ArenaLeaderboard({ topics, onJoinDebate }: ArenaLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 text-gray-400" />;
      case 3: return <Award className="w-4 h-4 text-amber-600" />;
      default: return <span className="text-sm font-bold">#{rank}</span>;
    }
  };

  const getColorPair = (category: string) => {
    const colorPairs = {
      'Politics': { sideA: 'bg-blue-100 text-blue-800', sideB: 'bg-red-100 text-red-800' },
      'Technology': { sideA: 'bg-green-100 text-green-800', sideB: 'bg-orange-100 text-orange-800' },
      'Culture': { sideA: 'bg-purple-100 text-purple-800', sideB: 'bg-pink-100 text-pink-800' },
      'Education': { sideA: 'bg-cyan-100 text-cyan-800', sideB: 'bg-amber-100 text-amber-800' },
      'Economics': { sideA: 'bg-indigo-100 text-indigo-800', sideB: 'bg-rose-100 text-rose-800' },
    };
    return colorPairs[category as keyof typeof colorPairs] || { 
      sideA: 'bg-gray-100 text-gray-800', 
      sideB: 'bg-slate-100 text-slate-800' 
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            Arena Leaderboard
          </h2>
          <p className="text-muted-foreground">Hotly debated topics with top contributors</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <TrendingUp className="w-3 h-3 mr-1" />
          {topics.length} Active Debates
        </Badge>
      </div>

      <div className="space-y-4">
        {topics.map((topic) => {
          const colors = getColorPair(topic.category);
          
          return (
            <Card key={topic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">{topic.category}</Badge>
                      {topic.trending && (
                        <Badge variant="destructive" className="text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {topic.participants} participants
                    </div>
                    <div className="flex items-center mt-1">
                      <Zap className="w-4 h-4 mr-1" />
                      {topic.totalArguments} arguments
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`font-medium px-2 py-1 rounded ${colors.sideA}`}>
                      {topic.sideA.name}: {topic.sideA.support}%
                    </span>
                    <span className={`font-medium px-2 py-1 rounded ${colors.sideB}`}>
                      {topic.sideB.name}: {topic.sideB.support}%
                    </span>
                  </div>
                  <Progress value={topic.sideA.support} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg ${colors.sideA.replace('text-', 'bg-').replace('-800', '-50')}`}>
                    <h4 className="font-medium text-sm mb-2 flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      Top {topic.sideA.name} Contributors
                    </h4>
                    <div className="space-y-2">
                      {topic.sideA.topContributors.map((contributor, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(contributor.rank)}
                            <span className="font-medium">{contributor.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {contributor.pts} pts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${colors.sideB.replace('text-', 'bg-').replace('-800', '-50')}`}>
                    <h4 className="font-medium text-sm mb-2 flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      Top {topic.sideB.name} Contributors
                    </h4>
                    <div className="space-y-2">
                      {topic.sideB.topContributors.map((contributor, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            {getRankIcon(contributor.rank)}
                            <span className="font-medium">{contributor.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {contributor.pts} pts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <Button 
                    onClick={() => onJoinDebate(topic.id)}
                    className="w-full md:w-auto"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Join This Debate
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
