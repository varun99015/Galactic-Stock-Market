
export const SpaceHelmet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide-icon">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4v4" />
    <path d="M5 12h14" />
  </svg>
);

export const BlackHole = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide-icon">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const Radiation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide-icon">
    <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export const Alien = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide-icon">
    <path d="M12 8a2 2 0 0 0-2 2v1h4v-1a2 2 0 0 0-2-2Z" />
    <path d="M10 11h4" />
    <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
    <path d="M9 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path d="M15 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </svg>
);
export const SpaceShuttle = ({ className = "", ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-space-shuttle ${className}`}
      {...props}
    >
      <path d="M12 18a6 6 0 0 1-6-6c0-1.7.7-3.2 1.8-4.3" />
      <path d="M12 6a6 6 0 0 1 6 6c0 1.7-.7 3.2-1.8 4.3" />
      <path d="M18 12h2" />
      <path d="M4 12h2" />
      <path d="M12 12h2" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m16 8 3 3-3 3" />
      <path d="m8 8-3 3 3 3" />
    </svg>
  );
  export const Asteroid = ({ className = "", ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-asteroid ${className}`}
      {...props}
    >
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19 17a7 7 0 1 0-14 0" />
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="M12 12v5" />
      <path d="m15 9-3 3-3-3" />
    </svg>
  );
  export const SolarPanel = ({ className = "", ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-solar-panel ${className}`}
      {...props}
    >
      <path d="M4 10h16" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M4.293 6.293l1.414 1.414" />
      <path d="M19.293 6.293l-1.414 1.414" />
      <path d="M12 14v7" />
      <rect x="3" y="10" width="18" height="7" rx="1" />
      <path d="M7 10v7" />
      <path d="M17 10v7" />
      <path d="M3 14h18" />
    </svg>
  );
  export const SpaceDriveIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" width="65" height="65" stroke="currentColor" className="lucide-icon text-red-900">
      <path d="M12 2v4" />
      <path d="m7 7 3 3-3 3" />
      <path d="M22 12h-4" />
      <path d="m17 17-3-3 3-3" />
      <path d="M12 22v-4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  
export  const DeepSkyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="lucide-icon text-pink-500" width={60} height={60}>
      <path d="M12 2v4" />
      <path d="m7 7 3 3-3 3" />
      <path d="M22 12h-4" />
      <path d="m17 17-3-3 3-3" />
      <path d="M12 22v-4" />
      <circle cx="12" cy="12" r="3" />
      <path d="m18 6-6 6-6-6" />
    </svg>
  );
 export const GalaxyCreditIcon = () => (
   <svg viewBox="0 0 24 24" fill="none" width="40" height="40" stroke="currentColor" className="lucide-icon text-yellow-400 ">
     <circle cx="12" cy="12" r="10" />
     <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
     <path d="M12 18V6" />
     <path d="m15 15 3 3 3-3" />
   </svg>
 );
 export const SaturnBankIcon = () => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" height={60} width={60} className="lucide-icon text-orange-700">
     <circle cx="12" cy="12" r="10" />
     <path d="M12 2v4" />
     <path d="M12 18v4" />
     <circle cx="12" cy="12" r="4" />
     <path d="m18 12 4-4-4-4" />
     <path d="m6 12-4-4 4-4" />
   </svg>
 );
  
  export const HologramCard = () => {
    return (
      
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-300"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="10" />
            <line x1="7" y1="12" x2="17" y2="12" />
          </svg>
        </div>

    );
  };
  
// Rest of your component remains the same...