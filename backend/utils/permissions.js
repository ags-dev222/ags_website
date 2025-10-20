// Role-Based Access Control (RBAC) Permission System
export const ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin', 
  EDITOR: 'editor',
  REGISTERED: 'registered',
  PUBLIC: 'public'
};

export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: 'canManageUsers',
  VIEW_USERS: 'canViewUsers',
  CREATE_USERS: 'canCreateUsers',
  DELETE_USERS: 'canDeleteUsers',
  
  // Content Management
  MANAGE_CONTENT: 'canManageContent',
  CREATE_CONTENT: 'canCreateContent',
  EDIT_CONTENT: 'canEditContent',
  PUBLISH_CONTENT: 'canPublishContent',
  DELETE_CONTENT: 'canDeleteContent',
  
  // System Settings
  MANAGE_SETTINGS: 'canManageSettings',
  VIEW_SETTINGS: 'canViewSettings',
  
  // Analytics & Reports
  VIEW_ANALYTICS: 'canViewAnalytics',
  EXPORT_DATA: 'canExportData'
};

// Define role permissions
export const ROLE_PERMISSIONS = {
  [ROLES.SUPERADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_DATA
  ],
  
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_DATA
  ],
  
  [ROLES.EDITOR]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
    PERMISSIONS.VIEW_SETTINGS
  ],
  
  [ROLES.REGISTERED]: [
    PERMISSIONS.VIEW_USERS
  ],
  
  [ROLES.PUBLIC]: []
};

// Check if user has specific permission
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  
  const rolePermissions = ROLE_PERMISSIONS[user.role] || [];
  return rolePermissions.includes(permission);
};

// Check if user has any of the specified permissions
export const hasAnyPermission = (user, permissions) => {
  return permissions.some(permission => hasPermission(user, permission));
};

// Check if user has all specified permissions
export const hasAllPermissions = (user, permissions) => {
  return permissions.every(permission => hasPermission(user, permission));
};

// Get all permissions for a role
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

// Middleware to check specific permission
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!hasPermission(req.user, permission)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: permission,
        userRole: req.user.role 
      });
    }
    
    next();
  };
};

// Middleware to check multiple permissions (user needs ANY of them)
export const requireAnyPermission = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!hasAnyPermission(req.user, permissions)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: permissions,
        userRole: req.user.role 
      });
    }
    
    next();
  };
};

// Middleware to check multiple permissions (user needs ALL of them)
export const requireAllPermissions = (permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!hasAllPermissions(req.user, permissions)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: permissions,
        userRole: req.user.role 
      });
    }
    
    next();
  };
};
