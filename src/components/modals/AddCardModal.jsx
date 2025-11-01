import React from 'react';
import { FiCreditCard, FiLock } from 'react-icons/fi';

// --- IMPORT CÁC COMPONENT COMMON ---
import Modal from '../common/Modal.jsx'; // Dùng Modal chung
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Checkbox from '../common/Checkbox.jsx';
import Button from '../common/Button.jsx';

const AddCardModal = ({ isOpen, onClose }) => {
  // Bọc form của bạn bên trong Modal chung
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a new Card">
      <form onSubmit={(e) => e.preventDefault()}>
        
        {/* Card Number */}
        <div className="mb-4 relative">
          <Input
            id="modalCardNumber" label="Card Number"
            placeholder="4321 4321 4321 4321"
          />
          <FiCreditCard className="absolute top-9 right-4 text-text-tertiary text-xl" />
        </div>

        {/* Exp. Date & CVC */}
        <div className="flex gap-4 mb-4">
          <Input
            id="modalExpDate" label="Exp. Date" placeholder="02/27"
            className="w-1/2"
          />
          <div className="w-1/2 relative">
            <Input
              id="modalCvc" label="CVC" placeholder="123"
            />
            <FiLock className="absolute top-9 right-4 text-text-tertiary" />
          </div>
        </div>

        {/* Name on Card */}
        <Input
          id="modalCardName" label="Name on Card" placeholder="John Doe"
          className="mb-4"
        />

        {/* Country or Region (Sử dụng Select) */}
        <Select
          id="modalCountry" label="Country or Region"
          className="mb-6"
          defaultValue="United States"
        >
          <option>United States</option>
          <option>Vietnam</option>
          <option>Canada</option>
          <option>United Kingdom</option>
        </Select>

        {/* Securely save */}
        <Checkbox
          id="modalSaveCard"
          label="Securely save my information for 1-click checkout"
          className="mb-6"
          defaultChecked
        />

        {/* Nút Add Card */}
        <Button
          type="submit"
          className="w-full"
          onClick={onClose} // Tạm thời đóng modal
        >
          Add Card
        </Button>
      </form>
    </Modal>
  );
};

export default AddCardModal;