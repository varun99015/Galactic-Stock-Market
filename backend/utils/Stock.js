import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: String,
  date: { type: Date, index: true },
  price: Number,
});

stockSchema.index({ symbol: 1, date: 1 }, { unique: true });

export default mongoose.model("Stock", stockSchema);
