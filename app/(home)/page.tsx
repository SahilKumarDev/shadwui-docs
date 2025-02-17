import MaxWidthWrapper from "@/components/_components/MaxWidthWrapper";
import CallToActionPage from "@/components/pages/home/CallToActionPage";
import FeaturePage from "@/components/pages/home/FeaturedPage";
import HeroPage from "@/components/pages/home/HeroPage";
import React from "react";

const HomePage = () => {
  return (
    <MaxWidthWrapper>
      <HeroPage />
      <FeaturePage />
      <CallToActionPage />
    </MaxWidthWrapper>
  );
};

export default HomePage;
