const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { 
    getAllWorkouts, 
    getTodaysWorkouts, 
    logWorkout,
    deleteLoggedWorkout
} = require('../controllers/workoutController');

// Get the entire workout library
router.get('/library', auth, getAllWorkouts);
// Get workouts logged today by the user
router.get('/today', auth, getTodaysWorkouts);
// Log a new workout for today
router.post('/', auth, logWorkout);
// Delete a specific logged workout
router.delete('/:id', auth, deleteLoggedWorkout);

module.exports = router;