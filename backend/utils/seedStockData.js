import express from "express";
import Stock from "../models/Stock.js";

const router = express.Router();

const LATEST_DATE = new Date("2025-01-01T00:00:00Z"); // Reference point

const getStartDateFromInterval = (interval) => {
  const start = new Date(LATEST_DATE);

  switch (interval) {
    case "5y":
      start.setFullYear(LATEST_DATE.getFullYear() - 5);
      break;
    case "1y":
      start.setFullYear(LATEST_DATE.getFullYear() - 1);
      break;
    case "6m":
      start.setMonth(LATEST_DATE.getMonth() - 6);
      break;
    case "3m":
      start.setMonth(LATEST_DATE.getMonth() - 3);
      break;
    case "1m":
      start.setMonth(LATEST_DATE.getMonth() - 1);
      break;
    case "1w":
      start.setDate(LATEST_DATE.getDate() - 7);
      break;
    case "1d":
      start.setDate(LATEST_DATE.getDate() - 1);
      break;
    default:
      start.setMonth(LATEST_DATE.getMonth() - 3);
  }

  return start;
};

router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const { interval } = req.query;

  const prefixedSymbol = `FX_${symbol.toUpperCase()}`;
  const startDate = getStartDateFromInterval(interval || "5y");

  try {
    const stockData = await Stock.aggregate([
      {
        $match: {
          symbol: prefixedSymbol,
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          price: { $avg: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          date: { $toDate: "$_id" },
          price: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    console.log("📊 Aggregated Result:", stockData.length, "records");
    res.json(stockData);
  } catch (err) {
    console.error("Error fetching stock data:", err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

export default router;
