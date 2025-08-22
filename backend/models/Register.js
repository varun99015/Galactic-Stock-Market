// In your models/Register.js file

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  balance: { type: Number, default: 10000 },

  portfolio: [{
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
  }],

  transactions: [{
    symbol: { type: String, required: true },
    type: { type: String, enum: ['buy', 'sell'], required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }]
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
