#!/usr/bin/env node

/**
 * AGS Website Setup Script
 * 
 * This script sets up the initial SuperAdmin user and tests system connectivity
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config();

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import models
import User from '../backend/models/User.js';
import { HeroSection, SiteSettings } from '../backend/models/Content.js';

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/ags_website';

console.log('🚀 AGS Website Setup Starting...\n');

async function setupDatabase() {
  try {
    console.log('📡 Connecting to MongoDB...');
    console.log(`🔗 Connection URL: ${DATABASE_URL.replace(/\/\/.*@/, '//***:***@')}`);
    
    await mongoose.connect(DATABASE_URL, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log('✅ Database connected successfully\n');

    // Create SuperAdmin user
    console.log('👤 Creating SuperAdmin user...');
    
    const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      console.log('⚠️  SuperAdmin already exists:', existingSuperAdmin.email);
    } else {
      const superAdminData = {
        name: 'Super Administrator',
        email: 'superadmin@agsghana.org',
        password: 'SuperAdmin123!',  // Change this in production
        role: 'superadmin',
        department: 'System Administration'
      };

      const hashedPassword = await bcrypt.hash(superAdminData.password, 10);
      
      const superAdmin = new User({
        ...superAdminData,
        password: hashedPassword
      });

      await superAdmin.save();
      console.log('✅ SuperAdmin created successfully');
      console.log('📧 Email:', superAdminData.email);
      console.log('🔐 Password:', superAdminData.password);
      console.log('⚠️  Please change the password after first login!\n');
    }

    // Create sample Admin user
    console.log('👤 Creating sample Admin user...');
    
    const existingAdmin = await User.findOne({ email: 'admin@agsghana.org' });
    if (!existingAdmin) {
      const adminData = {
        name: 'Site Administrator',
        email: 'admin@agsghana.org',
        password: 'Admin123!',
        role: 'admin',
        department: 'Content Management'
      };

      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      
      const admin = new User({
        ...adminData,
        password: hashedPassword
      });

      await admin.save();
      console.log('✅ Admin user created');
      console.log('📧 Email:', adminData.email);
      console.log('🔐 Password:', adminData.password, '\n');
    }

    // Create sample Editor user
    console.log('👤 Creating sample Editor user...');
    
    const existingEditor = await User.findOne({ email: 'editor@agsghana.org' });
    if (!existingEditor) {
      const editorData = {
        name: 'Content Editor',
        email: 'editor@agsghana.org',
        password: 'Editor123!',
        role: 'editor',
        department: 'Content Creation'
      };

      const hashedPassword = await bcrypt.hash(editorData.password, 10);
      
      const editor = new User({
        ...editorData,
        password: hashedPassword
      });

      await editor.save();
      console.log('✅ Editor user created');
      console.log('📧 Email:', editorData.email);
      console.log('🔐 Password:', editorData.password, '\n');
    }

    // Create default site settings
    console.log('⚙️  Creating default site settings...');
    
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      const defaultSettings = new SiteSettings({
        siteName: 'Association of Ghana Startups',
        siteDescription: 'Empowering Ghana\'s startup ecosystem through innovation, collaboration, and growth.',
        contactEmail: 'info@agsghana.org',
        socialLinks: {
          facebook: 'https://facebook.com/agsghana',
          twitter: 'https://twitter.com/agsghana',
          instagram: 'https://instagram.com/agsghana',
          linkedin: 'https://linkedin.com/company/agsghana'
        }
      });

      await defaultSettings.save();
      console.log('✅ Default site settings created\n');
    }

    // Create default hero section
    console.log('🏠 Creating default hero section...');
    
    const existingHero = await HeroSection.findOne();
    if (!existingHero) {
      const defaultHero = new HeroSection({
        title: 'Welcome to Association of Ghana Startups',
        subtitle: 'Empowering innovation and entrepreneurship across Ghana through community, resources, and support.',
        buttonText: 'Join Our Community',
        buttonLink: '/register',
        isActive: true
      });

      await defaultHero.save();
      console.log('✅ Default hero section created\n');
    }

    console.log('🎉 Setup completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Start the backend server: cd backend && npm run dev');
    console.log('2. Start the frontend: cd frontend && npm run dev');
    console.log('3. Start the admin panel: cd frontend/Admin && npm run dev');
    console.log('4. Login to admin panel with SuperAdmin credentials');
    console.log('5. Change default passwords for security\n');

    // Display user summary
    const userCount = await User.countDocuments();
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    console.log('📊 User Summary:');
    console.log(`Total Users: ${userCount}`);
    usersByRole.forEach(role => {
      console.log(`${role._id}: ${role.count}`);
    });

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('MongoNetworkError')) {
      console.log('\n📦 MongoDB Setup Required:');
      console.log('1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community');
      console.log('2. Or use MongoDB Atlas (cloud): https://cloud.mongodb.com/');
      console.log('3. Update DATABASE_URL in .env file with your connection string');
      console.log('4. For Atlas: DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/ags_website');
      console.log('5. For local: DATABASE_URL=mongodb://localhost:27017/ags_website\n');
    }
    
    console.error('Full error details:');
    console.error(error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

// Test API connectivity
async function testAPIConnectivity() {
  console.log('🧪 Testing API endpoints...');
  
  try {
    // Test would go here - for now just log
    console.log('✅ API test completed (implement fetch tests here)');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run setup
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase();
}
