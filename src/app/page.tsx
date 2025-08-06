"use client";

import { Header } from "../components/Header";
import { PersonalizedBriefing } from "../components/PersonalizedBriefing";
import { Arena } from "../components/Arena";
import { PtsDisplay } from "../components/PtsDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function Home() {
  const mockBriefingTiles = [
    {
      id: "1",
      title: "Climate Policy Debate Intensifies",
      summary: "New legislation proposes aggressive carbon reduction targets, sparking debate between environmental groups and industry leaders.",
      source: "NYT",
      influencerViewpoint: "Greta Thunberg: 'This is the minimum action needed to prevent climate catastrophe.'",
      opposingViewpoint: "Industry leaders argue the timeline is unrealistic and could harm economic recovery.",
      category: "Politics",
      engagement: 1240,
      timeToRead: 4,
      trending: true
    },
    {
      id: "2", 
      title: "AI in Education: Revolution or Risk?",
      summary: "Schools nationwide are integrating AI tools, but concerns about academic integrity and job displacement grow.",
      source: "Reddit",
      influencerViewpoint: "Tech educators see AI as a powerful learning accelerator when used properly.",
      opposingViewpoint: "Traditional educators worry about students losing critical thinking skills.",
      category: "Technology",
      engagement: 890,
      timeToRead: 3,
      trending: false
    },
    {
      id: "3",
      title: "Celebrity Mental Health Advocacy",
      summary: "High-profile celebrities are opening up about mental health struggles, changing public discourse.",
      source: "Twitter",
      influencerViewpoint: "Mental health advocates praise celebrities for normalizing therapy and vulnerability.",
      opposingViewpoint: "Critics argue celebrity advocacy can oversimplify complex mental health issues.",
      category: "Culture",
      engagement: 2100,
      timeToRead: 2,
      trending: true
    }
  ];

  const mockDebateTopics = [
    {
      id: "1",
      title: "Should AI Replace Human Teachers?",
      description: "Exploring the role of artificial intelligence in education and its impact on traditional teaching methods.",
      sideA: "AI can provide personalized, 24/7 education",
      sideB: "Human connection is irreplaceable in learning",
      participants: 45,
      timeRemaining: 120,
      category: "Education"
    },
    {
      id: "2",
      title: "Universal Basic Income: Solution or Problem?",
      description: "Debating whether UBI can address economic inequality or create dependency.",
      sideA: "UBI provides economic security and freedom",
      sideB: "UBI reduces work incentives and is unsustainable",
      participants: 78,
      timeRemaining: 95,
      category: "Economics"
    }
  ];

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="briefing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="briefing">Daily Briefing</TabsTrigger>
            <TabsTrigger value="arena">The Arena</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="briefing" className="space-y-6">
            <PersonalizedBriefing tiles={mockBriefingTiles} />
          </TabsContent>
          
          <TabsContent value="arena" className="space-y-6">
            <Arena topics={mockDebateTopics} />
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <PtsDisplay stats={mockUserStats} showDetailed={true} />
              </div>
              <div className="md:col-span-2">
                <div className="text-center py-12 text-muted-foreground">
                  <p>Profile features coming soon...</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
