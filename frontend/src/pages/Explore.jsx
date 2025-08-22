import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Rocket, Satellite, Banknote, Gem, Globe, Search, Filter, ArrowUp, ArrowDown } from "lucide-react";
import Footer from "../components/Footer";
import axios from 'axios';

const CATEGORY_STRUCTURE = {
  TRAVEL: { 
    icon: <Rocket className="text-cyan-400" />, 
    type: "spaceStocks",
    symbols: ["SPCE", "RKLB", "ORBITX", "JUPITERJET", "DEEPSKY", "ASTROFUEL", "NEBULA"] 
  },
  SATELLITES: { 
    icon: <Satellite className="text-purple-400" />, 
    type: "satelliteStocks",
    symbols: ["MAXAR", "STARLINK", "SPACEDRIVE"]
  },
  FINANCE: { 
    icon: <Banknote className="text-yellow-400" />, 
    type: "spaceFinanceStocks",
    symbols: ["GALAXYCREDIT", "COSMOCOIN", "SATURNBANK", "PLUTOGOLD"]
  },
  MINING: { 
    icon: <Gem className="text-orange-400" />, 
    type: "miningStocks",
    symbols: ["GALT", "QUASAR", "METEORX", "COSMOMINING"]
  },
  COLONIZATION: { 
    icon: <Globe className="text-green-400" />, 
    type: "colonizationStocks",
    symbols: ["THRX", "LUNARMINING", "MARSINC", "MARSFOOD", "ASTROWATER", "EXOGROWTH", "NEOSTOCK"]
  }
};

const Explore = () => {
  const navigate = useNavigate();
  
  // State for the fetched data and UI status
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for the UI controls
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'symbol', direction: 'asc' });
  const [expandedCategory, setExpandedCategory] = useState(null);

