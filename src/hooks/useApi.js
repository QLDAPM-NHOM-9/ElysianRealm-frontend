import { useState, useCallback } from 'react';

/**
 * Custom Hook: useApi
 * Handles API calls with loading, error, and data states
 *
 * @example
 * const { data, loading, error, execute } = useApi();
 * const fetchTours = useCallback(async () => {
 *   await execute(tourService.getAll);
 * }, [execute]);
 */
export const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Execute API call
   * @param {Function} apiFunction - API function to call
   * @param {...any} args - Arguments to pass to API function
   * @returns {Promise}
   */
  const execute = useCallback(async (apiFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(...args);
      setData(response);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
};

export default useApi;
