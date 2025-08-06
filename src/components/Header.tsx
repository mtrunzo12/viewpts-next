"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AuthButton } from "./AuthButton";
import { PtsDisplay } from "./PtsDisplay";
import { Search, Menu, Zap } from "lucide-react";

export function Header() {
  const mockUserStats = {
    totalPts: 2450,
    rank: 127,
    debatesWon: 8,
    argumentsSubmitted: 24,
    opponentsConverted: 5,
    level: 3,
    nextLevelPts: 3000
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary">Viewpts</h1>
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Zap className="w-4 h-4 mr-1" />
            Arena
          </Button>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search topics..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <PtsDisplay stats={mockUserStats} />
          </div>
          <AuthButton />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
