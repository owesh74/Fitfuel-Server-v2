const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  metValue: { type: Number, required: true },
  logType: { type: String, enum: ['time', 'reps'], default: 'time' }, // <-- ADD THIS
});

module.exports = mongoose.model('Workout', WorkoutSchema);
