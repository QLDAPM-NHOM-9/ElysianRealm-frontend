import React from 'react';

const AdminFlightsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">Flight Management</h1>

      {/* Nội dung trang */}
      <div className="bg-bg-primary p-6 rounded-lg shadow-xs">
        <p className="text-text-secondary">
          Nội dung quản lý Flights (Bảng danh sách chuyến bay, nút Add Flight...) sẽ ở đây.
        </p>
      </div>
    </div>
  );
};

export default AdminFlightsPage;