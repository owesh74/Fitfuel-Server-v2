const Workout = require('../models/Workout');
const LoggedWorkout = require('../models/LoggedWorkout');
const User = require('../models/User');

// Get all workouts from the library
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get workouts logged by the user for today
exports.getTodaysWorkouts = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const loggedWorkouts = await LoggedWorkout.find({
      userId: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    res.json(loggedWorkouts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Log a new workout for the user
// ... (keep getAllWorkouts, getTodaysWorkouts, and deleteLoggedWorkout as they are)

// REPLACE the old logWorkout function with this one
exports.logWorkout = async (req, res) => {
  try {
    const { workoutId, duration, sets, reps } = req.body;
    const user = await User.findById(req.user.id);
    const workout = await Workout.findById(workoutId);

    if (!user || !workout) {
      return res.status(404).json({ msg: 'User or workout not found' });
    }

    let caloriesBurned = 0;
    const newLoggedWorkoutData = {
      userId: req.user.id,
      name: workout.name,
    };

    if (workout.logType === 'time') {
      if (!duration || duration <= 0) return res.status(400).json({ msg: 'Valid duration is required.' });
      caloriesBurned = Math.round((workout.metValue * user.weight * 3.5 * duration) / 200);
      newLoggedWorkoutData.duration = duration;
    } else { // Reps
      if (!sets || sets <= 0 || !reps || reps <= 0) return res.status(400).json({ msg: 'Valid sets and reps are required.' });
      // Estimate time based on reps (e.g., 3 seconds per rep)
      const estimatedDuration = (sets * reps * 3) / 60; // in minutes
      caloriesBurned = Math.round((workout.metValue * user.weight * 3.5 * estimatedDuration) / 200);
      newLoggedWorkoutData.sets = sets;
      newLoggedWorkoutData.reps = reps;
    }
    
    newLoggedWorkoutData.caloriesBurned = caloriesBurned;
    const newLoggedWorkout = new LoggedWorkout(newLoggedWorkoutData);

    await newLoggedWorkout.save();
    res.json(newLoggedWorkout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// Delete a logged workout
exports.deleteLoggedWorkout = async (req, res) => {
    try {
        const loggedWorkout = await LoggedWorkout.findById(req.params.id);

        if (!loggedWorkout) {
            return res.status(404).json({ msg: 'Logged workout not found' });
        }
        // Ensure user owns this workout log
        if (loggedWorkout.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        await loggedWorkout.deleteOne();
        res.json({ msg: 'Workout log removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};