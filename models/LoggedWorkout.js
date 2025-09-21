const mongoose = require('mongoose');

const LoggedWorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  duration: { type: Number }, // in minutes (optional now)
  sets: { type: Number },     // <-- ADD THIS
  reps: { type: Number },     // <-- ADD THIS
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LoggedWorkout', LoggedWorkoutSchema);
