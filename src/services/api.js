import axiosClient from './axiosClient.js';

/**
 * Booking Service - Handle booking/order related API calls
 */
export const bookingService = {
  /**
   * Get user's booking history
   * @returns {Promise<Array>}
   */
  getMyBookings: async () => {
    try {
      const response = await axiosClient.get('/bookings/my-bookings');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get single booking by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    try {
      const response = await axiosClient.get(`/bookings/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new booking
   * @param {Object} bookingData - {type: 'tour'|'flight', itemId: number, guests: number, date: string, paymentMethod: string}
   * @returns {Promise<Object>}
   */
  create: async (bookingData) => {
    try {
      const response = await axiosClient.post('/bookings', bookingData);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Cancel booking
   * @param {string} id
   * @returns {Promise}
   */
  cancel: async (id) => {
    try {
      const response = await axiosClient.put(`/bookings/${id}/status`, {
        status: 'cancelled',
      });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all bookings (Admin only)
   * @returns {Promise<Array>}
   */
  getAllBookings: async () => {
    try {
      const response = await axiosClient.get('/admin/bookings');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get single booking by ID (Admin only)
   * @param {string} id
   * @returns {Promise<Object>}
   */
  getByIdAdmin: async (id) => {
    try {
      const response = await axiosClient.get(`/admin/bookings/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update booking status (Admin only)
   * @param {string} id
   * @param {string} status - 'COMPLETED' or 'CANCELLED'
   * @returns {Promise}
   */
  updateStatus: async (id, status) => {
    try {
      const response = await axiosClient.put(`/admin/bookings/${id}/status`, {
        status,
      });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

/**
 * Admin Service - Handle admin related API calls
 */
export const adminService = {
  /**
   * Get dashboard statistics
   * @returns {Promise<Object>}
   */
  getStats: async () => {
    try {
      const response = await axiosClient.get('/admin/stats');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get chart data for dashboard
   * @returns {Promise<Object>}
   */
  getChartData: async () => {
    try {
      const response = await axiosClient.get('/admin/chart-data');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get all users
   * @returns {Promise<Array>}
   */
  getUsers: async () => {
    try {
      const response = await axiosClient.get('/admin/users');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new user (Admin only)
   * @param {Object} userData - {email, password, name, role, avatar}
   * @returns {Promise<Object>}
   */
  createUser: async (userData) => {
    try {
      const response = await axiosClient.post('/admin/users', userData);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update user (Admin only)
   * @param {string|number} id - User ID
   * @param {Object} userData - {name, email, role, avatar, isActive}
   * @returns {Promise<Object>}
   */
  updateUser: async (id, userData) => {
    try {
      const response = await axiosClient.put(`/admin/users/${id}`, userData);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete user (Admin only)
   * @param {string|number} id - User ID
   * @returns {Promise<Object>}
   */
  deleteUser: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/users/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Toggle user status (Admin only)
   * @param {string|number} id - User ID
   * @returns {Promise<Object>}
   */
  toggleUserStatus: async (id) => {
    try {
      const response = await axiosClient.patch(`/admin/users/${id}/toggle-status`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

/**
 * Review Service - Handle review related API calls
 */
export const reviewService = {
  /**
   * Create new review
   * @param {Object} reviewData - {type: string, itemId: number, rating: number, text: string, author: string, avatar: string}
   * @returns {Promise<Object>}
   */
  create: async (reviewData) => {
    try {
      console.log('Sending review data:', reviewData);
      const response = await axiosClient.post('/reviews/json', reviewData);
      console.log('Review creation response:', response);
      return response.data || response;
    } catch (error) {
      console.error('Review creation error:', error);
      console.error('Error response:', error.response);
      throw error.response?.data || error;
    }
  },

  /**
   * Get featured reviews for homepage
   * @returns {Promise<Array>}
   */
  getFeatured: async () => {
    try {
      const response = await axiosClient.get('/reviews/featured');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get reviews by item ID and type
   * @param {string} id - Item ID
   * @param {string} type - Item type (TOUR, FLIGHT, etc.)
   * @returns {Promise<Array>}
   */
  getReviewsByItem: async (id, type) => {
    try {
      const response = await axiosClient.get(`/reviews/item/${id}`, {
        params: { type }
      });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

/**
 * Home Service - Handle homepage related API calls
 */
export const homeApi = {
  /**
   * Get popular destinations
   * @returns {Promise<Array>}
   */
  getDestinations: async () => {
    try {
      const response = await axiosClient.get('/destinations/popular');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get featured reviews for homepage
   * @returns {Promise<Array>}
   */
  getReviews: async () => {
    try {
      const response = await axiosClient.get('/reviews/featured');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default bookingService;
