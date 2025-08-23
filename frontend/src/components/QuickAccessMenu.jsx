import { Rocket, Satellite, Banknote, Gem, Globe } from "lucide-react";
import { useState } from "react";

const QuickAccessMenu = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sectors = [
    { icon: <Rocket className="h-4 w-4" />, label: "Travel", href: "/sectors/travel" },
    { icon: <Satellite className="h-4 w-4" />, label: "Satellites", href: "/sectors/satellites" },
    { icon: <Banknote className="h-4 w-4" />, label: "Finance", href: "/sectors/finance" },
    { icon: <Gem className="h-4 w-4" />, label: "Mining", href: "/sectors/mining" },
    { icon: <Globe className="h-4 w-4" />, label: "Colonization", href: "/sectors/colonization" }
  ];

  return (
    <div 
      className="hidden lg:block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="px-4 py-2 text-gray-300 hover:text-white font-mono text-sm border border-cyan-500/30 rounded-lg hover:bg-cyan-900/20 transition-all">
        SECTORS ▼
      </button>
      
      {isHovered && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/20 py-2 z-50 animate-fadeIn">
          {sectors.map((sector, index) => (
            <a
              key={index}
              href={sector.href}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-800/30 hover:text-white transition-all group"
            >
              <span className="text-cyan-400 group-hover:scale-110 transition-transform">
                {sector.icon}
              </span>
              <span>{sector.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default QuickAccessMenu;