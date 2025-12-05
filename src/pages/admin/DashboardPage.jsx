import React, { useState, useEffect } from 'react';
import { bookingService, adminService } from '../../services/api.js';
import tourService from '../../services/tourService.js';
import flightService from '../../services/flightService.js';
import Spinner from '../../components/common/Spinner.jsx';

// Component con: Thẻ thống kê
const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-sm border border-border-primary">
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full ${colorClass} text-white text-xl`}
    >
      {icon}
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-text-secondary">{title}</p>
      <p className="text-3xl font-bold text-text-primary">{value}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    totalBookings: 0,
    totalFlights: 0,
    totalTours: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Try to get admin stats
        let adminStats = null;
        try {
          adminStats = await adminService.getStats();
        } catch (err) {
          console.log('Admin stats not available');
        }

        // Fetch bookings and products
        const [bookings, flights, tours] = await Promise.all([
          bookingService.getAllBookings().catch(() => []),
          flightService.getAll().catch(() => []),
          tourService.getAll().catch(() => []),
        ]);

        // Calculate statistics
        const bookingsArray = Array.isArray(bookings) ? bookings : [];
        const flightsArray = Array.isArray(flights) ? flights : [];
        const toursArray = Array.isArray(tours) ? tours : [];

        const totalRevenue = adminStats?.revenue || bookingsArray.length * 300;

        setStats({
          revenue: totalRevenue,
          totalBookings: bookingsArray.length,
          totalFlights: flightsArray.length,
          totalTours: toursArray.length,
        });

        // Set recent bookings
        setRecentBookings(bookingsArray.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setError('Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6 font-serif">Tổng quan</h1>

      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          {error}
        </div>
      )}

      {/* Lưới các thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Doanh thu (Ước tính)"
          value={`$${stats.revenue.toLocaleString()}`}
          icon="💰"
          colorClass="bg-brand-primary"
        />
        <StatCard
          title="Tổng Đơn hàng"
          value={stats.totalBookings}
          icon="📦"
          colorClass="bg-brand-secondary"
        />
        <StatCard
          title="Chuyến bay hiện có"
          value={stats.totalFlights}
          icon="✈️"
          colorClass="bg-blue-500"
        />
        <StatCard
          title="Tour hiện có"
          value={stats.totalTours}
          icon="🗺️"
          colorClass="bg-green-500"
        />
      </div>

      {/* Bảng đơn hàng gần đây */}
      <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary overflow-hidden">
        <h3 className="text-lg font-bold p-6 text-text-primary border-b border-border-primary">
          Đơn hàng gần đây
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-primary">
              <tr>
                <th className="p-4 font-semibold text-text-secondary">ID</th>
                <th className="p-4 font-semibold text-text-secondary">Loại</th>
                <th className="p-4 font-semibold text-text-secondary">Tên dịch vụ</th>
                <th className="p-4 font-semibold text-text-secondary">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-brand-primary">#{booking.id}</td>
                  <td className="p-4 capitalize">{booking.type}</td>
                  <td className="p-4 text-text-primary">
                    {booking.type === 'flight' 
                      ? `${booking.details.airline} (${booking.details.from} - ${booking.details.to})`
                      : booking.details.name || booking.details.title}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {booking.status}
                    </span>
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

export default DashboardPage;