import { Banknote, Bitcoin, Coins, Gem } from "lucide-react";
import { GalaxyCreditIcon,SaturnBankIcon } from "./Custom Icons";
// Custom Icons

export const spaceFinanceStocks = [
  {
    symbol: "GALAXYCREDIT",
    name: "Galaxy Credit Union",
    sector: "Space Banking",
    description: "First FDIC-insured bank offering Earth-Moon banking services. Specializes in asteroid mining loans and orbital construction financing.",
    icon: <GalaxyCreditIcon />,
    founded: 2035,
    headquarters: "Lunar Gateway Station",
    keyProject: "Zero-G ATMs",
    competitors: ["ASTROBANK", "ORBITALCAPITAL"],
    services: {
      earthRate: "3.25% APR",
      lunarRate: "1.8% APR (lower gravity)",
      crypto: "GalaxyCoin (GXC)"
    },
    fictionalData: {
      ceo: "Elon Tusk",
      security: "Quantum-encrypted vaults",
      branches: "32 orbital locations"
    }
  },
  {
    symbol: "COSMOCOIN",
    name: "CosmoCoin",
    sector: "Space Cryptocurrency",
    description: "DeFi platform for off-world commerce. Uses proof-of-stake consensus adapted for light-speed latency across the solar system.",
    icon: <Bitcoin className="text-orange-500" />,
    founded: 2029,
    headquarters: "Decentralized (Main Node: Mars)",
    keyProject: "HelioChain Upgrade",
    competitors: ["SOLANA", "ETHEREUM"],
    techSpecs: {
      tps: "25,000 transactions/sec",
      latency: "3s Earth-Moon, 22min Earth-Mars",
      mining: "Solar-powered validators"
    },
    fictionalData: {
      ceo:"Dave Mark",
      branches: "2042 Lunar ICO",
      security: "Backed by helium-3 futures"
    }
  },
  {
    symbol: "SATURNBANK",
    name: "Saturn Bank",
    sector: "Interplanetary Finance",
    description: "Full-service financial institution specializing in ring-based collateral systems. Offers the first Jovian-system mortgages.",
    icon: <SaturnBankIcon />,
    founded: 2042,
    headquarters: "Titan Colony",
    keyProject: "Cryo-Asset Preservation",
    competitors: ["JUPITERFI", "NEPTUNEPAY"],
    uniqueFeatures: {
      accounts: "Multi-gravity portfolio balancing",
      loans: "Ice-mining equipment financing",
      currency: "Titanium-backed SaturnBucks"
    },
    fictionalData: {
      security:"High Hydrogen Chambers",
      branches: "Methane-liquid dispensing",
      ceo: "Richard Branson-Singh"
    }
  },
  {
    symbol: "PLUTOGOLD",
    name: "Pluto Gold Standard",
    sector: "Commodity-Backed Crypto",
    description: "Digital currency backed by rare metals extracted from Kuiper Belt objects. Each token represents 1mg of certified Plutonium-238.",
    icon: <Gem className="text-yellow-400" />,
    founded: 2048,
    headquarters: "Charon Trading Post",
    keyProject: "Oort Cloud Reserve Audit",
    competitors: ["ASTEROIDCOIN", "COMETCASH"],
    backing: {
      reserves: "12 tons Pu-238 (est.)",
      value: "1 PGS = ₽0.001g AuEq",
      storage: "Distributed across 7 dwarf planets"
    },
    fictionalData: {
      ceo: "Anonymous (Satoshi Nakamoto II?)",
      branches: "The New Gold Rush: Banking the Kuiper Belt",
      security:"Out of All Satellite Radars"
    }
  }
];

// Sector Taxonomy
export const financeSectors = [
  {
    name: "Traditional Banking",
    icon: <Banknote />,
    description: "FDIC-insured accounts with orbital branches"
  },
  {
    name: "Cryptocurrency",
    icon: <Bitcoin />,
    description: "Blockchain adapted for interplanetary latency"
  },
  {
    name: "Commodity Trading",
    icon: <Coins />,
    description: "Resource-backed financial instruments"
  },
  {
    name: "Wealth Preservation",
    icon: <Gem />,
    description: "Cryogenic asset storage solutions"
  }
];