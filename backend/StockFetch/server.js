const express = require("express");
const cors = require("cors");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
app.use(cors());
app.use(express.json());

// Fetch stock data from Yahoo Finance
app.get("/stock/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const result = await yahooFinance.quote(symbol);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
