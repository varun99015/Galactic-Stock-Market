import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = "mongodb+srv://varu99015:varun9901@cluster0.na2mkr0.mongodb.net/StockAppData";

// --- Customize Stock Behavior Here ---
// dailyUpdateSimulation.js (or wherever you keep profiles)
export const STOCK_PROFILES = {
  // Tourism / Launch / Aerospace
  FX_SPCE:            { drift: 0.12, volatility: 0.45 }, // space tourism, hype-y
  FX_RKLB:            { drift: 0.10, volatility: 0.35 }, // launch provider
  FX_ASTR:            { drift: 0.06, volatility: 0.55 }, // early-stage launcher
  FX_ASTRA:           { drift: 0.08, volatility: 0.30 }, // satellite/launch mfr
  FX_MAXAR:           { drift: 0.06, volatility: 0.25 }, // satellite imaging
  FX_BOEING:          { drift: 0.05, volatility: 0.20 }, // legacy aerospace
  FX_SPACEX:          { drift: 0.15, volatility: 0.40 }, // hypergrowth launcher
  FX_BLUEORIGIN:      { drift: 0.13, volatility: 0.35 }, // large private space

  // Mining / Resources / Logistics
  FX_LUNARMINING:     { drift: 0.09, volatility: 0.50 }, // lunar extraction
  FX_PLUTOGOLD:       { drift: 0.07, volatility: 0.45 }, // precious metals
  FX_METEORX:         { drift: 0.10, volatility: 0.48 }, // asteroid logistics
  FX_COSMOMINING:     { drift: 0.09, volatility: 0.50 }, // diversified space mining

  // Energy / Utilities / Infrastructure
  FX_COSMICPOWER:     { drift: 0.03, volatility: 0.15 }, // orbital utility, stable
  FX_SOLARIS:         { drift: 0.06, volatility: 0.18 }, // solar megaprojects
  FX_ASTROFUEL:       { drift: 0.08, volatility: 0.32 }, // propellant supply
  FX_STARLINK:        { drift: 0.09, volatility: 0.28 }, // comms network
  FX_ASTROWATER:      { drift: 0.04, volatility: 0.14 }, // water utility (defensive)
  FX_SPACEDRIVE:      { drift: 0.12, volatility: 0.50 }, // next-gen propulsion
  FX_DEEPSKY:         { drift: 0.13, volatility: 0.52 }, // deep-space exploration
  FX_JUPITERJET:      { drift: 0.07, volatility: 0.30 }, // interplanetary transport

  // Colonies / Real estate
  FX_MARSINC:         { drift: 0.11, volatility: 0.38 }, // colonization & RE
  FX_CELESTIALEASE:   { drift: 0.08, volatility: 0.25 }, // lunar/asteroid leases
  FX_LUNARLIVING:     { drift: 0.09, volatility: 0.28 }, // lunar housing/RE
  FX_MARSFOOD:        { drift: 0.06, volatility: 0.22 }, // agri & life-support

  // Finance / Tokens
  FX_GALAXYCREDIT:    { drift: 0.06, volatility: 0.18 }, // bank/fintech (stable)
  FX_SATURNBANK:      { drift: 0.05, volatility: 0.15 }, // conservative bank
  FX_COSMOCOIN:       { drift: 0.12, volatility: 0.65 }, // crypto-like token
  FX_EXOGROWTH:       { drift: 0.15, volatility: 0.60 }, // VC/holdco, risk-on
  FX_NEOSTOCK:        { drift: 0.11, volatility: 0.40 }, // fintech platform
  FX_NEOSTOCKS:       { drift: 0.15, volatility: 0.40 }, // AI trading fund

  // Research / Advanced tech
  FX_ASTROTECH:       { drift: 0.10, volatility: 0.20 }, // hardware & systems
  FX_GALACTICRESEARCH:{ drift: 0.12, volatility: 0.30 }, // R&D heavy
  FX_NEBULA:          { drift: 0.12, volatility: 0.30 }, // cloud/AI infra
  FX_QUASAR:          { drift: 0.14, volatility: 0.55 }, // exotic energy beams

  // Misc/brands (kept consistent with themes above)
  FX_ORBITX:          { drift: 0.10, volatility: 0.36 }, // launch infra
  FX_GALT:            { drift: 0.08, volatility: 0.40 }, // biotech/research vibe
  FX_THRX:            { drift: 0.07, volatility: 0.35 }, // pharma/therapeutics
};


const stockSchema = new mongoose.Schema({
  symbol: String,
  date: { type: Date, index: true },
  price: Number,
});

// Helper function to generate a normally distributed random number
function randomNormal() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// The Geometric Brownian Motion formula
function generateNextPrice(lastPrice, drift, volatility, timeStep) {
  const diffusion = volatility * Math.sqrt(timeStep) * randomNormal();
  const trend = (drift - (volatility ** 2) / 2) * timeStep;
  const nextPrice = lastPrice * Math.exp(trend + diffusion);
  return parseFloat(nextPrice.toFixed(2));
}

async function runDailyUpdate() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB for daily simulation.");
  const db = mongoose.connection.db;

  try {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name).filter(name => name.startsWith("fx_"));

    for (const name of collectionNames) {
      console.log(`\n--- Simulating collection: "${name}" ---`);
      const StockModel = mongoose.model(name, stockSchema);

      const lastDoc = await StockModel.findOne().sort({ date: -1 });
      if (!lastDoc) {
        console.log("Collection is empty, skipping.");
        continue;
      }

      const { symbol } = lastDoc;
      const profile = STOCK_PROFILES[symbol];
      if (!profile) {
        console.log(`- No profile for ${symbol}, skipping.`);
        continue;
      }

      let lastPrice = lastDoc.price;
      let lastDate = new Date(lastDoc.date);
      const now = new Date();
      const newDocuments = [];
      const timeStep = 1 / (365 * 24); 

      while (lastDate < now) {
        lastDate.setHours(lastDate.getHours() + 1);
        const newPrice = generateNextPrice(lastPrice, profile.drift, profile.volatility, timeStep);
        newDocuments.push({
          symbol,
          date: new Date(lastDate),
          price: newPrice,
        });
        lastPrice = newPrice;
      }

      // Insert new data
      if (newDocuments.length > 0) {
        await StockModel.insertMany(newDocuments);
        console.log(`- Added ${newDocuments.length} new hourly documents.`);
      } else {
        console.log("- No new hours to simulate. Data is up-to-date.");
      }

      // Remove old data to maintain a 5-year window
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
      const deleteResult = await StockModel.deleteMany({ date: { $lt: fiveYearsAgo } });

      if (deleteResult.deletedCount > 0) {
        console.log(`- Trimmed ${deleteResult.deletedCount} old documents.`);
      }
    }
  } catch (error) {
    console.error("\n❌ An error occurred during the simulation:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Daily simulation finished. Connection closed.");
  }
}

runDailyUpdate();
