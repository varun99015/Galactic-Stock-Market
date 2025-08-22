import { 
    Rocket, Satellite, TrendingUp, Moon, ShieldHalf, Orbit, 
    Globe, Wifi, SatelliteDish, Telescope, Sparkles, OrbitIcon,
    PlaneIcon,
    Target,} from "lucide-react";
import { SpaceHelmet,Asteroid, SolarPanel,SpaceShuttle, GalaxyCreditIcon } from "./Custom Icons";
  
  export const spaceStocks = [
    // ===== REAL-WORLD INSPIRED =====
    {
      symbol: "SPCE",
      name: "Virgin Galactic Holdings",
      sector: "Space Tourism",
      mission: "Democratizing access to space",
      description: "Pioneering suborbital space tourism with WhiteKnightTwo carrier aircraft and SpaceShipTwo vehicles. Future plans include orbital hotels and point-to-point space travel.",
      icon: <Rocket className="text-purple-500" />,
      founded: 2004,
      headquarters: "Las Cruces, New Mexico",
      keyProject: "Delta Class Spaceship (2026)",
      competitors: ["RKLB", "ORBITX"],
      externalData: {
        ceo: "Michael Colglazier",
        marketStatus: "Public (NYSE)",
        realWorldNote: "First publicly traded space tourism company"
      }
    },
    {
      symbol: "RKLB",
      name: "Rocket Lab",
      sector: "Satellite Launch",
      mission: "Opening access to space to improve life on Earth",
      description: "Leading small satellite launch provider with reusable Electron rockets. Expanding with Neutron medium-lift rocket and satellite manufacturing.",
      icon: <Satellite className="text-blue-400" />,
      founded: 2006,
      headquarters: "Long Beach, California",
      keyProject: "Neutron Rocket (2024)",
      competitors: ["ASTR", "FIREFLY"],
      externalData: {
        ceo: "Peter Beck",
        marketStatus:"Private(NASDAY)",
        realWorldNote: "First 3D-printed orbital rocket engine"
      }
    },
  
    // ===== FICTIONAL (YOUR ORIGINAL LIST) =====
    {
      symbol: "ORBITX",
      name: "OrbitX Technologies",
      sector: "Orbital Services",
      mission: "Making space operations sustainable",
      description: "Develops autonomous space tugs for satellite maintenance, debris removal, and orbital asset relocation. Partnering with NASA on lunar gateway logistics.",
      icon: <OrbitIcon className="text-green-500" />,
      founded: 2032,
      headquarters: "Luxembourg (Earth Office)",
      keyProject: "Orbit Servicer 3000",
      competitors: ["JUPITERJET", "SPCE"],
      fictionalData: {
        lore: "Founded by ex-ISS engineers after commercialization of LEO",
        tech: "AI-powered docking systems",
        notableClients: "USSR Rapid Response"
      }
    },
    {
      symbol: "JUPITERJET",
      name: "Jupiter Jet Systems",
      sector: "Hypersonic Transport",
      mission: "Earth to anywhere in 90 minutes",
      description: "Developing Skylon-inspired spaceplanes for ultra-fast executive travel and critical cargo delivery. Testing hybrid scramjet engines in partnership with DARPA.",
      icon: <SpaceShuttle className="text-red-500" />,
      founded: 2035,
      headquarters: "Singapore Orbital Yard",
      keyProject: "J-7 Thunderbird Prototype",
      competitors: ["DEEPSKY", "SPCE"],
      fictionalData: {
        lore: "Spin-off from failed military aerospace program",
        tech:"Automated Driving Ships",
        notableClients: "United Nations Rapid Response"
      }
    },
  
    // ===== HYBRID REAL/FICTIONAL =====
    {
      symbol: "DEEPSKY",
      name: "DeepSky Communications",
      sector: "Space-Based Internet",
      mission: "Connecting the unconnected",
      description: "Next-gen LEO/MEO satellite constellation offering 2ms latency global broadband. Uses quantum encryption for unhackable comms.",
      icon: <SatelliteDish className="text-indigo-400" />,
      founded: 2028,
      headquarters: "Zurich & Lunar Farside",
      keyProject: "Project Andromeda (10,000-sat network)",
      competitors: ["STARLINK", "AMAZON_KUI"],
      fictionalData: {
        lore: "Competitor to Starlink/OneWeb",
        tech: "Adapted from DARPA Blackjack program",
        notableClients: "Aliens Rapid Response"
      }
    },
    {
      symbol: "ASTROFUEL",
      name: "AstroFuel Corporation",
      sector: "Space Resources",
      mission: "Powering the interplanetary economy",
      description: "Extracts and refines lunar water ice into hydrogen fuel. Operates the first off-Earth gas station at Lagrange Point 1.",
      icon: <SolarPanel className="text-yellow-500" />,
      founded: 2040,
      headquarters: "Shackleton Crater, Moon",
      keyProject: "IceHarvester X-3",
      competitors: ["LUNARMINING", "PLUTOGOLD"],
      fictionalData: {
        lore: "Joint venture between Shell and SpaceX",
        tech: "500 tons/year of LOX/LH2",
        notableClients: "United Kingdom Rapid Response"

      }
    },
  
    // ===== FULLY FICTIONAL =====
    {
      symbol: "NEBULA",
      name: "Nebula Construction",
      sector: "Space Habitats",
      mission: "Building homes among the stars",
      description: "Specializes in inflatable space habitats with artificial gravity systems. Currently constructing the first Martian suburb in Jezero Crater.",
      icon: <GalaxyCreditIcon/>,
      founded: 2045,
      headquarters: "Mars Prefab Unit #1",
      keyProject: "O'Neill City (orbital colony)",
      competitors: ["ASTRAL_ARCH", "GALAXY_BUILD"],
      fictionalData: {
        lore: "3D-printed regolith structures",
        tech: "2048 - Hilton Space Hotel",
        notableClients: "BRICS Rapid Response"
      }
    }
  ];
  
  // ===== SECTOR TAXONOMY =====
  export const spaceSectors = [
    { 
      name: "Launch Providers", 
      icon: <Rocket />,
      description: "Companies developing rockets and spaceplanes"
    },
    { 
      name: "Orbital Services", 
      icon: <Orbit />,
      description: "Satellite maintenance, debris removal, and logistics"
    },
    { 
      name: "Space Resources", 
      icon: <Asteroid />,
      description: "Asteroid/lunar mining and in-situ resource utilization"
    },
    { 
      name: "Off-World Build", 
      icon: <Sparkles />,
      description: "Habitat manufacturing and infrastructure development"
    }
  ];
  
  // ===== EXTERNAL DATA SOURCES =====
  export const spaceDataSources = [
    {
      name: "Space Capital",
      url: "https://www.spacecapital.com",
      type: "Investment Tracking",
      icon:<Rocket/>
    },
    {
      name: "Bryce Space Tech",
      url: "https://brycetech.com",
      type: "Industry Reports",
      icon:<Target/>
    },
    {
      name: "NASA Spinoff Database",
      url: "https://spinoff.nasa.gov",
      type: "Technology Transfer",
      icon:<ShieldHalf/>
    }
  ];