const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Workout = require('./models/Workout');

const workouts = [
  // --- CARDIO & HIIT ---
  { name: "Running (Moderate Pace, 10 km/h)", category: "Cardio & HIIT", metValue: 10.0, logType: 'time' },
  { name: "Running (Fast Pace, 12 km/h)", category: "Cardio & HIIT", metValue: 12.5, logType: 'time' },
  { name: "Walking (Brisk Pace)", category: "Cardio & HIIT", metValue: 4.3, logType: 'time' },
  { name: "Cycling (Moderate, Stationary)", category: "Cardio & HIIT", metValue: 7.0, logType: 'time' },
  { name: "Cycling (Vigorous, Stationary)", category: "Cardio & HIIT", metValue: 10.5, logType: 'time' },
  { name: "Swimming (Freestyle, Moderate)", category: "Cardio & HIIT", metValue: 8.3, logType: 'time' },
  { name: "Elliptical Trainer", category: "Cardio & HIIT", metValue: 5.0, logType: 'time' },
  { name: "StairMaster / Step Mill", category: "Cardio & HIIT", metValue: 9.0, logType: 'time' },
  { name: "Jump Rope / Skipping", category: "Cardio & HIIT", metValue: 12.3, logType: 'time' },
  { name: "HIIT (High-Intensity Interval Training)", category: "Cardio & HIIT", metValue: 8.0, logType: 'time' },
  { name: "Rowing Machine (Moderate)", category: "Cardio & HIIT", metValue: 7.0, logType: 'time' },

  // --- FULL BODY & STRENGTH ---
  { name: "Weightlifting (General)", category: "Full Body Strength", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.3 },
  { name: "Deadlifts", category: "Full Body Strength", metValue: 6.0, logType: 'reps', caloriesPerRep: 0.75 },
  { name: "Squats (Barbell)", category: "Full Body Strength", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.60 },
  { name: "Kettlebell Swings", category: "Full Body Strength", metValue: 9.8, logType: 'reps', caloriesPerRep: 0.5 },
  { name: "Burpees", category: "Full Body Strength", metValue: 8.0, logType: 'reps', caloriesPerRep: 1.4 },

  // --- CHEST & TRICEPS ---
  { name: "Bench Press (Barbell)", category: "Chest & Triceps", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.45 },
  { name: "Dumbbell Bench Press", category: "Chest & Triceps", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.40 },
  { name: "Push-ups", category: "Chest & Triceps", metValue: 8.0, logType: 'reps', caloriesPerRep: 0.35 },
  { name: "Incline Bench Press", category: "Chest & Triceps", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.42 },
  { name: "Dumbbell Flyes", category: "Chest & Triceps", metValue: 4.0, logType: 'reps', caloriesPerRep: 0.25 },
  { name: "Tricep Dips", category: "Chest & Triceps", metValue: 7.0, logType: 'reps', caloriesPerRep: 0.30 },
  { name: "Tricep Pushdowns", category: "Chest & Triceps", metValue: 3.0, logType: 'reps', caloriesPerRep: 0.18 },

  // --- BACK & BICEPS ---
  { name: "Pull-ups", category: "Back & Biceps", metValue: 8.0, logType: 'reps', caloriesPerRep: 0.90 },
  { name: "Bent Over Rows (Barbell)", category: "Back & Biceps", metValue: 6.0, logType: 'reps', caloriesPerRep: 0.55 },
  { name: "Lat Pulldowns", category: "Back & Biceps", metValue: 4.0, logType: 'reps', caloriesPerRep: 0.35 },
  { name: "Seated Cable Rows", category: "Back & Biceps", metValue: 4.0, logType: 'reps', caloriesPerRep: 0.38 },
  { name: "Bicep Curls (Dumbbell)", category: "Back & Biceps", metValue: 3.0, logType: 'reps', caloriesPerRep: 0.15 },
  { name: "Hammer Curls", category: "Back & Biceps", metValue: 3.0, logType: 'reps', caloriesPerRep: 0.16 },

  // --- LEGS & GLUTES ---
  { name: "Leg Press", category: "Legs & Glutes", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.50 },
  { name: "Lunges (with weights)", category: "Legs & Glutes", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.32 },
  { name: "Leg Curls", category: "Legs & Glutes", metValue: 3.0, logType: 'reps', caloriesPerRep: 0.20 },
  { name: "Leg Extensions", category: "Legs & Glutes", metValue: 3.0, logType: 'reps', caloriesPerRep: 0.18 },
  { name: "Calf Raises", category: "Legs & Glutes", metValue: 3.0, logType: 'reps', caloriesPerRep: 0.10 },
  
  // --- SHOULDERS & ABS ---
  { name: "Overhead Press (Barbell)", category: "Shoulders & Abs", metValue: 5.0, logType: 'reps', caloriesPerRep: 0.48 },
  { name: "Lateral Raises (Dumbbell)", category: "Shoulders & Abs", metValue: 3.0, logType: 'reps', caloriesPerRep: 0.15 },
  { name: "Crunches / Sit-ups", category: "Shoulders & Abs", metValue: 3.8, logType: 'reps', caloriesPerRep: 0.20 },
  { name: "Plank", category: "Shoulders & Abs", metValue: 2.8, logType: 'time' },
  { name: "Leg Raises", category: "Shoulders & Abs", metValue: 3.8, logType: 'reps', caloriesPerRep: 0.25 },
  { name: "Russian Twists", category: "Shoulders & Abs", metValue: 3.5, logType: 'reps', caloriesPerRep: 0.18 },
  
  // --- SPORTS & RECREATION ---
  { name: "Cricket", category: "Sports & Recreation", metValue: 5.0, logType: 'time' },
  { name: "Football (Soccer)", category: "Sports & Recreation", metValue: 7.0, logType: 'time' },
  { name: "Badminton (Casual)", category: "Sports & Recreation", metValue: 5.5, logType: 'time' },
  { name: "Basketball", category: "Sports & Recreation", metValue: 6.5, logType: 'time' },
  { name: "Dancing (General)", category: "Sports & Recreation", metValue: 5.0, logType: 'time' },

  // --- FLEXIBILITY & MINDFUL MOVEMENT ---
  { name: "Yoga (Hatha)", category: "Flexibility & Mindful Movement", metValue: 2.5, logType: 'time' },
  { name: "Power Yoga", category: "Flexibility & Mindful Movement", metValue: 4.0, logType: 'time' },
  { name: "Stretching", category: "Flexibility & Mindful Movement", metValue: 2.3, logType: 'time' },
];

const seedWorkouts = async () => {
  await connectDB();
  try {
    await Workout.deleteMany({});
    await Workout.insertMany(workouts);
    console.log('Workout library seeded successfully with expanded list!');
  } catch (err) {
    console.error('Error seeding workouts:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedWorkouts();