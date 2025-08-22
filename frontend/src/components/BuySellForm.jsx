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
      const res = await fetch(`http://localhost:5000/api/transactions/${type}`, {
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

  // FIX: Disable buttons if the symbol is missing or if a transaction is in progress.
  const isButtonDisabled = isLoading || !symbol;

  return (
    <div className="space-trading-interface">
      <div className="quantum-input-group">
        <input
          type="number"
          value={quantity}
          min={1}
          max={10000}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          className="stellar-input"
          placeholder="QUANTUM UNITS"
        />
        <span className="input-unit">QTY</span>
      </div>

      <div className="tactical-buttons">
        <button
          onClick={() => handleTransaction("buy")}
          disabled={isButtonDisabled}
          className={`warp-button buy ${isLoading ? 'warp-active' : ''}`}
        >
          {isLoading ? (
            <span className="pulse-animation">ENGAGING WARP DRIVE...</span>
          ) : (
            <>
              <span className="icon">↑</span>
              <span>ACQUIRE STOCKS</span>
              <span className="subtext">(CREDITS WILL BE DEDUCTED)</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleTransaction("sell")}
          disabled={isButtonDisabled}
          className={`warp-button sell ${isLoading ? 'warp-active' : ''}`}
        >
          {isLoading ? (
            <span className="pulse-animation">INITIATING SELL PROTOCOL...</span>
          ) : (
            <>
              <span className="icon">↓</span>
              <span>LIQUIDATE ASSETS</span>
              <span className="subtext">(CREDITS WILL BE DEPOSITED)</span>
            </>
          )}
        </button>
      </div>

      {transactionStatus && (
        <div className={`transmission-feedback ${transactionStatus.success ? 'success' : 'error'}`}>
          <div className="holographic-display">
            <div className="transmission-header">
              {transactionStatus.success ? '✓' : '✗'} {transactionStatus.message}
            </div>
            <div className="transmission-details">
              {transactionStatus.details}
            </div>
            <div className="stellar-coordinates">
              TX-ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default BuySellForm;
