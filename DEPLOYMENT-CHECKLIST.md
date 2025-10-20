# 🚀 Production Deployment Checklist

## ✅ Pre-Deployment Steps

### 1. **Database Setup**
- [ ] MongoDB Atlas cluster created
- [ ] Database user with appropriate permissions created
- [ ] Network access configured (IP whitelist)
- [ ] Connection string obtained and tested

### 2. **Environment Variables**
- [ ] Production `.env` files created
- [ ] Strong JWT secret generated (min 64 characters)
- [ ] Database URL updated to production MongoDB
- [ ] Email settings configured (if using email features)

### 3. **Security Review**
- [ ] Default admin passwords changed
- [ ] JWT secret is unique and secure
- [ ] CORS settings reviewed
- [ ] File upload limits configured
- [ ] Input validation tested

### 4. **Build & Test**
- [ ] All dependencies installed: `npm run install:all`
- [ ] Database setup completed: `npm run setup`
- [ ] Production build successful: `npm run build`
- [ ] Local production test: `npm run start:prod`

### 5. **Vercel Configuration**
- [ ] Vercel account created
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured (optional)
- [ ] SSL certificate verified

---

## 🌐 Vercel Deployment

### Required Environment Variables in Vercel:
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ags_website
JWT_SECRET=your-super-secure-64-character-production-secret-key
NODE_ENV=production
```

### Deploy Commands:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 🔧 Post-Deployment Verification

### 1. **Main Website**
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Responsive design on mobile
- [ ] Images and assets load
- [ ] Contact forms functional

### 2. **Admin Panel**
- [ ] Login page accessible at `/admin`
- [ ] Authentication working with test users
- [ ] Dashboard displays correctly
- [ ] Content management functional
- [ ] File uploads working
- [ ] Dark/light mode toggle works

### 3. **API Endpoints**
- [ ] Authentication endpoints respond
- [ ] Content APIs return data
- [ ] User management APIs functional
- [ ] Error handling working
- [ ] CORS headers correct

### 4. **Performance**
- [ ] Page load times < 3 seconds
- [ ] Images optimized and loading
- [ ] JavaScript bundles optimized
- [ ] Database queries efficient

---

## 🛡️ Security Checklist

- [ ] HTTPS enabled and working
- [ ] Default passwords changed
- [ ] Admin panel not publicly listed
- [ ] Database credentials secure
- [ ] File upload restrictions in place
- [ ] Rate limiting considered
- [ ] Error messages don't leak sensitive info

---

## 📞 Support Contacts

**Technical Issues:**
- Check logs in Vercel dashboard
- Review MongoDB Atlas metrics
- Verify environment variables

**Quick Fixes:**
```bash
# Redeploy if issues
vercel --prod

# Clear build cache
vercel --prod --force
```

---

## 🎉 Go Live!

Once all items are checked, your AGS Website is ready for production use!

**Live URLs:**
- Main Website: `https://your-domain.vercel.app`
- Admin Panel: `https://your-domain.vercel.app/admin`
- API: `https://your-domain.vercel.app/api`
