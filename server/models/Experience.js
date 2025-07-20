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
    ref: 'User', // Creates a reference to the User model
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Company', // Creates a reference to the Company model
  },
  postTitle: {
    type: String,
    required: true,
  },
  interviewDate: {
    type: Date,
    required: true,
  },
  interviewRounds: [roundSchema], // An array of the round schema defined above
  suggestions: { type: String },
  additionalInfo: { type: String },
  closingNote: { type: String },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
