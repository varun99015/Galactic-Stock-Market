import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { ReactTyped as Typed } from 'react-typed';
import video1 from "../assets/stocks.mp4";

const Hero = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
  
    return (
            <div className="flex flex-col items-center mt-6 lg:mt-20 bg-space-1 bg-cover bg-center bg-no-repeat h-auto">  
                
                <div className="mx-auto max-w-5xl py-32 sm:py-38 lg:py-20 text-center">
                 
                    
                    {/* Heading */}
                    <span className="text-1xl font-semibold tracking-tight text-slate-50 sm:text-7xl">
                        Space isn't just for astronauts it's also {" "} 
                        <span className="bg-gradient-to-r from-orange-700 to-red-900 text-transparent bg-clip-text">for Investors </span> with vision Now Invest in{" "}<p>
                        {mounted && ( 
            <Typed className='bg-gradient-to-t from-orange-700 to-red-900 text-transparent bg-clip-text'
              strings={[
              "SPCE", "RKLB", "ASTR", "GALT", "THRX",
  "SPACEX", "BLUEORIGIN", "ASTRA", "MAXAR", "BOEING",
  "LUNARMINING", "MARSINC", "ASTROFUEL", "STARLINK", "GALAXYCREDIT",
  "COSMOCOIN", "ORBITX", "NEBULA", "QUASAR", "SATURNBANK",
  "PLUTOGOLD", "MARSFOOD", "JUPITERJET", "METEORX", "ASTROWATER",
  "SPACEDRIVE", "DEEPSKY", "EXOGROWTH", "COSMOMINING", "NEOSTOCK"
              ]}
              typeSpeed={150}
              backSpeed={90}
              loop
            />
          )}</p>
                    </span>
    
                    {/* Subtext */}
                    <p className="mt-8 text-lg font-medium text-white sm:text-xl/8">
                        The new space economy is not just about exploration; it's about innovation, investment, 
                        and limitless opportunities. From satellite technology and space tourism to asteroid mining and interplanetary colonization.
                    </p>
    
                    {/* Buttons */}
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to='/login'
                            className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                            Get started
                        </Link>
                    </div>
                </div>
                <div className="flex mt-10 mb - 20 justify-center max-w-1/3">
                      <video autoPlay loop  className="h-300 w-2/3 rounded-l mx-2 my-4">
                                <source src={video1} type='video/mp4'/>
                                </video></div>
                </div>
        );
}

export default Hero;
