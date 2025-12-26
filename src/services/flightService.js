import axiosClient from './axiosClient.js';

/**
 * Flight Service - Handle flight related API calls
 */
export const flightService = {
  /**
   * Get all flights or search flights with filters
   * @param {Object} params - {q: keyword, from: departure code, to: arrival code, date: departure date}
   * @returns {Promise<Array>}
   */
  getAll: async (params = {}) => {
    try {
      const response = await axiosClient.get('/flights', { params });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get single flight by ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  getById: async (id) => {
    try {
      const response = await axiosClient.get(`/flights/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Search flights by route and date
   * @param {string} from - Departure airport code
   * @param {string} to - Arrival airport code
   * @param {string} date - Departure date (YYYY-MM-DD)
   * @returns {Promise<Array>}
   */
  search: async (from, to, date) => {
    try {
      const response = await axiosClient.get('/flights', {
        params: { from, to, date },
      });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Get featured flights for homepage
   * @returns {Promise<Array>}
   */
  getFeatured: async () => {
    try {
      const response = await axiosClient.get('/flights/featured');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new flight (Admin only)
   * @param {FormData} flightData - FormData with flight data and optional logo
   * @returns {Promise<Object>}
   */
  create: async (flightData) => {
    try {
      const response = await axiosClient.post('/admin/flights', flightData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Update flight (Admin only)
   * @param {number} id
   * @param {FormData} flightData - FormData with flight data and optional logo
   * @returns {Promise<Object>}
   */
  update: async (id, flightData) => {
    try {
      const response = await axiosClient.put(`/admin/flights/${id}`, flightData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create multiple flights in bulk (Admin only)
   * @param {Array} flightDataArray - Array of flight data objects
   * @returns {Promise<Object>}
   */
  createBulk: async (flightDataArray) => {
    try {
      const response = await axiosClient.post('/admin/flights/bulk', flightDataArray);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Delete flight (Admin only)
   * @param {number} id
   * @returns {Promise}
   */
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/flights/${id}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default flightService;
