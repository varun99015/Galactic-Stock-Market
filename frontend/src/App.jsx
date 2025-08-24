import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load components for better performance
const LandNavbar = lazy(() => import("./components/Navbar"));
const Explore = lazy(() => import("./pages/Explore"));
const SpaceX = lazy(() => import("./pages/SpaceX"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./components/Profile"));
const Navbar = lazy(() => import("./components/Navbar"));
const MainHome = lazy(() => import("./pages/MainHome"));
const Features = lazy(() => import("./components/Features"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const FXSTOCK1 = lazy(() => import("./FictionalStockDataPages/FXSTOCK1"));
const DynamicStock = lazy(() => import("./FictionalStockDataPages/DynamicStock"));
const Footer = lazy(() => import("./components/Footer"));
const NavScan = lazy(() => import("./components/NavScan"));
const Settings = lazy(() => import("./components/Settings"));
const MarketOverview = lazy(() => import("./components/MarketOverview"));
const Developer = lazy(() => import("./pages/Developer"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-black text-cyan-300 flex items-center justify-center font-mono">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-lg mb-2">LOADING QUANTUM INTERFACE...</div>
      <div className="text-sm text-cyan-500 space-y-1">
        <div>INITIALIZING SPACE-TIME ROUTER</div>
        <div>CALIBRATING NAVIGATION SYSTEMS</div>
        <div>ESTABLISHING HYPERSPACE CONNECTION</div>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/spacex" element={<SpaceX />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feature" element={<Features />} />
          <Route path="/developer" element={<Developer />} />
          
          {/* Protected/App Routes */}
          <Route path="/home/*" element={<MainHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/marketoverview" element={<MarketOverview />} />
          
          {/* Stock Routes */}
          <Route path="/fstock" element={<FXSTOCK1 />} />
          <Route path="/f_stock/:type/:symbol" element={<DynamicStock />} />
          
          {/* Component Testing Routes */}
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/landnavbar" element={<LandNavbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/scan" element={<NavScan />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
