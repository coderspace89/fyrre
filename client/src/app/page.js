import React from "react";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import ArticlesSection from "./components/ArticlesSection";
import PodcastSection from "./components/PodcastSection";
import AuthorSection from "./components/AuthorSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <ArticlesSection />
      <PodcastSection />
      <AuthorSection />
    </div>
  );
};

export default page;
