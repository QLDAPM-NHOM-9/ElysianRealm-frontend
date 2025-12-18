import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Spinner from '../../components/common/Spinner';
import { adminService } from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'USER',
    avatar: ''
  });

  const roleOptions = [
    { value: 'USER', label: 'Người dùng' },
    { value: 'ADMIN', label: 'Quản trị viên' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    // Check if we're editing a user
    const { state } = location;
    if (state?.editingUser) {
      const user = state.editingUser;
      setIsEditMode(true);
      setEditingUserId(user.id);
      setFormData({
        email: user.email,
        password: '', // Don't pre-fill password for security
        name: user.name,
        role: user.role,
        avatar: user.avatar || ''
      });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || (!isEditMode && !formData.password) || !formData.name) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ');
      return;
    }

    // Password validation (required for create, optional for edit)
    if (!isEditMode && formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      // Remove avatar if empty
      const userData = { ...formData };
      if (!userData.avatar.trim()) {
        delete userData.avatar;
      }

      // If editing and password is empty, remove it from payload
      if (isEditMode && !userData.password) {
        delete userData.password;
      }

      if (isEditMode) {
        // Update user
        await adminService.updateUser(editingUserId, userData);
        toast.success('Chỉnh sửa người dùng thành công!');
      } else {
        // Create new user
        await adminService.createUser(userData);
        toast.success('Thêm người dùng thành công!');
      }

      navigate('/admin/users');
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} user:`, error);
      toast.error(`Lỗi khi ${isEditMode ? 'chỉnh sửa' : 'thêm'} người dùng: ${error.message || 'Vui lòng thử lại'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/users')}
            className="flex items-center gap-2"
          >
            <FiArrowLeft /> Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary font-serif">
              {isEditMode ? 'Chỉnh Sửa Người Dùng' : 'Thêm Người Dùng Mới'}
            </h1>
            <p className="text-text-secondary mt-1">
              {isEditMode
                ? 'Cập nhật thông tin tài khoản người dùng'
                : 'Điền thông tin để tạo tài khoản người dùng mới'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-bg-primary rounded-xl shadow-sm border border-border-primary p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Tên đầy đủ *"
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              placeholder="Nhập tên đầy đủ"
              required
            />

            <Input
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              placeholder="Nhập địa chỉ email"
              required
            />

            <Input
              label={isEditMode ? "Mật khẩu mới (để trống nếu không đổi)" : "Mật khẩu *"}
              type="password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              placeholder={isEditMode ? "Nhập mật khẩu mới" : "Nhập mật khẩu"}
              required={!isEditMode}
            />

            <Select
              label="Vai trò *"
              value={formData.role}
              onChange={(value) => handleInputChange('role', value)}
              required
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <div className="md:col-span-2">
              <Input
                label="URL Ảnh đại diện"
                value={formData.avatar}
                onChange={(value) => handleInputChange('avatar', value)}
                placeholder="Nhập URL ảnh đại diện (tùy chọn)"
              />
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Yêu cầu mật khẩu:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ít nhất 6 ký tự</li>
              <li>• Nên bao gồm chữ hoa, chữ thường và số</li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              {loading && <Spinner size="sm" />}
              {loading ? (isEditMode ? 'Đang cập nhật...' : 'Đang tạo...') : (isEditMode ? 'Cập Nhật' : 'Tạo Người Dùng')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/users')}
              disabled={loading}
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
