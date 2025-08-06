export interface Topic {
  id: string;
  title: string;
  description: string;
  category: string;
  trendingScore: number;
  sources: string[];
  perspectives: number;
  lastUpdated: string;
}

export const mockTopics: Topic[] = [
  {
    id: "1",
    title: "Climate Change Policy Debate",
    description: "Global leaders discuss new environmental regulations and their economic impact on various industries.",
    category: "Politics",
    trendingScore: 95,
    sources: ["NYT", "Reuters", "BBC"],
    perspectives: 12,
    lastUpdated: "2 hours ago"
  },
  {
    id: "2",
    title: "AI in Healthcare Revolution",
    description: "Medical professionals debate the benefits and risks of artificial intelligence in patient care and diagnosis.",
    category: "Technology",
    trendingScore: 88,
    sources: ["TechCrunch", "Nature", "JAMA"],
    perspectives: 8,
    lastUpdated: "4 hours ago"
  },
  {
    id: "3",
    title: "Remote Work vs Office Return",
    description: "Companies and employees weigh the pros and cons of permanent remote work versus returning to traditional offices.",
    category: "Business",
    trendingScore: 82,
    sources: ["WSJ", "Forbes", "LinkedIn"],
    perspectives: 15,
    lastUpdated: "1 hour ago"
  },
  {
    id: "4",
    title: "Electric Vehicle Infrastructure",
    description: "Debate over government investment in EV charging networks and the timeline for gas vehicle phase-out.",
    category: "Technology",
    trendingScore: 79,
    sources: ["Tesla Blog", "Auto News", "EPA"],
    perspectives: 10,
    lastUpdated: "3 hours ago"
  },
  {
    id: "5",
    title: "Social Media Regulation",
    description: "Lawmakers consider new rules for content moderation and data privacy on major social platforms.",
    category: "Politics",
    trendingScore: 76,
    sources: ["Twitter", "Facebook", "Congress"],
    perspectives: 18,
    lastUpdated: "5 hours ago"
  },
  {
    id: "6",
    title: "Cryptocurrency Market Volatility",
    description: "Investors and regulators discuss the stability and future of digital currencies amid market fluctuations.",
    category: "Finance",
    trendingScore: 73,
    sources: ["CoinDesk", "Bloomberg", "SEC"],
    perspectives: 14,
    lastUpdated: "6 hours ago"
  },
  {
    id: "7",
    title: "Education Technology Integration",
    description: "Schools debate the effectiveness of digital learning tools and screen time concerns for students.",
    category: "Education",
    trendingScore: 70,
    sources: ["EdWeek", "NPR", "Teachers Union"],
    perspectives: 9,
    lastUpdated: "7 hours ago"
  },
  {
    id: "8",
    title: "Healthcare Cost Reform",
    description: "Patients and providers discuss solutions to rising medical costs and insurance coverage gaps.",
    category: "Healthcare",
    trendingScore: 68,
    sources: ["AMA", "Kaiser", "Medicare"],
    perspectives: 11,
    lastUpdated: "8 hours ago"
  },
  {
    id: "9",
    title: "Space Exploration Funding",
    description: "Scientists and taxpayers debate government spending on Mars missions versus Earth-based research.",
    category: "Science",
    trendingScore: 65,
    sources: ["NASA", "SpaceX", "NSF"],
    perspectives: 7,
    lastUpdated: "9 hours ago"
  },
  {
    id: "10",
    title: "Renewable Energy Transition",
    description: "Energy companies and environmentalists discuss the timeline and costs of switching to clean energy.",
    category: "Environment",
    trendingScore: 62,
    sources: ["DOE", "Greenpeace", "Shell"],
    perspectives: 13,
    lastUpdated: "10 hours ago"
  },
  {
    id: "11",
    title: "Mental Health Awareness",
    description: "Healthcare workers and patients advocate for better mental health resources and reduced stigma.",
    category: "Healthcare",
    trendingScore: 60,
    sources: ["WHO", "Psychology Today", "NAMI"],
    perspectives: 16,
    lastUpdated: "11 hours ago"
  },
  {
    id: "12",
    title: "Immigration Policy Reform",
    description: "Communities discuss comprehensive immigration reform and border security measures.",
    category: "Politics",
    trendingScore: 58,
    sources: ["DHS", "ACLU", "Border Patrol"],
    perspectives: 20,
    lastUpdated: "12 hours ago"
  },
  {
    id: "13",
    title: "Gig Economy Worker Rights",
    description: "Drivers and delivery workers debate classification as employees versus independent contractors.",
    category: "Business",
    trendingScore: 55,
    sources: ["Uber", "Labor Dept", "Unions"],
    perspectives: 12,
    lastUpdated: "13 hours ago"
  },
  {
    id: "14",
    title: "Food Security and Agriculture",
    description: "Farmers and consumers discuss sustainable farming practices and global food distribution.",
    category: "Environment",
    trendingScore: 53,
    sources: ["USDA", "FAO", "Farm Bureau"],
    perspectives: 8,
    lastUpdated: "14 hours ago"
  },
  {
    id: "15",
    title: "Digital Privacy Rights",
    description: "Tech users and companies debate data collection practices and privacy protection measures.",
    category: "Technology",
    trendingScore: 51,
    sources: ["EFF", "Apple", "Google"],
    perspectives: 14,
    lastUpdated: "15 hours ago"
  }
];
