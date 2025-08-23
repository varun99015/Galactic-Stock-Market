import { 
    Globe, Moon, Mars, Orbit, 
    Droplets, Sprout, Warehouse, Rocket 
  } from "lucide-react";
  
  export const colonizationStocks = [
    {
      symbol: "THRX",
      name: "Terraforming Horizons",
      sector: "Planetary Engineering",
      icon: <Globe className="text-emerald-500" />,
      description: "Pioneers of atmospheric reprocessing and bioengineered algae blooms. Currently deploying carbon-scrubbing towers in the Venusian cloud cities.",
      founded: 2045,
      headquarters: "New Ares Station, Mars",
      keyProject: "Project Gaia (Mars O₂ Boost)",
      competitors: ["ATMOSPHERIX", "BIOSPHERE LTD"],
      technicalSpecs: {
        coloniesBuilt: 50,
        yield: "0.8% atmospheric density/year",
        new : "patents : 142",
        tech: "Nanobot cloud-seeding"
      },
      sciFiLore: {
        scandal: "Radical Ecogenesis Movement protests",
        achievement: "2048 Mars Dust Storm Survival"
      }
    },
    {
      symbol: "LUNARMINING",
      name: "Lunar Metals Consortium",
      sector: "Helium-3 Extraction",
      icon: <Moon className="text-gray-300" />,
      description: "Dominates 78% of lunar regolith mining operations. Harvests helium-3 for fusion reactors using autonomous mole drones.",
      founded: 2036,
      headquarters: "Tycho Crater Complex, Moon",
      keyProject: "Far Side Expansion",
      competitors: ["SELENE MINING", "ARTEMIS RESOURCES"],
      technicalSpecs: {
        coloniesBuilt: 4,
        yield: "12kg He-3/month",
        tech: "300 autonomous mining units",
        new :"reserveEstimate : 1.2M metric tons"
      },
      sciFiLore: {
        scandal: "2039 Moonquake caused by over-mining",
        achievement: "First to implement laser vaporization mining"
      }
    },
    {
      symbol: "MARSINC",
      name: "Mars Incorporated",
      sector: "Colony Development",
      icon: <Mars className="text-red-400" />,
      description: "Full-service Martian urban development. Builds pressurized domes with self-healing graphene membranes and underground arcologies.",
      founded: 2040,
      headquarters: "Olympus Mons Metroplex",
      keyProject: "Valles Marineris Megacity",
      competitors: ["REDPLANET BUILDERS", "ARES COLONIES"],
      technicalSpecs: {
        coloniesBuilt: 14,
        yield:"13-kg/unit O2",
        new : "population : 82,000 residents",
        tech: "Regolith-concrete 3D printing"
      },
      sciFiLore: {
        achievement: "First profitable Martian IPO",
        scandal: "Oxygen tax controversy"
      }
    },
    {
      symbol: "NEBULA",
      name: "Nebula Habitats",
      sector: "Orbital Construction",
      icon: <Orbit className="text-purple-400" />,
      description: "Specialists in rotating O'Neill cylinders with artificial gravity. Current projects include the luxury Azure Star Resort at L5.",
      founded: 2048,
      headquarters: "Lagrange Point 4",
      keyProject: "Bernal Sphere Mark V",
      competitors: ["ORBITAL ARK", "GALACTIC HOMES"],
      technicalSpecs: {
        coloniesBuilt: 2,
        yield: "5,000 residents/cylinder",
       new: "rotation : 1.2 RPM (0.9g)",
        tech: "Asteroid-mined titanium Fields"
      },
      sciFiLore: {
        scandal: "2049 spin-rate accident",
        achievement: "Zero-g ballet amphitheaters"
      }
    },
    {
      symbol: "MARSFOOD",
      name: "MarsFood Systems",
      sector: "Cellular Agriculture",
      icon: <Sprout className="text-green-400" />,
      description: "Produces lab-grown steaks and GMO crops adapted to Martian soil. Supplies 92% of colony protein needs with vat-grown meat.",
      founded: 2042,
      headquarters: "Pavonis Mons Farm Domes",
      keyProject: "Project Demeter (Closed-loop ag)",
      competitors: ["TERRAFARMS", "SYNTHOMEATS"],
      technicalSpecs: {
        coloniesBuilt: 30,
        yield: "12 tons protein/week",
        new:"waterEfficiency : 98% recycled",
        tech: "Low-gravity wheat strains"
      },
      sciFiLore: {
        scandal: "First Martian wine harvest",
        achievement: "Vat-meat tasting festivals"
      }
    },
    {
      symbol: "NEOSTOCK",
      name: "NeoStock Galactic Supply",
      sector: "Colony Logistics",
      icon: <Warehouse className="text-amber-500" />,
      description: "The Amazon of space colonies - automated orbital warehouses and quantum-entangled inventory systems ensure instant delivery of 30M+ SKUs to any off-world location.",
      founded: 2046,
      headquarters: "Ceres Distribution Hub, Asteroid Belt",
      keyProject: "Project Hermes (Wormhole Supply Lines)",
      competitors: ["SPACEWAY", "GALACTIC LOGISTIX"],
      technicalSpecs: {
        coloniesBuilt:30,
        yield: "Under 72hrs Mars-Earth",
        new : "inventory: 32 million SKUs",
        tech: "Quantum inventory synchronization,14,000 autonomous cargo pods"
      },
      sciFiLore: {
        scandal: "2048 drone swarm incident over Olympus Mons",
        achievement: "First to implement antigravity loading docks"
      }
    },
    {
      symbol: "ASTROWATER",
      name: "AstroWater Resources",
      sector: "Hydration Solutions",
      icon: <Droplets className="text-blue-400" />,
      description: "Specialists in comet ice harvesting and atmospheric water extraction. Provides 65% of Martian colony H₂O needs through patented nanofiltration systems.",
      founded: 2039,
      headquarters: "Elysium Planitia Water Works, Mars",
      keyProject: "Project Aquarius (Phobos Ice Capture)",
      competitors: ["HYDROSPACE", "PUREORBIT"],
      technicalSpecs: {
        coloniesBuilt:20,
        yield: "8 million liters/day",
        purity: "99.9999% H₂O",
        new : "sources: Comet tails, Polar ice, Atmospheric mining",
        tech: "Plasma-assisted desalination"
      },
      sciFiLore: {
        scandal: "2045 Great Tharsis Drought survival",
        achievement: "Water ration tokens became collector items"
      }
    },
    {
      symbol: "EXOGROWTH",
      name: "ExoGrowth AgriSystems",
      sector: "Space Agriculture",
      icon: <Sprout className="text-emerald-500" />,
      description: "Develops genetically engineered crops that thrive in extraterrestrial conditions. Their signature Martian potatoes now grow in 1/3rd the time with 90% less water.",
      founded: 2041,
      headquarters: "Valles Marineris Greenhouse Complex",
      keyProject: "Project Demeter 2.0 (Self-fertilizing crops)",
      competitors: ["TERRAFORM AG", "PHOTON FARMS"],
      technicalSpecs: {
        coloniesBuilt:100,
        yield: "18 harvests/Earth-year",
        tech: "97% PAR absorption",
        new : "Innovations : UV-resistant,wheat Low-pressure tomatoes, CO₂-gorging soybeans"
        
      },
      sciFiLore: {
        achievement: "First entirely space-grown Thanksgiving meal (2048)",
        scandal: "Controversial glow-in-the-dark kale modification"
      },
    }
  ];
  
  // Advanced Sector Taxonomy
  export const colonizationSectors = [
    {
      name: "Planetary Engineering",
      icon: <Globe />,
      type: ["Atmospheric processing", "Soil remediation"]
    },
    {
      name: "Space Architecture",
      icon: <Orbit />,
      type: ["Rotating habitats", "Radiation shielding"]
    },
    {
      name: "Off-World Agriculture",
      icon: <Sprout />,
      type: ["Hydroponics", "Algae bioreactors"]
    },
    {
      name: "Resource Logistics",
      icon: <Warehouse />,
      type: ["Cryo-storage", "Interplanetary supply chains"]
    }
  ];