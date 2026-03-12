"use client"
import GetFeaturedCTA from "@/components/GetFeaturedCTA";
import HeroSection from "@/components/HeroSection";
import RecentSection from "@/components/RecentSection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/stat/visit",{ method:"POST" })
  }, [])
  
  return (
    <div>
      <HeroSection />
      <RecentSection />
      <GetFeaturedCTA />
    </div>
  );
}
