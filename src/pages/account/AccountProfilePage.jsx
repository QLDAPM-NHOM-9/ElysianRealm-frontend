import React, { useState } from 'react';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';

// Component con: Hàng thông tin (Có chế độ Edit)
const InfoRow = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
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
            <button onClick={handleSave} className="text-brand-primary font-medium text-sm hover:underline">Save</button>
            <button onClick={handleCancel} className="text-text-secondary font-medium text-sm hover:underline">Cancel</button>
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
  // State lưu thông tin cá nhân
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: '••••••••••••',
    phone: '+1 000-000-0000',
    address: 'St 32 main downtown, Los Angeles, California, USA',
    dob: '01-01-1992'
  });

  // Hàm cập nhật từng trường
  const updateField = (field, newValue) => {
    setProfile(prev => ({ ...prev, [field]: newValue }));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-4">Account</h3>
      
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
        <InfoRow 
          label="Phone number" 
          value={profile.phone} 
          onSave={(val) => updateField('phone', val)} 
        />
        <InfoRow 
          label="Address" 
          value={profile.address} 
          onSave={(val) => updateField('address', val)} 
        />
        <InfoRow 
          label="Date of birth" 
          value={profile.dob} 
          onSave={(val) => updateField('dob', val)} 
        />
      </div>
    </div>
  );
};

export default AccountProfilePage;