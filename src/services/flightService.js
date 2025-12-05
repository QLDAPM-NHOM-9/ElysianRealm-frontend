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
};

export default flightService;
