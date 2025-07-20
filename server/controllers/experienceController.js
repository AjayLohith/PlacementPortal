// Location: server/controllers/experienceController.js

import asyncHandler from 'express-async-handler';
import Experience from '../models/Experience.js';
import Company from '../models/Company.js';
import User from '../models/User.js';

// @desc    Create a new experience
// @route   POST /api/experiences
// @access  Private
const createExperience = asyncHandler(async (req, res) => {
  const {
    postTitle,
    companyName, // We get the name from the form
    interviewDate,
    interviewRounds,
    suggestions,
    additionalInfo,
    closingNote,
  } = req.body;

  // The user's ID will be available from our authentication middleware
  const userId = req.user._id;

  // Find the company in the database or create it if it doesn't exist
  let company = await Company.findOne({ name: companyName });

  if (!company) {
    const slug = companyName.toLowerCase().replace(/\s+/g, '-');
    company = await Company.create({ 
        name: companyName, 
        slug: slug,
        logo: `https://placehold.co/80x80/e2e8f0/334155?text=${companyName.charAt(0)}`
    });
  }

  const experience = new Experience({
    user: userId,
    company: company._id, // Use the ID of the found/created company
    postTitle,
    interviewDate,
    interviewRounds,
    suggestions,
    additionalInfo,
    closingNote,
  });

  const createdExperience = await experience.save();
  res.status(201).json(createdExperience);
});

// @desc    Get all experiences for a specific company
// @route   GET /api/experiences/:companySlug
// @access  Public
const getExperiencesByCompany = asyncHandler(async (req, res) => {
  const companySlug = req.params.companySlug;

  const company = await Company.findOne({ slug: companySlug });

  if (company) {
    const experiences = await Experience.find({ company: company._id }).populate('user', 'name');
    res.json(experiences);
  } else {
    res.status(404);
    throw new Error('Company not found');
  }
});

export { createExperience, getExperiencesByCompany };
