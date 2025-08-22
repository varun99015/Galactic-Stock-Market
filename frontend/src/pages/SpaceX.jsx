import { useEffect, useState } from "react";
import { getSpaceXData } from "../api/spaceXApi";
import Navbar from "../components/Navbar";

const SpaceX = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    getSpaceXData()
      .then((data) => {
        setLaunches(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to establish connection with orbital database");
        setLoading(false);
      });
  }, []);

  const filteredLaunches = launches.filter(launch => {
    if (activeTab === "successful") return launch.success;
    if (activeTab === "upcoming") return launch.upcoming;
    return true;
  });

  return (
    <>
      <Navbar />
      <div className="fixed inset-0 bg-black/50 z-[-2]" />
      <div className="fixed inset-0 z-[-1] opacity-30">
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/sparkles.gif')] bg-cover mix-blend-screen" />
      </div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-900/70 to-black z-[-1]" />
      
      <div className="p-6 text-white min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono tracking-wider">
            SPACEX MISSION CONTROL
          </h2>
          <p className="text-center mb-8 text-blue-300 font-mono text-sm animate-pulse">
            ACCESSING ORBITAL LAUNCH DATABASE...
          </p>

          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-cyan-400 font-mono">DECRYPTING TRANSMISSION...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 p-4 rounded-lg text-center font-mono">
              <p className="text-red-300">⚠️ ALERT: {error}</p>
              <p className="text-xs mt-2 text-red-200">PLEASE TRY AGAIN LATER</p>
            </div>
          )}

          <div className="flex justify-center mb-8 space-x-2 font-mono">
            <button 
              onClick={() => setActiveTab("all")} 
              className={`px-4 py-2 rounded-t-lg border-b-2 ${activeTab === "all" ? "border-cyan-400 text-cyan-400" : "border-gray-700 text-gray-400"}`}
            >
              ALL MISSIONS
            </button>
            <button 
              onClick={() => setActiveTab("successful")} 
              className={`px-4 py-2 rounded-t-lg border-b-2 ${activeTab === "successful" ? "border-green-400 text-green-400" : "border-gray-700 text-gray-400"}`}
            >
              SUCCESSFUL
            </button>
            <button 
              onClick={() => setActiveTab("upcoming")} 
              className={`px-4 py-2 rounded-t-lg border-b-2 ${activeTab === "upcoming" ? "border-yellow-400 text-yellow-400" : "border-gray-700 text-gray-400"}`}
            >
              UPCOMING
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLaunches.map((launch) => (
              <div
                key={launch.id}
                className="bg-gradient-to-br from-blue-900/30 to-black/50 backdrop-blur-lg border border-cyan-500/30 rounded-lg p-5 shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/holo-grid.png')] bg-cover opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-cyan-300 font-mono tracking-wide">
                      {launch.mission_name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${launch.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"}`}>
                      {launch.success ? "SUCCESS" : "FAILED"}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <span className="w-24 text-blue-300 font-mono">ROCKET:</span>
                      <span className="text-white">{launch.rocket_name}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="w-24 text-blue-300 font-mono">LAUNCH:</span>
                      <span className="text-white">{launch.launch_year}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="w-24 text-blue-300 font-mono">PAD:</span>
                      <span className="text-white">{launch.launchpad_name}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="w-24 text-blue-300 font-mono">CREW:</span>
                      <span className="text-white">{launch.crew_members.join(", ") || "N/A"}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="w-24 text-blue-300 font-mono">PAYLOADS:</span>
                      <span className="text-white flex-1">{launch.payload_names.join(", ")}</span>
                    </p>
                  </div>
                  
                  {launch.details && (
                    <div className="mt-3 p-3 bg-black/30 rounded border border-blue-900/50">
                      <p className="text-xs text-gray-300 italic">{launch.details}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    {launch.links?.patch?.small && (
                      <img 
                        src={launch.links.patch.small} 
                        alt="Mission patch" 
                        className="w-12 h-12 object-contain bg-black/30 p-1 rounded-full border border-cyan-500/30" 
                      />
                    )}
                    {launch.links?.webcast && (
                      <a 
                        href={launch.links.webcast} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-cyan-300 hover:text-white text-xs font-mono flex items-center hover:underline"
                      >
                        <span className="mr-1">▶️</span> WATCH WEBCAST
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!loading && filteredLaunches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 font-mono">NO MISSION DATA FOUND</p>
              <p className="text-xs text-gray-500 mt-2">ADJUST FILTERS OR CHECK CONNECTION</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpaceX;
