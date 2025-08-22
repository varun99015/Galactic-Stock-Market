import { Routes, Route } from "react-router-dom";
import Explore from "./Explore";
import SpaceX from "./SpaceX";
import Profile from "../components/Profile";
import Dashboard from "./Dashboard";
import Footer from "../components/Footer";
import MarketOverview from "../components/MarketOverview";

const MainHome = () => {
  return (
    <div>
      <Routes>
        <Route path="explore" element={<Explore />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="spacex" element={<SpaceX />} />
        <Route path="profile" element={<Profile />} />
        <Route path="footer" element={<Footer/>} />
        <Route path="marketoverview" element={<MarketOverview/>} />
      </Routes>
    </div>
  );
};

export default MainHome;
