import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import basicRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import { authenticateWithToken } from './routes/middleware/auth.js';
import resourceRoutes from './routes/resources.js';
import eventRoutes from './routes/events.js';
import blogRoutes from './routes/blog.js';
import testimonialRoutes from './routes/testimonial.js';
import startupRoutes from './routes/startup.js';
import signupRoutes from './routes/signup.js';


dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL variable in .env missing.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 5173;
// Pretty-print JSON responses
app.enable('json spaces');
app.enable('strict routing');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  });



// Logging request and authentication status
app.use((req, res, next) => {
  console.log("Request received: ", new Date().toISOString(), " for ", req.path);
  if (req.user) {
    console.log(`Authenticated user: ${req.user.email}`);
  } else {
    console.log("No authenticated user for this request.");
  }
  next();
});

// Basic Routes
app.use(basicRoutes);
// Authentication Routes
app.use('/api/auth', authRoutes);

// Protected routes 
app.use('/api/resources', resourceRoutes);
app.use('/api/events',  eventRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/signups', signupRoutes);

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});