import express from "express";
import mongoose from "mongoose";
import User from "../models/Register.js";
const router = express.Router();

const stockPriceSchema = new mongoose.Schema({
  symbol: String,
  date: { type: Date, index: true },
  price: Number,
});

// --- HELPER FUNCTIONS ---
const getCurrentStockPrice = async (symbol) => {
  console.log(`Fetching price for ${symbol} from database...`);
  const collectionName = `fx_${symbol.toLowerCase()}_prices`;
  const StockPrice = mongoose.models[collectionName] || mongoose.model(collectionName, stockPriceSchema);
  const latestPriceEntry = await StockPrice.findOne().sort({ date: -1 });
  if (!latestPriceEntry) {
    console.warn(`No price data for ${symbol}, returning random price.`);
    return parseFloat((Math.random() * 200 + 50).toFixed(2));
  }
  return latestPriceEntry.price;
};


router.post("/buy", async (req, res) => {
  const { symbol, quantity } = req.body;
  const numericQuantity = parseInt(quantity, 10);

  if (!symbol || !numericQuantity || numericQuantity <= 0) {
    return res.status(400).json({ message: "Invalid symbol or quantity provided." });
  }

  try {
    const price = await getCurrentStockPrice(symbol);
    const totalCost = price * numericQuantity;
    // We now get the user from req.user, which is attached by the middleware in index.js
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (user.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient funds to complete purchase." });
    }

    user.balance -= totalCost;

    const stockInPortfolio = user.portfolio.find(stock => stock.symbol === symbol);
    if (stockInPortfolio) {
      stockInPortfolio.quantity += numericQuantity;
    } else {
      user.portfolio.push({ symbol: symbol, quantity: numericQuantity });
    }

    user.transactions.push({ symbol: symbol, quantity: numericQuantity, price, type: 'buy' });

    await user.save();

    console.log(`Transaction for user '${user.name}':`, user);
    res.json({
      message: `Successfully purchased ${numericQuantity} shares of ${symbol} for ${totalCost.toFixed(2)} credits.`,
      newBalance: user.balance.toFixed(2),
    });

  } catch (err) {
    console.error("Error processing buy transaction:", err);
    res.status(500).json({ message: "Server error during transaction." });
  }
});

router.post("/sell", async (req, res) => {
  const { symbol, quantity } = req.body;
  const numericQuantity = parseInt(quantity, 10);

  if (!symbol || !numericQuantity || numericQuantity <= 0) {
    return res.status(400).json({ message: "Invalid symbol or quantity provided." });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    
    const stockInPortfolio = user.portfolio.find(stock => stock.symbol === symbol);
    if (!stockInPortfolio || stockInPortfolio.quantity < numericQuantity) {
      return res.status(400).json({ message: `Insufficient shares of ${symbol} to sell.` });
    }

    const price = await getCurrentStockPrice(symbol);
    const totalCredit = price * numericQuantity;

    stockInPortfolio.quantity -= numericQuantity;
    
    if (stockInPortfolio.quantity === 0) {
      user.portfolio = user.portfolio.filter(p => p.symbol !== symbol);
    }
    
    user.balance += totalCredit;

    user.transactions.push({ symbol: symbol, quantity: numericQuantity, price, type: 'sell' });

    await user.save();

    console.log(`Transaction for user '${user.name}':`, user);
    res.json({
      message: `Successfully sold ${numericQuantity} shares of ${symbol} for ${totalCredit.toFixed(2)} credits.`,
      newBalance: user.balance.toFixed(2),
    });

  } catch (err) {
    console.error("Error processing sell transaction:", err);
    res.status(500).json({ message: "Server error during transaction." });
  }
});

export default router;
