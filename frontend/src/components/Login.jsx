import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Satellite, Cpu, KeyRound, Mail } from "lucide-react";
import signbg from '../assets/signbg.jpg';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [accessCode, setAccessCode] = useState("");
    const navigate = useNavigate();

    // Add sci-fi particle effect
    useEffect(() => {
        const particles = document.querySelector('.particles');
        if (!particles) return;

        for (let i = 0; i < 30; i++) {
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
                animation: floatParticle ${Math.random() * 10 + 5}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particles.appendChild(particle);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            alert("⚠️ BIOSCAN INCOMPLETE: ENTER CREDENTIALS");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("Quantum authentication response:", data);

            if (data.status === "Success") {
                // ✅ Correctly navigate using the useNavigate hook
                navigate("/home/explore");
            } else {
                alert(`🔒 ACCESS DENIED: ${data.message || "Quantum signature mismatch"}`);
            }
        } catch (error) {
            console.error("Quantum link failure:", error.message);
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
        <>
            <div style={myStyle} className="min-h-screen flex items-center justify-center text-white relative overflow-hidden">
                {/* Animated particles overlay */}
                <div className="particles absolute inset-0 pointer-events-none"></div>
                
                {/* Holographic grid overlay */}
                <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/holo-grid.png')] bg-[size:50px_50px] opacity-10 pointer-events-none"></div>
                
                {/* Glowing orb effects */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

                <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-900/70 backdrop-blur-xl border border-cyan-500/30">
                    {/* Header with sci-fi elements */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center border-2 border-cyan-400/50">
                                    <Cpu className="h-8 w-8 text-cyan-300" />
                                </div>
                                <div className="absolute -inset-2 border border-cyan-400/30 rounded-full animate-ping opacity-75"></div>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent font-mono tracking-wider">
                            QUANTUM ACCESS PORTAL
                        </h2>
                        <p className="text-cyan-400 text-sm mt-2 font-mono">AUTHORIZED PERSONNEL ONLY</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="relative group">
                            <label className="block text-cyan-300 mb-2 font-mono text-sm tracking-wider">
                                <Mail className="inline h-4 w-4 mr-2" />
                                QUANTUM IDENTIFIER
                            </label>
                            <input 
                                type="email" 
                                placeholder="user@quantum.nexus" 
                                autoComplete="on"
                                className="w-full p-4 bg-black/40 rounded-lg text-cyan-100 border border-cyan-700/50 
                                          focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30
                                          transition-all duration-300 font-mono placeholder-cyan-600"
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                            />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <label className="block text-cyan-300 mb-2 font-mono text-sm tracking-wider">
                                <KeyRound className="inline h-4 w-4 mr-2" />
                                ENCRYPTION KEY
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    autoComplete="off"
                                    className="w-full p-4 bg-black/40 rounded-lg text-cyan-100 border border-cyan-700/50 
                                              focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30
                                              transition-all duration-300 font-mono pr-12"
                                    onChange={(e) => setPassword(e.target.value)} 
                                    value={password}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-200 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>

                        {/* Access Code (Optional) */}
                        <div className="relative group">
                            <label className="block text-cyan-300 mb-2 font-mono text-sm tracking-wider">
                                <Satellite className="inline h-4 w-4 mr-2" />
                                SECURITY CLEARANCE (OPTIONAL)
                            </label>
                            <input 
                                type="text" 
                                placeholder="ALPHA-BETA-GAMMA" 
                                className="w-full p-4 bg-black/40 rounded-lg text-cyan-100 border border-cyan-700/50 
                                          focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30
                                          transition-all duration-300 font-mono placeholder-cyan-600"
                                onChange={(e) => setAccessCode(e.target.value)} 
                                value={accessCode}
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-green-500 hover:from-cyan-500 hover:to-green-400 
                                      text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 
                                      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                      border border-cyan-400/50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30
                                      font-mono tracking-wider text-lg relative overflow-hidden group"
                        >
                            {isLoading ? (
                                <>
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    <span className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                                        INITIATING QUANTUM HANDHAKE...
                                    </span>
                                </>
                            ) : (
                                "ACTIVATE QUANTUM LINK"
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="text-center mt-8 pt-6 border-t border-cyan-800/50">
                        <p className="text-cyan-400 text-sm font-mono mb-3">NEW QUANTUM ENTITY DETECTED</p>
                        <Link 
                            to='/register' 
                            className="inline-block px-6 py-2 text-cyan-300 hover:text-cyan-100 border border-cyan-700/50 
                                     rounded-lg hover:border-cyan-400/50 transition-all duration-300 hover:bg-cyan-900/20
                                     font-mono text-sm"
                        >
                            REQUEST CLEARANCE PROTOCOL
                        </Link>
                    </div>

                    {/* Status indicators */}
                    <div className="flex justify-between items-center mt-6 text-xs text-cyan-500 font-mono">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            QUANTUM NETWORK: STABLE
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                            ENCRYPTION: ACTIVE
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
