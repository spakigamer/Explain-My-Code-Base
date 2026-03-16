import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import analyzeRoutes from './routes/analyzeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://explain-my-code-base.vercel.app',
  'https://explain-my-code-base-git-main-dhruvgoel335-gmailcoms-projects.vercel.app',
  'https://explain-my-code-base-evnomf092-dhruvgoel335-gmailcoms-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());

app.use('/api', analyzeRoutes);

// Health check endpoints
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


