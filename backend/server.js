import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import basicRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import { authenticateWithToken } from './routes/middleware/auth.js';
import resourceRoutes from './routes/resources.js';
import eventRoutes from './routes/events.js';
import blogRoutes from './routes/blog.js';
import startupRoutes from './routes/startups.js';
import logger from './utils/log.js';


const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

if (!process.env.DATABASE_URL) {
  logger.error("Error: DATABASE_URL variable in .env missing.");
  process.exit(-1);
}
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', basicRoutes);
app.use('/auth', authRoutes);
app.use('/resources', authenticateWithToken, resourceRoutes);
app.use('/events', authenticateWithToken, eventRoutes);
app.use('/blog', authenticateWithToken, blogRoutes);
app.use('/startups', authenticateWithToken, startupRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled application error: ${err.message}`);
  logger.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send("There was an error serving your request.");
});

// Database Connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(-1);
  });

// Start Server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});