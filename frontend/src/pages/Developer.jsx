import photo from "../assets/profile-pictures/Developer-photo.jpg";

const Developer = ()=>{
return(
  <div className="space-y-4 md:space-y-6">
    {/* Developer Profile Card */}
    <SettingCard 
      title="DEVELOPER PROTOCOLS" 
      description="Quantum Engineering Core - System Architect"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Developer Avatar & Status */}
        <div className="md:col-span-1 flex flex-col items-center space-y-3 p-4 border border-cyan-500/30 rounded-lg bg-black/40">
<div className="relative">
  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 overflow-hidden">
   
    <img 
      src={photo} 
      alt="Varun S"
      className="w-full h-full object-cover"
      onError={(e) => {
        // Fallback to initials if image fails to load
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
      }}
    />
    {/* Fallback initials */}
    <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600">
      <span className="text-xl md:text-2xl font-bold text-white">VS</span>
    </div>
  </div>
  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
</div>
          
          <div className="text-center">
            <h3 className="text-cyan-300 font-mono text-sm md:text-base font-bold">VARUN S</h3>
            <p className="text-cyan-400/80 text-xs">QUANTUM DEVELOPER</p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-cyan-300/70">SECURITY CLEARANCE:</span>
              <span className="text-green-400 font-mono">LEVEL-9</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-cyan-300/70">SYSTEM ACCESS:</span>
              <span className="text-green-400 font-mono">FULL</span>
            </div>
          </div>
        </div>

        {/* Developer Information */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <InfoField label="QUANTUM ID" value="DEV-7X9A-42B" />
            <InfoField label="SECURITY LEVEL" value="OMEGA-CLEARANCE" />
            <InfoField label="SPECIALIZATION" value="FULL-STACK ENGINEERING" />
            <InfoField label="CURRENT PROJECT" value="GALACTIC TRADING PLATFORM" />
          </div>

          <div className="p-3 bg-cyan-900/20 border border-cyan-500/30 rounded-md">
            <label className="block text-cyan-300 text-xs font-mono mb-2">BIO-NEURAL IMPRINT:</label>
            <p className="text-cyan-200 text-xs md:text-sm">
              "Space full-stack engineer specializing in React, Node.js, and interstellar web applications. 
              Architect of cosmic trading systems and AI-enhanced financial platforms."
            </p>
          </div>
        </div>
      </div>
    </SettingCard>

    <SettingCard 
      title="TECHNICAL MATRIX" 
      description="Core competencies and quantum programming languages"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <TechPill label="React" level={95} color="cyan" />
        <TechPill label="Node.js" level={90} color="blue" />
        <TechPill label="Python" level={85} color="green" />
        <TechPill label="MongoDB" level={88} color="yellow" />
        <TechPill label="RENDER" level={82} color="purple" />
        <TechPill label="AI/ML" level={78} color="pink" />
      </div>
    </SettingCard>

    {/* Contact Protocols */}
    <SettingCard 
      title="QUANTUM COMMUNICATION" 
      description="Interstellar contact channels"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactChannel 
          type="email"
          value="varu99015@gmail.com"
          label="QUANTUM MAIL"
          icon="📧"
        />
        <ContactChannel 
          type="github"
          value="github.com/varu99015"
          label="CODE REPOSITORY"
          icon="💻"
        />
        <ContactChannel 
          type="linkedin"
          value="linkedin.com/in/varun-s-a40724295"
          label="PROFESSIONAL NETWORK"
          icon="🔗"
        />
      </div>
    </SettingCard>

    {/* System Metrics */}
    <SettingCard 
      title="PERFORMANCE METRICS" 
      description="Developer efficiency statistics"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard 
          title="CODE EFFICIENCY"
          value={94}
          unit="%"
          description="Optimization level"
          color="green"
        />
        <MetricCard 
          title="BUG RESISTANCE"
          value={89}
          unit="%"
          description="Error prevention"
          color="cyan"
        />
        <MetricCard 
          title="INNOVATION INDEX"
          value={91}
          unit="%"
          description="Creative solutions"
          color="blue"
        />
        <MetricCard 
          title="PROJECT COMPLETION"
          value={96}
          unit="%"
          description="Timely delivery"
          color="purple"
        />
      </div>
    </SettingCard>

    {/* Developer Tools */}
    <SettingCard 
      title="DEVELOPMENT TOOLS" 
      description="Quantum engineering equipment"
    >
      <div className="flex flex-wrap gap-2">
        {['VS Code', 'Git', 'React DevTools', 'MongoDB Atlas', 'D3','ReChart','Node'].map((tool) => (
          <span
            key={tool}
            className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-mono hover:bg-cyan-800/50 transition-colors cursor-pointer"
          >
            {tool}
          </span>
        ))}
      </div>
    </SettingCard>
  </div>
);
};
// Reusable components
const SettingCard = ({ title, description, children }) => (
  <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-4 md:p-5">
    <h3 className="text-base md:text-lg font-bold text-cyan-300 font-mono mb-1">{title}</h3>
    <p className="text-xs md:text-sm text-cyan-300/70 mb-3 md:mb-4">{description}</p>
    {children}
  </div>
);
// Reusable component for info fields
const InfoField = ({ label, value }) => (
  <div className="p-2 bg-black/30 border border-cyan-500/20 rounded-md">
    <div className="text-cyan-400 text-xs font-mono mb-1">{label}</div>
    <div className="text-cyan-200 text-sm font-mono">{value}</div>
  </div>
);

// Reusable component for tech pills with progress
const TechPill = ({ label, level, color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 border-cyan-500 text-cyan-300',
    blue: 'bg-blue-500/20 border-blue-500 text-blue-300',
    green: 'bg-green-500/20 border-green-500 text-green-300',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-300',
    purple: 'bg-purple-500/20 border-purple-500 text-purple-300',
    orange: 'bg-orange-500/20 border-orange-500 text-orange-300',
    pink: 'bg-pink-500/20 border-pink-500 text-pink-300'
  };

  return (
    <div className="text-center">
      <div className={`p-2 border rounded-lg mb-2 ${colorClasses[color]}`}>
        <div className="text-xs font-mono">{label}</div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${colorClasses[color].split(' ')[0]}`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <div className="text-xs text-cyan-400 mt-1 font-mono">{level}%</div>
    </div>
  );
};

// Reusable component for contact channels
const ContactChannel = ({ type, value, label, icon }) => (
  <div className="p-3 bg-black/30 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/20 transition-colors cursor-pointer group">
    <div className="flex items-center space-x-2 mb-2">
      <span className="text-lg">{icon}</span>
      <span className="text-cyan-300 text-xs font-mono">{label}</span>
    </div>
    <div className="text-cyan-200 text-sm font-mono truncate group-hover:text-cyan-300 transition-colors">
      {value}
    </div>
  </div>
);

// Reusable component for metrics
const MetricCard = ({ title, value, unit, description, color = 'cyan' }) => {
  const colorClasses = {
    green: 'text-green-400',
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400'
  };

  return (
    <div className="p-3 bg-black/30 border border-cyan-500/20 rounded-lg text-center">
      <div className="text-cyan-300 text-xs font-mono mb-2">{title}</div>
      <div className={`text-2xl font-bold font-mono ${colorClasses[color]} mb-1`}>
        {value}{unit}
      </div>
      <div className="text-cyan-400/70 text-xs">{description}</div>
    </div>
  );
};
export default Developer;