import React, { useState } from 'react';
import { FiCheckCircle, FiCircle, FiPlus } from 'react-icons/fi';
import AddCardModal from '../modals/AddCardModal.jsx';
import Button from '../common/Button.jsx';
import Spinner from '../common/Spinner.jsx'; // Import Spinner

// Component con: Nút chọn (Pay in full / Pay part now)
const PaymentRadioOption = ({ title, description, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 border rounded-lg flex items-center gap-4 text-left transition-colors
      ${isActive ? 'bg-brand-pale border-brand-primary' : 'bg-bg-primary border-border-primary hover:bg-gray-50'}
    `}
  >
    {isActive 
      ? <FiCheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0" /> 
      : <FiCircle className="w-6 h-6 text-text-tertiary flex-shrink-0" />
    }
    <div>
      <h5 className="font-semibold text-text-primary">{title}</h5>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  </button>
);

// Component con: Thẻ đã lưu
const SavedCardOption = ({ digits, expiry, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 border rounded-lg flex items-center gap-4 text-left transition-colors
      ${isActive ? 'bg-brand-pale border-brand-primary' : 'bg-bg-primary border-border-primary hover:bg-gray-50'}
    `}
  >
    {isActive 
      ? <FiCheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0" /> 
      : <FiCircle className="w-6 h-6 text-text-tertiary flex-shrink-0" />
    }
    <div className="flex-1 flex justify-between items-center">
      <div>
        <p className="font-semibold text-text-primary">•••• {digits}</p>
        <p className="text-sm text-text-secondary">{expiry}</p>
      </div>
      <span className="font-bold text-xl italic text-text-tertiary">VISA</span>
    </div>
  </button>
);

// --- COMPONENT CHÍNH ---
const PaymentOptions = ({ onSubmit, isProcessing }) => {
  const [payMethod, setPayMethod] = useState('full'); // 'full' hoặc 'part'
  const [card, setCard] = useState('4321'); // '4321' hoặc 'new'
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-bg-primary p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-text-primary mb-6">Payment Method</h3>

      {/* Lựa chọn Pay in full / Pay part now */}
      <div className="space-y-4 mb-6">
        <PaymentRadioOption
          title="Pay in full"
          description="Pay the total and you are all set"
          isActive={payMethod === 'full'}
          onClick={() => setPayMethod('full')}
        />
        <PaymentRadioOption
          title="Pay part now, part later"
          description="Pay $207.43 now, and the rest ($207.43) will be automatically charged."
          isActive={payMethod === 'part'}
          onClick={() => setPayMethod('part')}
        />
      </div>

      {/* Lựa chọn Thẻ */}
      <div className="space-y-4">
        <SavedCardOption
          digits="4321"
          expiry="02/27"
          isActive={card === '4321'}
          onClick={() => setCard('4321')}
        />
        
        {/* Nút thêm thẻ mới */}
        <button
          onClick={() => {
            setCard('new');
            setIsModalOpen(true);
          }}
          className={`w-full p-4 border rounded-lg flex items-center gap-4 text-left transition-colors
            ${card === 'new' ? 'bg-brand-pale border-brand-primary' : 'bg-bg-primary border-border-primary hover:bg-gray-50'}
          `}
        >
          {card === 'new' 
            ? <FiCheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0" /> 
            : <FiCircle className="w-6 h-6 text-text-tertiary flex-shrink-0" />
          }
          <div className="flex items-center gap-2 text-text-primary font-medium">
            <FiPlus />
            <span>Add a new card</span>
          </div>
        </button>
      </div>

      {/* Nút xác nhận (ĐÃ CẬP NHẬT ĐỂ GỌI PROP onSubmit) */}
      <Button 
        variant="primary" 
        className="w-full mt-8 text-lg"
        onClick={onSubmit}
        disabled={isProcessing} // Vô hiệu hóa khi đang tải
      >
        {isProcessing ? <Spinner size="md" className="border-white" /> : 'Confirm and Pay'}
      </Button>

      {/* Modal thêm thẻ */}
      <AddCardModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PaymentOptions;