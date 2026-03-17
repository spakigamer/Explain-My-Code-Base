import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import analyzeRoutes from './routes/analyzeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Health check endpoints (TOP priority, no CORS, tiny response)
app.get('/health', (req, res) => res.send('OK'));
app.get('/api/health', (req, res) => res.send('OK'));

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

// Routes
app.use('/api', analyzeRoutes);

// Global Error Handler (Prevents large HTML stack traces from CORS or other errors)
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(err.status || 500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


