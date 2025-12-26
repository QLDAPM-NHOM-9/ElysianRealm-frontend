import axiosClient from './axiosClient.js';

/**
 * Tour Service - Handle tour related API calls
 */

// Temporary test script to create bulk tours for testing
export const createBulkTours = async (tourDataArray) => {
  const results = [];
  for (const tourData of tourDataArray) {
    try {
      const response = await axiosClient.post('/admin/tours', tourData);
      results.push({ success: true, id: response.data?.data?.id, title: tourData.title });
      console.log(`✅ Created tour: ${tourData.title}`);
    } catch (error) {
      results.push({
        success: false,
        title: tourData.title,
        error: error.response?.data?.message || error.message
      });
      console.error(`❌ Failed to create tour: ${tourData.title}`, error.response?.data || error);
    }
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  return results;
};

// Generate random test tours for development
export const generateTestTours = (count = 10) => {
  const locations = [
    "Ha Nội, Việt Nam",
    "Hồ Chí Minh, Việt Nam",
    "Đà Nẵng, Việt Nam",
    "Nha Trang, Việt Nam",
    "Đà Lạt, Việt Nam",
    "Sapa, Việt Nam",
    "Hội An, Việt Nam",
    "Phong Nha, Việt Nam",
    "Cần Thơ, Việt Nam",
    "Hạ Long, Việt Nam",
    "Phú Quốc, Việt Nam",
    "Biển Ba, Việt Nam"
  ];

  const destinations = [
    "Núi rừng miền Bắc",
    "Du lịch biển miền Trung",
    "Khám phá Tây Nguyên",
    "Tham quan miền Tây sông nước",
    "Trải nghiệm phố cổ",
    "Thắng cảnh đẹp"
  ];

  const tourTypes = [
    "Tour trọn gói",
    "Tour mạo hiểm",
    "Tour văn hóa",
    "Tour ốc đảo",
    "Tour kết hợp"
  ];

  const tours = [];

  for (let i = 0; i < count; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const tourType = tourTypes[Math.floor(Math.random() * tourTypes.length)];
    const dayCount = Math.floor(Math.random() * 5) + 2; // 2-6 days

    // Random future date (next 60 days)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60) + 1);
    const dateString = startDate.toISOString().split('T')[0];

    tours.push({
      title: `${tourType} khám phá ${location}`,
      location: location,
      price: Math.floor(Math.random() * 5000000) + 1000000, // VND 1M-6M
      description: `${tourType} độc đáo đến ${destination} tại ${location}. Chương trình ${dayCount} ngày ${dayCount - 1} đêm với đầy đủ hoạt động thú vị, trải nghiệm văn hóa địa phương và thưởng thức ẩm thực đặc sắc. Giá tour bao gồm: vận chuyển, khách sạn, bữa ăn, hướng dẫn viên và các dịch vụ khác.`,
      imageUrl: `https://picsum.photos/800/600?random=${i + 100}`,
      duration: `${dayCount} ngày ${dayCount - 1} đêm`,
      gallery: [
        `https://picsum.photos/400/300?random=${i + 200}`,
        `https://picsum.photos/400/300?random=${i + 300}`,
        `https://picsum.photos/400/300?random=${i + 400}`
      ],
      startDate: dateString,
      itinerary: [
        `Ngày 1: Xuất phát từ thành phố, nhận phòng khách sạn tại ${location}`,
        `Ngày 2: Tham quan các điểm nổi tiếng, trải nghiệm hoạt động địa phương`,
        `Ngày 3: Học hỏi văn hóa, thử ẩm thực đặc trưng vùng miền`,
        `Ngày 4: Tham gia hoạt động team building, ghi lại kỷ niệm`,
        `Ngày ${dayCount}: Trả phòng, trở về với bao kỷ niệm đáng nhớ`
      ]
    });
  }

  return tours;
};

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
      const response = await axiosClient.get('/tours/featured');
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Create new tour (Admin only)
   * @param {Object} tourData - Tour data object
   * @returns {Promise<Object>}
   */
  create: async (tourData) => {
    try {
      const response = await axiosClient.post('/admin/tours', tourData);
      return response.data || response;
    } catch (error) {
      console.error('Tour creation failed:', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  /**
   * Update existing tour (Admin only)
   * @param {number} id - Tour ID
   * @param {Object} tourData - Updated tour data object
   * @returns {Promise<Object>}
   */
  update: async (id, tourData) => {
    try {
      // Convert to FormData for multipart/form-data request
      const formData = new FormData();

      // Add the data as a JSON string in the "data" part
      formData.append('data', new Blob([JSON.stringify(tourData)], {
        type: 'application/json'
      }));

      // TODO: Add image support if needed in future
      // formData.append('image', imageFile);

      const response = await axiosClient.put(`/admin/tours/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data || response;
    } catch (error) {
      console.error('Tour update failed:', error.response?.data || error);
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

  /**
   * Add tour to favorites
   * @param {number} tourId
   * @returns {Promise<Object>}
   */
  addToFavorites: async (tourId) => {
    try {
      const response = await axiosClient.post('/favorites/tours', { tourId });
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Remove tour from favorites
   * @param {number} tourId
   * @returns {Promise<Object>}
   */
  removeFromFavorites: async (tourId) => {
    try {
      const response = await axiosClient.delete(`/favorites/tours/${tourId}`);
      return response.data || response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Check if tour is favorite
   * @param {number} tourId
   * @returns {Promise<boolean>}
   */
  checkIsFavorite: async (tourId) => {
    try {
      const response = await axiosClient.get(`/favorites/tours/${tourId}/check`);
      return response.data ? response.data.isFavorite : false;
    } catch (error) {
      // If error (not favorite), return false
      return false;
    }
  },
};

export default tourService;
