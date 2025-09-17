const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user && user.verified) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    if (user) { // User exists but is not verified
        user.name = name;
        user.password = hashedPassword;
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();
    } else { // New user
        user = new User({ name, email, password: hashedPassword, otp, otpExpires });
        await user.save();
    }

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'FitFuel Email Verification',
      text: `Your OTP for verification is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'OTP sent to email. Please verify.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found.' });
        }
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP.' });
        }

        user.verified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user || !user.verified) {
      return res.status(400).json({ msg: 'Invalid credentials or user not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// ADD THIS FUNCTION
exports.getLoggedInUser = async (req, res) => {
  try {
    // req.user.id is set by the authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateUserProfile = async (req, res) => {
  console.log("STEP 1: Received request to update profile...");
  try {
    console.log("STEP 2: Request body received:", req.body);
    const { height, weight, age, gender, activityLevel, goal } = req.body;
    
    console.log("STEP 3: Finding user in database by ID:", req.user.id);
    const user = await User.findById(req.user.id);

    if (!user) {
      console.log("ERROR: User not found in database.");
      return res.status(404).json({ msg: 'User not found' });
    }
    console.log("STEP 4: User found. Assigning new values...");

    user.height = height;
    user.weight = weight;
    user.age = age;
    user.gender = gender;
    user.activityLevel = activityLevel;
    user.goal = goal;

    console.log("STEP 5: Attempting to save user...");
    await user.save();
    console.log("STEP 6: User saved successfully.");
    
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);

  } catch (err) {
    // This will now definitely print the full error object
    console.error("---!!! AN ERROR OCCURRED !!!---");
    console.error(err);
    console.error("---!!! END OF ERROR !!!---");
    res.status(500).send('Server Error');
  }
};