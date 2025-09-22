const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  height: { type: Number, default: 0 }, // in cm
  weight: { type: Number, default: 0 }, // in kg
  age: { type: Number, default: 0 },
  gender: { type: String, enum: ['male', 'female'] },
  activityLevel: { 
    type: String, 
    enum: ['sedentary', 'light', 'moderate', 'active', 'veryActive'],
    default: 'sedentary'
  },
  
  // --- UPDATED GOAL FIELD ---
  goal: {
    type: String,
    enum: ['lose', 'maintain', 'gain', 'muscleGain'], // Added 'muscleGain'
    default: 'maintain'
  },

  // --- NEW FIELDS FOR DETAILED GOAL PLANNING ---
  goalWeight: { 
    type: Number 
  },
  goalDuration: { 
    type: Number, 
    default: 12 // Default timeframe of 12 weeks
  },
});

module.exports = mongoose.model('User', UserSchema);