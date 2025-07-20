// Location: server/models/Company.js

import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: false, // Logo is optional
  },
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

export default Company;
