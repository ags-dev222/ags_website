import express from 'express';
import { HeroSection, SiteSettings, PageContent } from '../models/Content.js';
import { authenticateWithToken, authorizeRoles } from './middleware/auth.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (Frontend consumption)
// ============================================

// Get active hero section
router.get('/hero', async (req, res) => {
  try {
    const hero = await HeroSection.findOne({ isActive: true });
    if (!hero) {
      return res.status(404).json({ error: 'No active hero section found' });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get site settings
router.get('/settings', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = new SiteSettings({});
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get page content by slug
router.get('/page/:slug', async (req, res) => {
  try {
    const page = await PageContent.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    });
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ADMIN ROUTES (CMS management)
// ============================================

// Update hero section (Admin only)
router.put('/hero', authenticateWithToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const { title, subtitle, backgroundImage, buttonText, buttonLink } = req.body;
    
    let hero = await HeroSection.findOne({ isActive: true });
    if (!hero) {
      hero = new HeroSection({
        title,
        subtitle,
        backgroundImage,
        buttonText,
        buttonLink,
        isActive: true
      });
    } else {
      Object.assign(hero, { title, subtitle, backgroundImage, buttonText, buttonLink });
    }
    
    await hero.save();
    res.json({ message: 'Hero section updated successfully', data: hero });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update site settings (Admin only)
router.put('/settings', authenticateWithToken, authorizeRoles('admin'), async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    
    await settings.save();
    res.json({ message: 'Settings updated successfully', data: settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create/Update page content
router.put('/page/:slug', authenticateWithToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const { title, content, metaDescription, isPublished } = req.body;
    const slug = req.params.slug;
    
    let page = await PageContent.findOne({ slug });
    if (!page) {
      page = new PageContent({
        slug,
        title,
        content,
        metaDescription,
        isPublished: isPublished || false,
        lastModifiedBy: req.user._id
      });
    } else {
      Object.assign(page, {
        title,
        content,
        metaDescription,
        isPublished,
        lastModifiedBy: req.user._id
      });
    }
    
    await page.save();
    res.json({ message: 'Page updated successfully', data: page });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all pages (Admin only)
router.get('/admin/pages', authenticateWithToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const pages = await PageContent.find().populate('lastModifiedBy', 'name email');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
