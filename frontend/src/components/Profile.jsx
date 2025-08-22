import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg from "../assets/profile-pictures/favicon.ico";
import MainDeck from '../pages/MainDeck';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [accessLevel, setAccessLevel] = useState('...');
  const [hologramActive, setHologramActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.status === 401) {
          console.error("Unauthorized, redirecting to login...");
          navigate("/login");
          return;
        }
    
        const data = await response.json();
        setUser(data);
        
        // Simulate biometric scan completion
        setTimeout(() => {
          setScanComplete(true);
          // Simulate access level determination
          const levels = ['GAMMA', 'BETA', 'ALPHA', 'OMEGA'];
          setAccessLevel(levels[Math.floor(Math.random() * levels.length)]);
        }, 2000);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const toggleHologram = () => {
    setHologramActive(!hologramActive);
  };

  return (
    <div className="font-mono relative max-w-[100%] h-full flex flex-col mx-3 py-5 justify-start space-y-5 text-[#2ca5eb] border-[#237da7] border-r-2 bg-black/50 backdrop-blur-md overflow-hidden">
      
      <div className="absolute inset-0 border-2 border-[#237da7] opacity-70 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/circuit-board.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#237da7] animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#237da7] to-transparent animate-[scanline_5s_linear_infinite]"></div>
      </div>

        <div
        className="absolute top-4 left-4 z-20 flex items-center bg-cyan-900/30 hover:bg-cyan-800/50 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-all group"
      >
        <MainDeck/>
      </div>
    
      {/* Holographic user profile section */}
      <div className='flex flex-col justify-center items-center relative z-10'>
        {/* Interactive holographic avatar with toggle */}
        <div className="relative mb-3 group cursor-pointer" onClick={toggleHologram}>
          <div className={`absolute inset-0 rounded-full ${hologramActive ? 'bg-[#00FFFF]/20' : ''} 
            ${hologramActive ? 'animate-[hologram_3s_ease-in-out_infinite]' : ''}`}></div>
          <img 
            src={bg} 
            alt="user" 
            className={`rounded-full h-24 w-24 border-2 ${hologramActive ? 'border-[#00FFFF]' : 'border-[#237da7]'} 
              object-cover transition-all duration-300 ${hologramActive ? 'grayscale-[80%]' : ''}`}
          />
          <div className={`absolute -inset-2 rounded-full border-2 ${hologramActive ? 'border-[#00FFFF]' : 'border-[#237da7]'} 
            opacity-50 ${hologramActive ? 'animate-[pulse_2s_infinite]' : 'animate-[pulse_3s_infinite]'}`}></div>
          <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs 
            ${hologramActive ? 'text-[#00FFFF]' : 'text-[#237da7]'} opacity-0 group-hover:opacity-100 transition-opacity`}>
            {hologramActive ? 'HOLOGRAM ACTIVE' : 'CLICK TO ACTIVATE'}
          </div>
        </div>

        {/* Animated greeting with typewriter effect */}
        <h3 className="text-lg font-mono mb-2 relative">
          <span className={`inline-block overflow-hidden whitespace-nowrap border-r-2 border-r-[#00FFFF] 
            ${scanComplete ? 'w-auto border-r-0' : 'w-0'} 
            animate-[typing_2s_steps(20,end)_forwards]`}>
            {user ? `IDENTIFICATION CONFIRMED` : `SCANNING BIOSIGNATURES...`}
          </span>
          {!scanComplete && <span className="animate-[blink_1s_step-end_infinite]">|</span>}
        </h3>

        {/* Interactive user data terminal */}
        <div className={`font-mono text-sm bg-black/30 p-3 rounded-lg border border-[#237da7]/30 
          w-full max-w-xs transition-all duration-500 ${scanComplete ? 'h-auto' : 'h-20'}`}>
          {user ? (
            <div className="space-y-2">
              <p className="text-[#00FFFF] flex items-center">
                <span className="inline-block w-4 h-4 bg-[#00FFFF] mr-2 animate-pulse"></span>
                USERNAME: <span className="text-white ml-2">{user.name}</span>
              </p>
              <p className="text-[#00FFFF] flex items-center">
                <span className="inline-block w-4 h-4 bg-[#00FFFF] mr-2 animate-pulse delay-100"></span>
                ACCESS LEVEL: <span className={`ml-2 ${
                  accessLevel === 'OMEGA' ? 'text-purple-400' : 
                  accessLevel === 'ALPHA' ? 'text-red-400' : 
                  accessLevel === 'BETA' ? 'text-yellow-400' : 
                  'text-green-400'
                } font-bold`}>{accessLevel} CLEARANCE</span>
              </p>
              <p className="text-[#00FFFF] flex items-center">
                <span className="inline-block w-4 h-4 bg-[#00FFFF] mr-2 animate-pulse delay-200"></span>
                LAST LOGIN: <span className="text-white ml-2">{(new Date()).toLocaleString()}</span>
              </p>
              <div className="mt-3 pt-2 border-t border-[#237da7]/20">
                <div className="flex justify-between text-xs">
                  <span className="text-[#00FFFF]">SYSTEM STATUS:</span>
                  <span className="text-green-400 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    NOMINAL
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-[#00FFFF] rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-[#00FFFF] rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-[#00FFFF] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Security verification indicator */}
        {scanComplete && (
          <div className="mt-3 text-xs px-3 py-1 bg-green-900/30 text-green-300 rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            BIOMETRIC VERIFICATION COMPLETE
          </div>
        )}
      </div>

      {/* Navigation with advanced sci-fi effects */}
      <div className="space-y-3 mt-5 relative z-10">
        <Link 
          to="/dashboard" 
          className="block py-2 px-3 border-b border-[#237da7]/30 hover:bg-[#237da7]/10 hover:border-[#193c53] transition-all duration-300 group relative overflow-hidden"
        >
          <span className="absolute left-0 top-0 h-full w-1 bg-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="text-[#00FFFF] font-mono mr-2 group-hover:text-white flex items-center">
            <span className="w-2 h-2 bg-[#00FFFF] mr-2 group-hover:animate-pulse"></span>
            COMMAND DASHBOARD
          </span>
        </Link>
        <Link 
          to="/spacex" 
          className="block py-2 px-3 border-b border-[#237da7]/30 hover:bg-[#237da7]/10 hover:border-[#237da7] transition-all duration-300 group relative overflow-hidden"
        >
          <span className="absolute left-0 top-0 h-full w-1 bg-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="text-[#00FFFF] font-mono mr-2 group-hover:text-white flex items-center">
            <span className="w-2 h-2 bg-[#00FFFF] mr-2 group-hover:animate-pulse"></span>
            SPACEFLIGHT CONTROL
          </span>
        </Link>
        <Link 
          to="/settings" 
          className="block py-2 px-3 border-b border-[#237da7]/30 hover:bg-[#237da7]/10 hover:border-[#237da7] transition-all duration-300 group relative overflow-hidden"
        >
          <span className="absolute left-0 top-0 h-full w-1 bg-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="text-[#00FFFF] font-mono mr-2 group-hover:text-white flex items-center">
            <span className="w-2 h-2 bg-[#00FFFF] mr-2 group-hover:animate-pulse"></span>
            SYSTEMS CONFIGURATION
          </span>
        </Link>
      </div>

      {/* Advanced background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30 z-0 pointer-events-none">
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute bg-[#FFD700] rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="absolute bg-[#00FFFF] rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Interactive grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/holo-grid.png')] bg-[length:40px_40px]"></div>
      </div>
    </div>
  );
}

export default Profile;
