import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button.jsx';
import Spinner from '../../components/common/Spinner';
import { FiPlus, FiMoreVertical, FiMail, FiPhone, FiUser, FiEdit, FiTrash, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { adminService } from '../../services/api.js';

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Action handlers
  const handleEditUser = (user) => {
    // Navigate to a new edit page or show inline edit form
    // For now, we'll navigate to an add page with edit mode
    navigate('/admin/users/add', { state: { editingUser: user } });
    setDropdownOpen(null);
  };

  const handleDeleteUser = (user) => {
    setConfirmDialog({
      type: 'delete',
      user,
      title: 'Xác nhận xóa người dùng',
      message: `Bạn có chắc chắn muốn xóa người dùng "${user.name}" (${user.email})? Hành động này không thể hoàn tác.`,
      confirmText: 'Xóa',
      cancelText: 'Hủy'
    });
    setDropdownOpen(null);
  };

  const handleToggleStatus = (user) => {
    setConfirmDialog({
      type: 'toggle',
      user,
      title: 'Thay đổi trạng thái người dùng',
      message: `Bạn có chắc chắn muốn ${user.status === 'Active' ? 'vô hiệu hóa' : 'kích hoạt'} người dùng "${user.name}"?`,
      confirmText: user.status === 'Active' ? 'Vô hiệu hóa' : 'Kích hoạt',
      cancelText: 'Hủy'
    });
    setDropdownOpen(null);
  };

  const confirmAction = async () => {
    if (!confirmDialog) return;

    try {
      if (confirmDialog.type === 'delete') {
        await adminService.deleteUser(confirmDialog.user.id);
        // Refresh user list
        const response = await adminService.getUsers();
        let userData = response.data?.data || response.data || [];
        if (Array.isArray(userData)) {
          const mappedUsers = userData.map(user => {
            const avatarUrl = user.avatar
              ? user.avatar
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=40`;

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: '',
              role: user.role,
              status: user.isActive ? 'Active' : 'Inactive',
              avatar: avatarUrl
            };
          });
          setUsers(mappedUsers);
        }
      } else if (confirmDialog.type === 'toggle') {
        await adminService.toggleUserStatus(confirmDialog.user.id);
        // Update user status locally
        setUsers(prev => prev.map(u =>
          u.id === confirmDialog.user.id
            ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
            : u
        ));
      }
    } catch (err) {
      console.error('Action failed:', err);
      setError('Thao tác thất bại: ' + (err.message || 'Vui lòng thử lại'));
    } finally {
      setConfirmDialog(null);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        console.log('🚀 Fetching users from admin API...');
        const response = await adminService.getUsers();
        console.log('📡 Raw response:', response);
        console.log('🔍 Response properties:', Object.keys(response));
        console.log('📦 Response.data exists:', !!response.data);
        console.log('📦 Response.data value:', response.data);

        // Extract data array from response (AdminController returns {message, data})
        let userData = [];
        if (Array.isArray(response.data)) {
          // Response is direct array
          userData = response.data;
          console.log('📦 Direct array response');
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          // Response is {message, data: [...]}
          userData = response.data.data;
          console.log('📦 Nested data response');
        } else if (response && Array.isArray(response)) {
          // Raw response is array
          userData = response;
          console.log('📦 Raw array response');
        } else {
          console.warn('⚠️ Unexpected response structure - checking alternatives:');
          console.warn('- response.data?.data:', response.data?.data);
          console.warn('- Array.isArray(response.data?.data):', Array.isArray(response.data?.data));
          console.warn('- response:', response);
        }
        console.log('👥 User data array:', userData);

        if (Array.isArray(userData)) {
          // Map backend UserDTO to frontend expected format
          const mappedUsers = userData.map(user => {
            // Use the same avatar style as AdminHeader
            const avatarUrl = user.avatar
              ? user.avatar
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=40`;

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: '', // Backend doesn't provide phone number yet
              role: user.role,
              status: user.isActive ? 'Active' : 'Inactive',
              avatar: avatarUrl
            };
          });

          console.log('✅ Mapped users:', mappedUsers);
          setUsers(mappedUsers);
        } else {
          console.warn('⚠️ User data is not an array:', userData);
          setUsers([]);
          setError('Invalid response format from server.');
        }
      } catch (err) {
        console.error('❌ Failed to load users:', err);
        console.error('❌ Error details:', err.response?.data || err);
        setError(`Không thể tải danh sách người dùng: ${err.message || 'Kiểm tra kết nối backend.'}`);
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
        <Button
          className="flex items-center gap-2"
          onClick={() => navigate('/admin/users/add')}
        >
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
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
                        className="text-text-tertiary hover:text-text-primary p-2"
                      >
                        <FiMoreVertical />
                      </button>

                      {dropdownOpen === user.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            <FiEdit className="w-4 h-4" /> Chỉnh sửa
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            {user.status === 'Active' ? <FiToggleLeft className="w-4 h-4" /> : <FiToggleRight className="w-4 h-4" />}
                            {user.status === 'Active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                          </button>
                          <hr className="border-gray-200" />
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                          >
                            <FiTrash className="w-4 h-4" /> Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {confirmDialog.title}
            </h3>
            <p className="text-text-secondary mb-6">
              {confirmDialog.message}
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setConfirmDialog(null)}
              >
                {confirmDialog.cancelText}
              </Button>
              <Button
                onClick={confirmAction}
                className={confirmDialog.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                {confirmDialog.confirmText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
