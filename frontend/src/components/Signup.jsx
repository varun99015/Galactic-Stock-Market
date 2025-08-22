import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, KeyRound, Satellite, Scan } from "lucide-react";
import signbg from '../assets/signbg.jpg';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [securityLevel, setSecurityLevel] = useState("DELTA");
    const navigate = useNavigate();

    // Add sci-fi particle effect
    useEffect(() => {
        const particles = document.querySelector('.particles');
        if (!particles) return;

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: #00ffcc;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: floatParticle ${Math.random() * 8 + 4}s linear infinite;
                animation-delay: ${Math.random() * 1.5}s;
            `;
            particles.appendChild(particle);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await axios.post('http://localhost:5000/api/signup', { 
                name, 
                email, 
                password 
            });

            if (result.data.message === "Success") {
                console.log("Quantum entity registered successfully!");
                setName(""); 
                setEmail("");
                setPassword("");
                navigate('/login'); 
            } else {
                alert(`🔒 REGISTRATION FAILED: ${result.data.message}`);
            }
        } catch (err) {
            console.error("Quantum registration error:", err);
            alert("🌌 NETWORK ANOMALY: Quantum entanglement disrupted");
        } finally {
            setIsLoading(false);
        }
    };

    const myStyle = {
        backgroundImage: `url(${signbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
    };

    return (
        <div style={myStyle} className="min-h-screen flex items-center justify-center text-white relative overflow-hidden py-8">
            {/* Animated particles overlay */}
            <div className="particles absolute inset-0 pointer-events-none"></div>
            
            {/* Holographic grid overlay */}
            <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/holo-grid.png')] bg-[size:50px_50px] opacity-15 pointer-events-none"></div>
            
            {/* Glowing orb effects */}
            <div className="absolute top-1/4 left-1/4 w-28 h-28 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-1500"></div>

            <div className="relative z-10 w-full max-w-2xl mx-4 p-8 rounded-2xl shadow-2xl bg-gray-900/70 backdrop-blur-xl border border-green-500/30">
                {/* Header with sci-fi elements - More compact */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-3">
                        <div className="relative">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-400/50">
                                <Scan className="h-6 w-6 text-green-300" />
                            </div>
                            <div className="absolute -inset-1 border border-green-400/30 rounded-full animate-ping opacity-75"></div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent font-mono tracking-wider">
                        QUANTUM ENTITY REGISTRATION
                    </h2>
                    <p className="text-green-400 text-xs mt-1 font-mono">BIOSIGNATURE SCAN INITIATED</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Compact form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Field */}
                        <div className="relative group">
                            <label className="block text-green-300 mb-1 font-mono text-xs tracking-wider">
                                <User className="inline h-3 w-3 mr-1" />
                                DESIGNATION
                            </label>
                            <input 
                                type="text" 
                                placeholder="ENTER DESIGNATION" 
                                autoComplete="off"
                                value={name}
                                className="w-full p-3 text-sm bg-black/40 rounded-lg text-cyan-100 border border-green-700/50 
                                          focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500/30
                                          transition-all duration-300 font-mono placeholder-green-600"
                                onChange={(e) => setName(e.target.value)} 
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <label className="block text-green-300 mb-1 font-mono text-xs tracking-wider">
                                <Mail className="inline h-3 w-3 mr-1" />
                                QUANTUM NODE
                            </label>
                            <input 
                                type="email" 
                                placeholder="entity@quantum.nexus" 
                                autoComplete="off"
                                value={email}
                                className="w-full p-3 text-sm bg-black/40 rounded-lg text-cyan-100 border border-green-700/50 
                                          focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500/30
                                          transition-all duration-300 font-mono placeholder-green-600"
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <label className="block text-green-300 mb-1 font-mono text-xs tracking-wider">
                            <KeyRound className="inline h-3 w-3 mr-1" />
                            ENCRYPTION MATRIX
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                autoComplete="off"
                                value={password}
                                className="w-full p-3 text-sm bg-black/40 rounded-lg text-cyan-100 border border-green-700/50 
                                          focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500/30
                                          transition-all duration-300 font-mono pr-10"
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-200 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Security Level Selection */}
                    <div className="relative group">
                        <label className="block text-green-300 mb-1 font-mono text-xs tracking-wider">
                            <Satellite className="inline h-3 w-3 mr-1" />
                            SECURITY LEVEL
                        </label>
                        <select
                            value={securityLevel}
                            onChange={(e) => setSecurityLevel(e.target.value)}
                            className="w-full p-3 text-sm bg-black/40 rounded-lg text-cyan-100 border border-green-700/50 
                                      focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-500/30
                                      transition-all duration-300 font-mono"
                        >
                            <option value="DELTA" className="bg-gray-900 text-green-300 hover:bg-green-900">
        🛡️ DELTA CLEARANCE - BASIC ACCESS
    </option>
    <option value="GAMMA" className="bg-gray-900 text-cyan-300 hover:bg-cyan-900">
        ⚡ GAMMA CLEARANCE - ENHANCED PRIVILEGES
    </option>
    <option value="BETA" className="bg-gray-900 text-blue-300 hover:bg-blue-900">
        🔧 BETA CLEARANCE - SYSTEM OPERATOR
    </option>
    <option value="ALPHA" className="bg-gray-900 text-purple-300 hover:bg-purple-900">
        🌌 ALPHA CLEARANCE - QUANTUM ADMIN
    </option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-cyan-500 hover:from-green-500 hover:to-cyan-400 
                                  text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 
                                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                  border border-green-400/50 shadow-lg shadow-green-500/20 hover:shadow-green-400/30
                                  font-mono tracking-wider text-sm relative overflow-hidden group mt-4"
                    >
                        {isLoading ? (
                            <>
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                <span className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                                    ENCODING BIOSIGNATURE...
                                </span>
                            </>
                        ) : (
                            "INITIATE QUANTUM REGISTRATION"
                        )}
                    </button>
                </form>

                {/* Footer Links - More compact */}
                <div className="text-center mt-6 pt-4 border-t border-green-800/50">
                    <p className="text-green-400 text-xs font-mono mb-2">EXISTING QUANTUM ENTITY DETECTED</p>
                    <Link 
                        to='/login' 
                        className="inline-block px-4 py-1 text-green-300 hover:text-green-100 border border-green-700/50 
                                 rounded-lg hover:border-green-400/50 transition-all duration-300 hover:bg-green-900/20
                                 font-mono text-xs"
                    >
                        ACTIVATE QUANTUM LINK
                    </Link>
                </div>

                {/* Status indicators - Smaller */}
                <div className="flex justify-between items-center mt-4 text-[10px] text-green-500 font-mono">
                    <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                        DATABASE: ONLINE
                    </div>
                    <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-1 animate-pulse"></div>
                        ENCRYPTION: QUANTUM
                    </div>
                </div>

                {/* Terms acceptance - Smaller */}
                <div className="mt-3 text-center">
                    <p className="text-[10px] text-green-600 font-mono">
                        BY PROCEEDING, YOU ACCEPT THE INTERGALACTIC DATA ACCORD
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
