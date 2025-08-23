import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Rocket, Satellite, PieChart } from "lucide-react";
import React from "react";
import NavScan from "./NavScan.jsx";

// Reusable NavLink component with corrected color props
const NavLink = ({ to, icon, text, colorClasses }) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-2 rounded-lg border border-transparent ${colorClasses.hoverBorder} ${colorClasses.bg} ${colorClasses.hoverBg} group transition-all relative whitespace-nowrap`}
  >
    <div className={`absolute -inset-1 ${colorClasses.gradient} rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300`}></div>
    <div className="relative z-10 flex items-center">
      {React.cloneElement(icon, { className: `h-5 w-5 ${colorClasses.icon} group-hover:text-white mr-2` })}
      <span className="font-mono text-sm text-cyan-300 group-hover:text-white tracking-wider">{text}</span>
    </div>
  </Link>
);

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      document.getElementById("navbar").classList.add("animate-pulse", "bg-red-900/20");
      setTimeout(() => {
        navigate('/login'); // Navigate to login after logout
        document.getElementById("navbar").classList.remove("bg-red-900/20");
      }, 800);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav
      id="navbar"
      className="sticky top-0 z-50 p-4 bg-gradient-to-r from-gray-900/90 via-gray-900 to-black/90 backdrop-blur-md border-b border-cyan-900/50 shadow-lg shadow-cyan-500/10"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer group relative flex-shrink-0 mr-4"
          onClick={() => navigate('/explore')}
        >
          <div className="relative">
            <img src="/favicon.ico" alt="logo" className="h-10 w-10 mr-3 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
          </div>
          <span className="text-xl md:text-2xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-wider">
            GALACTIC SM
          </span>
        </div>

        {/* Desktop Navigation Links (hidden on small screens) */}
        <div className="hidden md:flex flex-row items-center space-x-4">
          <NavLink to="/explore" icon={<Rocket />} text="EXPLORE" colorClasses={{ icon: "text-cyan-400", gradient: "from-cyan-600", bg: "bg-gray-800/50", hoverBg: "hover:bg-cyan-900/20", hoverBorder: "hover:border-cyan-400/50" }} />
          <NavLink to="/dashboard" icon={<PieChart />} text="DASHBOARD" colorClasses={{ icon: "text-purple-400", gradient: "from-purple-600", bg: "bg-gray-800/50", hoverBg: "hover:bg-purple-900/20", hoverBorder: "hover:border-purple-400/50" }} />
          <NavLink to="/spacex" icon={<Satellite />} text="SPACEFLIGHT" colorClasses={{ icon: "text-red-400", gradient: "from-red-600", bg: "bg-gray-800/50", hoverBg: "hover:bg-red-900/20", hoverBorder: "hover:border-red-400/50" }} />
          <NavScan />
        </div>

        {/* User Controls */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0 ml-4">
          <div className="relative">
            <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-green-500 animate-pulse border border-green-300"></div>
            <button onClick={() => navigate('/profile')} className="p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-900/40 border border-cyan-900/30 hover:border-cyan-400/50 transition-all group flex items-center">
              <User className="h-5 w-5 text-cyan-400 group-hover:text-white" />
              <span className="ml-2 font-mono text-xs text-cyan-300 hidden lg:inline">PROFILE</span>
            </button>
          </div>
          <button onClick={handleLogout} className="p-2 rounded-lg bg-gray-800/50 hover:bg-red-900/40 border border-red-900/30 hover:border-red-400/50 transition-all group flex items-center" title="Logout">
            <LogOut className="h-5 w-5 text-red-400 group-hover:text-white" />
            <span className="ml-2 font-mono text-xs text-red-300 hidden lg:inline">LOGOUT</span>
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Navigation (visible only on small screens) */}
      <div className="md:hidden w-full overflow-x-auto whitespace-nowrap scrollbar-hide pt-4 flex items-center space-x-4">
        <NavLink to="/explore" icon={<Rocket />} text="EXPLORE" colorClasses={{ icon: "text-cyan-400", gradient: "from-cyan-600", bg: "bg-gray-800/50", hoverBg: "hover:bg-cyan-900/20", hoverBorder: "hover:border-cyan-400/50" }} />
        <NavLink to="/dashboard" icon={<PieChart />} text="DASHBOARD" colorClasses={{ icon: "text-purple-400", gradient: "from-purple-600", bg: "bg-gray-800/50", hoverBg: "hover:bg-purple-900/20", hoverBorder: "hover:border-purple-400/50" }} />
        <NavLink to="/spacex" icon={<Satellite />} text="SPACEFLIGHT" colorClasses={{ icon: "text-red-400", gradient: "from-red-600", bg: "bg-gray-800/50", hoverBg: "hover:bg-red-900/20", hoverBorder: "hover:border-red-400/50" }} />
        <NavScan />
      </div>
    </nav>
  );
};

export default Navbar;