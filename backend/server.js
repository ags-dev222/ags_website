import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import basicRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import { authenticateWithToken } from './routes/middleware/auth.js';
import resourceRoutes from './routes/resources.js';
import eventRoutes from './routes/events.js';
import blogRoutes from './routes/blog.js';
import testimonialRoutes from './routes/testimonial.js';
import startupRoutes from './routes/startup.js';
import signupRoutes from './routes/signup.js';
import contentRoutes from './routes/content.js';
import userRoutes from './routes/users.js';
import roleRoutes from './routes/roles.js';
import analyticsRoutes from './routes/analytics.js';
import { fileURLToPath } from 'url';
import path from 'path';



dotenv.config();

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL variable in .env missing.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 5002;
// Pretty-print JSON responses
app.enable('json spaces');
app.enable('strict routing');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Compression middleware
app.use(compression());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // limit each IP to 100 requests per windowMs in production
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  skipSuccessfulRequests: true,
  message: {
    error: 'Too many authentication attempts, please try again later.'
  }
});
app.use('/api/auth/', authLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:5175'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));


// Database connection (non-blocking)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    console.log('Server will continue without database connection');
    // Don't exit - let server run without DB for testing
  });


 // Serve static files from the 'public' directory
// This is where your frontend build files are located
app.use(express.static(path.join(__dirname, 'public')));



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
app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/analytics', analyticsRoutes);


// Important: Handle React Router by sending all non-API requests to index.html
app.get('*', (req, res) => {
  // Don't redirect API calls
  if (!req.url.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

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