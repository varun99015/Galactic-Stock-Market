import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandNavbar from "./components/Navbar";
import Explore from "./pages/Explore";
import SpaceX from "./pages/SpaceX";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import MainHome from "./pages/MainHome";
import Features from "./components/Features";
import Dashboard from "./pages/Dashboard";
import FXSTOCK1 from "./FictionalStockDataPages/FXSTOCK1";
import DynamicStock from "./FictionalStockDataPages/DynamicStock";
import Footer from "./components/Footer";
import NavScan from "./components/NavScan";
import Settings from "./components/Settings";
import MarketOverview from "./components/MarketOverview";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/*" element={<MainHome />} />
        <Route path="/navbar" element = {<Navbar />}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="fstock" element={<FXSTOCK1/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spacex" element={<SpaceX />} />
        <Route path="/register" element={<Signup />} />
        <Route path='/feature' element= {<Features/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landnavbar" element={<LandNavbar />} />
        <Route path="/f_stock/:type/:symbol" element={<DynamicStock />} />
        <Route path="footer" element={<Footer/>}/>
        <Route path="scan" element={<NavScan/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="marketoverview" element={<MarketOverview/>}/>
      </Routes>
    </Router>
  );
};

export default App;
