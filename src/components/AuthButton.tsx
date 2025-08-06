"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <User className="h-5 w-5" />
      </Button>
    );
  }

  if (user) {
    return (
      <Button variant="ghost" onClick={handleSignOut}>
        Sign Out
      </Button>
    );
  }

  return (
    <Button variant="ghost" onClick={() => router.push("/login")}>
      Sign In
    </Button>
  );
}
