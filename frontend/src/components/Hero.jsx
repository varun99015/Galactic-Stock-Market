// import {useState,useEffect} from 'react';
// import { Link } from "react-router-dom";
// import { ReactTyped as Typed } from 'react-typed';
// import video1 from "../assets/stocks.mp4";

// const Hero = () => {
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//       setMounted(true);
//     }, []);
  
//     return (
//             <div className="flex flex-col items-center mt-6 lg:mt-20 bg-space-1 bg-cover bg-center bg-no-repeat h-auto">  
                
//                 <div className="mx-auto max-w-5xl py-32 sm:py-38 lg:py-20 text-center">
                 
                    
//                     {/* Heading */}
//                     <span className="text-1xl font-semibold tracking-tight text-slate-50 sm:text-7xl">
//                         Space isn't just for astronauts it's also {" "} 
//                         <span className="bg-gradient-to-r from-orange-700 to-red-900 text-transparent bg-clip-text">for Investors </span> with vision Now Invest in{" "}<p>
//                         {mounted && ( 
//             <Typed className='bg-gradient-to-t from-orange-700 to-red-900 text-transparent bg-clip-text'
//               strings={[
//               "SPCE", "RKLB", "ASTR", "GALT", "THRX",
//   "SPACEX", "BLUEORIGIN", "ASTRA", "MAXAR", "BOEING",
//   "LUNARMINING", "MARSINC", "ASTROFUEL", "STARLINK", "GALAXYCREDIT",
//   "COSMOCOIN", "ORBITX", "NEBULA", "QUASAR", "SATURNBANK",
//   "PLUTOGOLD", "MARSFOOD", "JUPITERJET", "METEORX", "ASTROWATER",
//   "SPACEDRIVE", "DEEPSKY", "EXOGROWTH", "COSMOMINING", "NEOSTOCK"
//               ]}
//               typeSpeed={150}
//               backSpeed={90}
//               loop
//             />
//           )}</p>
//                     </span>
    
//                     {/* Subtext */}
//                     <p className="mt-8 text-lg font-medium text-white sm:text-xl/8">
//                         The new space economy is not just about exploration; it's about innovation, investment, 
//                         and limitless opportunities. From satellite technology and space tourism to asteroid mining and interplanetary colonization.
//                     </p>
    
//                     {/* Buttons */}
//                     <div className="mt-10 flex items-center justify-center gap-x-6">
//                         <Link to='/login'
//                             className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
//                             Get started
//                         </Link>
//                     </div>
//                 </div>
//                 <div className="flex mt-10 mb - 20 justify-center max-w-1/3">
//                       <video autoPlay loop  className="h-300 w-2/3 rounded-l mx-2 my-4">
//                                 <source src={video1} type='video/mp4'/>
//                                 </video></div>
//                 </div>
//         );
// }

//  export default Hero;

 import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ReactTyped as Typed } from 'react-typed';
import video1 from "../assets/stocks.mp4";

const Hero = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-black">
            
            {/* Full-screen Video Background */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={video1} type='video/mp4'/>
            </video>
            
            {/* Semi-transparent overlay for text readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

            {/* Main Content Container */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
                
                {/* Animated HUD-style corner brackets */}
                <div className="absolute -inset-4 sm:-inset-8 border-2 border-cyan-500/20 rounded-2xl animate-pulse"></div>
                <div className="absolute -inset-2 sm:-inset-4 border border-cyan-500/10 rounded-lg"></div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-orbitron font-bold  tracking-wider text-cyan-600 shadow-cyan-500">
                    Space Isn't Just For Astronauts
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-orbitron font-bold mt-2 sm:mt-4 text-shadow-orange">
                    It's For <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">Investors</span>
                </h2>

                {/* Typed.js Sub-heading */}
                <p className="mt-6 text-lg sm:text-xl text-cyan-300 font-mono">
                    Invest in:{" "}
                    {mounted && (
                        <Typed
                            className='text-white font-bold'
                            strings={[
                                "SPACEX", "BLUEORIGIN", "ASTRA", "MAXAR", "BOEING",
                                "LUNARMINING", "MARSINC", "ASTROFUEL", "STARLINK", "GALAXYCREDIT",
                                "COSMOCOIN", "ORBITX", "NEBULA", "QUASAR", "SATURNBANK"
                            ]}
                            typeSpeed={120}
                            backSpeed={70}
                            loop
                        />
                    )}
                </p>

                {/* Subtext */}
                <p className="mt-8 max-w-2xl text-base sm:text-lg text-slate-300/80">
                    The new space economy is about innovation, investment, and limitless opportunities. From satellite technology to interplanetary colonization, the future is now.
                </p>

                {/* Call-to-Action Button */}
                <div className="mt-10">
                    <Link 
                        to='/login'
                        className="group relative inline-block px-8 py-4 text-lg font-bold text-white font-orbitron tracking-widest uppercase border-2 border-cyan-400 rounded-md transition-all duration-300
                                   hover:bg-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/40"
                    >
                        {/* Animated glowing effect */}
                        <div className="absolute -inset-0.5 bg-cyan-400 rounded-md blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <span className="relative">Get Started</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;