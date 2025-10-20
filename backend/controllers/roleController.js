import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';
import logger from '../utils/log.js';

/**
 * 🎯 REQUEST ROLE UPGRADE
 * - Allows registered users to request editor/admin roles
 * - Requires approval from SuperAdmin
 */
export const requestRoleUpgrade = async (req, res) => {
  try {
    const { requestedRole, message } = req.body;
    const userId = req.user._id;

    // Validation
    if (!['editor', 'admin'].includes(requestedRole)) {
      return res.status(400).json({ 
        error: 'Invalid role requested. Only editor and admin roles can be requested.' 
      });
    }

    // Check if user already has higher or equal role
    const currentUser = await User.findById(userId);
    if (currentUser.role === 'superadmin' || currentUser.role === 'admin' || 
        (currentUser.role === 'editor' && requestedRole === 'editor')) {
      return res.status(400).json({ 
        error: 'You already have this role or a higher role.' 
      });
    }

    // Check if there's already a pending request
    if (currentUser.roleStatus === 'pending') {
      return res.status(400).json({ 
        error: 'You already have a pending role request.' 
      });
    }

    // Update user with role request
    currentUser.requestedRole = requestedRole;
    currentUser.roleRequestMessage = message;
    currentUser.roleRequestedAt = new Date();
    currentUser.roleStatus = 'pending';
    await currentUser.save();

    // Notify all SuperAdmins
    const superAdmins = await User.find({ role: 'superadmin' });
    for (const admin of superAdmins) {
      await sendRoleRequestNotification(admin.email, {
        userName: currentUser.name,
        userEmail: currentUser.email,
        requestedRole,
        message,
        requestDate: new Date()
      });
    }

    res.json({ 
      message: 'Role request submitted successfully. You will be notified once reviewed.',
      requestedRole,
      status: 'pending'
    });
  } catch (error) {
    logger.error('Role request error:', error);
    res.status(500).json({ error: 'Failed to submit role request.' });
  }
};

/**
 * 🎯 GET PENDING ROLE REQUESTS (SuperAdmin only)
 */
export const getPendingRoleRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'roleRequestedAt', order = 'desc' } = req.query;

    const requests = await User.find({ 
      roleStatus: 'pending',
      requestedRole: { $exists: true }
    })
    .select('name email requestedRole roleRequestMessage roleRequestedAt profilePicture')
    .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const total = await User.countDocuments({ 
      roleStatus: 'pending',
      requestedRole: { $exists: true }
    });

    res.json({
      requests,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    logger.error('Error fetching role requests:', error);
    res.status(500).json({ error: 'Failed to fetch role requests.' });
  }
};

/**
 * 🎯 APPROVE/REJECT ROLE REQUEST (SuperAdmin only)
 */
export const processRoleRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action. Use approve or reject.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.roleStatus !== 'pending') {
      return res.status(400).json({ error: 'No pending role request for this user.' });
    }

    if (action === 'approve') {
      // Approve the role
      user.role = user.requestedRole;
      user.roleStatus = 'approved';
      user.roleApprovedBy = req.user._id;
      user.roleApprovedAt = new Date();
      
      // Clear request data
      user.requestedRole = null;
      user.roleRequestMessage = null;

      await user.save();

      // Send approval notification
      await sendRoleApprovalNotification(user.email, {
        userName: user.name,
        newRole: user.role,
        approvedBy: req.user.name
      });

      res.json({ 
        message: 'Role request approved successfully.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          approvedAt: user.roleApprovedAt
        }
      });
    } else {
      // Reject the role
      user.roleStatus = 'rejected';
      user.roleApprovedBy = req.user._id;
      user.roleApprovedAt = new Date();

      await user.save();

      // Send rejection notification
      await sendRoleRejectionNotification(user.email, {
        userName: user.name,
        requestedRole: user.requestedRole,
        rejectionReason: rejectionReason || 'No reason provided',
        rejectedBy: req.user.name
      });

      res.json({ 
        message: 'Role request rejected.',
        rejectionReason 
      });
    }
  } catch (error) {
    logger.error('Role processing error:', error);
    res.status(500).json({ error: 'Failed to process role request.' });
  }
};

/**
 * 🎯 GET USER'S ROLE STATUS
 */
export const getUserRoleStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('role roleStatus requestedRole roleRequestedAt roleApprovedAt')
      .populate('roleApprovedBy', 'name');

    res.json({
      currentRole: user.role,
      roleStatus: user.roleStatus,
      requestedRole: user.requestedRole,
      requestedAt: user.roleRequestedAt,
      approvedAt: user.roleApprovedAt,
      approvedBy: user.roleApprovedBy
    });
  } catch (error) {
    logger.error('Error fetching role status:', error);
    res.status(500).json({ error: 'Failed to fetch role status.' });
  }
};

/**
 * 🎯 BULK ROLE MANAGEMENT (SuperAdmin only)
 */
