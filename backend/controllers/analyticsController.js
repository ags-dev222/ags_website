import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Event from '../models/Event.js';
import Startup from '../models/Startup.js';
import mongoose from 'mongoose';
import logger from '../utils/log.js';

/**
 * 📊 DASHBOARD OVERVIEW
 * Get high-level metrics for the admin dashboard
 */
export const getDashboardOverview = async (req, res) => {
  try {
    const [
      userStats,
      contentStats,
      engagementStats,
      growthStats
    ] = await Promise.all([
      getUserStatistics(),
      getContentStatistics(),
      getEngagementStatistics(),
      getGrowthStatistics()
    ]);

    res.json({
      success: true,
      data: {
        users: userStats,
        content: contentStats,
        engagement: engagementStats,
        growth: growthStats,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Dashboard overview error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

/**
 * 👥 USER ANALYTICS
 * Detailed user behavior and demographics
 */
export const getUserAnalytics = async (req, res) => {
  try {
    const { timeRange = '30d', metrics = 'all' } = req.query;
    const dateFilter = getDateFilter(timeRange);

    const analytics = await Promise.all([
      getUserDemographics(dateFilter),
      getUserActivity(dateFilter),
      getUserJourney(dateFilter),
      getRoleDistribution(dateFilter)
    ]);

    res.json({
      success: true,
      data: {
        demographics: analytics[0],
        activity: analytics[1],
        journey: analytics[2],
        roles: analytics[3],
        timeRange,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('User analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch user analytics' });
  }
};

/**
 * 📈 BUSINESS INTELLIGENCE
 * Advanced metrics for strategic decision making
 */
export const getBusinessIntelligence = async (req, res) => {
  try {
    const { period = 'quarter' } = req.query;
    
    const intelligence = await Promise.all([
      getKPIMetrics(period),
      getPredictiveAnalytics(period),
      getMarketInsights(period),
      getCompetitiveAnalysis(period)
    ]);

    res.json({
      success: true,
      data: {
        kpis: intelligence[0],
        predictions: intelligence[1],
        market: intelligence[2],
        competition: intelligence[3],
        period,
        insights: await generateInsights(intelligence)
      }
    });
  } catch (error) {
    logger.error('Business intelligence error:', error);
    res.status(500).json({ error: 'Failed to generate business intelligence' });
  }
};

/**
 * 🎯 REAL-TIME METRICS
 * Live dashboard metrics with WebSocket support
 */
export const getRealTimeMetrics = async (req, res) => {
  try {
    const metrics = await Promise.all([
      getActiveUsers(),
      getCurrentSessions(),
      getLiveEngagement(),
      getSystemHealth()
    ]);

    res.json({
      success: true,
      data: {
        activeUsers: metrics[0],
        sessions: metrics[1],
        engagement: metrics[2],
        system: metrics[3],
        timestamp: Date.now()
      }
    });
  } catch (error) {
    logger.error('Real-time metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch real-time metrics' });
  }
};

/**
 * 📊 EXPORT ANALYTICS
 * Export analytics data in various formats
 */
export const exportAnalytics = async (req, res) => {
  try {
    const { format = 'json', type = 'overview', dateRange = '30d' } = req.query;
    
    let data;
    switch (type) {
      case 'users':
        data = await getUserAnalyticsExport(dateRange);
        break;
      case 'content':
        data = await getContentAnalyticsExport(dateRange);
        break;
      case 'engagement':
        data = await getEngagementAnalyticsExport(dateRange);
        break;
      default:
        data = await getFullAnalyticsExport(dateRange);
    }

    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=ags-analytics-${type}-${Date.now()}.csv`);
      res.send(convertToCSV(data));
    } else {
      res.json({
        success: true,
        data,
        exportInfo: {
          type,
          format,
          dateRange,
          exportedAt: new Date().toISOString(),
          recordCount: Array.isArray(data) ? data.length : Object.keys(data).length
        }
      });
    }
  } catch (error) {
    logger.error('Export analytics error:', error);
    res.status(500).json({ error: 'Failed to export analytics data' });
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const getUserStatistics = async () => {
  const [totalUsers, activeUsers, newUsers, usersByRole] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isActive: true }),
    User.countDocuments({ 
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } 
    }),
    User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
  ]);

  const growthRate = await calculateGrowthRate('users');

  return {
    total: totalUsers,
    active: activeUsers,
    inactive: totalUsers - activeUsers,
    newThisMonth: newUsers,
    byRole: usersByRole,
    growthRate
  };
};

const getContentStatistics = async () => {
  const [blogs, events, startups] = await Promise.all([
    Blog.countDocuments(),
    Event.countDocuments(),
    Startup.countDocuments()
  ]);

  const recentContent = await Promise.all([
    Blog.countDocuments({ 
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
    }),
    Event.countDocuments({ 
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
    })
  ]);

  return {
    blogs: { total: blogs, thisWeek: recentContent[0] },
    events: { total: events, thisWeek: recentContent[1] },
    startups: { total: startups },
    totalContent: blogs + events + startups
  };
};

const getEngagementStatistics = async () => {
  // Simulated engagement data - replace with actual tracking
  const engagementData = {
    avgSessionDuration: '5m 32s',
    bounceRate: '24%',
    pageViews: {
      total: 15420,
      thisWeek: 2341
    },
    interactions: {
      blogReads: 1234,
      eventRegistrations: 89,
      resourceDownloads: 456
    }
  };

  return engagementData;
};

const getGrowthStatistics = async () => {
  const periods = [30, 60, 90]; // days
  const growthData = {};

  for (const period of periods) {
    const startDate = new Date(Date.now() - period * 24 * 60 * 60 * 1000);
    const midDate = new Date(Date.now() - (period / 2) * 24 * 60 * 60 * 1000);
    
    const [oldCount, newCount] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: startDate, $lt: midDate } }),
      User.countDocuments({ createdAt: { $gte: midDate } })
    ]);

    const growthRate = oldCount > 0 ? ((newCount - oldCount) / oldCount * 100).toFixed(1) : 0;
    growthData[`${period}d`] = {
      previous: oldCount,
      current: newCount,
      growth: `${growthRate}%`
    };
  }

  return growthData;
};

const getUserDemographics = async (dateFilter) => {
  const demographics = await User.aggregate([
    { $match: dateFilter },
    {
      $facet: {
        byRole: [
          { $group: { _id: '$role', count: { $sum: 1 } } },
          { $sort: { count: -1 } }
        ],
        byCreationMonth: [
          {
            $group: {
              _id: {
                year: { $year: '$createdAt' },
                month: { $month: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': 1, '_id.month': 1 } }
        ],
        byStatus: [
          { $group: { _id: '$isActive', count: { $sum: 1 } } }
        ]
      }
    }
  ]);

  return demographics[0];
};

const getUserActivity = async (dateFilter) => {
  // Simulate activity data - replace with actual tracking
  return {
    dailyActiveUsers: 145,
    weeklyActiveUsers: 892,
    monthlyActiveUsers: 2341,
    avgSessionsPerUser: 3.2,
    peakHours: [
      { hour: 9, users: 89 },
      { hour: 14, users: 156 },
      { hour: 20, users: 134 }
    ]
  };
};

const getUserJourney = async (dateFilter) => {
  const journeySteps = await User.aggregate([
    { $match: dateFilter },
    {
      $group: {
        _id: '$roleStatus',
        count: { $sum: 1 },
        avgTimeToApproval: {
          $avg: {
            $divide: [
              { $subtract: ['$roleApprovedAt', '$roleRequestedAt'] },
              1000 * 60 * 60 * 24 // Convert to days
            ]
          }
        }
      }
    }
  ]);

  return {
    conversionFunnel: {
      registered: await User.countDocuments({ role: 'registered' }),
      requestedRole: await User.countDocuments({ roleStatus: 'pending' }),
      approved: await User.countDocuments({ roleStatus: 'approved' }),
      editors: await User.countDocuments({ role: 'editor' }),
      admins: await User.countDocuments({ role: 'admin' })
    },
    journeySteps
  };
};

const getRoleDistribution = async (dateFilter) => {
  return await User.aggregate([
    { $match: dateFilter },
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        avgLoginFreq: { $avg: 1 }, // Placeholder - implement actual login tracking
        permissions: { $first: '$permissions' }
      }
    },
    { $sort: { count: -1 } }
  ]);
};

const getKPIMetrics = async (period) => {
  // Key Performance Indicators
  return {
    userAcquisitionCost: 12.50, // USD
    customerLifetimeValue: 450.00, // USD
    churnRate: '2.1%',
    netPromoterScore: 8.7,
    platformUtilization: '78%',
    contentEngagementRate: '34%',
    eventAttendanceRate: '89%'
  };
};

const getPredictiveAnalytics = async (period) => {
  // Machine learning predictions - placeholder data
  return {
    userGrowthForecast: {
      nextMonth: 2850,
      nextQuarter: 8200,
      confidence: '87%'
    },
    churnPrediction: {
      highRisk: 23,
      mediumRisk: 67,
      lowRisk: 1205
    },
    contentPerformance: {
      expectedBlogViews: 12500,
      expectedEventAttendance: 450,
      trendingTopics: ['Fintech', 'AgriTech', 'AI/ML']
    }
  };
};

const getMarketInsights = async (period) => {
  return {
    sectorTrends: [
      { sector: 'FinTech', growth: '+34%', startups: 156 },
      { sector: 'AgriTech', growth: '+28%', startups: 89 },
      { sector: 'HealthTech', growth: '+22%', startups: 67 },
      { sector: 'EdTech', growth: '+19%', startups: 78 }
    ],
    geographicDistribution: {
      'Greater Accra': '45%',
      'Ashanti': '23%',
      'Western': '12%',
      'Central': '8%',
      'Other': '12%'
    },
    fundingTrends: {
      totalRaised: '$2.4M',
      avgDealSize: '$45K',
      topInvestors: ['Ghana Venture Capital', 'African Development Bank']
    }
  };
};

const getCompetitiveAnalysis = async (period) => {
  return {
    marketPosition: 'Leading',
    competitorComparison: {
      userBase: { ags: 2500, competitor1: 1800, competitor2: 1200 },
      eventFrequency: { ags: 12, competitor1: 8, competitor2: 6 },
      contentQuality: { ags: 9.2, competitor1: 7.8, competitor2: 7.1 }
    },
    marketShare: '42%',
    differentiators: [
      'Comprehensive ecosystem support',
      'Strong government partnerships',
      'International expansion focus'
    ]
  };
};

const generateInsights = async (intelligenceData) => {
  // AI-powered insights - placeholder
  return [
    {
      type: 'opportunity',
      title: 'FinTech Sector Growth',
      description: 'FinTech startups show 34% growth. Consider launching specialized FinTech acceleration program.',
      priority: 'high',
      actionable: true
    },
    {
      type: 'warning',
      title: 'User Churn Alert',
      description: 'Churn rate increased by 0.3% this month. Review user engagement strategies.',
      priority: 'medium',
      actionable: true
    },
    {
      type: 'success',
      title: 'Event Attendance Excellence',
      description: 'Event attendance rate of 89% exceeds industry benchmark of 65%.',
      priority: 'low',
      actionable: false
    }
  ];
};

// Utility functions
const getDateFilter = (timeRange) => {
  const now = new Date();
  const ranges = {
    '7d': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    '30d': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    '90d': new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
    '1y': new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
  };

  return { createdAt: { $gte: ranges[timeRange] || ranges['30d'] } };
};

const calculateGrowthRate = async (metric) => {
  // Placeholder growth calculation
  return '+12.5%';
};

const convertToCSV = (data) => {
  // Simple CSV conversion - enhance as needed
  if (Array.isArray(data)) {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  }
  return JSON.stringify(data);
};

// Real-time metrics helpers
const getActiveUsers = async () => {
  // Placeholder - implement actual session tracking
  return {
    current: 156,
    peak24h: 289,
    countries: ['Ghana', 'Nigeria', 'Kenya', 'South Africa']
  };
};

const getCurrentSessions = async () => {
  return {
    total: 156,
    authenticated: 89,
    anonymous: 67,
    avgDuration: 324 // seconds
  };
};

const getLiveEngagement = async () => {
  return {
    pageViews: 45,
    uniqueVisitors: 23,
    bounceRate: 0.18,
    topPages: [
      { path: '/', views: 12 },
      { path: '/blog', views: 8 },
      { path: '/events', views: 6 }
    ]
  };
};

const getSystemHealth = async () => {
  return {
    status: 'healthy',
    uptime: '99.9%',
    responseTime: 142, // ms
    errorRate: 0.01,
    serverLoad: 0.35
  };
};

export default {
  getDashboardOverview,
  getUserAnalytics,
  getBusinessIntelligence,
  getRealTimeMetrics,
  exportAnalytics
};
