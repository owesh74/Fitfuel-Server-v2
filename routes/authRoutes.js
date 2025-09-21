const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const { 
  signup, 
  verifyOtp, 
  login, 
  getLoggedInUser, 
  updateUserProfile,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

// Standard Auth Routes
router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

// User Profile Routes (Protected)
router.get('/user', auth, getLoggedInUser);
router.put('/profile', auth, updateUserProfile);

// Password Reset Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;