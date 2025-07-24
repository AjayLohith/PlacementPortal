// Location: server/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import all your route files
import authRoutes from './routes/authRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// --- Mount the Routers ---
// This section tells your server how to handle different API paths.
app.use('/api/users', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/companies', companyRoutes);

// --- Error Handling Middleware ---
// This must come after your routes.
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
