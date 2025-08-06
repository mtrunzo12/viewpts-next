"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Clock, Users, Shield, Zap, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

interface DebateTopic {
  id: string;
  title: string;
  description: string;
  sideA: string;
  sideB: string;
  participants: number;
  timeRemaining: number;
  category: string;
}

interface ArenaProps {
  topics: DebateTopic[];
}

export function Arena({ topics }: ArenaProps) {
  const [selectedTopic, setSelectedTopic] = useState<DebateTopic | null>(null);
  const [selectedSide, setSelectedSide] = useState<'A' | 'B' | null>(null);
  const [argument, setArgument] = useState("");

  const handleJoinDebate = (topic: DebateTopic) => {
    setSelectedTopic(topic);
    setSelectedSide(null);
    setArgument("");
  };

  const handleSideSelection = (side: 'A' | 'B') => {
    setSelectedSide(side);
  };

  const handleSubmitArgument = () => {
    console.log("Submitting argument:", argument);
    setArgument("");
  };

  if (selectedTopic) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedTopic(null)}>
            ← Back to Arena
          </Button>
          <Badge variant="outline" className="text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {selectedTopic.timeRemaining} min remaining
          </Badge>
        </div>

        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-xl">{selectedTopic.title}</CardTitle>
            <p className="text-muted-foreground">{selectedTopic.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!selectedSide ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSideSelection('A')}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">Side A</h3>
                    <p className="text-sm text-muted-foreground">{selectedTopic.sideA}</p>
                    <Button className="mt-4 w-full">Choose This Side</Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSideSelection('B')}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">Side B</h3>
                    <p className="text-sm text-muted-foreground">{selectedTopic.sideB}</p>
                    <Button className="mt-4 w-full">Choose This Side</Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="default" className="text-sm">
                    You&apos;re arguing for: {selectedSide === 'A' ? selectedTopic.sideA : selectedTopic.sideB}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">AI Referee Active</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Textarea
                    placeholder="Present your argument with evidence and reasoning..."
                    value={argument}
                    onChange={(e) => setArgument(e.target.value)}
                    className="min-h-32"
                  />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {selectedTopic.participants} participants
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        12 arguments
                      </span>
                    </div>
                    
                    <Button onClick={handleSubmitArgument} disabled={!argument.trim()}>
                      <Zap className="w-4 h-4 mr-1" />
                      Submit Argument
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Recent Arguments</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted rounded-md">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm">Strong evidence suggests that renewable energy adoption has accelerated significantly...</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span>@user123 • Side A</span>
                            <div className="flex items-center space-x-2">
                              <ThumbsUp className="w-3 h-3" />
                              <span>8</span>
                              <ThumbsDown className="w-3 h-3" />
                              <span>2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">The Arena</h2>
        <Badge variant="outline" className="text-sm">
          <Zap className="w-3 h-3 mr-1" />
          {topics.length} Active Debates
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="text-xs">
                  {topic.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {topic.timeRemaining}m
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{topic.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {topic.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">Side A: {topic.sideA}</span>
                  <span className="font-medium">Side B: {topic.sideB}</span>
                </div>
                <Progress value={60} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>60% support</span>
                  <span>40% support</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {topic.participants} participants
                </span>
                <span className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  AI Moderated
                </span>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => handleJoinDebate(topic)}
              >
                <Zap className="w-4 h-4 mr-1" />
                Join Debate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
