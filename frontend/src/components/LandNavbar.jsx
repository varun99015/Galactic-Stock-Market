import logo from '../assets/profile-pictures/favicon.ico';
import { navItems } from '../constants/index';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import QuickAccessMenu from './QuickAccessMenu';
import MarketStatusIndicator from './MarketStatusIndicator';
import UserStatusIndicator from './UserStatusIndicator';
import { Bell, User, LogOut } from "lucide-react";

const LandNavbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-gray-900/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    {/* Logo and Brand Name */}
                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                        <span className="text-xl tracking-tight font-orbitron font-bold text-cyan-300">
                            Galactic Stocks
                        </span>
                    </Link>
                    
                    {/* Desktop Navigation Links */}
                    <ul className="hidden lg:flex ml-14 space-x-12 items-center">
                        {navItems.map((item, index) => (
                            <li key={index} className="text-gray-300 hover:text-cyan-300 transition-colors">
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                        <QuickAccessMenu/>
                    </ul>
                    
                    {/* Desktop User Controls */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <MarketStatusIndicator />
                        <UserStatusIndicator />
                        <Link 
                            to="/login" 
                            className="px-4 py-2 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-cyan-900/20 transition-all font-mono"
                        >
                            Sign in
                        </Link>
                        <Link 
                            to="/register" 
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono transition-all shadow-lg shadow-cyan-500/30"
                        >
                            Create Account
                        </Link>
                    </div>
                    
                    {/* Mobile Menu Button - Always visible */}
                    <div className="lg:hidden flex items-center">
                        <button 
                            onClick={toggleNavbar} 
                            className="text-cyan-300 p-2 hover:bg-cyan-900/30 rounded-md transition-colors"
                        >
                            <span className="sr-only">Toggle Menu</span>
                            {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Drawer - Slides in from right */}
                {mobileDrawerOpen && (
                    <div className="lg:hidden">
                        {/* Backdrop overlay */}
                        <div 
                            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                            onClick={toggleNavbar}
                        ></div>
                        
                        {/* Drawer content - Slides from right */}
                        <div className="fixed right-0 z-20 w-full flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-black to-gray-900 transform transition-transform duration-300 ease-out overflow-y-auto">
                            
                            {/* Animated background elements */}
                            <div className="absolute inset-0 opacity-20 z-0">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute bg-cyan-500 rounded-full animate-pulse"
                                        style={{
                                            width: `${Math.random() * 3 + 1}px`,
                                            height: `${Math.random() * 3 + 1}px`,
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random() * 2}s`,
                                            animationDuration: `${Math.random() * 3 + 2}s`
                                        }}
                                    />
                                ))}
                                <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/holo-grid.png')] bg-[size:40px_40px] opacity-10"></div>
                            </div>

                            {/* Navigation Items */}
                            <div className="relative z-10 p-6">
                                <ul className="space-y-6 mb-8">
                                    {navItems.map((item, index) => (
                                        <li key={index} className="group">
                                            <a 
                                                onClick={toggleNavbar}
                                                className="text-cyan-300 hover:text-white text-lg font-medium transition-all duration-300 flex items-center py-3 border-b border-cyan-800/30 last:border-b-0"
                                            >
                                                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                {/* Auth Buttons */}
                                <div className="flex flex-col space-y-4">
                                    <Link 
                                        to="/explore" 
                                        onClick={toggleNavbar}
                                        className="py-3 px-6 border border-cyan-500/30 rounded-lg text-cyan-300 text-center font-medium hover:bg-cyan-900/20 transition-all duration-300"
                                    >
                                        <div className="flex items-center space-x-3 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-800/30 transition-all">
                                       <LogOut className="h-4 w-4" />
                                    <span>Demo Mode</span>
                                    </div>
                                    </Link>
                                    <Link 
                                        to="/login" 
                                        onClick={toggleNavbar}
                                        className="py-3 px-6 border border-cyan-500/30 rounded-lg text-cyan-300 text-center font-medium hover:bg-cyan-900/20 transition-all duration-300"
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        onClick={toggleNavbar}
                                        className="py-3 px-6 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center font-medium hover:from-cyan-500 hover:to-blue-500 transition-all"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            </div>

                            {/* Animated scanning line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[scanline_3s_linear_infinite]"></div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default LandNavbar;