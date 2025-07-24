// Location: server/controllers/experienceController.js

import asyncHandler from 'express-async-handler';
import Experience from '../models/Experience.js';
import Company from '../models/Company.js';

// @desc    Create a new experience
// @route   POST /api/experiences
// @access  Private
const createExperience = asyncHandler(async (req, res) => {
  const { postTitle, companyName, interviewDate, interviewRounds, suggestions, additionalInfo, closingNote } = req.body;
  const userId = req.user._id;
  let company = await Company.findOne({ name: companyName });
  if (!company) {
    const slug = companyName.toLowerCase().replace(/\s+/g, '-');
    company = await Company.create({ name: companyName, slug: slug, logo: `https://placehold.co/80x80/e2e8f0/334155?text=${companyName.charAt(0)}` });
  }
  const experience = new Experience({ user: userId, company: company._id, postTitle, interviewDate, interviewRounds, suggestions, additionalInfo, closingNote });
  const createdExperience = await experience.save();
  res.status(201).json(createdExperience);
});

// @desc    Get all APPROVED experiences for a specific company
// @route   GET /api/experiences/:companySlug
// @access  Public
const getExperiencesByCompany = asyncHandler(async (req, res) => {
  const companySlug = req.params.companySlug;
  const company = await Company.findOne({ slug: companySlug });
  if (company) {
    const experiences = await Experience.find({ company: company._id, isApproved: true }).populate('user', 'name');
    res.json(experiences);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
});


// --- ADMIN CONTROLLERS ---

const getPendingExperiences = asyncHandler(async (req, res) => {
    const experiences = await Experience.find({ isApproved: false }).populate('company', 'name').populate('user', 'name');
    res.json(experiences);
});

// NEW: Function to get all approved experiences for the admin panel
const getApprovedExperiences = asyncHandler(async (req, res) => {
    const experiences = await Experience.find({ isApproved: true }).populate('company', 'name').populate('user', 'name');
    res.json(experiences);
});

const approveExperience = asyncHandler(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
        experience.isApproved = true;
        const updatedExperience = await experience.save();
        res.json(updatedExperience);
    } else {
        res.status(404);
        throw new Error('Experience not found');
    }
});

const deleteExperience = asyncHandler(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
        const companyId = experience.company;
        await experience.deleteOne();
        const remainingExperiences = await Experience.countDocuments({ company: companyId });
        if (remainingExperiences === 0) {
            await Company.findByIdAndDelete(companyId);
            res.json({ message: 'Experience and the associated company were removed.' });
        } else {
            res.json({ message: 'Experience removed.' });
        }
    } else {
        res.status(404);
        throw new Error('Experience not found');
    }
});

export { 
    createExperience, 
    getExperiencesByCompany,
    getPendingExperiences,
    getApprovedExperiences, // Add to exports
    approveExperience,
    deleteExperience
};
