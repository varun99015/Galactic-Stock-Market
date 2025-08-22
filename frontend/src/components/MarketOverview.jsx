import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Zap, AlertTriangle, RefreshCw } from 'lucide-react';
import axios from 'axios';
import React from 'react';

const MarketOverview = () => {
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [fallingStocks, setFallingStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate = useNavigate();

  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/stocks/overview');
      
      if (response.data && response.data.length > 0) {
        // Calculate changePercent for each stock
        const stocksWithPercentChange = response.data.map(stock => ({
          ...stock,
          changePercent: (stock.change / (stock.price - stock.change)) * 100
        }));

        // Sort stocks by percentage change
        const sortedStocks = [...stocksWithPercentChange].sort((a, b) => 
          b.changePercent - a.changePercent
        );

        // Get top 10 trending and falling stocks
        const trending = sortedStocks.slice(0, 10);
        const falling = [...sortedStocks].reverse().slice(0, 10);

        setTrendingStocks(trending);
        setFallingStocks(falling);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Set up automatic refresh every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const StockCard = ({ stock, isTrending }) => (
    <div
      onClick={() => navigate(`/f_stock/spaceStocks/${stock.symbol}`)}
      className="inline-block w-72 h-36 rounded-lg mx-3 cursor-pointer transition-all duration-300
                bg-gradient-to-br from-gray-900 to-gray-800 border
                hover:shadow-lg group relative overflow-hidden min-w-[280px]"
      style={{
        borderColor: isTrending ? '#22c55e40' : '#ef444440',
        borderWidth: '1px'
      }}
    >
      {/* Holographic effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/starfield.png')] opacity-10 group-hover:opacity-20 transition-opacity" />
      
      {/* Glowing border effect */}
      <div 
        className="absolute inset-0 rounded-lg group-hover:opacity-100 transition-opacity opacity-0"
        style={{
          background: isTrending 
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-mono font-bold text-cyan-300 tracking-wider">
              {stock.symbol}
            </h2>
            <p className="text-sm text-cyan-400 opacity-80">{stock.symbol}</p>
          </div>
          <div className="text-lg font-bold text-cyan-300">
            ${stock.price.toFixed(2)}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {isTrending ? (
              <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
            )}
            <span className={`text-sm font-mono ${isTrending ? 'text-green-400' : 'text-red-400'}`}>
              {isTrending ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
          </div>
          <div className="text-xs text-cyan-400 opacity-80">
            Vol: {stock.volume}
          </div>
        </div>
      </div>
    </div>
  );
  const StockSection = ({ title, stocks, icon, isTrending, color }) => (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <div className={`mr-3 p-2 rounded-lg bg-${color}-900/30 border border-${color}-500/30`}>
          {React.cloneElement(icon, { className: `h-6 w-6 text-${color}-400` })}
        </div>
        <h1 className="text-3xl font-bold tracking-wider font-mono" style={{ color: `var(--${color}-400)` }}>
          {title}
        </h1>
        <span className="ml-3 text-sm px-3 py-1 rounded-full bg-gray-800 text-cyan-300 font-mono">
          {stocks.length} STOCKS
        </span>
      </div>

      <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-4">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} isTrending={isTrending} />
          ))
        ) : (
          <div className="text-center py-8 text-cyan-600 font-mono">
            {isLoading ? 'SCANNING MARKET DATA...' : 'NO DATA AVAILABLE'}
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-cyan-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-mono text-cyan-300">INITIALIZING QUANTUM MARKET SCAN</div>
          <div className="text-sm text-cyan-500 mt-2">ANALYZING GALACTIC TRENDS...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyan-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-400/50">
              <Zap className="h-8 w-8 text-cyan-300" />
            </div>
            <div className="absolute -inset-2 border border-cyan-400/30 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-mono tracking-wider">
          REAL-TIME MARKET PULSE
        </h1>
        <p className="text-cyan-400 text-sm mt-2 font-mono">
          LIVE GALACTIC STOCK PERFORMANCE • UPDATED EVERY 30 SECONDS
        </p>
        
        {/* Refresh and Status Bar */}
        <div className="flex items-center justify-center mt-6 space-x-4">
          <button
            onClick={fetchMarketData}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-900/30 border border-cyan-500/30 rounded-lg 
                     text-cyan-300 hover:bg-cyan-800/40 transition-all disabled:opacity-50 font-mono text-sm"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>REFRESH DATA</span>
          </button>
          
          {lastUpdated && (
            <div className="text-cyan-600 text-sm font-mono flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              LAST SCAN: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      {/* Trending Stocks */}
      <StockSection
        title="QUANTUM GAINERS"
        stocks={trendingStocks}
        icon={<TrendingUp />}
        isTrending={true}
        color="green"
      />

      {/* Falling Stocks */}
      <StockSection
        title="GRAVITATIONAL LOSERS"
        stocks={fallingStocks}
        icon={<TrendingDown />}
        isTrending={false}
        color="red"
      />
      {trendingStocks.length === 0 && fallingStocks.length === 0 && (
        <div className="mt-12 p-6 bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-center">
          <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-yellow-300 font-mono text-lg mb-2">DEMO MODE ACTIVE</h3>
          <p className="text-yellow-200 text-sm">
            Using simulated market data. Connect to live API for real-time galactic market updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketOverview;