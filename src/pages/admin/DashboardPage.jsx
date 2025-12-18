import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { bookingService, adminService } from '../../services/api.js';
import tourService from '../../services/tourService.js';
import flightService from '../../services/flightService.js';
import Spinner from '../../components/common/Spinner.jsx';
import { FiTrendingUp, FiUsers, FiDollarSign, FiPackage, FiActivity } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Enhanced Stat Card Component
const StatCard = ({ title, value, subtitle, icon, colorClass, trend }) => (
  <div className="bg-bg-primary p-6 rounded-xl shadow-sm border border-border-primary hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
        <p className="text-3xl font-bold text-text-primary mb-1">{value}</p>
        {subtitle && <p className="text-xs text-text-tertiary">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <FiTrendingUp className={`w-3 h-3 mr-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.value} {trend.label}
            </span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${colorClass} text-white`}>
        {icon}
      </div>
    </div>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-bg-primary rounded-xl shadow-sm border border-border-primary p-6 ${className}`}>
    <h3 className="text-lg font-bold text-text-primary mb-4">{title}</h3>
    {children}
  </div>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalFlights: 0,
    totalTours: 0,
    activeUsers: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [chartData, setChartData] = useState({
    revenueChart: null,
    bookingChart: null,
    statusChart: null,
    userGrowth: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch admin stats, chart data, bookings, and products
        const [adminStats, chartDataResponse, bookings, flights, tours] = await Promise.all([
          adminService.getStats().catch(() => ({ data: { totalUsers: 0, totalBookings: 0, totalRevenue: 0, activeUsers: 0 } })),
          adminService.getChartData().catch(() => ({ data: null })),
          bookingService.getAllBookings().catch(() => []),
          flightService.getAll().catch(() => []),
          tourService.getAll().catch(() => []),
        ]);

        // Process data
        const bookingsArray = Array.isArray(bookings) ? bookings : [];
        const flightsArray = Array.isArray(flights) ? flights : [];
        const toursArray = Array.isArray(tours) ? tours : [];

        // Set statistics from backend
        const backendStats = adminStats.data || {};
        setStats({
          totalUsers: backendStats.totalUsers || 0,
          totalBookings: backendStats.totalBookings || 0,
          totalRevenue: backendStats.totalRevenue || 0,
          totalFlights: flightsArray.length,
          totalTours: toursArray.length,
          activeUsers: backendStats.activeUsers || 0,
        });

        // Set recent bookings
        setRecentBookings(bookingsArray.slice(0, 8));

        // Process chart data from backend or generate fallback
        const backendChartData = chartDataResponse.data;
        if (backendChartData && backendChartData.labels) {
          // Use real backend data
          setChartData({
            revenueChart: {
              labels: backendChartData.labels,
              datasets: [{
                label: 'Doanh thu ($)',
                data: backendChartData.revenueData || [],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
              }]
            },
            statusChart: {
              labels: ['Hoàn thành', 'Đang xử lý', 'Đã hủy'],
              datasets: [{
                data: backendChartData.bookingStatusData || [0, 0, 0],
                backgroundColor: [
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(251, 191, 36, 0.8)',
                  'rgba(239, 68, 68, 0.8)',
                ],
                borderColor: [
                  'rgb(34, 197, 94)',
                  'rgb(251, 191, 36)',
                  'rgb(239, 68, 68)',
                ],
                borderWidth: 2,
              }]
            },
            userGrowth: {
              labels: backendChartData.labels,
              datasets: [{
                label: 'Số người dùng',
                data: backendChartData.userGrowthData || [],
                borderColor: 'rgb(168, 85, 247)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                tension: 0.4,
              }]
            },
            servicesChart: {
              labels: ['Chuyến bay', 'Tour du lịch', 'Khách sạn', 'Đi lại'],
              datasets: [{
                label: 'Số lượng đặt',
                data: backendChartData.serviceData || [0, 0, 0, 0],
                backgroundColor: [
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(16, 185, 129, 0.8)',
                  'rgba(245, 158, 11, 0.8)',
                  'rgba(239, 68, 68, 0.8)',
                ],
                borderRadius: 8,
              }]
            }
          });
        } else {
          // Generate sample data as fallback
          generateSampleChartData();
        }

      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setError('Không thể tải dữ liệu dashboard');
        // Generate sample data for demo
        generateSampleChartData();
      } finally {
        setLoading(false);
      }
    };

    const generateSampleChartData = () => {
      // Sample data for demo purposes when backend is not available
      const months = ['Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

      setChartData({
        revenueChart: {
          labels: months,
          datasets: [{
            label: 'Doanh thu ($)',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          }]
        },
        statusChart: {
          labels: ['Hoàn thành', 'Đang xử lý', 'Đã hủy'],
          datasets: [{
            data: [65, 25, 10],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(251, 191, 36)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 2,
          }]
        },
        userGrowth: {
          labels: months,
          datasets: [{
            label: 'Số người dùng',
            data: [120, 135, 148, 162, 178, 195],
            borderColor: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            tension: 0.4,
          }]
        },
        servicesChart: {
          labels: ['Chuyến bay', 'Tour du lịch', 'Khách sạn', 'Đi lại'],
          datasets: [{
            label: 'Số lượng đặt',
            data: [45, 38, 15, 8],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
            ],
            borderRadius: 8,
          }]
        }
      });
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text-primary font-serif">Dashboard Tổng quan</h1>
        <div className="text-sm text-text-secondary">
          Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
          {error}
        </div>
      )}

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng Doanh thu"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          subtitle="Trong tháng này"
          icon={<FiDollarSign />}
          colorClass="bg-gradient-to-br from-green-500 to-green-600"
          trend={{ value: "+12.5%", label: "từ tháng trước", isPositive: true }}
        />
        <StatCard
          title="Tổng Đơn hàng"
          value={stats.totalBookings.toLocaleString()}
          subtitle={`${stats.totalBookings} đơn đã đặt`}
          icon={<FiPackage />}
          colorClass="bg-gradient-to-br from-blue-500 to-blue-600"
          trend={{ value: "+8.2%", label: "từ tháng trước", isPositive: true }}
        />
        <StatCard
          title="Người dùng Active"
          value={stats.activeUsers.toLocaleString()}
          subtitle={`${Math.round((stats.activeUsers/stats.totalUsers)*100)}% tổng số`}
          icon={<FiUsers />}
          colorClass="bg-gradient-to-br from-purple-500 to-purple-600"
          trend={{ value: "+15.3%", label: "từ tháng trước", isPositive: true }}
        />
        <StatCard
          title="Dịch vụ Khả dụng"
          value={(stats.totalFlights + stats.totalTours).toLocaleString()}
          subtitle={`${stats.totalFlights} chuyến bay, ${stats.totalTours} tour`}
          icon={<FiActivity />}
          colorClass="bg-gradient-to-br from-orange-500 to-orange-600"
          trend={{ value: "+5.1%", label: "từ tháng trước", isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend Chart */}
        <ChartCard title="Xu hướng Doanh thu">
          {chartData.revenueChart && (
            <Line
              data={chartData.revenueChart}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    display: false,
                  },
                },
              }}
            />
          )}
        </ChartCard>

        {/* Booking Status Distribution */}
        <ChartCard title="Trạng thái Đơn hàng">
          {chartData.statusChart && (
            <div className="flex items-center justify-center">
              <div className="w-64 h-64">
                <Doughnut
                  data={chartData.statusChart}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 20,
                          usePointStyle: true,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </ChartCard>

        {/* User Growth Chart */}
        <ChartCard title="Tăng trưởng Người dùng">
          {chartData.userGrowth && (
            <Line
              data={chartData.userGrowth}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    display: false,
                  },
                },
              }}
            />
          )}
        </ChartCard>

        {/* Popular Services */}
        <ChartCard title="Dịch vụ Phổ biến">
          {chartData.servicesChart && (
            <Bar
              data={chartData.servicesChart}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          )}
        </ChartCard>
      </div>

      {/* Recent Activity Table */}
      <ChartCard title="Hoạt động Gần đây" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-primary">
              <tr>
                <th className="p-4 font-semibold text-text-secondary">ID Đơn</th>
                <th className="p-4 font-semibold text-text-secondary">Loại</th>
                <th className="p-4 font-semibold text-text-secondary">Dịch vụ</th>
                <th className="p-4 font-semibold text-text-secondary">Khách hàng</th>
                <th className="p-4 font-semibold text-text-secondary">Trạng thái</th>
                <th className="p-4 font-semibold text-text-secondary">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {recentBookings.slice(0, 8).map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-brand-primary">#{booking.id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${booking.type === 'flight' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {booking.type}
                    </span>
                  </td>
                  <td className="p-4 text-text-primary max-w-xs truncate">
                    {booking.type === 'flight'
                      ? `${booking.details?.airline || 'N/A'} (${booking.details?.from || ''} - ${booking.details?.to || ''})`
                      : booking.details?.name || booking.details?.title || 'N/A'
                    }
                  </td>
                  <td className="p-4 text-text-secondary">
                    {booking.customerName || booking.userName || 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'}`}>
                      {booking.status === 'completed' ? 'Hoàn thành' :
                       booking.status === 'pending' ? 'Đang xử lý' :
                       booking.status === 'cancelled' ? 'Đã hủy' : booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">
                    {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recentBookings.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            Chưa có đơn hàng nào
          </div>
        )}
      </ChartCard>
    </div>
  );
};

export default DashboardPage;
