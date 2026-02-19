import React from "react";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import ArticlesSection from "./components/ArticlesSection";
import PodcastSection from "./components/PodcastSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <ArticlesSection />
      <PodcastSection />
    </div>
  );
};

export default page;
