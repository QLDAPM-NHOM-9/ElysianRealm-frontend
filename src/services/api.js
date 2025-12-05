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
   * Update booking status (Admin only)
   * @param {string} id
   * @param {string} status - 'completed' or 'cancelled'
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
};

/**
 * Review Service - Handle review related API calls
 */
export const reviewService = {
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