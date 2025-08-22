import mongoose from "mongoose";
import Stock from "../models/Stock.js";

// Connect MongoDB (remove deprecated options)
mongoose.connect("mongodb://localhost:27017/UserDetails");

const prefix = "FX_";

const rawSymbols1 = [
  "SPCE", "RKLB", "ASTR", "GALT", "THRX",
  "SPACEX", "BLUEORIGIN", "ASTRA", "MAXAR", "BOEING",
  "LUNARMINING", "MARSINC", "ASTROFUEL", "STARLINK", "GALAXYCREDIT",
  "COSMOCOIN", "ORBITX", "NEBULA", "QUASAR", "SATURNBANK",
  "PLUTOGOLD", "MARSFOOD", "JUPITERJET", "METEORX", "ASTROWATER",
  "SPACEDRIVE", "DEEPSKY", "EXOGROWTH", "COSMOMINING", "NEOSTOCK"
];
const rawSymbols=["CELESTIALEASE", "ASTROTECH", "GALACTICRESEARCH", "COSMICPOWER", "SOLARIS","NEOSTOCKS"];
const symbols = rawSymbols.map((s) => `${prefix}${s}`);

const generateRandomTrend = (yearOffset) => {
  const trendMultiplier = 1 + (Math.random() * 0.2 - 0.1);
  return Math.pow(trendMultiplier, yearOffset);
};

async function generateData() {
  const now = new Date("2025-01-01T00:00:00Z"); // Fixed date
  const fiveYearsAgo = new Date(now);
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);

  const oneHour = 1000 * 60 * 60;
  const totalHours = Math.floor((now - fiveYearsAgo) / oneHour);

  for (const symbol of symbols) {
    console.log(`🛠️ Generating for ${symbol}`);
    let basePrice = 50 + Math.random() * 100;
    const operations = [];

    for (let i = 0; i <= totalHours; i++) {
      const date = new Date(fiveYearsAgo.getTime() + i * oneHour);
      const yearOffset = date.getFullYear() - fiveYearsAgo.getFullYear();

      const priceFluctuation = (Math.random() * 2 - 1);
      const trend = generateRandomTrend(yearOffset);
      basePrice = Math.max(1, basePrice + priceFluctuation);
      const price = parseFloat((basePrice * trend).toFixed(2));

      operations.push({
        insertOne: {
          document: {
            symbol,
            date,
            price,
          },
        },
      });

      if (operations.length >= 1000) {
        await Stock.bulkWrite(operations);
        operations.length = 0;
      }
    }

    if (operations.length > 0) {
      await Stock.bulkWrite(operations);
    }

    console.log(`✅ ${symbol} done`);
  }

  console.log("📦 Historical data generation completed!");
  mongoose.disconnect();
}

generateData();