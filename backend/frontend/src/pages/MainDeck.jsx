import { useNavigate } from 'react-router-dom';
import { SatelliteIcon } from 'lucide-react'; // Optional: add a cool icon

const MainDeck = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/explore')} // Your sci-fi homepage route
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-950 to-gray-800 text-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 font-mono tracking-wide"
    >
      <SatelliteIcon size={20} />
      Main Deck
    </button>
  );
};

export default MainDeck;
