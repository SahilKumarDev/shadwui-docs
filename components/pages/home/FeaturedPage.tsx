import { Check, Code, Gauge, Cpu } from "lucide-react";
import FeatureCards from "../_components/FeaturedCard"; 

const FeaturedPage = () => {
  const info = [
    {
      title: "Feature Card",
      content:
        "Forever free and community-driven, backed by MIT license freedom.",
      icon: Check,
      colorClass: "pink-500",
    },
    {
      title: "Lightweight",
      content:
        "90% smaller footprint than alternatives, without compromising power.",
      icon: Gauge,
      colorClass: "red-500",
    },
    {
      title: "Enterprise-Grade",
      content: "Battle-tested TypeScript codebase with comprehensive testing.",
      icon: Code,
      colorClass: "purple-500",
    },
    {
      title: "Maximum Performance",
      content:
        "Seamlessly blends JS flexibility with GPU-powered acceleration.",
      icon: Cpu,
      colorClass: "green-500",
    },
  ];

  return (
    <div className=" rounded-2xl bg-black/80 border border-gray-300/20">
      <FeatureCards info={info} />
    </div>
  );
};

export default FeaturedPage;
