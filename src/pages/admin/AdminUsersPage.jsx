import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import { FiPlus, FiMoreVertical, FiMail, FiPhone, FiUser } from 'react-icons/fi';

/**
 * NOTE: Requires backend endpoint GET /admin/users
 * Backend should return: { data: [ { id, name, email, phone, role, status } ] }
 */

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // TODO: Uncomment when backend endpoint is ready
        // const data = await axiosClient.get('/admin/users');
        // setUsers(Array.isArray(data.data) ? data.data : []);
        
        setError('Backend endpoint /admin/users not yet implemented. Contact backend team.');
        setUsers([]);
      } catch (err) {
        setError(err.message || 'Failed to load users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-serif">Quản lý Người dùng</h1>
          <p className="text-text-secondary mt-1">Quản lý tài khoản, phân quyền và trạng thái.</p>
        </div>
        <Button className="flex items-center gap-2" disabled>
          <FiPlus /> Thêm User
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      
      {users.length === 0 ? (
        <div className="text-center py-12 bg-bg-primary rounded-lg border border-border-primary">
          <p className="text-text-secondary">No users available</p>
        </div>
      ) : (
        <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-primary">
              <tr>
                <th className="p-4 font-semibold text-text-secondary">Người dùng</th>
                <th className="p-4 font-semibold text-text-secondary">Liên hệ</th>
                <th className="p-4 font-semibold text-text-secondary">Vai trò</th>
                <th className="p-4 font-semibold text-text-secondary">Trạng thái</th>
                <th className="p-4 font-semibold text-text-secondary text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-primary">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {/* Cột User Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-secondary">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Cột Liên hệ */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <FiMail className="w-3 h-3" /> {user.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiPhone className="w-3 h-3" /> {user.phone}
                      </div>
                    </div>
                  </td>

                  {/* Cột Vai trò */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 w-fit text-xs font-medium text-text-primary">
                      <FiUser className="w-3 h-3" /> {user.role}
                    </div>
                  </td>

                  {/* Cột Trạng thái */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                      {user.status}
                    </span>
                  </td>

                  {/* Cột Hành động */}
                  <td className="p-4 text-right">
                    <button className="text-text-tertiary hover:text-text-primary p-2">
                      <FiMoreVertical />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;