// Location: server/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const securityQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@vignaniit\.edu\.in$/, 'Please use your college email address'],
  },
  password: {
    type: String,
    required: true,
  },
  // ADDED: Field to store security questions and their hashed answers
  securityQuestions: [securityQuestionSchema],
  
  // Fields for a temporary, single-use reset token
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Hash security question answers if they are modified
  if (this.isModified('securityQuestions')) {
    const salt = await bcrypt.genSalt(10);
    for (const sq of this.securityQuestions) {
      sq.answer = await bcrypt.hash(sq.answer, salt);
    }
  }
  
  next();
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to compare security question answers
userSchema.methods.matchSecurityAnswers = async function (answers) {
    for (let i = 0; i < this.securityQuestions.length; i++) {
        const isMatch = await bcrypt.compare(answers[i], this.securityQuestions[i].answer);
        if (!isMatch) return false;
    }
    return true;
};

const User = mongoose.model('User', userSchema);

export default User;
