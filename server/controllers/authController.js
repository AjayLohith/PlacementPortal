// Location: server/controllers/authController.js

import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';

// @desc    Register a new user with security questions
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, securityQuestions } = req.body;

  if (!securityQuestions || securityQuestions.length < 2) {
    res.status(400);
    throw new Error('Please provide answers for at least two security questions.');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password, securityQuestions });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// ... (authUser function remains the same)
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc    Get security questions for a user
// @route   POST /api/users/getquestions
// @access  Public
const getSecurityQuestions = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    // Return only the questions, not the answers
    const questions = user.securityQuestions.map(sq => sq.question);
    res.status(200).json({ questions });
});

// @desc    Verify security answers and issue a temporary token
// @route   POST /api/users/verifyanswers
// @access  Public
const verifySecurityAnswers = asyncHandler(async (req, res) => {
    const { email, answers } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchSecurityAnswers(answers))) {
        res.status(401);
        throw new Error('Incorrect answers');
    }

    // Generate a temporary, single-use token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min expiry
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ resetToken });
});

// @desc    Reset password with temporary token
// @route   PUT /api/users/resetpassword
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { resetToken, password } = req.body;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired token');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password has been reset successfully',
    });
});

export { registerUser, authUser, getSecurityQuestions, verifySecurityAnswers, resetPassword };
