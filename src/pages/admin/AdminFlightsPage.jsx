import React, { useState, useEffect } from 'react';
import flightService from '../../services/flightService.js';
import Spinner from '../../components/common/Spinner.jsx';
import Button from '../../components/common/Button.jsx';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiArrowRight } from 'react-icons/fi';

const AdminFlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await flightService.getAll();
        setFlights(data);
      } catch (error) {
        console.error("Failed to load flights", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-serif">Quản lý Chuyến bay</h1>
          <p className="text-text-secondary mt-1">Kiểm soát các chuyến bay, hãng hàng không và lịch trình.</p>
        </div>
        <Button className="flex items-center gap-2">
          <FiPlus /> Thêm Chuyến Bay
        </Button>
      </div>
      
      {/* Bảng Danh sách */}
      <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-primary">
              <tr>
                <th className="p-4 font-semibold text-text-secondary w-16">ID</th>
                <th className="p-4 font-semibold text-text-secondary">Hãng bay</th>
                <th className="p-4 font-semibold text-text-secondary">Lộ trình</th>
                <th className="p-4 font-semibold text-text-secondary">Giờ bay</th>
                <th className="p-4 font-semibold text-text-secondary">Giá vé</th>
                <th className="p-4 font-semibold text-text-secondary text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {flights.map((flight) => (
                <tr key={flight.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-medium text-text-tertiary">#{flight.id}</td>
                  
                  {/* Cột Hãng bay */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-border-primary flex items-center justify-center p-1">
                        <img src={flight.logoUrl} alt={flight.airline} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-text-primary">{flight.airline}</span>
                    </div>
                  </td>

                  {/* Cột Lộ trình */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                      <span className="bg-gray-100 px-2 py-1 rounded">{flight.from}</span>
                      <FiArrowRight className="text-text-tertiary" />
                      <span className="bg-gray-100 px-2 py-1 rounded">{flight.to}</span>
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                        {flight.isNonStop ? 'Bay thẳng' : 'Có điểm dừng'}
                    </div>
                  </td>

                  {/* Cột Giờ bay */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-text-primary">
                      <FiClock className="text-brand-primary" />
                      {flight.departureTime} - {flight.arrivalTime}
                    </div>
                    <p className="text-xs text-text-secondary mt-1 pl-6">
                        Thời lượng: {flight.duration}
                    </p>
                  </td>

                  {/* Cột Giá */}
                  <td className="p-4 font-bold text-brand-secondary">
                    ${flight.price}
                  </td>

                  {/* Cột Hành động */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                        <FiEdit2 />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFlightsPage;