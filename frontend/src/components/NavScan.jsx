import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavScan = () => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const initiateScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanProgress(0);
    setScanResult(null);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeScan();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const completeScan = () => {
    // Simulate scan results (replace with actual API calls)
    const results = [
      { id: 1, type: 'system', status: 'nominal', message: 'All systems operational' },
      { id: 2, type: 'security', status: 'alert', message: 'Unauthorized access attempt detected' },
      { id: 3, type: 'network', status: 'warning', message: 'Latency above threshold' }
    ];
    
    setScanResult(results);
    setTimeout(() => setScanning(false), 5000);
  };

  const handleResultClick = (result) => {
    // Navigate based on scan result
    navigate('/settings');
  };

  return (
    <div className="relative group">
      <button 
        onClick={initiateScan}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 transition-all"
        disabled={scanning}
      >
        <div className={`w-4 h-4 rounded-full ${scanning ? 'bg-cyan-400 animate-pulse' : 'bg-cyan-500'}`} />
        <span className="font-mono text-sm">{scanning ? 'SCANNING...' : 'SYSTEM SCAN'}</span>
      </button>

      {/* Scan progress indicator */}
      {scanning && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black/80 border border-cyan-500/50 rounded-lg p-3 z-50">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-cyan-300">PROGRESS:</span>
            <span className="font-mono">{scanProgress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-600 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-cyan-300 font-mono">
            {scanProgress < 30 && 'INITIALIZING QUANTUM SCANNER...'}
            {scanProgress >= 30 && scanProgress < 70 && 'ANALYZING SYSTEM MATRICES...'}
            {scanProgress >= 70 && scanProgress < 100 && 'COMPILING THREAT ASSESSMENT...'}
            {scanProgress === 100 && 'SCAN COMPLETE'}
          </div>
        </div>
      )}

      {/* Scan results dropdown */}
      {scanResult && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-black/90 border border-cyan-500/30 rounded-lg shadow-lg z-50 backdrop-blur-md">
          <div className="p-2 border-b border-cyan-900/50 text-xs text-cyan-300 font-mono flex justify-between items-center">
            <span>SCAN RESULTS</span>
            <button 
              onClick={() => setScanResult(null)} 
              className="text-cyan-500 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="divide-y divide-cyan-900/50">
            {scanResult.map(result => (
              <div 
                key={result.id}
                onClick={() => handleResultClick(result)}
                className={`p-2 cursor-pointer hover:bg-cyan-900/20 transition-colors ${
                  result.status === 'alert' ? 'text-red-400' : 
                  result.status === 'warning' ? 'text-yellow-400' : 
                  'text-green-400'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-2 h-2 mt-1 mr-2 rounded-full flex-shrink-0 ${
                    result.status === 'alert' ? 'bg-red-400 animate-pulse' : 
                    result.status === 'warning' ? 'bg-yellow-400' : 
                    'bg-green-400'
                  }`} />
                  <div>
                    <div className="text-xs font-mono">{result.type.toUpperCase()} SYSTEM</div>
                    <div className="text-xs opacity-80">{result.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Ping animation when not scanning */}
      {!scanning && (
        <div className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none">
          <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-lg animate-[ping_5s_ease-in-out_infinite]" />
        </div>
      )}
    </div>
  );
};

export default NavScan;
