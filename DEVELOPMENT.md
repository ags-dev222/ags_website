# 🛠️ Development Guide

This guide will help you set up the AGS Website project for local development.

## 🚀 Quick Setup (Recommended)

### 1. Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Community Server](https://www.mongodb.com/try/download/community) or [Atlas Cloud](https://cloud.mongodb.com/))
- **Git** ([Download](https://git-scm.com/downloads))

### 2. Clone & Install
```bash
git clone <repository-url>
cd ags
npm run install:all
```

### 3. Database Setup

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Create free account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Create database user with read/write permissions
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

#### Option B: Local MongoDB
1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB service starts automatically
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### 4. Environment Configuration
Copy the example environment files and update them:

```bash
# Root directory
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env

# Admin Panel
cp frontend/Admin/.env.example frontend/Admin/.env
```

Update the `DATABASE_URL` in your `.env` files:
- **Atlas**: `DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ags_website`
- **Local**: `DATABASE_URL=mongodb://localhost:27017/ags_website`

### 5. Initialize Database
```bash
npm run setup
```

This creates default admin users:
- **SuperAdmin**: `superadmin@agsghana.org` / `SuperAdmin123!`
- **Admin**: `admin@agsghana.org` / `Admin123!`
- **Editor**: `editor@agsghana.org` / `Editor123!`

### 6. Start Development Servers
```bash
# Terminal 1 - Backend API
npm run start:dev:backend

# Terminal 2 - Main Website  
npm run start:dev:frontend

# Terminal 3 - Admin Panel
npm run start:dev:admin
```

### 7. Access Applications
- **Main Website**: http://localhost:5174
- **Admin Panel**: http://localhost:5175 
- **API Documentation**: http://localhost:5173

---

## 📁 Project Structure

```
ags/
├── 📁 backend/              # Express.js API Server
│   ├── 📁 controllers/      # Request handlers
│   ├── 📁 models/           # MongoDB schemas
│   ├── 📁 routes/           # API endpoints
│   ├── 📁 services/         # Business logic
│   ├── 📁 utils/            # Helper functions
│   └── server.js            # Entry point
│
├── 📁 frontend/             # Main React Website
│   ├── 📁 src/
│   │   ├── 📁 components/   # React components
│   │   ├── 📁 pages/        # Page components
│   │   └── 📁 utils/        # Client utilities
│   │
│   └── 📁 Admin/            # CMS Admin Panel
│       ├── 📁 src/
│       │   ├── 📁 components/
│       │   ├── 📁 pages/
│       │   ├── 📁 context/  # React context providers
│       │   └── 📁 utils/
│
├── 📁 scripts/             # Setup & utility scripts
├── 📁 shared/              # Shared utilities
└── 📄 Configuration files
```

---

## 🔧 Development Workflow

### Making Changes

1. **Backend Changes**
   - Edit files in `backend/` directory
   - Server auto-restarts with nodemon
   - Test endpoints with Postman or curl

2. **Frontend Changes**  
   - Edit files in `frontend/src/`
   - Hot reload enabled via Vite
   - Changes reflect immediately

3. **Admin Panel Changes**
   - Edit files in `frontend/Admin/src/`
   - Hot reload enabled
   - Test admin functionality with created users

### Code Style
- **ESLint** configuration provided
- **Prettier** formatting recommended
- Follow existing patterns and naming conventions

### Database Changes
- Models are in `backend/models/`
- Use Mongoose schemas
- Run setup script after schema changes

---

## 🧪 Testing

### Manual Testing
1. **Authentication Flow**
   - Test login with different roles
   - Verify permissions work correctly
   - Test logout functionality

2. **Content Management**
   - Create/edit content in admin panel
   - Verify changes appear on main website
   - Test file uploads

3. **API Endpoints**
   - Use Postman collection (create one)
   - Test all CRUD operations
   - Verify error handling

### Automated Testing (TODO)
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Admin panel tests
cd frontend/Admin && npm test
```

---

## 🚀 Deployment

### Development Build
```bash
npm run build
npm run start:prod
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Production
Set these in your deployment platform:
```env
DATABASE_URL=mongodb+srv://...
JWT_SECRET=strong-random-key
NODE_ENV=production
```

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Check if MongoDB is running
# Local: Check MongoDB service status
# Atlas: Verify connection string and network access
```

**Port Already in Use**
```bash
# Find process using port
netstat -ano | findstr :5173
# Kill process
taskkill /PID <pid> /F
```

**Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Failures**
```bash
# Clean build directories
npm run clean
npm run build
```

### Getting Help
1. Check existing issues in repository
2. Review error logs carefully
3. Check network connectivity for database
4. Verify environment variables are set correctly

---

## 🤝 Contributing

### Before You Start
1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Follow coding standards
4. Test your changes

### Submitting Changes
1. Commit with descriptive messages
2. Push to your fork: `git push origin feature/your-feature`
3. Create Pull Request
4. Respond to review feedback

### Code Review Checklist
- [ ] Code follows existing style
- [ ] No console.logs in production code
- [ ] Error handling implemented
- [ ] Database operations are secure
- [ ] UI is responsive
- [ ] Functionality tested manually

---

## 📚 Useful Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Happy coding! 🎉**
