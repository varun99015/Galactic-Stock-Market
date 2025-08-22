import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const Stock = new mongoose.Schema({
  symbol: String,
  date: { type: Date, index: true },
  price: Number,
});
Stock.index({ symbol: 1, date: 1 }, { unique: true });


const getStartDateFromInterval = (interval) => {
  const start = new Date();
  switch (interval) {
    case "5y": start.setFullYear(start.getFullYear() - 5); break;
    case "1y": start.setFullYear(start.getFullYear() - 1); break;
    case "6m": start.setMonth(start.getMonth() - 6); break;
    case "3m": start.setMonth(start.getMonth() - 3); break;
    case "1m": start.setMonth(start.getMonth() - 1); break;
    case "1w": start.setDate(start.getDate() - 7); break;
    case "1d": start.setDate(start.getDate() - 1); break;
    default: start.setFullYear(start.getFullYear() - 5);
  }
  return start;
};

const getGroupingFormat = (interval) => {
  switch (interval) {
    case '1d':
    case '1w':
      return "%Y-%m-%dT%H:00:00"; 
    default:
      return "%Y-%m-%d";
  }
};

router.get("/data/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const { interval = "5y" } = req.query;

  try {
    const collectionName = `fx_${symbol.toLowerCase()}_prices`;
    const StockModel = mongoose.models[collectionName] || mongoose.model(collectionName, Stock);

    const startDate = getStartDateFromInterval(interval);
    const groupingFormat = getGroupingFormat(interval);

    const stockData = await StockModel.aggregate([
        { $match: { date: { $gte: startDate } } },
        { $group: { _id: { $dateToString: { format: groupingFormat, date: "$date" } }, price: { $avg: "$price" } } },
        { $project: { _id: 0, date: { $toDate: "$_id" }, price: { $round: ["$price", 2] } } },
        { $sort: { date: 1 } },
    ]);

    if (stockData.length === 0) {
      return res.status(404).json({ message: `No data found for symbol ${symbol}` });
    }
    res.json(stockData);
  } catch (err) {
    console.error(`Error fetching data for ${symbol}:`, err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});
router.get("/overview", async (req, res) => {

  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const stockCollectionNames = collections
      .map(c => c.name)
      .filter(name => name.startsWith("fx_"));

    let marketData = [];

    for (const name of stockCollectionNames) {
      // ✅ Use the safer pattern to get or create the model
      const StockModel = mongoose.models[name] || mongoose.model(name, Stock);
      
      const latestEntries = await StockModel.find().sort({ date: -1 }).limit(2);

      // ✅ Gracefully handle collections with fewer than 2 entries
      if (latestEntries.length >= 2) {
        const latestPrice = latestEntries[0].price;
        const previousPrice = latestEntries[1].price;
        const change = latestPrice - previousPrice;
        
        marketData.push({
          symbol: latestEntries[0].symbol.replace('FX_', ''),
          price: latestPrice,
          change: change,
          volume: `${(Math.random() * 50 + 5).toFixed(1)}M`
        });
      }
    }
     console.log(`4. DATABASE: Processed data for ${marketData.length} stocks. Sending response.`);
    res.json(marketData);
  } catch (error) {
    console.error("Error fetching market overview:", error);
    res.status(500).json({ error: "Failed to fetch market overview" });
  }
});
export default router;
