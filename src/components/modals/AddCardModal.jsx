import React, { useState } from 'react';
import { FiCreditCard, FiLock } from 'react-icons/fi';
import Modal from '../common/Modal.jsx';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Checkbox from '../common/Checkbox.jsx';
import Button from '../common/Button.jsx';
import Spinner from '../common/Spinner.jsx';

const AddCardModal = ({ isOpen, onClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Giả lập xử lý API
    setTimeout(() => {
      // Gọi hàm onSubmit được truyền từ cha với dữ liệu thẻ mới
      if (onSubmit) {
        onSubmit({
          id: Date.now(),
          digits: cardNumber.slice(-4) || '0000', // Lấy 4 số cuối
          expiry: expDate || '12/28'
        });
      }
      
      // Reset form & đóng modal
      setIsProcessing(false);
      setCardNumber('');
      setExpDate('');
      setCvc('');
      setName('');
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm thẻ mới">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <Input
            label="Số thẻ"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            iconRight={<FiCreditCard className="text-xl text-text-tertiary" />}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            label="Ngày hết hạn"
            placeholder="MM/YY"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
            className="w-1/2"
            required
          />
          <div className="w-1/2 relative">
            <Input
              label="CVC"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
              iconRight={<FiLock className="text-text-tertiary" />}
            />
          </div>
        </div>

        <Input
          label="Tên trên thẻ"
          placeholder="NGUYEN VAN A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
          required
        />

        <Select label="Quốc gia" className="mb-6" defaultValue="Vietnam">
          <option value="Vietnam">Vietnam</option>
          <option value="United States">United States</option>
        </Select>

        <Checkbox
          id="modalSaveCard"
          label="Lưu thẻ này cho lần thanh toán sau"
          className="mb-6"
          defaultChecked
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? <Spinner size="sm" /> : 'Thêm thẻ'}
        </Button>
      </form>
    </Modal>
  );
};

export default AddCardModal;