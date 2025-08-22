import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'nebula',
    notifications: true,
    securityLevel: 'gamma',
    hologramUI: true,
    biometricAuth: false,
    dataStream: 'encrypted',
    aiAssistant: 'active'
  });
  const [activeTab, setActiveTab] = useState('user');
  const [saving, setSaving] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const navigate = useNavigate();

  // Simulate biometric verification
  const verifyIdentity = () => {
    setSaving(true);
    setTimeout(() => {
      setAccessGranted(true);
      setSaving(false);
    }, 2000);
  };

  // Handle voice command
  const processVoiceCommand = () => {
    const command = voiceCommand.toLowerCase();
    if (command.includes('theme')) {
      setSettings({...settings, theme: command.includes('dark') ? 'nebula' : 'quantum'});
    } else if (command.includes('notification')) {
      setSettings({...settings, notifications: !command.includes('off')});
    }
    setVoiceCommand('');
  };

  // Save settings
  const saveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      // In a real app, you would send to backend here
      console.log('Settings saved:', settings);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-100 p-6 relative overflow-hidden">
      {/* Sci-fi background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/holo-grid.png')] bg-[size:50px_50px]"></div>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-cyan-500 rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 5}s linear infinite`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-black/70 backdrop-blur-lg border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-mono tracking-wider">
              SYSTEM CONFIGURATION
            </h1>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-xs font-mono flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                ACCESS: {accessGranted ? 'GRANTED' : 'PENDING'}
              </span>
              <button 
                onClick={verifyIdentity}
                disabled={accessGranted}
                className={`px-3 py-1 rounded-full text-xs font-mono border ${
                  accessGranted 
                    ? 'border-green-500 text-green-300' 
                    : 'border-yellow-500 text-yellow-300 hover:bg-yellow-900/20'
                } transition-colors`}
              >
                {accessGranted ? 'VERIFIED' : 'VERIFY IDENTITY'}
              </button>
            </div>
          </div>
          <p className="mt-2 text-cyan-300/80 font-mono text-sm">
            {accessGranted 
              ? 'Full system configuration access authorized' 
              : 'Biometric verification required for level 3 settings'}
          </p>
        </div>

        {/* Main content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-56 border-r border-cyan-500/20 bg-black/40">
            <div className="p-4 space-y-1">
              {['user', 'interface', 'security', 'network', 'ai', 'system'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-3 py-2 rounded-md font-mono text-sm transition-all ${
                    activeTab === tab
                      ? 'bg-cyan-800/50 text-cyan-300 border-l-2 border-cyan-400'
                      : 'text-cyan-200/70 hover:bg-cyan-900/30 hover:text-cyan-300'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            
            {/* Voice command input */}
            <div className="p-4 border-t border-cyan-500/20 mt-4">
              <div className="font-mono text-xs text-cyan-300 mb-2">VOICE COMMAND INPUT</div>
              <div className="flex">
                <input
                  type="text"
                  value={voiceCommand}
                  onChange={(e) => setVoiceCommand(e.target.value)}
                  placeholder="Speak command..."
                  className="flex-1 bg-black/50 border border-cyan-500/30 text-cyan-100 text-xs p-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  onClick={processVoiceCommand}
                  className="bg-cyan-600/50 hover:bg-cyan-500/70 px-3 rounded-r-md text-xs font-mono border-t border-b border-r border-cyan-500/30"
                >
                  EXEC
                </button>
              </div>
            </div>
          </div>

          {/* Settings panel */}
          <div className="flex-1 p-6">
            {!accessGranted && activeTab !== 'user' ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-20 h-20 border-4 border-yellow-500 rounded-full animate-pulse mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-yellow-500/50 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xl text-yellow-300 font-mono mb-2">SECURITY LOCK ENGAGED</h3>
                <p className="text-yellow-200/80 max-w-md">
                  Biometric verification required to access {activeTab} settings. Please verify your identity to proceed.
                </p>
              </div>
            ) : (
              <>
                {/* User Settings */}
                {activeTab === 'user' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SettingCard 
                        title="USER PROFILE" 
                        description="Configure personal identification parameters"
                      >
                        <div className="space-y-4">
                          <div>
                            <label className="block text-cyan-300 text-xs font-mono mb-1">AVATAR MODE</label>
                            <select
                              value={settings.theme}
                              onChange={(e) => setSettings({...settings, theme: e.target.value})}
                              className="w-full bg-black/50 border border-cyan-500/30 text-cyan-100 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                              <option value="nebula">Nebula Hologram</option>
                              <option value="quantum">Quantum Particle</option>
                              <option value="cyber">Cyber Interface</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-cyan-300 text-xs font-mono mb-1">IDENTIFICATION TAG</label>
                            <input
                              type="text"
                              placeholder="Enter your callsign"
                              className="w-full bg-black/50 border border-cyan-500/30 text-cyan-100 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                          </div>
                        </div>
                      </SettingCard>

                      <SettingCard 
                        title="PREFERENCES" 
                        description="Adjust personal interaction parameters"
                      >
                        <div className="space-y-4">
                          <ToggleSetting
                            label="HOLOGRAPHIC UI"
                            checked={settings.hologramUI}
                            onChange={() => setSettings({...settings, hologramUI: !settings.hologramUI})}
                          />
                          <ToggleSetting
                            label="AUDIO FEEDBACK"
                            checked={settings.notifications}
                            onChange={() => setSettings({...settings, notifications: !settings.notifications})}
                          />
                        </div>
                      </SettingCard>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SettingCard 
                        title="BIOMETRICS" 
                        description="Configure biological identification systems"
                      >
                        <div className="space-y-4">
                          <ToggleSetting
                            label="RETINA SCAN LOGIN"
                            checked={settings.biometricAuth}
                            onChange={() => setSettings({...settings, biometricAuth: !settings.biometricAuth})}
                            disabled={!accessGranted}
                          />
                          <div>
                            <label className="block text-cyan-300 text-xs font-mono mb-1">SECURITY LEVEL</label>
                            <div className="flex space-x-2">
                              {['alpha', 'beta', 'gamma', 'delta'].map((level) => (
                                <button
                                  key={level}
                                  onClick={() => setSettings({...settings, securityLevel: level})}
                                  className={`px-3 py-1 text-xs rounded-md font-mono ${
                                    settings.securityLevel === level
                                      ? 'bg-cyan-700/50 text-cyan-300 border border-cyan-500'
                                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                                  }`}
                                >
                                  {level.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </SettingCard>

                      <SettingCard 
                        title="DATA CONFIGURATION" 
                        description="Manage information flow parameters"
                      >
                        <div className="space-y-4">
                          <div>
                            <label className="block text-cyan-300 text-xs font-mono mb-1">DATA STREAM</label>
                            <select
                              value={settings.dataStream}
                              onChange={(e) => setSettings({...settings, dataStream: e.target.value})}
                              className="w-full bg-black/50 border border-cyan-500/30 text-cyan-100 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            >
                              <option value="encrypted">Quantum Encrypted</option>
                              <option value="compressed">Neural Compressed</option>
                              <option value="raw">Raw Binary</option>
                            </select>
                          </div>
                        </div>
                      </SettingCard>
                    </div>
                  </div>
                )}

                {/* Interface Settings */}
                {activeTab === 'interface' && (
                  <div className="space-y-6">
                    <SettingCard 
                      title="VISUAL PROTOCOLS" 
                      description="Configure display rendering parameters"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-cyan-300 text-xs font-mono mb-1">THEME MATRIX</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['nebula', 'cyber', 'quantum', 'dark-matter', 'void', 'neon'].map((theme) => (
                              <div 
                                key={theme}
                                onClick={() => setSettings({...settings, theme})}
                                className={`h-12 rounded-md cursor-pointer border-2 ${
                                  settings.theme === theme
                                    ? 'border-cyan-400 shadow-lg shadow-cyan-500/20'
                                    : 'border-gray-700 hover:border-gray-600'
                                } bg-gradient-to-br ${
                                  theme === 'nebula' ? 'from-blue-900/70 to-purple-900/70' :
                                  theme === 'cyber' ? 'from-green-900/70 to-black' :
                                  theme === 'quantum' ? 'from-cyan-900/70 to-blue-900/70' :
                                  theme === 'dark-matter' ? 'from-gray-900 to-black' :
                                  theme === 'void' ? 'bg-black' :
                                  'from-pink-900/70 to-blue-900/70'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-cyan-300 text-xs font-mono mb-1">ANIMATION LEVEL</label>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">MIN</span>
                            <input
                              type="range"
                              min="0"
                              max="2"
                              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                            <span className="text-xs text-gray-400">MAX</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Static</span>
                            <span>Subtle</span>
                            <span>Immersive</span>
                          </div>
                        </div>
                      </div>
                    </SettingCard>

                    <SettingCard 
                      title="HUD CONFIGURATION" 
                      description="Adjust heads-up display parameters"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ToggleSetting
                          label="STATUS INDICATORS"
                          checked={true}
                          onChange={() => {}}
                        />
                        <ToggleSetting
                          label="NAVIGATION MARKERS"
                          checked={true}
                          onChange={() => {}}
                        />
                        <ToggleSetting
                          label="DATA OVERLAY"
                          checked={false}
                          onChange={() => {}}
                        />
                      </div>
                    </SettingCard>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <SettingCard 
                      title="ACCESS CONTROL" 
                      description="Configure security protocols and permissions"
                    >
                      <div className="space-y-4">
                        <ToggleSetting
                          label="QUANTUM ENCRYPTION"
                          checked={true}
                          onChange={() => {}}
                        />
                        <ToggleSetting
                          label="NEURAL FIREWALL"
                          checked={true}
                          onChange={() => {}}
                        />
                        <div>
                          <label className="block text-cyan-300 text-xs font-mono mb-1">THREAT RESPONSE</label>
                          <select
                            className="w-full bg-black/50 border border-cyan-500/30 text-cyan-100 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          >
                            <option>Passive Monitoring</option>
                            <option>Active Defense</option>
                            <option>Countermeasures Engaged</option>
                          </select>
                        </div>
                      </div>
                    </SettingCard>

                    <SettingCard 
                      title="AUTHENTICATION" 
                      description="Configure identity verification systems"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ToggleSetting
                          label="VOICE PATTERN SCAN"
                          checked={true}
                          onChange={() => {}}
                        />
                        <ToggleSetting
                          label="RETINA VERIFICATION"
                          checked={settings.biometricAuth}
                          onChange={() => setSettings({...settings, biometricAuth: !settings.biometricAuth})}
                        />
                        <ToggleSetting
                          label="NEURAL IMPRINT"
                          checked={false}
                          onChange={() => {}}
                        />
                        <ToggleSetting
                          label="DNA SEQUENCING"
                          checked={false}
                          onChange={() => {}}
                        />
                      </div>
                    </SettingCard>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800/50 transition-colors font-mono"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={saveSettings}
                    disabled={saving}
                    className="px-4 py-2 bg-cyan-600/70 hover:bg-cyan-500/80 rounded-md text-white font-mono flex items-center disabled:opacity-50 transition-all"
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        SAVING...
                      </>
                    ) : (
                      'SAVE CONFIGURATION'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable components
const SettingCard = ({ title, description, children }) => (
  <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-5">
    <h3 className="text-lg font-bold text-cyan-300 font-mono mb-1">{title}</h3>
    <p className="text-sm text-cyan-300/70 mb-4">{description}</p>
    {children}
  </div>
);

const ToggleSetting = ({ label, checked, onChange, disabled = false }) => (
  <div className="flex items-center justify-between">
    <span className="text-cyan-200 text-sm">{label}</span>
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? 'bg-cyan-600' : 'bg-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default Settings;
