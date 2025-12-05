import axiosClient from './axiosClient.js';

/**
 * Tour Service - Handle tour related API calls
 */
export const tourService = {
  /**
   * Get all tours with optional search and sorting
   * @param {Object} params - {q: search keyword, sort: price-asc|price-desc}
   * @returns {Promise<Array>}
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosClient.get('/tours', { params });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get single tour by ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    try {
      const response = await axiosClient.get(`/tours/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get featured/popular tours for homepage
   * @returns {Promise<Array>}
   */
  getPopular: async () => {
    try {
      const response = await axiosClient.get('/destinations/popular');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new tour (Admin only)
   * @param {Object} tourData
   * @returns {Promise<Object>}
   */
  create: async (tourData) => {
    try {
      const response = await axiosClient.post('/admin/tours', tourData);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete tour (Admin only)
   * @param {number} id
   * @returns {Promise}
   */
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/tours/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Search tours by query and sort
   * @param {string} q - Search keyword (name or location)
   * @param {string} sort - Sort order (price-asc or price-desc)
   * @returns {Promise<Array>}
   */
  search: async (q = '', sort = 'price-asc') => {
    try {
      const response = await axiosClient.get('/tours', {
        params: { q, sort },
      });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default tourService;
