"use client";

import { Header } from "@/components/Header";
import { PersonalizedBriefing } from "@/components/PersonalizedBriefing";
import { Arena } from "@/components/Arena";
import { PtsDisplay } from "@/components/PtsDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const mockBriefingTiles = [
    {
      id: "1",
      title: "Climate Policy Debate Intensifies",
      summary: "New legislation proposes aggressive carbon reduction targets, sparking debate between environmental groups and industry leaders.",
      source: "NYT",
      sourceUrl: "https://www.nytimes.com/section/climate",
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
      sourceUrl: "https://www.reddit.com/r/education/",
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
      sourceUrl: "https://twitter.com/search?q=mental%20health",
      influencerViewpoint: "Mental health advocates praise celebrities for normalizing therapy and vulnerability.",
      opposingViewpoint: "Critics argue celebrity advocacy can oversimplify complex mental health issues.",
      category: "Culture",
      engagement: 2100,
      timeToRead: 2,
      trending: true
    }
  ];

  const mockLeaderboardTopics = [
    {
      id: "1",
      title: "Should AI Replace Human Teachers?",
      description: "Exploring the role of artificial intelligence in education and its impact on traditional teaching methods.",
      category: "Education",
      participants: 145,
      totalArguments: 287,
      trending: true,
      sideA: {
        name: "Pro-AI Education",
        support: 62,
        topContributors: [
          { name: "TechEduExpert", pts: 1250, rank: 1 },
          { name: "FutureTeacher", pts: 980, rank: 2 },
          { name: "AIAdvocate", pts: 750, rank: 3 }
        ]
      },
      sideB: {
        name: "Human-First Learning",
        support: 38,
        topContributors: [
          { name: "ClassroomVeteran", pts: 1100, rank: 1 },
          { name: "EmpathyMatters", pts: 890, rank: 2 },
          { name: "TeachingTradition", pts: 720, rank: 3 }
        ]
      }
    },
    {
      id: "2",
      title: "Universal Basic Income: Solution or Problem?",
      description: "Debating whether UBI can address economic inequality or create dependency.",
      category: "Economics",
      participants: 203,
      totalArguments: 456,
      trending: true,
      sideA: {
        name: "UBI Supporters",
        support: 55,
        topContributors: [
          { name: "EconReformer", pts: 1450, rank: 1 },
          { name: "SocialJustice", pts: 1200, rank: 2 },
          { name: "ProgressivePolicy", pts: 950, rank: 3 }
        ]
      },
      sideB: {
        name: "UBI Skeptics",
        support: 45,
        topContributors: [
          { name: "FiscalConservative", pts: 1350, rank: 1 },
          { name: "WorkEthicFirst", pts: 1050, rank: 2 },
          { name: "MarketSolution", pts: 800, rank: 3 }
        ]
      }
    },
    {
      id: "3",
      title: "Climate Action vs Economic Growth",
      description: "Can aggressive environmental policies coexist with economic prosperity?",
      category: "Politics",
      participants: 312,
      totalArguments: 678,
      trending: true,
      sideA: {
        name: "Climate First",
        support: 58,
        topContributors: [
          { name: "GreenActivist", pts: 1650, rank: 1 },
          { name: "ClimateScientist", pts: 1400, rank: 2 },
          { name: "EcoWarrior", pts: 1100, rank: 3 }
        ]
      },
      sideB: {
        name: "Economy First",
        support: 42,
        topContributors: [
          { name: "BusinessLeader", pts: 1500, rank: 1 },
          { name: "JobsAdvocate", pts: 1250, rank: 2 },
          { name: "PragmaticPolicy", pts: 950, rank: 3 }
        ]
      }
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
            <Arena topics={mockDebateTopics} leaderboardTopics={mockLeaderboardTopics} />
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
