import {  Drill, Fuel, Gem, Rocket } from "lucide-react";
import { Asteroid } from "./Custom Icons";

export const miningStocks = [
  {
    symbol: "GALT",
    name: "Galt's Gulch Asteroid Mining",
    sector: "Asteroid Mining",
    icon: <Asteroid className="text-red-500" />,
    description: "Pioneers of the Asteroid Belt gold rush, utilizing patented zero-gravity extraction tech. Named after the mythical entrepreneur John Galt from 20th century Earth literature.",
    founded: 2038,
    headquarters: "Ceres Orbital Station, Asteroid Belt",
    keyProject: "Project Prometheus (Psyche 16 extraction)",
    competitors: ["PLUTOGOLD", "ASTEROIDINC"],
    metrics: {
      reserves: "4.2 quadrillion kg estimated metallic assets",
      patents: 87,
      fleet: "32 autonomous mining drones"
    },
    fictionalData: {
      innovation: "Accused of violating Outer Space Treaty by claiming Eros",
      lore: "Rumored to be controlled by a secretive Earth libertarian collective"
    }
  },
  {
    symbol: "ASTROFUEL",
    name: "AstroFuel Interstellar",
    sector: "Space Propellant",
    icon: <Fuel className="text-blue-400" />,
    description: "Leading producer of hydrogen-3 extracted from lunar regolith. Supplies 78% of all Mars-Earth route vessels with clean-burning fusion fuel.",
    founded: 2042,
    headquarters: "Shackleton Crater, Moon",
    keyProject: "Helios Refinery Network",
    competitors: ["PETROGALAXY", "SUNFUEL"],
    techSpecs: {
      production: "12,000 tons/year",
      purity: "99.9999% H3",
      depots: 14
    },
    fictionalData: {
      innovation: "First to implement quantum-catalyzed fuel synthesis",
      lore: "2045 Lunar Fuel Crisis survivor"
    }
  },
  {
    symbol: "QUASAR",
    name: "Quasar Rare Minerals",
    sector: "Exotic Matter",
    icon: <Gem className="text-purple-500" />,
    description: "Specialists in harvesting metastable superheavy elements from neutron star collision remnants. Sole supplier of Element-126 for quantum computing cores.",
    founded: 2046,
    headquarters: "L2 Manufacturing Hub",
    keyProject: "Project Icarus (Neutron Star Survey)",
    competitors: ["NEUTRONIUM", "METASTABLE"],
    us: {
      rarityIndex: 9.8,
      galacticPrice: "₡2.4M/kg",
      locations: "3 active singularity mines"
    },
    fictionalData: {
      innovatoin: "Accidentally created stable element 127 in 2049",
      lore: "All facilities protected by Hawking radiation shields"
    }
  },
  {
    symbol: "METEORX",
    name: "MeteorX Materials",
    sector: "Meteorite Refining",
    icon: <Drill className="text-orange-500" />,
    description: "Revolutionary molecular sorting technology extracts ultra-pure iron-nickel-cobalt alloys from undifferentiated meteorites. Supplier to all major orbital shipyards.",
    founded: 2035,
    headquarters: "Vesta Processing Plant",
    keyProject: "Phoenix Smelters",
    competitors: ["SPACEMETALS", "ORBITALALLOY"],
    metrics: {
      production: "800 tons/day",
      purity: "99.999% Fe/Ni/Co",
      depots: "98.7%"
    },
    fictionalData: {
      lore: "2041 Ceres spill led to new containment protocols",
      innovation: "Plasma torches powered by fusion byproducts"
    }
  },
  {
    symbol: "COSMOMINING",
    name: "CosmoMining Conglomerate",
    sector: "Megascale Extraction",
    icon: <Rocket className="text-green-500" />,
    description: "The Amazon of space mining - operates the largest fleet of AI-controlled asteroid tugs and nano-refineries. Vertically integrated from extraction to final product.",
    founded: 2040,
    headquarters: "Tycho Station, Earth-Moon L5",
    keyProject: "Belt Dominance Initiative",
    competitors: ["SPACERES", "GALACTICMINES"],
    work: {
      assets: "427 claimed asteroids",
      workforce: "12,000 robots",
      revenue: "₡14.2T last quarter"
    },
    fictionalData: {
      innovation: "2048 antitrust lawsuit settled out of court",
      lore: "Controls 62% of main belt mining rights"
    }
  }
];

// Sector Taxonomy
export const miningSectors = [
  {
    name: "Asteroid Mining",
    icon: <Asteroid />,
    description: "Metallic and volatile extraction from small bodies"
  },
  {
    name: "Exotic Materials",
    icon: <Gem />,
    description: "Rare elements from extreme cosmic sources"
  },
  {
    name: "Orbital Refining",
    icon: <Drill />,
    description: "Zero-gravity material processing"
  },
  {
    name: "Fuel Production",
    icon: <Fuel />,
    description: "Propellant for interplanetary travel"
  }
];