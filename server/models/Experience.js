// Location: server/models/Experience.js

import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
  roundName: { type: String, required: true },
  duration: { type: String },
  method: { type: String },
  focus: { type: String },
  keyQuestions: { type: String },
  obstacles: { type: String },
});

const experienceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  },
  postTitle: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  interviewRounds: [roundSchema],
  suggestions: { type: String },
  additionalInfo: { type: String },
  closingNote: { type: String },
  // FIX: This field was missing. It's now added with a default of 'false'.
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
