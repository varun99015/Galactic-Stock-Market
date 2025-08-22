import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import MainDeck from '../pages/MainDeck';
import { useNavigate } from 'react-router-dom';
import { 
    Rocket, Satellite, TrendingUp, Moon, ShieldHalf, Orbit, 
    Globe, Wifi, SatelliteDish, Telescope, Sparkles, OrbitIcon,
    PlaneIcon,BellElectricIcon,Atom,} from "lucide-react";
import {SpaceHelmet,Asteroid,SpaceShuttle,BlackHole,Alien,Radiation,HologramCard} from "../constants/Custom Icons";// Import your dataset
import { spaceDataSources,spaceSectors } from '../constants/FX_1';

const Fictional_Stock = ({ stock }) => {
  const [price, setPrice] = useState(204.87);
  const [priceHistory, setPriceHistory] = useState([]);
  const navigate = useNavigate();
  // Simulate price fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() * 4 - 2); // -2% to +2%
      const newPrice = price * (1 + fluctuation / 100);
      setPrice(newPrice);
      setPriceHistory(prev => [...prev.slice(-29), newPrice]);
    }, 3000);

    return () => clearInterval(interval);
  }, [price]);

  // Calculate daily change
  const dailyChange = priceHistory.length > 1
    ? ((price - priceHistory[0]) / priceHistory[0] * 100).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-cyan-300 font-mono p-8">
      {/* Starfield */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
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
      <div className="relative z-10 text-center mb-10">
        <MainDeck/>
        <div className="text-cyan-400 flex justify-center mb-4">
          {React.cloneElement(stock.icon, { size: 32})}
        </div>
        <h1 className="text-4xl font-bold tracking-widest">{stock.name}</h1>
        <p className="text-sm text-cyan-400">Intergalactic Stock Exchange</p>
      </div>

      {/* Stock Info */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10 mb-10">
        {/* Price Panel */}
        <div className="space-y-4 border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-cyan-200 flex items-center">
            <Atom className="mr-2" /> Quantum Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-cyan-400">Current Price:</p>
              <p className="text-green-400 font-bold text-xl">Ξ{price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-cyan-400">Daily Change:</p>
              <p className={dailyChange >= 0 ? "text-green-400" : "text-red-400"}>
                {dailyChange >= 0 ? '+' : ''}{dailyChange}%
              </p>
            </div>
            <div>
              <p className="text-cyan-400">Market Cap:</p>
              <p>Ξ{(price * 5.8).toFixed(1)} Billion</p>
            </div>
            <div>
              <p className="text-cyan-400">52-Week Range:</p>
              <p>Ξ{(price * 0.6).toFixed(2)} - Ξ{(price * 1.3).toFixed(2)}</p>
            </div>
          </div>

          {/* Market Anomalies */}
          <div className="mt-4 pt-4 border-t border-cyan-800">
            <h3 className="text-cyan-400 mb-2">Market Anomalies</h3>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center">
                <Radiation size={16} className="mr-1 text-yellow-400" />
                <span>Solar Flares: {Math.floor(Math.random() * 5) + 1}/5</span>
              </div>
              <div className="flex items-center">
                <Alien size={16} className="mr-1 text-purple-400" />
                <span>Xeno-Diplomacy: Stable</span>
              </div>
            </div>
            <h3 className="mt-4 pt-4 border-t border-cyan-800 text-cyan-400 mb-2">Competitors</h3>
            <div className="mr-1">
                {stock.competitors?.map((name, idx) => (
                <p key={idx} onClick={()=> navigate(`/f_stock/spaceStocks/${name}`)}>{name}</p> ))}
            </div>
            <div className='text-cyan-300 mb-3 mt-4 pt-4 border-t border-cyan-800'>
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
  }})()}
            </div>
            <h3 className="mt-4 pt-4 border-t border-cyan-800 text-cyan-400 mb-2">SECTOR TAXONOMY</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {spaceSectors.map((sector, index) => (
        <div
          key={index}
          className="border border-cyan-500 bg-gray-900 rounded-xl p-6 text-cyan-300 shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-cyan-400">{sector.icon}</div>
            <h3 className="text-xl font-semibold">{sector.name}</h3>
          </div>
          <p className="text-sm text-cyan-200">{sector.description}</p>
        </div>
      ))}
    </div>
          </div>
        </div>

        {/* Description Panel */}
        <div className="space-y-4 border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
          <h2 className="dossier text-2xl font-semibold text-cyan-200 flex items-center">
            <SpaceHelmet className="mr-2"/> Corporate Dossier
          </h2>
          <p>{stock.description}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-cyan-400">🏛️ Headquarters:</p>
              <p>{stock.headquarters}</p>
            </div>
            <div>
              <p className="text-cyan-400">Key Project:</p>
              <p className="text-cyan-200">{stock.keyProject}</p>
            </div>
            <div>
              <p className="text-cyan-400"> Founded:</p>
              <p>{stock.founded}</p>
            </div>
            <div>
              <p className="text-cyan-400"> Mission:</p>
              <p>{stock.mission}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-cyan-800">
            <h3 className="text-cyan-300 mb-2">Galactic Status</h3>
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
        </div>
      </div>

      {/* Chart */}
      <div className="relative z-10 border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
       <div className='flex justify-between items-center mb-4'>
        <h2 className="text-2xl font-semibold text-cyan-200 flex items-center mb-4">
          <BlackHole className="mr-2" /> Quantum Price Flux
        </h2></div> 
        <Chart symbol={stock.symbol} priceHistory={priceHistory} />
        <div className="flex justify-between mt-2 text-xs text-cyan-400">
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
      </div>

      {/* News Ticker */}
      <div className="relative z-10 mt-10 overflow-hidden">
        <div className="border border-cyan-500 p-3 rounded-lg bg-gray-900 bg-opacity-50">
          <div className="flex items-center space-x-4">
            <SatelliteDish className="text-yellow-400" />
            <div className="whitespace-nowrap animate-marquee">
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

export default Fictional_Stock;
