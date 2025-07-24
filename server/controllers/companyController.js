// Location: server/controllers/companyController.js

import asyncHandler from 'express-async-handler';
import Company from '../models/Company.js';
import Experience from '../models/Experience.js'; // Import the Experience model

// @desc    Fetch all companies that have at least one approved experience
// @route   GET /api/companies
// @access  Public
const getCompanies = asyncHandler(async (req, res) => {
  // 1. Find all experiences that have been approved by the admin.
  const approvedExperiences = await Experience.find({ isApproved: true });

  // 2. From that list, get a unique set of all the company IDs.
  // This creates a list of companies that are guaranteed to have at least one approved post.
  const companyIds = [...new Set(approvedExperiences.map(exp => exp.company))];

  // 3. Find all companies whose IDs are in our unique list.
  const companies = await Company.find({ '_id': { $in: companyIds } });

  // 4. Return the filtered list of companies.
  res.json(companies);
});

export { getCompanies };
