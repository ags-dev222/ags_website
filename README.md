# 🚀 Association of Ghana Startups (AGS) Website

A modern, full-stack web application built for the Association of Ghana Startups with an integrated Content Management System (CMS).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Deployment](#deployment)
- [User Roles & Permissions](#user-roles--permissions)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### 🌐 Main Website
- **Modern React Frontend** - Built with React 19, Tailwind CSS, and Framer Motion
- **Responsive Design** - Mobile-first approach with beautiful animations
- **Dynamic Content** - Real-time content updates from CMS
- **SEO Optimized** - Meta tags, structured data, and performance optimized

### 🛠️ Admin CMS Panel
- **Role-Based Access Control** - SuperAdmin, Admin, and Editor roles
- **Content Management** - Hero sections, blogs, events, team members
- **User Management** - Create, edit, and manage users with permissions
- **Analytics Dashboard** - Real-time statistics and user activity
- **Dark/Light Mode** - Theme switching with system preference detection
- **Notification System** - Real-time activity tracking and alerts

### 🔐 Authentication & Security
- **JWT-based Authentication** - Secure token-based auth system
- **Permission-based Access** - Granular permissions for different actions
- **Password Encryption** - bcrypt hashing with salt rounds
- **Session Management** - Secure session handling and token refresh

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Chart.js** - Data visualization for analytics

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### DevOps & Deployment
- **Vercel** - Serverless deployment platform
- **MongoDB Atlas** - Cloud database service
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🏗️ Architecture

```
📁 ags/
├── 📁 backend/           # Express.js API server
│   ├── 📁 controllers/   # Business logic
│   ├── 📁 models/        # Database schemas
│   ├── 📁 routes/        # API endpoints
│   ├── 📁 services/      # Service layer
│   ├── 📁 utils/         # Utility functions
│   └── server.js         # Entry point
├── 📁 frontend/          # Main React website
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   └── 📁 utils/
│   └── 📁 Admin/         # CMS Admin Panel
│       ├── 📁 src/
│       │   ├── 📁 components/
│       │   ├── 📁 pages/
│       │   ├── 📁 context/
│       │   └── 📁 utils/
├── 📁 scripts/          # Setup and utility scripts
└── 📁 shared/           # Shared utilities and types
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ 
- **MongoDB** (local or Atlas)
- **Git**

### 1. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd ags

# Install all dependencies
npm run install:all
```

### 2. Environment Setup
Create `.env` files in the root and backend directories:

**Root `.env`:**
```env
DATABASE_URL=mongodb://localhost:27017/ags_website
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

**Backend `.env`:**
```env
DATABASE_URL=mongodb://localhost:27017/ags_website
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5173
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5173
```

### 3. Database Setup
```bash
# Run the setup script to create admin users and default content
npm run setup
```

This will create:
- **SuperAdmin**: `superadmin@agsghana.org` / `SuperAdmin123!`
- **Admin**: `admin@agsghana.org` / `Admin123!`
- **Editor**: `editor@agsghana.org` / `Editor123!`

⚠️ **Change these passwords immediately in production!**

### 4. Start Development Servers

**Option 1: Start all servers**
```bash
# Terminal 1 - Backend API
npm run start:dev:backend

# Terminal 2 - Main Website
npm run start:dev:frontend

# Terminal 3 - Admin Panel
npm run start:dev:admin
```

**Option 2: Individual servers**
```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev

# Admin panel only
cd frontend/Admin && npm run dev
```

### 5. Access the Applications
- **Main Website**: http://localhost:5174
- **Admin Panel**: http://localhost:5175
- **API Server**: http://localhost:5173

## 🚀 Deployment

### Vercel Deployment

1. **Prepare for Deployment**
```bash
# Build the application
npm run build

# Test production build locally
npm run start:prod
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

3. **Environment Variables**
Set these in your Vercel dashboard:
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ags_website
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

### Manual Deployment

1. **Server Setup**
```bash
# Clone on server
git clone <your-repo-url>
cd ags

# Install production dependencies
npm ci --production

# Build frontend
npm run build

# Start with PM2 (recommended)
pm2 start backend/server.js --name "ags-api"
```

## 👥 User Roles & Permissions

### 🔴 SuperAdmin
- **Full System Access** - All permissions
- Create/delete users of any role
- System settings management
- Analytics and reporting
- Content management

### 🔵 Admin  
- **User Management** - Create/edit users (except SuperAdmin)
- **Content Management** - Full content CRUD operations
- **Analytics Access** - View statistics and reports
- **Publishing** - Publish/unpublish content

### 🟢 Editor
- **Content Creation** - Create and edit content
- **Publishing** - Publish content
- **View Analytics** - Basic analytics access
- **No User Management** - Cannot manage users

### 🟡 Registered User
- **Public Access** - View published content
- **Resource Downloads** - Access member resources
- **Event Registration** - Register for events

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/login          # User login
POST /api/auth/register       # User registration  
GET  /api/auth/me            # Get current user
POST /api/auth/refresh-token  # Refresh JWT token
POST /api/auth/logout        # User logout
```

### Content Management
```
GET    /api/content/hero           # Get hero section
PUT    /api/content/hero           # Update hero section (Admin+)
GET    /api/content/settings       # Get site settings
PUT    /api/content/settings       # Update settings (SuperAdmin)
GET    /api/content/page/:slug     # Get page content
PUT    /api/content/page/:slug     # Update page content (Admin+)
```

### User Management
```
GET    /api/users                 # List users (Admin+)
GET    /api/users/:id            # Get user by ID
POST   /api/users               # Create user (Admin+)
PUT    /api/users/:id           # Update user (Admin+)
DELETE /api/users/:id          # Delete user (Admin+)
POST   /api/users/:id/avatar   # Upload profile picture
```

### Blog Management
```
GET    /api/blog               # Get all blogs (public)
GET    /api/blog/:id          # Get blog by ID
POST   /api/blog/create       # Create blog (Admin+)
PUT    /api/blog/update/:id   # Update blog (Admin+)
DELETE /api/blog/:id         # Delete blog (Admin+)
```

### Event Management
```
GET    /api/events            # Get all events (public)
POST   /api/events           # Create event (Admin+)
PUT    /api/events/:id       # Update event (Admin+)
DELETE /api/events/:id      # Delete event (Admin+)
POST   /api/events/:id/rsvp # RSVP to event (Registered+)
```

## 🔧 Development

### Code Structure
- **Services** - Business logic and data operations
- **Controllers** - HTTP request handling
- **Middleware** - Authentication, validation, logging
- **Models** - Database schemas and methods
- **Utils** - Helper functions and utilities

### Key Features Implementation

**Real-time CMS Updates:**
- Backend APIs for content management
- Frontend consumption of dynamic content
- Immediate reflection of changes

**Role-Based Access:**
- JWT tokens with role information
- Middleware for permission checking
- UI conditional rendering based on permissions

**File Uploads:**
- Multer middleware for handling uploads
- Profile picture management
- Secure file storage

## 🛡️ Security

- **JWT Authentication** with secure secret keys
- **Password Hashing** using bcrypt with salt
- **Input Validation** on all API endpoints
- **CORS Configuration** for cross-origin requests
- **Role-based Authorization** for sensitive operations
- **File Upload Security** with type checking and size limits

## 📈 Performance

- **Code Splitting** with React lazy loading
- **Bundle Optimization** with Vite
- **Image Optimization** for web delivery
- **Database Indexing** for query performance
- **Caching** strategies for API responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📞 Support

For support, email: [your-email@domain.com]
For bugs and feature requests, create an issue on GitHub.

## 📄 License

This project is proprietary to the Association of Ghana Startups.

---

**Built with ❤️ for the Ghana Startup Ecosystem**
