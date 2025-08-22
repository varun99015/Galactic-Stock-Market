import logo from '../assets/profile-pictures/favicon.ico';
import {navItems } from '../constants/index';
import{Menu,X} from 'lucide-react';
import { useState } from 'react';
import {Link ,useNavigate}from 'react-router-dom';
import QuickAccessMenu from './QuickAccessMenu';
import MarketStatusIndicator from './MarketStatusIndicator';
import UserStatusIndicator from './UserStatusIndicator';


const LandNavbar = () => {
    const[mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);
    const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80 bg-gray-900/80">
        <div className="container px-4 mx-auto relative text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
              <span className="text-2xl tracking-tight font-orbitron font-bold text-cyan-300">Galactic Stocks</span>
            </div>
            
            <ul className="hidden lg:flex ml-14 space-x-8 items-center">
               {navItems.map((item,index) =>(
                 <li key={index} className="text-gray-300 hover:text-cyan-300 transition-colors">
                    <a href={item.href}>{item.label}</a>
                 </li>
               ))}
               <QuickAccessMenu />
            </ul>
            
            <div className="hidden lg:flex items-center space-x-4">
               <MarketStatusIndicator />
               <UserStatusIndicator />
               <Link to="/login" className="px-4 py-2 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-cyan-900/20 hover:text-white transition-all font-mono">
                 Sign in
               </Link>
               <a href="/register" className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono transition-all shadow-lg shadow-cyan-500/30">
                 Create Account
               </a>
            </div>
            
            <div className="lg:hidden flex items-center">
                <button onClick={toggleNavbar} className="text-cyan-300 p-2">
                    {mobileDrawerOpen ? <X /> : <Menu />}
                </button>
            </div>
          </div>
          
          {mobileDrawerOpen && (
              <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                 <ul className="space-y-6 text-center">
                     {navItems.map((item,index) => (
                         <li key={index} className='py-2'>
                             <a href={item.href} className="text-cyan-300 hover:text-white text-lg">{item.label}</a>
                         </li>
                     ))}
                 </ul>
                 <div className="flex flex-col space-y-4 mt-8">
                     <MarketStatusIndicator />
                     <a href='/login' className="py-3 px-6 border border-cyan-500/30 rounded-lg text-cyan-300 text-center">Sign in</a>
                     <a href="/register" className="py-3 px-6 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center">
                         Create Account
                     </a>
                 </div>
              </div>
          )}
        </div>
      </nav>
  )
}
export default LandNavbar;
