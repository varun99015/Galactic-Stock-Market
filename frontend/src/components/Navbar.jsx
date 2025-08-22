
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Rocket, Satellite, PieChart, Database, ScanEye } from "lucide-react";
import React from "react";
import NavScan from "./NavScan.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const NavLink = ({ to, icon, color, text }) => (
    <Link 
      to={to} 
      className={`flex items-center px-3 py-2 rounded-lg border border-transparent hover:border-${color}-400/50 bg-gray-800/50 hover:bg-${color}-900/20 group transition-all relative`}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r from-${color}-600 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300`}></div>
      <div className="relative z-10 flex items-center">
        {React.cloneElement(icon, { className: `h-5 w-5 text-${color}-400 group-hover:text-${color}-200 mr-2` })}
        <span className="font-mono text-sm text-cyan-300 group-hover:text-white tracking-wider">{text}</span>
      </div>
    </Link>
  );
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      const data = await res.json();
      console.log(data.message);
      
      // Enhanced visual feedback
      document.getElementById("navbar").classList.add("animate-pulse", "bg-red-900/20");
      setTimeout(() => {
        navigate('/explore');
        document.getElementById("navbar").classList.remove("bg-red-900/20");
      }, 800);
      
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };  

  return (
    <nav 
      id="navbar"
      className="sticky top-0 z-50 flex flex-row justify-between items-center p-4 
      bg-gradient-to-r from-gray-900/90 via-gray-900 to-black/90 backdrop-blur-md
      border-b border-cyan-900/50 shadow-lg shadow-cyan-500/10
      transition-all duration-500"
    >
      {/* Enhanced Logo with animated circuit effect */}
      <div 
        className="flex items-center cursor-pointer group relative"
        onClick={() => navigate('/explore')}
      >
        <div className="relative">
          <img 
            src="/favicon.ico" 
            alt="logo" 
            className="h-10 w-10 mr-3 group-hover:rotate-12 transition-transform duration-500"
          />
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
          <div className="absolute -inset-1 rounded-full bg-cyan-500/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
        </div>
        <span className="text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-wider">
          GALACTIC SM
          <span className="ml-2 text-xs text-cyan-300/70 font-mono">v2.3.7</span>
        </span>
        <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 w-0 group-hover:w-full transition-all duration-500"></div>
      </div>

      {/* Navigation Links with HUD-style indicators */}
      <div className="flex flex-row items-center space-x-6">
      <NavLink 
          to="/explore" 
          icon={<Rocket className="h-5 w-5"/>}
          color="cyan"
          text="EXPLORE"
        />
        
        <NavLink 
          to="/dashboard" 
          icon={<PieChart className="h-5 w-5"/>}
          color="purple"
          text="DASHBOARD"
        />
        
        <NavLink 
          to="/spacex" 
          icon={<Satellite className="h-5 w-5" />}
          color="red"
          text="SPACEFLIGHT"
        />
        <NavScan/>
      </div>

      {/* Enhanced User Controls with Status Light */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-green-500 animate-pulse border border-green-300"></div>
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-900/40 border border-cyan-900/30 hover:border-cyan-400/50 transition-all group flex items-center"
          >
            <User className="h-5 w-5 text-cyan-400 group-hover:text-white" />
            <span className="ml-2 font-mono text-xs text-cyan-300 hidden lg:inline">USER_ACCESS</span>
          </button>
        </div>
        
        <button 
          onClick={handleLogout}
          className="p-2 rounded-lg bg-gray-800/50 hover:bg-red-900/40 border border-red-900/30 hover:border-red-400/50 transition-all group flex items-center"
          title="Initiate Logout Sequence"
        >
          <LogOut className="h-5 w-5 text-red-400 group-hover:text-white" />
          <span className="ml-2 font-mono text-xs text-red-300 hidden lg:inline">LOGOUT.EXE</span>
        </button>
      </div>
    </nav>
  );
};

// Reusable Link component
const Link1 = ({ to, icon, color, text }) => (
  <Link1 
    to={to} 
    className={`flex items-center px-3 py-2 rounded-lg border border-transparent hover:border-${color}-400/50 bg-gray-800/50 hover:bg-${color}-900/20 group transition-all relative`}
  >
    <div className={`absolute -inset-1 bg-gradient-to-r from-${color}-600 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300`}></div>
    <div className="relative z-10 flex items-center">
      {React.cloneElement(icon, { className: `h-5 w-5 text-${color}-400 group-hover:text-${color}-200 mr-2` })}
      <span className="font-mono text-sm text-cyan-300 group-hover:text-white tracking-wider">{text}</span>
    </div>
  </Link1>
);

export default Navbar;
