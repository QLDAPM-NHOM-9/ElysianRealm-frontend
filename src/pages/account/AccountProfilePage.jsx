import React from 'react';

// Component con cho từng hàng thông tin
const InfoRow = ({ label, value, onEdit }) => (
  <div className="flex items-center justify-between py-5 border-b border-border-primary last:border-b-0">
    <div>
      <p className="text-xs text-text-tertiary uppercase tracking-wider">{label}</p>
      <p className="text-text-primary font-medium mt-1">{value}</p>
    </div>
    <button 
      onClick={onEdit}
      className="text-brand-primary font-medium text-sm hover:underline"
    >
      Change
    </button>
  </div>
);

const AccountProfilePage = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-4">Account</h3>
      
      <div className="divide-y divide-border-primary">
        <InfoRow 
          label="Name" 
          value="John Doe" 
          onEdit={() => alert('Edit Name')} 
        />
        <InfoRow 
          label="Email" 
          value="john.doe@gmail.com" 
          onEdit={() => alert('Edit Email')} 
        />
        <InfoRow 
          label="Password" 
          value="••••••••••••" 
          onEdit={() => alert('Edit Password')} 
        />
        <InfoRow 
          label="Phone number" 
          value="+1 000-000-0000" 
          onEdit={() => alert('Edit Phone')} 
        />
        <InfoRow 
          label="Address" 
          value="St 32 main downtown, Los Angeles, California, USA" 
          onEdit={() => alert('Edit Address')} 
        />
        <InfoRow 
          label="Date of birth" 
          value="01-01-1992" 
          onEdit={() => alert('Edit DOB')} 
        />
      </div>
    </div>
  );
};

export default AccountProfilePage;