useEffect(() => {
  const fetchMarketData = async () => {
    const cacheKey = 'marketOverviewData';

    try {
      // 1. CHECK THE CACHE FIRST
      const cachedItem = localStorage.getItem(cacheKey);
      if (cachedItem) {
        const { timestamp, data } = JSON.parse(cachedItem);
        
        // --- NEW LOGIC: Calculate the last 11:30 PM reset time ---
        const now = new Date();
        const lastReset = new Date();
        lastReset.setHours(23, 30, 0, 0); // Set to 11:30 PM today

        // If it's already past 11:30 PM today, the last reset was today.
        // Otherwise, the last reset was at 11:30 PM yesterday.
        if (now < lastReset) {
          lastReset.setDate(lastReset.getDate() - 1);
        }
        
        // 2. CHECK IF THE CACHE IS STILL FRESH
        // Is the cached data from *after* the last reset time?
        if (timestamp > lastReset.getTime()) {
          console.log("✅ Loading market data from fresh daily cache.");
          setCategories(data);
          setIsLoading(false);
          return; // Exit the function, skipping the API call
        }
      }

      // 3. FETCH FROM API (if cache is old or doesn't exist)
      console.log("... Cache is old or missing. Fetching new data from API.");
      setIsLoading(true);
      const response = await axios.get('/api/stocks/overview');
      
      const dataMap = response.data.reduce((acc, stock) => {
        acc[stock.symbol] = stock;
        return acc;
      }, {});

      const liveCategories = Object.entries(CATEGORY_STRUCTURE).map(([name, data]) => ({
        name,
        iconName: data.iconName, // Ensure you're using iconName (string)
        type: data.type,
        stocks: data.symbols.map(symbol => dataMap[symbol]).filter(Boolean)
      }));

      // 4. SAVE THE NEWLY FETCHED DATA TO THE CACHE
      const newCacheItem = {
        timestamp: Date.now(),
        data: liveCategories,
      };
      localStorage.setItem(cacheKey, JSON.stringify(newCacheItem));
      console.log("💾 Saved new market data to cache.");

      setCategories(liveCategories);

    } catch (err) {
      console.error("Error fetching market data:", err);
      setError("Could not load market data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchMarketData();
}, []);
  // Helper functions for UI interaction (no changes needed)
  const toggleCategory = (categoryName) => setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Memoized calculation for filtered and sorted stocks to prevent re-calculating on every render
  const getFilteredAndSortedStocks = () => {
    let allStocks = [];
    categories.forEach(category => {
      if (activeFilter === 'all' || activeFilter === category.type) {
        allStocks.push(...category.stocks.map(stock => ({ ...stock, categoryName: category.name, categoryType: category.type })));
      }
    });

    if (searchTerm) {
      allStocks = allStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    allStocks.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Group the final list back by category
    const grouped = allStocks.reduce((acc, stock) => {
      if (!acc[stock.categoryName]) {
        const categoryInfo = categories.find(c => c.name === stock.categoryName);
        acc[stock.categoryName] = { ...categoryInfo, stocks: [] };
      }
      acc[stock.categoryName].stocks.push(stock);
      return acc;
    }, {});
    
    return Object.values(grouped);
  };

  const groupedStocks = getFilteredAndSortedStocks();

  // Handle Loading and Error states
  if (isLoading) {
    return (
      <div className="bg-black text-cyan-100 min-h-screen flex flex-col justify-center items-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-mono text-cyan-300">LOADING MARKET DATA...</div>
        <div className="text-sm text-cyan-500 mt-2">ESTABLISHING QUANTUM CONNECTION</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-black text-red-400 min-h-screen flex flex-col justify-center items-center">
        <div className="text-xl font-mono mb-2">⚠️ CONNECTION FAILURE</div>
        <div className="text-sm text-red-300">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-900/50 border border-red-500 text-red-300 rounded-md hover:bg-red-800/50 transition-colors font-mono"
        >
          RETRY CONNECTION
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-black text-cyan-100 min-h-screen">
        <Navbar />
        
        {/* Animated starfield background */}
        <div className="fixed inset-0 overflow-hidden opacity-20 -z-10">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 3}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="mb-8 p-4 bg-gray-900/50 rounded-lg border border-cyan-800 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-cyan-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white font-mono"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-cyan-400" />
                </div>
                <select
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-cyan-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white appearance-none font-mono"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all">ALL CATEGORIES</option>
                  {categories.map(category => (
                    <option key={category.type} value={category.type}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sorting Controls */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-cyan-300 flex items-center font-mono">
                <ArrowUp className="h-4 w-4 mr-1" /> SORT BY:
              </span>
              <button
                onClick={() => requestSort('symbol')}
                className={`px-3 py-1 text-xs rounded-md font-mono ${
                  sortConfig.key === 'symbol' 
                    ? 'bg-cyan-700/50 text-cyan-300 border border-cyan-500' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                SYMBOL {sortConfig.key === 'symbol' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => requestSort('price')}
                className={`px-3 py-1 text-xs rounded-md font-mono ${
                  sortConfig.key === 'price' 
                    ? 'bg-cyan-700/50 text-cyan-300 border border-cyan-500' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                PRICE {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => requestSort('change')}
                className={`px-3 py-1 text-xs rounded-md font-mono ${
                  sortConfig.key === 'change' 
                    ? 'bg-cyan-700/50 text-cyan-300 border border-cyan-500' 
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                CHANGE {sortConfig.key === 'change' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>

          {/* Stocks Grid */}
          {groupedStocks.length > 0 ? (
            groupedStocks.map((category) => (
              <div key={category.name} className="mb-12">
                <div 
                  className="flex items-center justify-between mb-4 border-b border-cyan-800 pb-2 cursor-pointer"
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {category.icon}
                    </div>
                    <h1 className="text-2xl font-bold text-cyan-300 tracking-wider font-mono">
                      {category.name}
                    </h1>
                    <span className="ml-2 text-sm text-cyan-400 bg-cyan-900/30 px-2 py-1 rounded-full font-mono">
                      {category.stocks.length} STOCKS
                    </span>
                  </div>
                  <div className="text-cyan-400">
                    {expandedCategory === category.name ? '▼' : '▶'}
                  </div>
                </div>

                {(expandedCategory === null || expandedCategory === category.name) && (
                  <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
                    {category.stocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        onClick={() => navigate(`/f_stock/${category.type}/${encodeURIComponent(stock.symbol)}`)}
                        className="inline-block w-64 h-44 rounded-lg mx-3 cursor-pointer transition-all duration-300
                          bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-900
                          hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20
                          group relative overflow-hidden"
                      >
                        {/* Holographic effect */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/starfield.png')] opacity-10 group-hover:opacity-20 transition-opacity" />
                        
                        {/* Glowing border effect */}
                        <div className="absolute inset-0 border border-cyan-800 rounded-lg group-hover:border-cyan-400 transition-all" />
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.1)_0%,_transparent_70%)]" />

                        <div className="relative z-10 h-full flex flex-col justify-between p-4">
                          <div>
                            <h2 className="text-2xl font-mono font-bold text-cyan-300 tracking-wider">
                              {stock.symbol}
                            </h2>
                            <p className="text-sm text-cyan-400 mt-1 font-mono">{category.name}</p>
                          </div>
                          <div className="mt-auto">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold font-mono">
                                ${stock.price.toFixed(2)}
                              </span>
                              <span className={`text-sm font-mono ${
                                stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-xs text-cyan-400 opacity-80 mt-1 font-mono">
                              VOL: {stock.volume}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-cyan-400 text-xl mb-2 font-mono">NO STOCKS FOUND</div>
              <p className="text-cyan-600 font-mono">ADJUST SEARCH OR FILTER CRITERIA</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
