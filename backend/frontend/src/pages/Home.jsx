import React,{useState,useEffect} from 'react';

import LandNavbar from '../components/LandNavbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
function Home() {
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

    return (
    <>
     <LandNavbar />  
     <Hero />
     <Features />
      <Footer/>  
    </>
    );
}

export default Home