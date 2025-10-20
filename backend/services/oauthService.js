import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { randomBytes } from 'crypto';
import logger from '../utils/log.js';

// Initialize OAuth clients
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/**
 * 🔐 GOOGLE OAUTH SERVICE
 */
export class GoogleOAuthService {
  static async verifyToken(token) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      
      const payload = ticket.getPayload();
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        verified: payload.email_verified
      };
    } catch (error) {
      logger.error('Google token verification failed:', error);
      throw new Error('Invalid Google token');
    }
  }

  static getAuthUrl(state) {
    return googleClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
      state: state
    });
  }

  static async exchangeCodeForTokens(code) {
    try {
      const { tokens } = await googleClient.getAccessToken(code);
      return tokens;
    } catch (error) {
      logger.error('Google code exchange failed:', error);
      throw new Error('Failed to exchange Google code for tokens');
    }
  }
}

/**
 * 🍎 APPLE OAUTH SERVICE
 */
export class AppleOAuthService {
  static async verifyToken(identityToken) {
    try {
      // Verify Apple JWT token
      const decoded = jwt.decode(identityToken, { complete: true });
      
      if (!decoded) {
        throw new Error('Invalid Apple token format');
      }

      // Get Apple's public keys
      const response = await axios.get('https://appleid.apple.com/auth/keys');
      const keys = response.data.keys;

      // Find the correct key
      const key = keys.find(k => k.kid === decoded.header.kid);
      if (!key) {
        throw new Error('Apple public key not found');
      }

      // Verify the token
      const verified = jwt.verify(identityToken, key, {
        algorithms: ['RS256'],
        audience: process.env.APPLE_CLIENT_ID,
        issuer: 'https://appleid.apple.com'
      });

      return {
        id: verified.sub,
        email: verified.email,
        name: verified.name || 'Apple User',
        verified: verified.email_verified !== false
      };
    } catch (error) {
      logger.error('Apple token verification failed:', error);
      throw new Error('Invalid Apple token');
    }
  }

  static getAuthUrl(state) {
    const params = new URLSearchParams({
      client_id: process.env.APPLE_CLIENT_ID,
      redirect_uri: process.env.APPLE_REDIRECT_URI,
      response_type: 'code id_token',
      scope: 'name email',
      response_mode: 'form_post',
      state: state
    });

    return `https://appleid.apple.com/auth/authorize?${params.toString()}`;
  }
}

/**
 * 💼 LINKEDIN OAUTH SERVICE
 */
export class LinkedInOAuthService {
  static async verifyToken(accessToken) {
    try {
      // Get user profile from LinkedIn API
      const profileResponse = await axios.get('https://api.linkedin.com/v2/people/~', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const profile = profileResponse.data;
      const email = emailResponse.data.elements[0]['handle~'].emailAddress;

      return {
        id: profile.id,
        email: email,
        name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
        picture: profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier,
        verified: true
      };
    } catch (error) {
      logger.error('LinkedIn token verification failed:', error);
      throw new Error('Invalid LinkedIn token');
    }
  }

  static getAuthUrl(state) {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.LINKEDIN_CLIENT_ID,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      state: state,
      scope: 'r_liteprofile r_emailaddress'
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  static async exchangeCodeForToken(code) {
    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
      });

      return response.data.access_token;
    } catch (error) {
      logger.error('LinkedIn code exchange failed:', error);
      throw new Error('Failed to exchange LinkedIn code for token');
    }
  }
}

/**
 * 🔄 OAUTH STATE MANAGER
 * Manages OAuth state tokens for security
 */
export class OAuthStateManager {
  static generateState() {
    return randomBytes(32).toString('hex');
  }

  static createStateToken(provider, userId = null) {
    const state = this.generateState();
    const payload = {
      provider,
      userId,
      timestamp: Date.now(),
      state
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
  }

  static verifyState(stateToken) {
    try {
      const decoded = jwt.verify(stateToken, process.env.JWT_SECRET);
      
      // Check if state is not too old (10 minutes max)
      if (Date.now() - decoded.timestamp > 10 * 60 * 1000) {
        throw new Error('State token expired');
      }
      
      return decoded;
    } catch (error) {
      logger.error('OAuth state verification failed:', error);
      throw new Error('Invalid or expired state token');
    }
  }
}

/**
 * 🎯 UNIFIED OAUTH SERVICE
 * Handles all OAuth providers in one place
 */
export class UnifiedOAuthService {
  static async handleOAuthLogin(provider, token, state) {
    try {
      // Verify state token
      const stateData = OAuthStateManager.verifyState(state);
      
      if (stateData.provider !== provider) {
        throw new Error('Provider mismatch in state token');
      }

      let userData;

      switch (provider) {
        case 'google':
          userData = await GoogleOAuthService.verifyToken(token);
          break;
        case 'apple':
          userData = await AppleOAuthService.verifyToken(token);
          break;
        case 'linkedin':
          userData = await LinkedInOAuthService.verifyToken(token);
          break;
        default:
          throw new Error('Unsupported OAuth provider');
      }

      return {
        provider,
        ...userData
      };
    } catch (error) {
      logger.error(`OAuth login failed for ${provider}:`, error);
      throw error;
    }
  }

  static getProviderAuthUrl(provider, userId = null) {
    const state = OAuthStateManager.createStateToken(provider, userId);
    
    switch (provider) {
      case 'google':
        return GoogleOAuthService.getAuthUrl(state);
      case 'apple':
        return AppleOAuthService.getAuthUrl(state);
      case 'linkedin':
        return LinkedInOAuthService.getAuthUrl(state);
      default:
        throw new Error('Unsupported OAuth provider');
    }
  }
}

export default {
  GoogleOAuthService,
  AppleOAuthService,
  LinkedInOAuthService,
  OAuthStateManager,
  UnifiedOAuthService
};
