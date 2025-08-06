"use client";

import { useState, useEffect } from "react";
import { TrendingCard } from "@/components/TrendingCard";
import { Header } from "@/components/Header";
import { mockTopics } from "@/lib/mockData";

export default function Home() {
  const [topics, setTopics] = useState(mockTopics.slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreTopics = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentLength = topics.length;
    const newTopics = mockTopics.slice(currentLength, currentLength + 10);
    
    if (newTopics.length === 0) {
      setHasMore(false);
    } else {
      setTopics(prev => [...prev, ...newTopics]);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMoreTopics();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, topics.length]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Trending Topics
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore diverse perspectives on today's most discussed topics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <TrendingCard key={`${topic.id}-${index}`} topic={topic} />
          ))}
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {!hasMore && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No more topics to load</p>
          </div>
        )}
      </main>
    </div>
  );
}
