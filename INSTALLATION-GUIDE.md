# 🚀 AGS Website - Installation & Upgrade Guide

## ✨ What's New - Ultra-Modern Features

Your AGS website has been upgraded to international standards with these cutting-edge features:

### 🔥 Frontend Enhancements
- **Fixed Dropdown Issues**: Navigation dropdowns now have proper styling and hover effects
- **Functional Search**: Real-time search with intelligent suggestions
- **Dynamic Blog System**: Individual blog posts with social sharing and related articles
- **Enhanced UI/UX**: Modern animations, better responsiveness, improved accessibility
- **SEO Optimization**: Complete meta tags, structured data, Open Graph integration
- **Performance Monitoring**: Core Web Vitals tracking, analytics integration
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks

### 🛡️ Security & Authentication
- **Advanced Rate Limiting**: Protection against brute force and DDoS attacks
- **Enhanced User Roles**: SuperAdmin, Admin, Editor with granular permissions
- **Google OAuth Integration**: One-click social login
- **Input Validation**: Comprehensive sanitization and validation
- **Security Headers**: Helmet.js integration with CSP policies
- **Password Strength**: Advanced password requirements

### ⚡ Performance & Monitoring
- **Real-time Analytics**: Google Analytics 4 integration
- **Performance Tracking**: Core Web Vitals and custom metrics
- **Error Tracking**: Automatic error reporting and monitoring
- **Session Analytics**: User behavior and engagement tracking
- **Bundle Optimization**: Code splitting and lazy loading

### 🎯 Admin Features
- **Role-based Access Control**: Create admins via email invitation
- **Enhanced CMS**: Better content management with live preview
- **User Management**: Complete user administration panel
- **Analytics Dashboard**: Real-time statistics and insights

## 🛠️ Installation Steps

### 1. Install Dependencies

```bash
# Root directory - Install all dependencies
npm run install:all

# Or install individually
npm run install:backend
npm run install:frontend
npm run install:admin
```

### 2. Environment Configuration

Your environment files have been updated with proper values. Update these with your actual credentials:

**Root `.env`:**
```bash
# Update these with your actual values
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-app-specific-password
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-secret
GA_MEASUREMENT_ID=your-google-analytics-id
```

**Frontend `.env`:**
```bash
# Create this file if it doesn't exist
VITE_API_URL=http://localhost:5173
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
VITE_GA_MEASUREMENT_ID=your-google-analytics-id
```

### 3. Database Setup

```bash
# Make sure MongoDB is running
mongod

# Initialize database with default users
npm run setup
```

This creates default admin accounts:
- **SuperAdmin**: `superadmin@agsghana.org` / `SuperAdmin123!`
- **Admin**: `admin@agsghana.org` / `Admin123!`
- **Editor**: `editor@agsghana.org` / `Editor123!`

⚠️ **IMPORTANT**: Change these passwords immediately!

### 4. Start Development Servers

```bash
# Option 1: All servers at once
npm run dev

# Option 2: Individual terminals
# Terminal 1 - Backend
npm run start:dev:backend

# Terminal 2 - Frontend
npm run start:dev:frontend

# Terminal 3 - Admin Panel
npm run start:dev:admin
```

### 5. Access Your Applications

- **Main Website**: http://localhost:5174
- **Admin Panel**: http://localhost:5175
- **API Server**: http://localhost:5173

## 🔧 Configuration Guide

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5173/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback`
6. Update your `.env` files with the credentials

### Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add it to your environment variables

### Email Configuration

1. Use Gmail App Passwords for secure email sending
2. Enable 2-factor authentication on your Gmail account
3. Generate an App Password in your Google Account settings
4. Use this password in the `EMAIL_PASS` environment variable

## 👨‍💼 Admin User Management

### Creating Admin Users (SuperAdmin Only)

```bash
# Via API endpoint
POST /api/auth/create-admin
{
  "email": "newadmin@example.com",
  "password": "SecurePassword123!",
  "name": "New Admin",
  "role": "admin",
  "department": "Operations"
}
```

### Via Admin Panel
1. Login as SuperAdmin
2. Navigate to Users Management
3. Click "Create New User"
4. Select appropriate role and permissions
5. Send invitation email

## 🚀 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Build for production
npm run build

# Deploy
vercel --prod
```

