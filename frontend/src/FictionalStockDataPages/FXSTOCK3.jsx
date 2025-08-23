import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import MainDeck from '../pages/MainDeck';
import { useNavigate } from 'react-router-dom';
import { SatelliteDish, Atom } from "lucide-react";
import { SpaceHelmet, BlackHole, Alien, Radiation } from "../constants/Custom Icons";
import { spaceDataSources, spaceSectors } from '../constants/FX_1';
import BuySellForm from '../components/BuySellForm';
import axios from 'axios';

const FXSTOCK3 = ({ stock }) => {
  const [stockData, setStockData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/stocks/data/${stock.symbol}`);
        
        if (response.data && response.data.length > 0) {
          setHistoricalData(response.data);
          const latestData = response.data[response.data.length - 1];
          setStockData(latestData);
        }
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to load stock data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [stock.symbol]);

  const calculateDailyChange = () => {
    if (!historicalData || historicalData.length < 2) return 0;
    const currentPrice = historicalData[historicalData.length - 1].price;
    const previousPrice = historicalData[historicalData.length - 2].price;
    return ((currentPrice - previousPrice) / previousPrice * 100).toFixed(2);
  };

  const calculate52WeekRange = () => {
    if (!historicalData.length) return { low: 0, high: 0 };
    const prices = historicalData.map(item => item.price);
    return { low: Math.min(...prices), high: Math.max(...prices) };
  };

  const calculateMarketCap = () => {
    if (!stockData) return 0;
    return (stockData.price * 5.8).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-cyan-300 font-mono p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <div className="text-lg sm:text-xl font-mono text-cyan-300">LOADING QUANTUM DATA...</div>
          <div className="text-xs sm:text-sm text-cyan-500 mt-2">ANALYZING {stock.symbol} METRICS</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-red-400 font-mono p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg sm:text-xl font-mono mb-2">⚠️ DATA STREAM FAILURE</div>
          <div className="text-xs sm:text-sm text-red-300">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-900/50 border border-red-500 text-red-300 rounded-md hover:bg-red-800/50 transition-colors font-mono text-sm"
          >
            RETRY CONNECTION
          </button>
        </div>
      </div>
    );
  }

  const dailyChange = calculateDailyChange();
  const week52Range = calculate52WeekRange();
  const marketCap = calculateMarketCap();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-cyan-300 font-mono p-4 sm:p-6 md:p-8">
      {/* Starfield */}
      <div className="fixed inset-0 overflow-hidden opacity-20 -z-10">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6 md:mb-10">
        <MainDeck/>
        <div className="text-cyan-400 flex justify-center mb-3 md:mb-4">
          {React.cloneElement(stock.icon, { size: 28})}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest">{stock.name}</h1>
        <p className="text-xs sm:text-sm text-cyan-400">Intergalactic Stock Exchange</p>
      </div>

      {/* Stock Info */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-10">
        {/* Price Panel */}
        <div className="space-y-4 border border-cyan-500 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-cyan-200 flex items-center">
            <Atom className="mr-2 w-5 h-5 md:w-6 md:h-6" /> Quantum Metrics
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
            <div>
              <p className="text-cyan-400 text-sm md:text-base">Current Price:</p>
              <p className="text-green-400 font-bold text-lg md:text-xl">Ξ{stockData.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base">Daily Change:</p>
              <p className={dailyChange >= 0 ? "text-green-400" : "text-red-400"}>
                {dailyChange >= 0 ? '+' : ''}{dailyChange}%
              </p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base">Market Cap:</p>
              <p className="text-sm md:text-base">Ξ{marketCap} Billion</p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base">52-Week Range:</p>
              <p className="text-sm md:text-base">Ξ{week52Range.low.toFixed(2)} - Ξ{week52Range.high.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base">Last Updated:</p>
              <p className="text-sm md:text-base">{new Date(stockData.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base">Data Points:</p>
              <p className="text-sm md:text-base">{historicalData.length} records</p>
            </div>
          </div>

          {/* Market Anomalies */}
          <div className="mt-4 pt-4 border-t border-cyan-800">
            <h3 className="text-cyan-400 mb-2 text-sm md:text-base">Market Anomalies</h3>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-xs">
              <div className="flex items-center">
                <Radiation size={16} className="mr-1 text-yellow-400" />
                <span>Solar Flares: {Math.floor(Math.random() * 5) + 1}/5</span>
              </div>
              <div className="flex items-center">
                <Alien size={16} className="mr-1 text-purple-400" />
                <span>Xeno-Diplomacy: Stable</span>
              </div>
            </div>
            
            <h3 className="mt-4 pt-4 border-t border-cyan-800 text-cyan-400 mb-2 text-sm md:text-base">Competitors</h3>
            <div className="mr-1">
              {stock.competitors?.map((name, idx) => (
                <p key={idx} onClick={() => navigate(`/f_stock/spaceStocks/${name}`)} className="cursor-pointer hover:text-cyan-200 py-1 text-sm md:text-base">
                  {name}
                </p>
              ))}
            </div>
            
            <div className='text-cyan-300 mb-3 mt-4 pt-4 border-t border-cyan-800 text-xs md:text-sm'>
              {(() => {
                if (stock.externalData) {
                  return (
                    <>
                      <p>CEO : {stock.externalData.ceo}</p>
                      <p>MARKET STATUS : {stock.externalData.marketStatus}</p>
                      <p>SPECIAL : {stock.externalData.realWorldNote}</p>
                    </>
                  );
                } else if(stock.fictionalData){
                  return (
                    <>
                      <p>TECH : {stock.fictionalData.tech}</p>
                      <p>LORE : {stock.fictionalData.lore}</p>
                      <p>NOTABLE CLIENTS : {stock.fictionalData.notableClients}</p>
                    </>
                  );
                }
              })()}
            </div>
            
            <h3 className="mt-4 pt-4 border-t border-cyan-800 text-cyan-400 mb-2 text-sm md:text-base">SECTOR TAXONOMY</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:p-6">
              {spaceSectors.map((sector, index) => (
                <div
                  key={index}
                  className="border border-cyan-500 bg-gray-900 rounded-xl p-4 md:p-6 text-cyan-300 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-cyan-400">{sector.icon}</div>
                    <h3 className="text-lg md:text-xl font-semibold">{sector.name}</h3>
                  </div>
                  <p className="text-xs md:text-sm text-cyan-200">{sector.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description Panel */}
        <div className="space-y-4 border border-cyan-500 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-cyan-200 flex items-center">
            <SpaceHelmet className="mr-2 w-5 h-5 md:w-6 md:h-6"/> Corporate Dossier
          </h2>
          <p className="text-sm md:text-base">{stock.description}</p>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4 mt-4">
            <div>
              <p className="text-cyan-400 text-sm md:text-base">🏛️ Headquarters:</p>
              <p className="text-sm md:text-base">{stock.headquarters}</p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base">Key Project:</p>
              <p className="text-cyan-200 text-sm md:text-base">{stock.keyProject}</p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base"> Founded:</p>
              <p className="text-sm md:text-base">{stock.founded}</p>
            </div>
            <div>
              <p className="text-cyan-400 text-sm md:text-base"> Mission:</p>
              <p className="text-sm md:text-base">{stock.mission}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-cyan-800">
            <h3 className="text-cyan-300 mb-2 text-sm md:text-base">Galactic Status</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-cyan-900 bg-opacity-50 rounded-full text-xs">
                Warp Drive: {Math.random() > 0.3 ? '✔️ Certified' : '⚠️ Testing'}
              </span>
              <span className="px-2 py-1 bg-cyan-900 bg-opacity-50 rounded-full text-xs">
                AI Council: {Math.random() > 0.5 ? 'Approved' : 'Reviewing'}
              </span>
              <span className="px-2 py-1 bg-cyan-900 bg-opacity-50 rounded-full text-xs">
                Xenobio Rating: AA{Math.floor(Math.random() * 3) + 1}
              </span>
            </div>
          </div>

          <div className='mt-4 pt-4 pl-1 md:pl-2 border-t border-cyan-800'>
            <h2 className='text-base md:text-lg'>More Data:</h2>
            {spaceDataSources.map((sector, index) => (
              <div key={index} className="text-cyan-300 text-xs md:text-sm">
                <div className='flex flex-col sm:flex-row sm:space-x-4 p-1 gap-1 sm:gap-0'>
                  <span className="flex items-center">{sector.icon}</span>
                  <a href={sector.url} className="text-sm md:text-base font-semibold hover:text-cyan-200">
                    {sector.name}:
                  </a>
                  <span className="text-cyan-200 text-xs md:text-sm">{sector.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative z-10 border border-cyan-500 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
        <div className='flex flex-col sm:flex-row justify-between items-center mb-4 gap-2'>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-200 flex items-center">
            <BlackHole className="mr-2 w-5 h-5 sm:w-6 sm:h-6" /> Quantum Price Flux
          </h2>
        </div> 
        <Chart symbol={stock.symbol} />
        <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs text-cyan-400 gap-2 sm:gap-0">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
            <span>Wormhole Event</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span>Solar Storm</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Alien Treaty</span>
          </div>
        </div>
        <BuySellForm symbol={stock.symbol}/>
      </div>

      {/* News Ticker */}
      <div className="relative z-10 mt-6 md:mt-10 overflow-hidden">
        <div className="border border-cyan-500 p-2 sm:p-3 rounded-lg bg-gray-900 bg-opacity-50">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <SatelliteDish className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
            <div className="whitespace-nowrap animate-marquee text-xs sm:text-sm">
              {[ 
                `🚀 ${stock.name} awarded Ceres Mining Contract`,
                `⚠️ Solar winds affecting ${stock.symbol} supply lines`,
                `👽 First alien customer orders ${stock.keyProject}`,
                `⚡ Quantum computing breakthrough boosts ${stock.sector} sector`,
                `🌑 ${stock.symbol} establishes lunar research facility`
              ].join(' ••• ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FXSTOCK3;