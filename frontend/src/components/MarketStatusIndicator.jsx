import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from "lucide-react";

// Add this component to your navbar
const MarketStatusIndicator = () => {
  const [marketStatus, setMarketStatus] = useState({ 
    isUp: true, 
    change: 2.34 
  });

  useEffect(() => {
    // Simulate live market data updates
    const interval = setInterval(() => {
      setMarketStatus({
        isUp: Math.random() > 0.4,
        change: (Math.random() * 5).toFixed(2)
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full border ${
      marketStatus.isUp 
        ? 'border-green-500/30 bg-green-900/20 text-green-300' 
        : 'border-red-500/30 bg-red-900/20 text-red-300'
    }`}>
      {marketStatus.isUp ? (
        <TrendingUp className="h-4 w-4" />
      ) : (
        <TrendingDown className="h-4 w-4" />
      )}
      <span className="font-mono text-xs">
        {marketStatus.isUp ? '+' : ''}{marketStatus.change}%
      </span>
    </div>
  );
};
export default MarketStatusIndicator;