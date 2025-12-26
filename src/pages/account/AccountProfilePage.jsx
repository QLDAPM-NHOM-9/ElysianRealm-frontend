import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import authService from '../../services/authService.js';

// Component con: Hàng thông tin (Có chế độ Edit)
const InfoRow = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      let updateData = {};
      if (label === 'Name') {
        updateData = { name: tempValue };
      } else if (label === 'Email') {
        updateData = { email: tempValue };
      } else if (label === 'Password' && tempValue !== '••••••••••••') {
        updateData = { password: tempValue };
      }

      if (Object.keys(updateData).length > 0) {
        await authService.updateProfile(updateData);
        // Refresh user data in context after successful update
        await refreshUser();
      }

      onSave(tempValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Optionally, show error to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-5 border-b border-border-primary last:border-b-0">
      <div className="flex-1 mr-4">
        <p className="text-xs text-text-tertiary uppercase tracking-wider mb-1">{label}</p>
        {isEditing ? (
          <Input 
            value={tempValue} 
            onChange={(e) => setTempValue(e.target.value)} 
            className="max-w-md"
            autoFocus
          />
        ) : (
          <p className="text-text-primary font-medium">{value}</p>
        )}
      </div>
      
      <div>
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={isLoading} className="text-brand-primary font-medium text-sm hover:underline disabled:opacity-50">
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleCancel} disabled={isLoading} className="text-text-secondary font-medium text-sm hover:underline disabled:opacity-50">Cancel</button>
          </div>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-brand-primary font-medium text-sm hover:underline"
          >
            Change
          </button>
        )}
      </div>
    </div>
  );
};

const AccountProfilePage = () => {
  const { user } = useAuth();
  // State lưu thông tin cá nhân
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '••••••••••••'
  });

  const [loading, setLoading] = useState(true);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getCurrentUser();
        const userData = response;
        setProfile(prev => ({
          ...prev,
          name: userData.name || '',
          email: userData.email || ''
        }));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Hàm cập nhật từng trường
  const updateField = (field, newValue) => {
    setProfile(prev => ({ ...prev, [field]: newValue }));
  };

  return (
    <div>
      <div className="divide-y divide-border-primary">
        <InfoRow
          label="Name"
          value={profile.name}
          onSave={(val) => updateField('name', val)}
        />
        <InfoRow
          label="Email"
          value={profile.email}
          onSave={(val) => updateField('email', val)}
        />
        <InfoRow
          label="Password"
          value={profile.password}
          onSave={(val) => updateField('password', val)}
        />
      </div>
    </div>
  );
};

export default AccountProfilePage;
