const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Make sure you only have ONE line like this at the top
const { 
  signup, 
  verifyOtp, 
  login, 
  getLoggedInUser, 
  updateUserProfile 
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.get('/user', auth, getLoggedInUser);
router.put('/profile', auth, updateUserProfile);

module.exports = router;