### Environment Variables for Production

Set these in your Vercel dashboard:

```bash
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/ags_website
JWT_SECRET=your-super-secure-production-jwt-secret
NODE_ENV=production
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-secret
GA_MEASUREMENT_ID=your-google-analytics-id
ALLOWED_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

### Manual Server Deployment

```bash
# On your server
git clone your-repo
cd ags

# Install dependencies
npm ci --production

# Build frontend
npm run build

# Start with PM2
pm2 start backend/server.js --name "ags-api"
pm2 startup
pm2 save
```

## 🔍 Features Overview

### Navigation & Search
- **Fixed Dropdown Issues**: Proper styling and hover states
- **Smart Search**: Real-time search with suggestions
- **Mobile-Optimized**: Responsive navigation for all devices

### Blog System
- **Dynamic Routing**: Individual blog post pages `/blog/:id`
- **SEO Optimized**: Proper meta tags and structured data
- **Social Sharing**: Facebook, Twitter, LinkedIn integration
- **Related Articles**: Intelligent content recommendations

### Authentication
- **Google OAuth**: One-click social login
- **Role-based Access**: SuperAdmin → Admin → Editor → Registered
- **Password Security**: Strong password requirements
- **Rate Limiting**: Protection against attacks

### Performance
- **Analytics**: Google Analytics 4 integration
- **Error Tracking**: Automatic error reporting
- **Core Web Vitals**: Performance monitoring
- **SEO**: Complete search engine optimization

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```bash
# Make sure MongoDB is running
brew services start mongodb/brew/mongodb-community
# or
sudo systemctl start mongod
```

**2. Port Already in Use**
```bash
# Kill processes on ports
npx kill-port 5173 5174 5175
```

**3. Google OAuth Not Working**
- Check your Google Cloud Console configuration
- Verify redirect URIs match exactly
- Ensure credentials are properly set in environment variables

**4. Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Performance Issues

**1. Slow Initial Load**
- Implement lazy loading for images
- Use React.lazy for route-based code splitting
- Enable gzip compression on your server

**2. Analytics Not Working**
- Check your GA Measurement ID
- Verify the analytics script is loading
- Test in production environment

## 📊 Monitoring & Analytics

### Built-in Monitoring
- **Error Tracking**: Automatic error reporting
- **Performance Metrics**: Core Web Vitals tracking
- **User Analytics**: Session tracking and behavior analysis
- **Custom Events**: Form submissions, downloads, outbound links

### Access Analytics
1. **Google Analytics**: View in your GA4 dashboard
2. **Server Logs**: Check backend logs for API usage
3. **Error Reports**: Monitor error boundary catches

## 🔒 Security Features

### Implemented Security Measures
- **Rate Limiting**: 5 login attempts per 15 minutes
- **Input Sanitization**: XSS and injection protection
- **CORS Configuration**: Restricted origins
- **Security Headers**: Helmet.js integration
- **Password Hashing**: bcrypt with salt rounds
- **JWT Security**: Secure token handling

### Best Practices
- Regularly update dependencies
- Monitor security logs
- Use HTTPS in production
- Keep environment variables secure
- Regular security audits

## 📞 Support

### Getting Help
- **Documentation**: Check README.md for detailed guides
- **Issues**: Create GitHub issues for bugs
- **Email**: Contact your development team

### Maintenance
- **Dependency Updates**: Run `npm audit` regularly
- **Security Patches**: Keep all packages updated
- **Database Backups**: Regular MongoDB backups
- **Log Monitoring**: Check application logs

---

**🎉 Congratulations!** Your AGS website is now ultra-modern with international-standard features. The platform includes advanced authentication, real-time analytics, comprehensive SEO, and enterprise-level security.

**Next Steps:**
1. Configure your OAuth and analytics credentials
2. Customize the branding and content
3. Test all features thoroughly
4. Deploy to production
5. Monitor performance and analytics

Your startup ecosystem platform is now ready to compete on the global stage! 🚀
