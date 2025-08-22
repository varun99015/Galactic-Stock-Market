import { Link } from "react-router-dom";
import { 
  Satellite, Rocket, Cpu, Globe, 
  Shield, Database, Wifi, BarChart2,PieChart 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-cyan-900/50 ">
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>
      
      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/favicon.ico" alt="logo" className="h-8 w-8 mr-2"/>
              <span className="text-xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                GALACTIC SM
              </span>
            </div>
            <p className="text-sm text-gray-400 font-mono">
              Intergalactic Market Analytics v2.3.7
            </p>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-gray-800 hover:bg-cyan-900/30 border border-gray-700 hover:border-cyan-400 transition-all">
                <Wifi className="h-5 w-5 text-cyan-400" />
              </button>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-purple-900/30 border border-gray-700 hover:border-purple-400 transition-all">
                <Cpu className="h-5 w-5 text-purple-400" />
              </button>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-yellow-900/30 border border-gray-700 hover:border-yellow-400 transition-all">
                <Shield className="h-5 w-5 text-yellow-400" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-orbitron text-cyan-300 flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              NAVIGATION
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="flex items-center text-gray-400 hover:text-cyan-300 font-mono text-sm transition-all">
                  <Rocket className="mr-2 h-4 w-4" />
                  Explore Markets
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="flex items-center text-gray-400 hover:text-purple-300 font-mono text-sm transition-all">
                  <PieChart className="mr-2 h-4 w-4" />
                  Trading Dashboard
                </Link>
              </li>
              <li>
                <Link to="/stocks" className="flex items-center text-gray-400 hover:text-yellow-300 font-mono text-sm transition-all">
                  <Database className="mr-2 h-4 w-4" />
                  Stock Network
                </Link>
              </li>
              <li>
                <Link to="/spacex" className="flex items-center text-gray-400 hover:text-red-300 font-mono text-sm transition-all">
                  <Satellite className="mr-2 h-4 w-4" />
                  SpaceX Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Market Data */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-orbitron text-cyan-300 flex items-center">
              <Database className="mr-2 h-5 w-5" />
              MARKET SYSTEMS
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400 font-mono text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Real-time Feed: Online
              </li>
              <li className="flex items-center text-gray-400 font-mono text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Quantum Encryption: Active
              </li>
              <li className="flex items-center text-gray-400 font-mono text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                AI Analysis: Enabled
              </li>
              <li className="flex items-center text-gray-400 font-mono text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                Wormhole API: v3.2.1
              </li>
            </ul>
          </div>

          {/* Contact/Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-orbitron text-cyan-300 flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              INTERGALACTIC COMMS
            </h3>
            <div className="space-y-2 text-gray-400 font-mono text-sm">
              <p>Lagrange Point Station</p>
              <p>Sector 7-G, Orbital Platform</p>
              <p>Transmission ID: GS-2284-7</p>
              <p className="pt-2 text-xs">
                Last Connection: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 font-mono">
            © 2045 Galactic Stock Market. All rights reserved under Interplanetary Trade Law.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-cyan-300 font-mono transition-all">
              Privacy Protocol
            </Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-cyan-300 font-mono transition-all">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="text-xs text-gray-500 hover:text-cyan-300 font-mono transition-all">
              Risk Disclaimer
            </Link>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bottom-0 h-px bg-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              transform: `rotate(${Math.random() * 60 - 30}deg)`,
              animation: `floatUp ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;