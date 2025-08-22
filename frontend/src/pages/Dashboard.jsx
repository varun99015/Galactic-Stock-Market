import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, LineChart, History, Landmark } from 'lucide-react';
import MainDeck from './MainDeck';
import MarketOverview from "../components/MarketOverview";

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('http://localhost:5000/api/portfolio', {
          withCredentials: true, // This is the axios equivalent of credentials: 'include'
        });
        setPortfolioData(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch portfolio data.');
        console.error("Portfolio fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (isLoading) {
    return <div className="text-center text-cyan-400 p-10">Loading Quantum Ledger...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">Error: {error}</div>;
  }

  if (!portfolioData) {
    return <div className="text-center text-cyan-400 p-10">No portfolio data found.</div>;
  }

  const { balance, portfolio, transactions } = portfolioData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-cyan-300 font-mono p-8">
      <MainDeck/>
      <h1 className="text-4xl font-bold tracking-widest text-center mb-10">Stellar Portfolio</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Balance & Holdings */}
        <div className="lg:col-span-1 space-y-8">
          {/* Wallet Balance */}
          <div className="border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-cyan-200 flex items-center mb-4">
              <Wallet className="mr-3" /> Wallet Balance
            </h2>
            <p className="text-green-400 font-bold text-4xl">Ξ{balance ? balance.toFixed(2) : '0.00'}</p>
            <p className="text-cyan-400 text-sm">Galactic Credits</p>
          </div>

          {/* Current Holdings */}
          <div className="border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-cyan-200 flex items-center mb-4">
              <LineChart className="mr-3" /> Current Holdings
            </h2>
            <div className="space-y-4">
              {portfolio && portfolio.length > 0 ? (
                portfolio.map((stock, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-900 bg-opacity-50 p-3 rounded-lg">
                    <div>
                      <p className="font-bold text-lg text-white">{stock.symbol}</p>
                      <p className="text-cyan-400 text-sm">Quantity</p>
                    </div>
                    <p className="text-xl font-semibold">{stock.quantity}</p>
                  </div>
                ))
              ) : (
                <p className="text-cyan-400">No stocks in portfolio.</p>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Transaction History */}
        <div className="lg:col-span-2 border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-cyan-200 flex items-center mb-4">
            <History className="mr-3" /> Transaction History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-cyan-800">
                  <th className="p-3">Date</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Symbol</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.slice().reverse().map((tx, index) => ( // .slice().reverse() to show newest first
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900 bg-opacity-50">
                      <td className="p-3">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className={`p-3 font-bold ${tx.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.type.toUpperCase()}
                      </td>
                      <td className="p-3">{tx.symbol}</td>
                      <td className="p-3">{tx.quantity}</td>
                      <td className="p-3">Ξ{tx.price.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-5 text-cyan-400">No transactions recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MarketOverview/>
    </div>
  );
};

export default Dashboard;
