import { Bell, User, LogOut } from "lucide-react";
import { useState } from "react";

const UserStatusIndicator = () => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="hidden lg:flex items-center space-x-4">
      {/* Notification Bell */}
      <div className="relative">
        <button 
          className="p-2 text-gray-300 hover:text-cyan-300 transition-colors relative"
          onClick={() => setHasNotifications(false)}
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse border border-red-600"></div>
          )}
        </button>
      </div>

      {/* User Profile Menu */}
      <div className="relative">
        <button 
          className="flex items-center space-x-2 px-3 py-2 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/20 transition-all group"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-cyan-300 text-sm font-mono group-hover:text-white">GUEST</span>
        </button>

        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/20 py-2 z-50">
            <div className="px-4 py-2 border-b border-cyan-800/50">
              <p className="text-cyan-300 text-sm font-mono">Status: Guest Mode</p>
            </div>
            <a
              href="/login"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-800/30 transition-all"
            >
              <User className="h-4 w-4" />
              <span>Full Login</span>
            </a>
            <a
              href="/explore"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-800/30 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Demo Mode</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatusIndicator;
