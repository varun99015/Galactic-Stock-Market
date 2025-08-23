import { useState, useEffect } from "react";
import sound from '../assets/space-beep.mp3'

function BuySellForm({ symbol }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio(sound) : null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const playSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleTransaction = async (type) => {
    if (!symbol) {
      setTransactionStatus({
        success: false,
        message: "TRANSMISSION FAILED",
        details: "No stock symbol selected."
      });
      return;
    }

    setIsLoading(true);
    setTransactionStatus(null);
    playSound();

    try {
      const res = await fetch(`/api/transactions/${type}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: symbol,
          quantity: quantity,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let errorData = {};
        try {
          errorData = JSON.parse(text);
        } catch (e) {
          throw new Error(text || 'Galactic Market rejected the order.');
        }
        throw new Error(errorData.message || 'Galactic Market rejected the order.');
      }

      const data = await res.json();
      
      setTransactionStatus({
        success: true,
        message: `${type.toUpperCase()} ORDER CONFIRMED`,
        details: data.message || `Traded ${quantity} shares of ${symbol}`
      });
      
      document.dispatchEvent(new CustomEvent('galactic-transaction', {
        detail: { type, symbol, quantity }
      }));

    } catch (err) {
      console.error("Quantum link failure:", err);
      setTransactionStatus({
        success: false,
        message: `TRANSMISSION FAILED`,
        details: err.message || `Unable to reach Galactic Market Network`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || !symbol;

  return (
    <div className="space-trading-interface p-4 md:p-6">
      {/* Quantum Input Group - Mobile Responsive */}
      <div className="quantum-input-group relative mb-6">
        <input
          type="number"
          value={quantity}
          min={1}
          max={10000}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          className="stellar-input w-full px-4 py-3 bg-gray-800 border border-cyan-500 rounded-lg text-cyan-300 font-mono text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="QUANTUM UNITS"
          disabled={isLoading}
        />
        <span className="input-unit absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-sm font-mono">
          QTY
        </span>
      </div>

      {/* Tactical Buttons - Stack on mobile, side-by-side on larger screens */}
      <div className="tactical-buttons grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
        <button
          onClick={() => handleTransaction("buy")}
          disabled={isButtonDisabled}
          className={`warp-button buy w-full px-4 py-3 rounded-lg font-mono text-sm md:text-base transition-all duration-200 ${
            isLoading ? 'warp-active bg-cyan-600 opacity-75' : 
            'bg-green-900/50 border border-green-500 text-green-300 hover:bg-green-800/50'
          } ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="pulse-animation text-xs md:text-sm">ENGAGING WARP DRIVE...</span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="icon text-lg">↑</span>
              <span className="text-xs md:text-sm">ACQUIRE STOCKS</span>
              <span className="subtext text-xs text-green-400 mt-1">(CREDITS DEDUCTED)</span>
            </div>
          )}
        </button>

        <button
          onClick={() => handleTransaction("sell")}
          disabled={isButtonDisabled}
          className={`warp-button sell w-full px-4 py-3 rounded-lg font-mono text-sm md:text-base transition-all duration-200 ${
            isLoading ? 'warp-active bg-cyan-600 opacity-75' : 
            'bg-red-900/50 border border-red-500 text-red-300 hover:bg-red-800/50'
          } ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="pulse-animation text-xs md:text-sm">INITIATING SELL PROTOCOL...</span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="icon text-lg">↓</span>
              <span className="text-xs md:text-sm">LIQUIDATE ASSETS</span>
              <span className="subtext text-xs text-red-400 mt-1">(CREDITS DEPOSITED)</span>
            </div>
          )}
        </button>
      </div>

      {/* Transmission Feedback - Responsive */}
      {transactionStatus && (
        <div className={`transmission-feedback p-4 rounded-lg border ${
          transactionStatus.success ? 
          'bg-green-900/20 border-green-500 text-green-300' : 
          'bg-red-900/20 border-red-500 text-red-300'
        }`}>
          <div className="holographic-display">
            <div className="transmission-header font-mono text-sm md:text-base font-bold mb-2">
              {transactionStatus.success ? '✓' : '✗'} {transactionStatus.message}
            </div>
            <div className="transmission-details text-xs md:text-sm mb-2">
              {transactionStatus.details}
            </div>
            <div className="stellar-coordinates text-xs text-cyan-400 font-mono">
              TX-ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuySellForm;