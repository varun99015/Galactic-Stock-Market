import { Satellite, Wifi, SatelliteDish, Orbit } from "lucide-react";
import { SpaceDriveIcon,DeepSkyIcon } from "./Custom Icons";
// Satellite Taxonomy
export const satelliteStocks = [
  {
    symbol: "MAXAR",
    name: "Maxar Technologies",
    sector: "Satellite Imaging",
    description: "Global leader in high-resolution Earth intelligence and space infrastructure, providing advanced satellite imagery and geospatial solutions.",
    icon: < Satellite className="text-blue-500" />,
    founded: 1969,
    headquarters: "Westminster, Colorado",
    keyProject: "WorldView Legion Constellation",
    competitors: ["AIRBUS", "PLANET"],
    externalData: {
      ceo: "Daniel Jablonsky",
      cons: "6 satellites in orbit",
      coverage:"20+ conuntries available"
    }
  },
  {
    symbol: "STARLINK",
    name: "Starlink",
    sector: "Satellite Internet",
    description: "Revolutionary LEO satellite constellation delivering high-speed, low-latency broadband internet globally. Division of SpaceX.",
    icon: <Wifi className="text-purple-500" />,
    founded: 2015,
    headquarters: "Redmond, Washington",
    keyProject: "Gen2 Satellite Deployment",
    competitors: ["ONEWEB", "AMAZON_KUI"],
    externalData: {
      cons: "Over 4,000 in orbit",
      coverage: "Available in 60+ countries",
      ceo:"Markov Vala"
    }
  },
  {
    symbol: "SPACEDRIVE",
    name: "SpaceDrive Systems",
    sector: "Satellite Propulsion",
    description: "Pioneering ion propulsion systems for satellite station-keeping and orbital maneuvers. Enabling decade-long satellite lifespans.",
    icon: <SpaceDriveIcon />,
    founded: 2028,
    headquarters: "Toulouse, France",
    keyProject: "Neon-5 Plasma Thruster",
    competitors: ["ACCION", "BUSEK"],
    fictionalData: {
      tech: "Electrostatic ion acceleration",
      bandwidth: "10x chemical rockets",
      clients: "USPTO #9,876,543B2",
      latency:"2 hr from Earth",
    }
  },
  {
    symbol: "DEEPSKY",
    name: "DeepSky Communications",
    sector: "Deep Space Network",
    description: "Quantum-encrypted interplanetary communications network with relay satellites at Lagrange points. Vital for Mars colonization efforts.",
    icon: <DeepSkyIcon />,
    founded: 2032,
    headquarters: "Zurich, Switzerland",
    keyProject: "Project Andromeda (10,000-sat constellation)",
    competitors: ["NASA_DSN", "ESA_ESTRACK"],
    fictionalData: {
      tech:"Quantum Computations",
      latency: "22 mins Earth-Mars",
      bandwidth: "1.2 petabits/sec",
      clients: "Mars Colonies 1-3"
    }
  }
];

// Sector Taxonomy
export const commsSectors = [
  {
    name: "Earth Observation",
    icon: <Satellite />,
    description: "Imaging and remote sensing satellites"
  },
  {
    name: "Internet Constellations",
    icon: <Wifi />,
    description: "LEO broadband networks"
  },
  {
    name: "Deep Space Comms",
    icon: <SatelliteDish />,
    description: "Interplanetary communication relays"
  },
  {
    name: "Propulsion Tech",
    icon: <Orbit />,
    description: "Advanced satellite mobility systems"
  }
];