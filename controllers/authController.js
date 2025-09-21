const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

    const mailOptions = {
      from: `FitFuel <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your FitFuel Verification Code: ${otp}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><h2 style="color: #4A90E2;">Welcome to FitFuel, ${name}!</h2><p>Thank you for signing up. Please use the following One-Time Password (OTP) to verify your email address.</p><p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #333; background-color: #f2f2f2; padding: 10px 20px; border-radius: 5px; display: inline-block;">${otp}</p><p>This code is valid for <strong>10 minutes</strong>. For your security, please do not share this code with anyone.</p><p>If you did not request this, please ignore this email.</p><br><p>Best Regards,</p><p><strong>The FitFuel Team</strong></p></div>`
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

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { height, weight, age, gender, activityLevel, goal } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.height = height;
    user.weight = weight;
    user.age = age;
    user.gender = gender;
    user.activityLevel = activityLevel;
    user.goal = goal;

    await user.save();
    
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW FUNCTIONS FOR FORGOT PASSWORD ---

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User with this email does not exist.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailOptions = {
      from: `FitFuel <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Password Reset Code is ${otp}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;"><h2>FitFuel Password Reset</h2><p>Hello ${user.name},</p><p>We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed.</p><p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; background-color: #f2f2f2; padding: 10px 20px; border-radius: 5px; display: inline-block;">${otp}</p><p>This code is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p><p>Best Regards,<br><strong>The FitFuel Team</strong></p></div>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: 'Password reset OTP has been sent to your email.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = undefined;
    user.otpExpires = undefined;
    
    await user.save();

    res.json({ msg: 'Password has been reset successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};