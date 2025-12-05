import React, { useState, useEffect } from 'react';
import tourService from '../../services/tourService.js';
import Spinner from '../../components/common/Spinner.jsx';
import Button from '../../components/common/Button.jsx';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';

const AdminToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Gọi API lấy danh sách Tour
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await tourService.getAll();
        setTours(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load tours', err);
        setError('Không thể tải danh sách tour');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleDeleteTour = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tour này?')) return;

    try {
      await tourService.delete(id);
      setTours(tours.filter((t) => t.id !== id));
    } catch (err) {
      alert('Xóa tour thất bại: ' + (err.message || 'Vui lòng thử lại'));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div>
      {/* Header trang */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-serif">
            Quản lý Tour
          </h1>
          <p className="text-text-secondary mt-1">
            Quản lý các gói tour, lịch trình và giá cả.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <FiPlus /> Thêm Tour Mới
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Bảng Danh sách Tour */}
      <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-primary">
              <tr>
                <th className="p-4 font-semibold text-text-secondary w-16">ID</th>
                <th className="p-4 font-semibold text-text-secondary">Thông tin Tour</th>
                <th className="p-4 font-semibold text-text-secondary">Địa điểm</th>
                <th className="p-4 font-semibold text-text-secondary">Thời lượng</th>
                <th className="p-4 font-semibold text-text-secondary">Giá/Khách</th>
                <th className="p-4 font-semibold text-text-secondary text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {tours.length > 0 ? (
                tours.map((tour) => (
                  <tr
                    key={tour.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="p-4 font-medium text-text-tertiary">#{tour.id}</td>

                    {/* Cột Thông tin (Ảnh + Tên) */}
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={tour.imageUrl} 
                        alt={tour.title} 
                        className="w-16 h-12 rounded-lg object-cover shadow-sm" 
                      />
                      <div className="max-w-xs">
                        <p className="font-bold text-text-primary line-clamp-1" title={tour.title}>
                          {tour.title}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-text-secondary mt-1">
                          <FiCalendar className="text-brand-primary" /> 
                          Khởi hành: {tour.startDate}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Cột Địa điểm */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <FiMapPin /> {tour.location}
                    </div>
                  </td>

                  {/* Cột Thời lượng */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <FiClock /> {tour.duration}
                    </div>
                  </td>

                  {/* Cột Giá */}
                  <td className="p-4 font-bold text-brand-secondary">${tour.price}</td>

                  {/* Cột Hành động */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteTour(tour.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-text-secondary">
                    Không có tour nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer bảng (Phân trang giả lập) */}
        <div className="p-4 border-t border-border-primary flex justify-between items-center text-sm text-text-secondary">
          <span>Hiển thị {tours.length} kết quả</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-border-primary rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              Trước
            </button>
            <button
              className="px-3 py-1 border border-border-primary rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminToursPage;