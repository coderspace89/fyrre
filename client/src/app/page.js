import React from "react";
import HeroSection from "./components/HeroSection";
import FeaturedSection from "./components/FeaturedSection";
import ArticlesSection from "./components/ArticlesSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <ArticlesSection />
    </div>
  );
};

export default page;
