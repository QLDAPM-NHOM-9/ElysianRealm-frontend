import axiosClient from './axiosClient.js';

/**
 * Auth Service - Handle authentication related API calls
 */
export const authService = {
  /**
   * Login user with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise} {token, user}
   */
  login: async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', {
        email,
        password,
      });
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - {email, password, name}
   * @returns {Promise}
   */
  register: async (userData) => {
    try {
      const response = await axiosClient.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout user - remove token from localStorage
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Get current user info
   * @returns {Promise}
   */
  getCurrentUser: async () => {
    try {
      const response = await axiosClient.get('/auth/me');
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Verify reset password code
   * @param {string} code
   * @returns {Promise}
   */
  verifyCode: async (code) => {
    try {
      const response = await axiosClient.post('/auth/verify-code', { code });
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Request password reset
   * @param {string} email
   * @returns {Promise}
   */
  forgotPassword: async (email) => {
    try {
      const response = await axiosClient.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Reset password with code and new password
   * @param {string} code
   * @param {string} password
   * @returns {Promise}
   */
  resetPassword: async (code, password) => {
    try {
      const response = await axiosClient.post('/auth/reset-password', {
        code,
        password,
      });
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - {name, email, password, avatar}
   * @returns {Promise}
   */
  updateProfile: async (profileData) => {
    try {
      const response = await axiosClient.put('/auth/me', profileData);
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default authService;
