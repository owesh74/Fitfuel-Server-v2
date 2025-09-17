const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  // --- ADD THESE NEW FIELDS ---
  height: { type: Number, default: 0 }, // in cm
  weight: { type: Number, default: 0 }, // in kg
  age: { type: Number, default: 0 },
  gender: { type: String, enum: ['male', 'female'] },
  activityLevel: { 
    type: String, 
    enum: ['sedentary', 'light', 'moderate', 'active', 'veryActive'],
    default: 'sedentary'
  },
   goal: {
    type: String,
    enum: ['lose', 'maintain', 'gain'],
    default: 'maintain'
  }
});

module.exports = mongoose.model('User', UserSchema);