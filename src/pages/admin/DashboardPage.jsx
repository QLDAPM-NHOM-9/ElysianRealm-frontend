import React from 'react';

// Component con: Thẻ thống kê (Widget)
const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="bg-bg-primary p-6 rounded-lg shadow-xs">
    <div className={`w-12 h-12 flex items-center justify-center rounded-full ${colorClass} text-white`}>
      {icon}
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-text-secondary">{title}</p>
      <p className="text-3xl font-bold text-text-primary">{value}</p>
    </div>
  </div>
);

// Component con: Bảng
const RecentBookingsTable = () => (
  <div className="bg-bg-primary rounded-lg shadow-xs overflow-hidden">
    <h3 className="text-lg font-semibold p-6 text-text-primary">Recent Bookings</h3>
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-border-primary">
        <tr>
          <th className="p-4 text-left text-xs font-medium text-text-secondary uppercase">User</th>
          <th className="p-4 text-left text-xs font-medium text-text-secondary uppercase">Type</th>
          <th className="p-4 text-left text-xs font-medium text-text-secondary uppercase">Status</th>
          <th className="p-4 text-left text-xs font-medium text-text-secondary uppercase">Total</th>
        </tr>
      </thead>
      <tbody>
        {/* Dữ liệu mẫu */}
        <tr className="border-b border-border-primary">
          <td className="p-4 text-sm text-text-primary">John Doe</td>
          <td className="p-4 text-sm text-text-secondary">Flight</td>
          <td className="p-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              Confirmed
            </span>
          </td>
          <td className="p-4 text-sm text-text-primary font-medium">$450</td>
        </tr>
        <tr className="border-b border-border-primary">
          <td className="p-4 text-sm text-text-primary">Jane Smith</td>
          <td className="p-4 text-sm text-text-secondary">Hotel</td>
          <td className="p-4">
            {/* Sử dụng màu brand-primary (tím/hồng) cho trạng thái "Pending" */}
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-pale text-brand-primary">
              Pending
            </span>
          </td>
          <td className="p-4 text-sm text-text-primary font-medium">$1200</td>
        </tr>
        <tr className="border-b border-border-primary">
          <td className="p-4 text-sm text-text-primary">Mike Johnson</td>
          <td className="p-4 text-sm text-text-secondary">Tour</td>
          <td className="p-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
              Cancelled
            </span>
          </td>
          <td className="p-4 text-sm text-text-primary font-medium">$300</td>
        </tr>
      </tbody>
    </table>
  </div>
);


const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">Dashboard</h1>

      {/* Lưới các thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$45,231" 
          icon={"💰"} 
          colorClass="bg-brand-primary" // Màu tím/hồng
        />
        <StatCard 
          title="Total Bookings" 
          value="1,204" 
          icon={"📦"} 
          colorClass="bg-brand-secondary" // Màu hồng đậm
        />
        <StatCard 
          title="Total Users" 
          value="892" 
          icon={"👥"} 
          colorClass="bg-blue-400" 
        />
        <StatCard 
          title="New Flights" 
          value="32" 
          icon={"✈️"} 
          colorClass="bg-gray-700" 
        />
      </div>

      {/* Bảng dữ liệu */}
      <RecentBookingsTable />
    </div>
  );
};

export default DashboardPage;