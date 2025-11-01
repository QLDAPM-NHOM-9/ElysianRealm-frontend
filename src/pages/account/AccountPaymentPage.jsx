import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import AddCardModal from '../../components/modals/AddCardModal.jsx'; // Import Modal

// Component con: Thẻ đã lưu
const SavedCard = ({ digits, expiry }) => (
  <div className="p-6 rounded-2xl shadow-sm bg-brand-primary text-white">
    <p className="text-xs uppercase opacity-70 tracking-wider">Card</p>
    <p className="text-2xl font-semibold tracking-wider my-4">•••• •••• •••• {digits}</p>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs opacity-70">Valid Thru</p>
        <p className="font-medium">{expiry}</p>
      </div>
      {/* Bạn có thể thêm logo Visa/Mastercard ở đây */}
      <span className="font-bold text-2xl italic">VISA</span>
    </div>
  </div>
);

// Component con: Nút thêm thẻ
const AddCardButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="h-full min-h-[160px] w-full border-2 border-dashed border-border-primary rounded-2xl
               flex flex-col items-center justify-center text-text-secondary
               hover:bg-brand-pale hover:border-brand-primary hover:text-brand-primary transition-colors"
  >
    <FiPlus className="w-8 h-8 mb-2" />
    <span className="font-medium">Add a new card</span>
  </button>
);


const AccountPaymentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-6">Payment methods</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thẻ đã lưu (Dữ liệu mẫu) */}
        <SavedCard digits="4321" expiry="02/27" />

        {/* Nút thêm thẻ mới */}
        <AddCardButton onClick={() => setIsModalOpen(true)} />
      </div>

      {/* Modal thêm thẻ */}
      <AddCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AccountPaymentPage;