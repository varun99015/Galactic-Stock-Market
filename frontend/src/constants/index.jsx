import { Flag, Gem, Globe, TrendingUp,ShieldHalf ,Satellite} from "lucide-react";

export const navItems = [
  { label: "Features", href: "/feature" },
  {label: "Market Overview", href: "/marketoverview" },
];


export const features = [
  {
    icon: <TrendingUp />,
    text: "Expanding Commercial Opportunities",
    description:
      "Growth in satellite communications, space tourism, and asteroid mining is creating new revenue streams and investment opportunities.",
  },
  {
    icon: <Satellite />,
    text: "Satellite & Internet Expansion",
    description:
      "Satellite technology is essential for global internet access, GPS, weather forecasting, and disaster response.",},
  {
    icon: <Gem />,
    text: "Resource Mining & Manufacturing",
    description:
   "The Moon and Mars have valuable resources (helium-3, water ice, etc.) for fuel and sustainability.",  },
  {
    icon: <Globe />,
    text: "Climate Monitoring & Earth Observation",
    description:
      "Satellites help track climate change, natural disasters, deforestation, and urban development",
  },
  {
    icon: <ShieldHalf />,
    text: "National Security & Defense",
    description:
      "Space-based defense systems are critical for cybersecurity, surveillance, and navigation.Governments worldwide are investing in military space tech & space forces.",
  },
  {
    icon: <Flag />,
    text: "First-Mover Advantage",
    description:
      "Space research drives innovation in AI, robotics, energy, and material sciences.Many daily technologies (GPS, camera sensors, water purification) originated from space research.",

  },
];