export const bulkRoleUpdate = async (req, res) => {
  try {
    const { userIds, action, newRole } = req.body; // action: 'approve_all', 'reject_all', 'assign_role'

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'User IDs array is required.' });
    }

    let updateQuery = {};
    let results = [];

    if (action === 'approve_all') {
      const users = await User.find({ 
        _id: { $in: userIds }, 
        roleStatus: 'pending' 
      });

      for (const user of users) {
        if (user.requestedRole) {
          user.role = user.requestedRole;
          user.roleStatus = 'approved';
          user.roleApprovedBy = req.user._id;
          user.roleApprovedAt = new Date();
          user.requestedRole = null;
          user.roleRequestMessage = null;

          await user.save();

          // Send notification
          await sendRoleApprovalNotification(user.email, {
            userName: user.name,
            newRole: user.role,
            approvedBy: req.user.name
          });

          results.push({
            userId: user._id,
            name: user.name,
            newRole: user.role,
            status: 'approved'
          });
        }
      }
    } else if (action === 'reject_all') {
      await User.updateMany(
        { _id: { $in: userIds }, roleStatus: 'pending' },
        { 
          roleStatus: 'rejected',
          roleApprovedBy: req.user._id,
          roleApprovedAt: new Date()
        }
      );

      const users = await User.find({ _id: { $in: userIds } });
      for (const user of users) {
        await sendRoleRejectionNotification(user.email, {
          userName: user.name,
          requestedRole: user.requestedRole,
          rejectionReason: 'Bulk rejection by admin',
          rejectedBy: req.user.name
        });

        results.push({
          userId: user._id,
          name: user.name,
          status: 'rejected'
        });
      }
    }

    res.json({ 
      message: `Bulk ${action} completed successfully.`,
      results
    });
  } catch (error) {
    logger.error('Bulk role update error:', error);
    res.status(500).json({ error: 'Failed to perform bulk role update.' });
  }
};

/**
 * 📧 EMAIL NOTIFICATION FUNCTIONS
 */

const sendRoleRequestNotification = async (adminEmail, requestData) => {
  const subject = 'New Role Request - AGS Admin';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10B981, #3B82F6); color: white; padding: 20px; text-align: center;">
        <h1>🎯 New Role Request</h1>
      </div>
      
      <div style="padding: 20px; background: #f9fafb;">
        <h2>Role Request Details</h2>
        <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
          <p><strong>User:</strong> ${requestData.userName}</p>
          <p><strong>Email:</strong> ${requestData.userEmail}</p>
          <p><strong>Requested Role:</strong> <span style="color: #10B981; font-weight: bold;">${requestData.requestedRole.toUpperCase()}</span></p>
          <p><strong>Request Date:</strong> ${requestData.requestDate.toLocaleDateString()}</p>
          ${requestData.message ? `<p><strong>Message:</strong></p><div style="background: #f3f4f6; padding: 10px; border-radius: 4px; font-style: italic;">${requestData.message}</div>` : ''}
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${process.env.ADMIN_PANEL_URL}/users/role-requests" 
             style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Review Request
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          Please review this request in the admin panel and approve or reject accordingly.
        </p>
      </div>
    </div>
  `;
  
  await sendEmail(adminEmail, subject, html);
};

const sendRoleApprovalNotification = async (userEmail, approvalData) => {
  const subject = 'Role Request Approved - Welcome to AGS Team!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #10B981, #34D399); color: white; padding: 20px; text-align: center;">
        <h1>🎉 Congratulations!</h1>
        <h2>Your Role Request Has Been Approved</h2>
      </div>
      
      <div style="padding: 20px; background: #f0fdf4;">
        <p>Dear ${approvalData.userName},</p>
        
        <p>Great news! Your request for <strong style="color: #10B981;">${approvalData.newRole.toUpperCase()}</strong> role has been approved by ${approvalData.approvedBy}.</p>
        
        <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #10B981; margin: 20px 0;">
          <h3 style="color: #10B981; margin-top: 0;">Your New Permissions Include:</h3>
          ${approvalData.newRole === 'editor' ? `
            <ul>
              <li>✅ Create and edit blog posts</li>
              <li>✅ Manage events and resources</li>
              <li>✅ Publish content</li>
              <li>✅ Access analytics dashboard</li>
            </ul>
          ` : `
            <ul>
              <li>✅ Full content management</li>
              <li>✅ User management (except SuperAdmin)</li>
              <li>✅ Analytics and reporting</li>
              <li>✅ System configuration</li>
            </ul>
          `}
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${process.env.ADMIN_PANEL_URL}" 
             style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Access Admin Panel
          </a>
        </div>
        
        <p>Welcome to the AGS team! We're excited to have you contribute to Ghana's startup ecosystem.</p>
        
        <p style="color: #6b7280; font-size: 14px;">
          If you have any questions about your new role, feel free to reach out to our support team.
        </p>
      </div>
    </div>
  `;
  
  await sendEmail(userEmail, subject, html);
};

const sendRoleRejectionNotification = async (userEmail, rejectionData) => {
  const subject = 'Role Request Update - AGS';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #EF4444, #F87171); color: white; padding: 20px; text-align: center;">
        <h1>Role Request Update</h1>
      </div>
      
      <div style="padding: 20px; background: #fef2f2;">
        <p>Dear ${rejectionData.userName},</p>
        
        <p>Thank you for your interest in taking on a <strong>${rejectionData.requestedRole}</strong> role with AGS.</p>
        
        <p>After careful consideration, we have decided not to approve your role request at this time.</p>
        
        ${rejectionData.rejectionReason !== 'No reason provided' ? `
          <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #EF4444; margin: 20px 0;">
            <h4 style="color: #EF4444; margin-top: 0;">Reason:</h4>
            <p>${rejectionData.rejectionReason}</p>
          </div>
        ` : ''}
        
        <p>This doesn't mean you can't contribute to AGS! You can:</p>
        <ul>
          <li>Continue as a registered member with access to resources</li>
          <li>Participate in events and networking opportunities</li>
          <li>Reapply for a role in the future</li>
          <li>Contribute to the community in other ways</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${process.env.FRONTEND_URL}" 
             style="background: #6b7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Continue as Member
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          If you have questions about this decision, please contact our support team.
        </p>
      </div>
    </div>
  `;
  
  await sendEmail(userEmail, subject, html);
};

export default {
  requestRoleUpgrade,
  getPendingRoleRequests,
  processRoleRequest,
  getUserRoleStatus,
  bulkRoleUpdate
};
