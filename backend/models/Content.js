import mongoose from 'mongoose';

// Hero Section Content Schema
const heroSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  subtitle: {
    type: String,
    required: true,
    maxlength: 500
  },
  backgroundImage: {
    type: String, // URL or file path
    default: null
  },
  buttonText: {
    type: String,
    default: 'Learn More'
  },
  buttonLink: {
    type: String,
    default: '/about'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Site Settings Schema
const siteSettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'Association of Ghana Startups'
  },
  siteDescription: {
    type: String,
    maxlength: 500
  },
  logo: {
    type: String // URL or file path
  },
  favicon: {
    type: String // URL or file path
  },
  contactEmail: {
    type: String,
    match: [/^\\S+@\\S+\\.\\S+$/, 'Please enter a valid email']
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String
  }
}, {
  timestamps: true
});

// Page Content Schema (for dynamic pages)
const pageContentSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: Object, // Store rich content as JSON
    default: {}
  },
  metaDescription: {
    type: String,
    maxlength: 160
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export const HeroSection = mongoose.model('HeroSection', heroSectionSchema);
export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);  
export const PageContent = mongoose.model('PageContent', pageContentSchema);
